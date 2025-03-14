import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@tanstack/react-query';
import { apiService, SeoReport, PerformanceMetrics } from '@/services/api';
import { toast } from 'sonner';
import { 
  SearchIcon, 
  AlertTriangle, 
  Info, 
  AlertCircle, 
  Check, 
  Clock, 
  Zap,
  Server,
  Link2,
  LineChart,
  BarChart,
  FileText,
  Image
} from 'lucide-react';

const SeoAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('seo');
  
  const seoMutation = useMutation({
    mutationFn: apiService.generateSeoReport,
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate SEO report');
    }
  });

  const performanceMutation = useMutation({
    mutationFn: apiService.getPerformanceMetrics,
    onError: (error: any) => {
      toast.error(error.message || 'Failed to get performance metrics');
    }
  });

  const keywordMutation = useMutation({
    mutationFn: apiService.getKeywordDensity,
    onError: (error: any) => {
      toast.error(error.message || 'Failed to analyze keyword density');
    }
  });

  const backlinkssMutation = useMutation({
    mutationFn: apiService.getBacklinks,
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

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getIssueBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Warning</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">High Impact</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Medium Impact</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={seoMutation.isPending || performanceMutation.isPending || keywordMutation.isPending || backlinkssMutation.isPending}
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          Analyze
        </Button>
      </form>

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
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ) : seoMutation.isSuccess ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>SEO Score</span>
                    <span className={getScoreColor(seoMutation.data.score)}>{seoMutation.data.score}/100</span>
                  </CardTitle>
                  <CardDescription>
                    Analysis for {url}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={seoMutation.data.score} 
                    className={`h-2 mt-2 ${getProgressColor(seoMutation.data.score)}`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Issues Found</CardTitle>
                  <CardDescription>
                    {seoMutation.data.issues.length} issues detected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {seoMutation.data.issues.map((issue, index) => (
                      <Alert key={index} className="border-l-4 border-l-primary">
                        <div className="flex items-center gap-2">
                          {getIssueIcon(issue.type)}
                          <AlertTitle className="text-sm font-medium">
                            {issue.description}
                          </AlertTitle>
                        </div>
                        <AlertDescription className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 mt-1 w-full">
                            {getIssueBadge(issue.type)}
                            {getImpactBadge(issue.impact)}
                            {issue.location && (
                              <span className="text-xs bg-muted px-2 py-1 rounded-md">
                                Location: {issue.location}
                              </span>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {seoMutation.data.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {performanceMutation.isPending ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ) : performanceMutation.isSuccess ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Performance Score</span>
                    <span className={getScoreColor(performanceMutation.data.pageSpeed)}>
                      {performanceMutation.data.pageSpeed}/100
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Analysis for {url}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress 
                    value={performanceMutation.data.pageSpeed}
                    className={`h-2 mt-2 ${getProgressColor(performanceMutation.data.pageSpeed)}`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 border rounded-lg">
                      <Clock className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium">First Contentful Paint</p>
                        <p className="text-xl font-bold">{performanceMutation.data.firstContentfulPaint}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <Zap className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Largest Contentful Paint</p>
                        <p className="text-xl font-bold">{performanceMutation.data.largestContentfulPaint}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <Server className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Time to Interactive</p>
                        <p className="text-xl font-bold">{performanceMutation.data.timeToInteractive}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <LineChart className="h-6 w-6 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Cumulative Layout Shift</p>
                        <p className="text-xl font-bold">{performanceMutation.data.cumulativeLayoutShift}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {performanceMutation.data.history && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Performance History</CardTitle>
                    <CardDescription>
                      Last 30 days performance trend
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 mt-2">
                      <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-md">
                        <BarChart className="h-12 w-12 text-muted" />
                        <span className="ml-2 text-muted-foreground">Performance History Chart</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          {keywordMutation.isPending ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-60 w-full" />
              </CardContent>
            </Card>
          ) : keywordMutation.isSuccess ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Keyword Density Analysis</CardTitle>
                <CardDescription>
                  Most commonly used keywords on the page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(keywordMutation.data).map(([keyword, density], index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="font-medium">{keyword}</span>
                      <Badge variant="secondary">{density}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          {backlinkssMutation.isPending ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-60 w-full" />
              </CardContent>
            </Card>
          ) : backlinkssMutation.isSuccess ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Backlink Analysis</CardTitle>
                <CardDescription>
                  Found {backlinkssMutation.data.length} backlinks pointing to your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {backlinkssMutation.data.map((backlink, index) => (
                    <div key={index} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-primary" />
                        <a 
                          href={backlink.source} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:underline"
                        >
                          {backlink.source}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded text-xs">
                          {backlink.anchor}
                        </span>
                        <span className="text-xs">{backlink.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoAnalyzer;
