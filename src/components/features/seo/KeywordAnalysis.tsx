
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KeywordData {
  keywords: {
    term: string;
    count: number;
    density: number;
  }[];
}

interface KeywordAnalysisProps {
  data: KeywordData;
}

export const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Keyword Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.keywords.map((keyword, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{keyword.count}</Badge>
                <span className="font-medium">{keyword.term}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {keyword.density.toFixed(2)}% density
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

