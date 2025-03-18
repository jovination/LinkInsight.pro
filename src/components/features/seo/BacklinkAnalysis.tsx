
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Calendar } from 'lucide-react';

interface Backlink {
  source: string;
  anchor: string;
  date: string;
}

interface BacklinkAnalysisProps {
  data: Backlink[];
}

export const BacklinkAnalysis: React.FC<BacklinkAnalysisProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Backlink Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((backlink, index) => (
            <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0">
              <Link className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <a 
                  href={backlink.source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                >
                  {backlink.source}
                </a>
                <div className="text-sm text-muted-foreground">
                  Anchor text: {backlink.anchor}
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(backlink.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

