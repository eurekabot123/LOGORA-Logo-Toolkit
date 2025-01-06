// src/app/generate/[templateId]/page.tsx
'use client';

import GeneratePage from '@/components/generate/GeneratePage';
import { useParams } from 'next/navigation';

export default function TemplatePage() {
  const params = useParams();
  const templateId = params.templateId as string;
  
  return <GeneratePage templateId={templateId} />;
}