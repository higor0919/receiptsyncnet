import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, ArrowLeft, User } from 'lucide-react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import CategorySelect from '@/components/blog/CategorySelect';
import NewPostForm from '@/components/blog/NewPostForm';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  category: string;
  featured_image_url: string | null;
  profiles: {
    username: string;
  } | null;
}

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const { user, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Build query
      let query = supabase
        .from('posts')
        .select('id, title, content, created_at, user_id, category, featured_image_url', { count: 'exact' });
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Get paginated results
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      
      const { data: postsData, error: postsError, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (postsError) throw postsError;

      setTotalCount(count || 0);

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

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleNewPostSuccess = () => {
    setShowNewPost(false);
    setCurrentPage(1);
    setSelectedCategory('all');
    fetchPosts();
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
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <CategorySelect 
            value={selectedCategory} 
            onChange={handleCategoryChange} 
            showAll 
          />
          {user && !showNewPost && (
            <Button onClick={() => setShowNewPost(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          )}
        </div>

        {/* New Post Form */}
        {user && showNewPost && (
          <NewPostForm
            userId={user.id}
            onSuccess={handleNewPostSuccess}
            onCancel={() => setShowNewPost(false)}
          />
        )}

        {/* Posts List */}
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading articles...</p>
        ) : posts.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? 'No articles yet. Check back soon!' 
                : `No articles in "${selectedCategory}" category.`}
            </p>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Blog;
