// src/components/home/HistoryGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface LogoHistory {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export default function HistoryGrid() {
  const router = useRouter();
  const [history, setHistory] = useState<LogoHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log('开始获取历史记录...');
        const response = await fetch('/api/history');
        console.log('API 响应状态:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        console.log('获取到的历史数据:', data);
        setHistory(data);
      } catch (err) {
        console.error('获取历史记录失败:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleLogoClick = (logoId: string) => {
    console.log('Clicking logo with ID:', logoId);
    router.push(`/logo/${logoId}`);
  };

  const handleDownload = async (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();

    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(imageUrl)}`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `logo-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-1">
            <Skeleton className="w-full aspect-square border-0" />
            <Skeleton className="h-4 w-3/4 mt-2 border-0" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load: {error}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No generated logos yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {history.map((logo) => (
        <div
          key={logo.id}
          className="cursor-pointer group p-1"
          onClick={() => handleLogoClick(logo.id)}
        >
          <div className="relative transition-all duration-300 hover:shadow-2xl rounded-lg">
            <div className="aspect-square">
              <img
                src={logo.imageUrl.replace('.png', '_thumb.png')}
                alt={logo.prompt}
                className="object-cover w-full h-full rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.log(target.src, logo.imageUrl)

                  if (target.src.includes("_thumb")) {
                    target.src = logo.imageUrl;
                  }
                }}
              />
            </div>
            <div className="p-2">
              <p
                className="text-xs text-gray-400 truncate"
                title={logo.prompt}
                style={{ maxWidth: '150px' }}  // 限制文本长度
              >
                {logo.prompt}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}