import { useState, Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import CategoryTabs from './CategoryTabs';
import TemplateGrid, { TemplateGridSkeleton } from './TemplateGrid';
import { templates } from '@/data/templates';
import { categories } from '@/data/categories';

export default function TemplateSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = templates
    .filter(template => 
      selectedCategory === 'all' || template.category === selectedCategory
    )
    .filter(template =>
      searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      {/* 页面标题和搜索栏 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Choose Logo Template</h1>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            className="pl-9 h-10 bg-white transition-colors duration-200 border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 分类和模板展示区域 */}
      <div className="bg-white rounded-xl">
        <div className="sticky top-0 z-10 bg-white rounded-t-xl backdrop-blur-xl backdrop-saturate-150 bg-white/80">
          <div className="py-3">
            <CategoryTabs 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
        
        <div className="p-4 lg:p-6">
          <TemplateGrid 
            templates={filteredTemplates}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6" 
          />
        </div>
      </div>
    </div>
  );
}