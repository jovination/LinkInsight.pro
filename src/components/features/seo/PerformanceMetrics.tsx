
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Clock, Zap } from 'lucide-react';

interface PerformanceData {
  loadTime: string;
  ttfb: string;
  fcp: string;
  lcp: string;
}

interface PerformanceMetricsProps {
  url: string;
  data: PerformanceData;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ url, data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Page Load Time</span>
            </div>
            <span className="font-medium">{data.loadTime}</span>
          </div>
          <Progress value={70} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span>Time to First Byte</span>
            </div>
            <span className="font-medium">{data.ttfb}</span>
          </div>
          <Progress value={85} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span>First Contentful Paint</span>
            </div>
            <span className="font-medium">{data.fcp}</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

