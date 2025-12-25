import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MessageSquare, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  } | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_id: string | null;
  profiles: {
    username: string;
  } | null;
  replies?: Comment[];
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          user_id
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        // Fetch profile separately
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username')
          .eq('user_id', data.user_id)
          .maybeSingle();
        
        setPost({
          ...data,
          profiles: profileData ? { username: profileData.username } : null
        });
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          parent_id
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch profiles for all commenters
      const userIds = [...new Set((data || []).map(c => c.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username')
        .in('user_id', userIds);

      const profilesMap = new Map((profilesData || []).map(p => [p.user_id, p]));

      // Organize comments into tree structure
      const commentMap = new Map<string, Comment>();
      const rootComments: Comment[] = [];

      (data || []).forEach((comment) => {
        const profile = profilesMap.get(comment.user_id);
        commentMap.set(comment.id, { 
          ...comment, 
          profiles: profile ? { username: profile.username } : null,
          replies: [] 
        });
      });

      (data || []).forEach((comment) => {
        const commentWithReplies = commentMap.get(comment.id)!;
        if (comment.parent_id) {
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.replies = parent.replies || [];
            parent.replies.push(commentWithReplies);
          }
        } else {
          rootComments.push(commentWithReplies);
        }
      });

      setComments(rootComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert({
        post_id: id,
        content: newComment.trim(),
        user_id: user.id
      });

      if (error) throw error;

      toast({ title: 'Comment posted!' });
      setNewComment('');
      fetchComments();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!user || !replyContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert({
        post_id: id,
        content: replyContent.trim(),
        user_id: user.id,
        parent_id: parentId
      });

      if (error) throw error;

      toast({ title: 'Reply posted!' });
      setReplyContent('');
      setReplyingTo(null);
      fetchComments();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const CommentComponent = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-border pl-4' : ''}`}>
      <div className="py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="font-medium text-foreground">{comment.profiles?.username || 'Anonymous'}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
        </div>
        <p className="text-sm mb-2">{comment.content}</p>
        <button
          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <Reply className="w-3 h-3" />
          Reply
        </button>

        {replyingTo === comment.id && (
          <div className="mt-3 space-y-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={2}
              maxLength={2000}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleSubmitReply(comment.id)} disabled={submitting}>
                {submitting ? 'Posting...' : 'Reply'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Post not found</p>
          <Link to="/forum">
            <Button>Back to Forum</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/forum" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
            Back to Forum
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Post */}
        <Card className="mb-8">
          <CardContent className="py-6">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-foreground whitespace-pre-wrap mb-4">{post.content}</p>
            <div className="text-sm text-muted-foreground">
              Posted by {post.profiles?.username || 'Anonymous'} •{' '}
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Comments</h2>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              maxLength={2000}
            />
            <Button type="submit" disabled={submitting || !newComment.trim()}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-0 divide-y divide-border">
              {comments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
