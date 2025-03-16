import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Link as LinkIcon, Check, ExternalLink, AlertTriangle, Globe, BarChart, Cpu } from 'lucide-react';
import { apiService, LinkAnalysisResult } from '@/services/api';
import { useMutation } from '@tanstack/react-query';

const LinkAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [activeTab, setActiveTab] = useState('single');
  const [result, setResult] = useState<LinkAnalysisResult | null>(null);
  const [bulkResults, setBulkResults] = useState<LinkAnalysisResult[]>([]);
  
  // Single link analysis mutation
  const singleAnalysisMutation = useMutation({
    mutationFn: apiService.analyzeLink,
    onSuccess: (data) => {
      setResult(data as LinkAnalysisResult);
      toast.success('Link analysis completed');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to analyze link');
    }
  });
  
  // Bulk link analysis mutation
  const bulkAnalysisMutation = useMutation({
    mutationFn: apiService.bulkAnalyzeLinks,
    onSuccess: (data) => {
      setBulkResults(data as LinkAnalysisResult[]);
      toast.success(`${(data as LinkAnalysisResult[]).length} links analyzed successfully`);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to analyze links');
    }
  });
  
  // Handle single link analysis
  const handleSingleAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }
    
    try {
      new URL(url);
    } catch (error) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    singleAnalysisMutation.mutate(url);
  };
  
  // Handle bulk link analysis
  const handleBulkAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    
    const urls = bulkUrls
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');
    
    if (urls.length === 0) {
      toast.error('Please enter at least one URL');
      return;
    }
    
    // Validate URLs
    const invalidUrls = urls.filter(url => {
      try {
        new URL(url);
        return false;
      } catch (error) {
        return true;
      }
    });
    
    if (invalidUrls.length > 0) {
      toast.error(`Found ${invalidUrls.length} invalid URLs. Please check your input.`);
      return;
    }
    
    bulkAnalysisMutation.mutate(urls);
  };
  
  // Get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Healthy</Badge>;
      case 'broken':
        return <Badge variant="destructive">Broken</Badge>;
      case 'redirected':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Redirected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="single">Single URL</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Analyze Single URL</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSingleAnalysis} className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    className="whitespace-nowrap"
                    disabled={singleAnalysisMutation.isPending}
                  >
                    {singleAnalysisMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>Analyze URL</>
                    )}
                  </Button>
                </div>
              </form>
              
              {result && !singleAnalysisMutation.isPending && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{result.title || result.url}</h3>
                    {getStatusBadge(result.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="text-sm text-muted-foreground mb-1">Status Code</div>
                      <div className="font-medium">{result.statusCode || 'N/A'}</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-sm text-muted-foreground mb-1">Response Time</div>
                      <div className="font-medium">{result.responseTime || 'N/A'}</div>
                    </div>
                  </div>
                  
                  {result.redirectUrl && (
                    <div className="border rounded-lg p-3">
                      <div className="text-sm text-muted-foreground mb-1">Redirects To</div>
                      <div className="font-medium truncate">{result.redirectUrl}</div>
                    </div>
                  )}
                  
                  {result.errors && result.errors.length > 0 && (
                    <div className="border border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-900 rounded-lg p-3">
                      <div className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Errors</div>
                      <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                        {result.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">SEO Analysis</h4>
                    
                    {result.seoScore !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>SEO Score</span>
                          <span className="font-medium">{result.seoScore}/100</span>
                        </div>
                        <Progress value={result.seoScore} className="h-2" />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      {result.metadata?.headingStructure && (
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground mb-1">Heading Structure</div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="font-medium">H1:</span> {result.metadata.headingStructure.h1Count}
                            </div>
                            <div>
                              <span className="font-medium">H2:</span> {result.metadata.headingStructure.h2Count}
                            </div>
                            <div>
                              <span className="font-medium">H3:</span> {result.metadata.headingStructure.h3Count}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {result.wordCount !== undefined && (
                        <div className="border rounded-lg p-3">
                          <div className="text-sm text-muted-foreground mb-1">Word Count</div>
                          <div className="font-medium">{result.wordCount}</div>
                        </div>
                      )}
                    </div>
                    
                    {result.linkCount && (
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-muted-foreground mb-1">Links</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Internal:</span> {result.linkCount.internal}
                          </div>
                          <div>
                            <span className="font-medium">External:</span> {result.linkCount.external}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {result.imageTags && (
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-muted-foreground mb-1">Images</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">With Alt:</span> {result.imageTags.withAlt}
                          </div>
                          <div>
                            <span className="font-medium">Without Alt:</span> {result.imageTags.withoutAlt}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {result.pageSpeed && (
                    <>
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Performance</h4>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Page Speed Score</span>
                            <span className="font-medium">{result.pageSpeed.score}/100</span>
                          </div>
                          <Progress value={result.pageSpeed.score} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {result.pageSpeed.firstContentfulPaint && (
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-muted-foreground mb-1">First Contentful Paint</div>
                              <div className="font-medium">{result.pageSpeed.firstContentfulPaint}</div>
                            </div>
                          )}
                          
                          {result.pageSpeed.largestContentfulPaint && (
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-muted-foreground mb-1">Largest Contentful Paint</div>
                              <div className="font-medium">{result.pageSpeed.largestContentfulPaint}</div>
                            </div>
                          )}
                          
                          {result.pageSpeed.timeToInteractive && (
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-muted-foreground mb-1">Time to Interactive</div>
                              <div className="font-medium">{result.pageSpeed.timeToInteractive}</div>
                            </div>
                          )}
                          
                          {result.pageSpeed.cumulativeLayoutShift && (
                            <div className="border rounded-lg p-3">
                              <div className="text-sm text-muted-foreground mb-1">Cumulative Layout Shift</div>
                              <div className="font-medium">{result.pageSpeed.cumulativeLayoutShift}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Bulk URL Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBulkAnalysis} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bulk-urls">Enter URLs (one per line)</Label>
                  <Textarea
                    id="bulk-urls"
                    rows={5}
                    placeholder="https://example.com&#10;https://example.com/about&#10;https://example.com/contact"
                    value={bulkUrls}
                    onChange={(e) => setBulkUrls(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={bulkAnalysisMutation.isPending}
                >
                  {bulkAnalysisMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing {bulkUrls.split('\n').filter(line => line.trim() !== '').length} URLs...
                    </>
                  ) : (
                    <>Analyze URLs</>
                  )}
                </Button>
              </form>
              
              {bulkResults.length > 0 && !bulkAnalysisMutation.isPending && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Results Summary</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-500">
                        {bulkResults.filter(item => item.status === 'healthy').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Healthy</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-500">
                        {bulkResults.filter(item => item.status === 'broken').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Broken</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-2xl font-bold text-yellow-500">
                        {bulkResults.filter(item => item.status === 'redirected').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Redirected</div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    {bulkResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {result.status === 'healthy' && <Check className="h-5 w-5 text-green-500" />}
                            {result.status === 'broken' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                            {result.status === 'redirected' && <ExternalLink className="h-5 w-5 text-yellow-500" />}
                          </div>
                          <div>
                            <div className="font-medium truncate max-w-xs">{result.url}</div>
                            <div className="text-xs text-muted-foreground">
                              {result.statusCode && `Status: ${result.statusCode}`}
                              {result.responseTime && ` • Response time: ${result.responseTime}`}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LinkAnalyzer;
