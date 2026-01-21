import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import RichTextEditor from './RichTextEditor';
import CategorySelect from './CategorySelect';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ImagePlus, X } from 'lucide-react';

interface NewPostFormProps {
  userId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const NewPostForm = ({ userId, onSuccess, onCancel }: NewPostFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('posts').insert({
        title: title.trim(),
        content: content.trim(),
        category,
        featured_image_url: featuredImageUrl.trim() || null,
        user_id: userId
      });

      if (error) throw error;

      toast({ title: 'Article published!', description: 'Your article is now live.' });
      onSuccess();
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
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Write a New Article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Article title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <CategorySelect value={category} onChange={setCategory} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured-image">Featured Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="featured-image"
                  placeholder="https://example.com/image.jpg"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  className="flex-1"
                />
                {featuredImageUrl && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setFeaturedImageUrl('')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {featuredImageUrl && (
            <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border">
              <img 
                src={featuredImageUrl} 
                alt="Featured preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Content</Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your article content..."
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={submitting || !title.trim() || !content.trim()}>
              {submitting ? 'Publishing...' : 'Publish'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewPostForm;
