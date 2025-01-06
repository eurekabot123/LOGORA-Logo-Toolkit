// src/app/generate/[templateId]/page.tsx
'use client';

import GeneratePage from '@/components/generate/GeneratePage';
import { useParams } from 'next/navigation';

export default function TemplatePage({ searchParams }: any) {
  // console.log(searchParamscontext)
  const params = useParams();
  const templateId = params.templateId as string;
  const workId = params.workId as string;
  const text = searchParams.text

  return <GeneratePage templateId={templateId} workId={workId} initialPrompt={text} />;
} 