// src/components/logo-generator/logo-result.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LogoResultProps {
  logoUrl: string;
}

export function LogoResult({ logoUrl }: LogoResultProps) {
  if (!logoUrl) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>生成结果</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border">
          <img
            src={logoUrl}
            alt="Generated Logo"
            className="w-full h-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}