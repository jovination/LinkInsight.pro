import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import { 
  Clock, 
  Zap,
  Server,
  LineChart,
  BarChart,
} from 'lucide-react';
import { typeSafeString, typeSafeNumber, typeSafeArray } from '@/utils/typeSafety';

import { SeoScore } from './seo/SeoScore';
import { SeoIssues } from './seo/SeoIssues';
import { SeoRecommendations } from './seo/SeoRecommendations';
import { AnalyzerForm } from './seo/AnalyzerForm';
import { PerformanceMetrics } from './seo/PerformanceMetrics';
import { KeywordAnalysis } from './seo/KeywordAnalysis';
import { BacklinkAnalysis } from './seo/BacklinkAnalysis';

// Define interfaces for better type safety
interface SeoIssue {
  type: string;
  description: string;
  impact: string;
  location?: string;
}

interface Backlink {
  source: string;
  anchor: string;
  date: string;
}

export const SeoAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('seo');
  
  const seoMutation = useMutation({
    mutationFn: (url: string) => apiService.generateSeoReport(url),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate SEO report');
    }
  });

  const performanceMutation = useMutation({
    mutationFn: (url: string) => apiService.getPerformanceMetrics(url),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to get performance metrics');
    }
  });

  const keywordMutation = useMutation({
    mutationFn: (url: string) => apiService.getKeywordDensity(url),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to analyze keyword density');
    }
  });

  const backlinkssMutation = useMutation({
    mutationFn: (url: string) => apiService.getBacklinks(url),
    onError: (error: any) => {
      toast.error(error.message || 'Failed to fetch backlinks');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    
    try {
      new URL(url);
    } catch (error) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    if (activeTab === 'seo') {
      seoMutation.mutate(url);
    } else if (activeTab === 'performance') {
      performanceMutation.mutate(url);
    } else if (activeTab === 'keywords') {
      keywordMutation.mutate(url);
    } else if (activeTab === 'backlinks') {
      backlinkssMutation.mutate(url);
    }
  };

  return (
    <div className="space-y-6">
      <AnalyzerForm 
        url={url}
        setUrl={setUrl}
        onSubmit={handleSubmit}
        isLoading={seoMutation.isPending || performanceMutation.isPending || keywordMutation.isPending || backlinkssMutation.isPending}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="space-y-4">
          {seoMutation.isPending ? (
            <Card>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ) : seoMutation.isSuccess ? (
            <div className="space-y-4">
              <SeoScore score={seoMutation.data?.score} url={url} />
              <SeoIssues issues={seoMutation.data?.issues || []} />
              <SeoRecommendations recommendations={seoMutation.data?.recommendations || []} />
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {performanceMutation.isPending ? (
            <Card>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ) : performanceMutation.isSuccess ? (
            <PerformanceMetrics url={url} data={performanceMutation.data} />
          ) : null}
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          {keywordMutation.isPending ? (
            <Card>
              <CardContent>
                <Skeleton className="h-60 w-full" />
              </CardContent>
            </Card>
          ) : keywordMutation.isSuccess ? (
            <KeywordAnalysis data={keywordMutation.data} />
          ) : null}
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          {backlinkssMutation.isPending ? (
            <Card>
              <CardContent>
                <Skeleton className="h-60 w-full" />
              </CardContent>
            </Card>
          ) : backlinkssMutation.isSuccess ? (
            <BacklinkAnalysis data={backlinkssMutation.data} />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoAnalyzer;
