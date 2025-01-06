'use client';

import { useState, useEffect } from 'react';
import { templates } from '@/data/templates';
import { notFound, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';

interface GeneratePageProps {
  templateId: string;
  initialPrompt?: string;
  initialImageUrl?: string;
  workId?: string
}

export default function GeneratePage({ templateId, initialPrompt = '', initialImageUrl = '', workId, }: GeneratePageProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logoUrl, setLogoUrl] = useState(initialImageUrl);

  const template = templates.find(t => t.id === templateId);
  const router = useRouter()

  useEffect(() => {
    if (!template) {
      notFound();
    }
  }, [template]);

  useEffect(() => {
    if (!workId) {
      return
    }
    setLoading(true);


    const intervalData = setInterval(getWork, 5000);

    async function getWork() {
      console.log("查询");

      const res = await fetch(`/api/work`, {
        method: "POST",
        body: JSON.stringify({
          image_work_id: workId
        }),
      });
      const { data } = await res.json();

      if (data == 'loading') return
      if (data == "failed") {
        setLoading(false)
        clearInterval(intervalData);
        setError(`"${prompt}" 生成失败，请稍后重试`);
        return
      }
      setLoading(false)
      clearInterval(intervalData);

      if (data.imageUrl)
        setLogoUrl(data.imageUrl);
      // if (fours.length === 4) {
      //   const datas = fours.map((url, index) => {
      //     return { ...data, id: data.id + `_${index}`, img_url: url, action: `upsample${index + 1}` };
      //   });
      //   setLen(4);
      //   setWallpapers(datas);
      //   setLoading(false)
      // }
    }

    getWork()
  }, [workId]);

  if (!template) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credits = localStorage.getItem("credits");
    if (credits == undefined) {
      router.replace("?login=" + Date.now());
      return;
    }
    if (parseInt(credits) < 1) {
      router.push("/pricing");
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a description');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style: template.style,
          templateId: template.id
        }),
      });

      // if (!response.ok) {
      // }

      const data = await response.json();
      console.log(data)

      if (data?.error!) {
        setError(data.error);
        setLoading(false);
        return
      }

      // const data = {
      //   "code": 200,
      //   "message": "loading",
      //   "image_work_id": "193f50072d2288389e3"
      // }

      if (data?.image_work_id!) {
        router.push(`/generate/${templateId}/${data.image_work_id}?text=${prompt}`);
        return
      }

      throw new Error('Generation failed');

      // setLogoUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{template.name}</h1>
          <p className="mt-2 text-gray-600">{template.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  {logoUrl ? 'Generated Logo' : 'Template Preview'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative rounded-lg overflow-hidden bg-white">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Generated Logo"
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <Image
                      src={template.imageUrl}
                      alt={template.name}
                      fill
                      className="object-contain p-4"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-500">Style</p>
                <p className="font-medium">{template.style}</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{template.category}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Generate Your Logo</CardTitle>
                <p className="text-sm text-gray-500">
                  Describe your logo in detail to get better results
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="prompt" className="text-sm font-medium">
                      Logo Description
                    </label>
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A modern minimalist logo for a tech startup..."
                      disabled={loading}
                      className="h-20 py-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base"
                    disabled={loading || !prompt.trim()}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin">⚪</div>
                        Generating...
                      </div>
                    ) : (
                      'Generate Logo'
                    )}
                  </Button>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 