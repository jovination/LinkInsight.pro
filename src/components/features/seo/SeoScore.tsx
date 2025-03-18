
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { typeSafeNumber } from '@/utils/typeSafety';

interface SeoScoreProps {
  score: number;
  url: string;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 70) return 'text-amber-500';
  return 'text-destructive';
};

const getProgressColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 70) return 'bg-amber-500';
  return 'bg-destructive';
};

export const SeoScore: React.FC<SeoScoreProps> = ({ score, url }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>SEO Score</span>
          <span className={getScoreColor(typeSafeNumber(score, 0))}>
            {typeSafeNumber(score, 0)}/100
          </span>
        </CardTitle>
        <CardDescription>
          Analysis for {url}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress 
          value={typeSafeNumber(score, 0)} 
          className={`h-2 mt-2 ${getProgressColor(typeSafeNumber(score, 0))}`}
        />
      </CardContent>
    </Card>
  );
};
