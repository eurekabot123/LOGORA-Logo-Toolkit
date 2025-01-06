// src/data/categories.ts
import type { Category } from '@/types/template';

import { 
  Palette, 
  Building2, 
  ShoppingBag, 
  Utensils,
  Briefcase,
  Globe,
  Monitor,
  FileText
} from 'lucide-react';  // 导入需要的图标

export const categories: Category[] = [
  {
    id: 'business',
    name: 'Business',
    description: 'Business and corporate logos',
    icon: Globe
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Technology and digital logos',
    icon: Monitor
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Creative and artistic logos',
    icon: FileText
  }
];