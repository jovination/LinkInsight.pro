
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { typeSafeArray } from '@/utils/typeSafety';

interface SeoRecommendationsProps {
  recommendations: string[];
}

export const SeoRecommendations: React.FC<SeoRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {typeSafeArray<string>(recommendations).map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
