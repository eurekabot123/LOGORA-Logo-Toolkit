import { useRouter } from 'next/navigation';
import { Template } from '@/types/template';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateGridProps {
  templates: Template[];
  className?: string;
}

export default function TemplateGrid({ templates, className }: TemplateGridProps) {
  const router = useRouter();

  const handleTemplateClick = (templateId: string) => {
    router.push(`/generate/${templateId}`);
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div 
            className="group cursor-pointer bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            onClick={() => handleTemplateClick(template.id)}
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold line-clamp-1">{template.name}</h3>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
                  {template.style}
                </Badge>
              </div>

              <div className="aspect-video relative rounded-lg overflow-hidden bg-white">
                <Image
                  src={template.imageUrl}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {template.description}
              </p>

              <Button 
                className="w-full shadow-none border-0 bg-black hover:bg-gray-800 text-white"
              >
                Use This Template
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Loading state component
export function TemplateGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 space-y-4 animate-pulse">
          <div className="h-6 w-2/3 bg-gray-200 rounded" />
          <div className="aspect-video bg-gray-200 rounded-lg" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}