import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    category?: string;
    featured_image_url?: string;
    profiles: {
      username: string;
    } | null;
  };
}

const calculateReadingTime = (content: string): number => {
  // Strip HTML tags and count words
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const readingTime = calculateReadingTime(post.content);
  const plainContent = stripHtml(post.content);

  return (
    <Link to={`/blog/${post.id}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden">
        {post.featured_image_url && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={post.featured_image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className="py-6">
          <div className="flex items-center gap-2 mb-3">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min read</span>
            </div>
          </div>
          <h2 className="font-semibold text-xl mb-3">{post.title}</h2>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {plainContent}
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
  );
};

export default BlogPostCard;
