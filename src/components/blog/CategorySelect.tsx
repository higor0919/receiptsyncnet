import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BLOG_CATEGORIES = [
  'General',
  'Tips & Tricks',
  'Updates',
  'Tutorials',
  'News',
  'Case Studies'
] as const;

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  showAll?: boolean;
}

const CategorySelect = ({ value, onChange, showAll = false }: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {showAll && <SelectItem value="all">All Categories</SelectItem>}
        {BLOG_CATEGORIES.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
