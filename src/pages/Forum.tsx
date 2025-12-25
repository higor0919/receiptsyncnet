import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Plus, ArrowLeft, User } from 'lucide-react';
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
  comment_count: number;
}

const Forum = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          user_id,
          profiles!posts_user_id_fkey (username)
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Get comment counts for each post
      const postsWithCounts = await Promise.all(
        (postsData || []).map(async (post) => {
          const { count } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            profiles: post.profiles,
            comment_count: count || 0
          };
        })
      );

      setPosts(postsWithCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTitle.trim() || !newContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('posts').insert({
        title: newTitle.trim(),
        content: newContent.trim(),
        user_id: user.id
      });

      if (error) throw error;

      toast({ title: 'Post created!', description: 'Your post is now live.' });
      setNewTitle('');
      setNewContent('');
      setShowNewPost(false);
      fetchPosts();
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Community Forum</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* New Post Button/Form */}
        {!showNewPost ? (
          <Button onClick={() => setShowNewPost(true)} className="mb-6 gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create a New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <Input
                  placeholder="Post title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  maxLength={200}
                  required
                />
                <Textarea
                  placeholder="What would you like to discuss?"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  maxLength={5000}
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Posting...' : 'Post'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Posts List */}
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading posts...</p>
        ) : posts.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to start a discussion!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.id} to={`/forum/${post.id}`}>
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>by {post.profiles?.username || 'Anonymous'}</span>
                        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comment_count} comments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Forum;
