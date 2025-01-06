'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import GeneratePage from '@/components/generate/GeneratePage';

interface LogoDetail {
  id: string;
  prompt: string;
  imageUrl: string;
  templateId: string;
}

export default function LogoDetailPage() {
  const params = useParams();
  const [logoDetail, setLogoDetail] = useState<LogoDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogoDetail = async () => {
      try {
        const response = await fetch(`/api/logo/${params.logoId}`);
        if (!response.ok) throw new Error('Failed to fetch logo detail');
        const data = await response.json();
        setLogoDetail(data);
      } catch (error) {
        console.error('Error fetching logo detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.logoId) {
      fetchLogoDetail();
    }
  }, [params.logoId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!logoDetail) {
    return <div>Logo not found</div>;
  }

  return (
    <GeneratePage
      templateId={logoDetail.templateId}
      initialPrompt={logoDetail.prompt}
      initialImageUrl={logoDetail.imageUrl}
    />
  );
} 