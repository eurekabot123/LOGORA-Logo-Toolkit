import * as React from 'react';
import { Category } from '@/types/template';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

const CategoryTabs = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className
}: CategoryTabsProps) => {
  return (
    <ScrollArea className={cn("w-full relative", className)}>
      <div className="flex items-center space-x-2 px-1">
        <button
          onClick={() => onSelectCategory('all')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            "hover:bg-gray-100 active:bg-gray-200",
            selectedCategory === 'all' 
              ? "bg-gray-100 text-gray-900" 
              : "text-gray-600"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              "hover:bg-gray-100 active:bg-gray-200",
              "flex items-center gap-2",
              selectedCategory === category.id 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-600"
            )}
          >
            {category.icon && (
              <category.icon className="w-4 h-4" />
            )}
            {category.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible"/>
    </ScrollArea>
  );
};

export default CategoryTabs;