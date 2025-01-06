// src/app/page.tsx
'use client';

import TemplateSection from '@/components/home/TemplateSection';
import HistorySection from '@/components/home/HistorySection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 space-y-8">
        <TemplateSection />
        <HistorySection />
      </div>
    </main>
  );
}