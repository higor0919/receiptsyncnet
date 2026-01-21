import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, ArrowLeft, User, Calendar } from 'lucide-react';
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

const Blog = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
          user_id
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch profiles separately
      const userIds = [...new Set((postsData || []).map(p => p.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, username')
        .in('user_id', userIds);

      const profilesMap = new Map((profilesData || []).map(p => [p.user_id, p]));

      const postsWithProfiles = (postsData || []).map((post) => {
        const profile = profilesMap.get(post.user_id);
        return {
          ...post,
          profiles: profile ? { username: profile.username } : null
        };
      });

      setPosts(postsWithProfiles);
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

      toast({ title: 'Article published!', description: 'Your article is now live.' });
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Blog</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* New Post Button/Form - Only show for authenticated users */}
        {user && (
          <>
            {!showNewPost ? (
              <Button onClick={() => setShowNewPost(true)} className="mb-6 gap-2">
                <Plus className="w-4 h-4" />
                New Article
              </Button>
            ) : (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Write a New Article</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <Input
                      placeholder="Article title..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      maxLength={200}
                      required
                    />
                    <Textarea
                      placeholder="Write your article content..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={8}
                      maxLength={10000}
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Publishing...' : 'Publish'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowNewPost(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Posts List */}
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading articles...</p>
        ) : posts.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="text-muted-foreground">No articles yet. Check back soon!</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="py-6">
                    <h2 className="font-semibold text-xl mb-3">{post.title}</h2>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.profiles?.username || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
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

export default Blog;
