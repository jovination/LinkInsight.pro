import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Loader2, 
  Copy, 
  ExternalLink, 
  ScanLine,
  XCircle 
} from 'lucide-react';

// Types for the API responses
interface LinkAnalysisResult {
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  statusCode?: number;
  responseTime?: string;
  brokenLinks?: string[];
}

interface BulkAnalysisResult {
  totalChecked: number;
  healthy: number;
  broken: number;
  redirected: number;
  results: LinkAnalysisResult[];
}

// Mock API service
const apiService = {
  analyzeLink: async (url: string): Promise<LinkAnalysisResult> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Random result for demo purposes
    const statuses = ['healthy', 'broken', 'redirected'] as const;
    const randomStatus = statuses[Math.floor(Math.random() * 3)];
    
    return {
      url,
      status: randomStatus,
      statusCode: randomStatus === 'healthy' ? 200 : randomStatus === 'redirected' ? 301 : 404,
      responseTime: `${Math.floor(Math.random() * 500)}ms`,
      brokenLinks: randomStatus === 'broken' ? ['https://example.com/broken1', 'https://example.com/broken2'] : []
    };
  },
  
  analyzeBulkLinks: async (urls: string[]): Promise<BulkAnalysisResult> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results: LinkAnalysisResult[] = [];
    let healthy = 0;
    let broken = 0;
    let redirected = 0;
    
    // Generate random results for demo
    for (const url of urls) {
      const statuses = ['healthy', 'broken', 'redirected'] as const;
      const randomStatus = statuses[Math.floor(Math.random() * 3)];
      
      if (randomStatus === 'healthy') healthy++;
      if (randomStatus === 'broken') broken++;
      if (randomStatus === 'redirected') redirected++;
      
      results.push({
        url,
        status: randomStatus,
        statusCode: randomStatus === 'healthy' ? 200 : randomStatus === 'redirected' ? 301 : 404,
        responseTime: `${Math.floor(Math.random() * 500)}ms`,
        brokenLinks: randomStatus === 'broken' ? ['https://example.com/broken1'] : []
      });
    }
    
    return {
      totalChecked: urls.length,
      healthy,
      broken,
      redirected,
      results
    };
  }
};

export const LinkCheckForm = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [showSingleResult, setShowSingleResult] = useState(false);
  const [showBulkResult, setShowBulkResult] = useState(false);
  const [singleResult, setSingleResult] = useState<LinkAnalysisResult | null>(null);
  const [bulkResult, setBulkResult] = useState<BulkAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>('single');
  
  const handleSingleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsChecking(true);
    
    // Mock checking process
    toast.loading("Analyzing link...");
    
    apiService.analyzeLink(url).then((result) => {
      setSingleResult(result);
      setShowSingleResult(true);
      toast.success("Analysis complete!");
    }).finally(() => {
      setIsChecking(false);
    });
  };
  
  const handleBulkUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUrls) return;
    
    setIsChecking(true);
    
    // Count number of URLs
    const urlsArray = bulkUrls.split('\n').filter(line => line.trim() !== '');
    
    toast.loading(`Analyzing ${urlsArray.length} links...`);
    
    apiService.analyzeBulkLinks(urlsArray).then((result) => {
      setBulkResult(result);
      setShowBulkResult(true);
      toast.success(`${urlsArray.length} links have been analyzed.`);
    }).finally(() => {
      setIsChecking(false);
    });
  };
  
  const handleCheckAnother = () => {
    setShowSingleResult(false);
    setShowBulkResult(false);
    setUrl('');
    setBulkUrls('');
  };
  
  const getStatusIcon = (status: 'healthy' | 'broken' | 'redirected') => {
    switch (status) {
      case 'healthy':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        );
      case 'broken':
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
            <XCircle className="h-4 w-4" />
          </div>
        );
      case 'redirected':
        return (
          <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4" />
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {!showSingleResult && !showBulkResult ? (
        <Card className="shadow-sm border border-primary/10 bg-background rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="px-3 pt-3">
              <Tabs 
                defaultValue="single" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-3 rounded-xl">
                  <TabsTrigger value="single">Single URL</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Check</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single">
                  <form onSubmit={handleSingleUrlCheck} className="space-y-3">
                    <div className="relative flex items-center">
                      <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL to check..."
                        className="pr-12 border-primary/10 rounded-xl"
                      />
                      <Button 
                        type="submit"
                        size="icon"
                        disabled={isChecking || !url}
                        className="absolute right-1 bg-primary hover:bg-primary/90 w-8 h-8 flex items-center justify-center rounded-lg"
                      >
                        {isChecking ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground pb-3">
                      Enter a complete URL including https:// or http://
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="bulk">
                  <form onSubmit={handleBulkUrlCheck} className="space-y-3">
                  <Textarea
  value={bulkUrls}
  onChange={(e) => setBulkUrls(e.target.value)}
  placeholder={`https://example.com/page1
https://example.com/page2
https://example.com/page3`}
  className="min-h-[120px] border-primary/10 resize-none rounded-xl"
/>

                    <div className="flex justify-between items-center pb-3">
                      <div className="text-xs text-muted-foreground">
                        Enter one URL per line (max 100 URLs for free plan)
                      </div>
                      <Button 
                        type="submit"
                        size="sm"
                        disabled={isChecking || !bulkUrls}
                        className="bg-primary hover:bg-primary/90 rounded-xl"
                      >
                        {isChecking ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Checking...</span>
                          </div>
                        ) : (
                          <span>Check Now</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-3 flex items-center justify-between px-4 py-3 border-t border-primary/10 bg-primary/5">
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">
                  {activeTab === "single" ? 
                    "Check your website for broken links" : 
                    "Analyze multiple URLs in one batch"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : showSingleResult && singleResult ? (
        <Card className="shadow-sm border border-primary/10 bg-background rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ScanLine className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium">Link Analysis Report</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-primary/10">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-primary/10">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Status Check</div>
                <div className="text-xs text-primary font-medium">
                  {singleResult.status === 'healthy' ? '1 of 1 links valid' : 
                   singleResult.status === 'redirected' ? '1 of 1 links redirected' : 
                   '0 of 1 links valid'}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 hover:border-primary/20 transition-all">
                  {getStatusIcon(singleResult.status)}
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{singleResult.url}</div>
                    <div className="text-xs text-muted-foreground">
                      {singleResult.statusCode} {singleResult.status === 'healthy' ? 'OK' : 
                                               singleResult.status === 'redirected' ? 'Redirect' : 
                                               'Error'} • {singleResult.responseTime} response time
                    </div>
                  </div>
                </div>
                
                {singleResult.brokenLinks && singleResult.brokenLinks.length > 0 && (
                  <div className="p-3 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20">
                    <div className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                      Found {singleResult.brokenLinks.length} broken {singleResult.brokenLinks.length === 1 ? 'link' : 'links'} on this page:
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {singleResult.brokenLinks.map((link, index) => (
                        <li key={index} className="text-xs text-red-600 dark:text-red-300">
                          {link}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-primary/10 bg-primary/5">
              <Button 
                onClick={handleCheckAnother}
                size="sm"
                variant="outline"
                className="rounded-xl border-primary/10"
              >
                Check Another
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : showBulkResult && bulkResult ? (
        <Card className="shadow-sm border border-primary/10 bg-background rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ScanLine className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium">Bulk Link Analysis Report</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-primary/10">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-primary/10">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Status Check</div>
                <div className="text-xs text-primary font-medium">
                  {bulkResult.healthy} of {bulkResult.totalChecked} links valid
                </div>
              </div>
              
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="flex flex-col items-center p-2 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20">
                  <div className="text-md font-bold text-green-700">{bulkResult.healthy}</div>
                  <div className="text-xs text-green-600">Healthy</div>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20">
                  <div className="text-md font-bold text-red-700">{bulkResult.broken}</div>
                  <div className="text-xs text-red-600">Broken</div>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                  <div className="text-md font-bold text-amber-700">{bulkResult.redirected}</div>
                  <div className="text-xs text-amber-600">Redirected</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                {bulkResult.results.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 hover:border-primary/20 transition-all">
                    {getStatusIcon(result.status)}
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{result.url}</div>
                      <div className="text-xs text-muted-foreground">
                        {result.statusCode} {result.status === 'healthy' ? 'OK' : 
                                           result.status === 'redirected' ? 'Redirect' : 
                                           'Error'} • {result.responseTime} response time
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-primary/10 bg-primary/5">
              <Button 
                onClick={handleCheckAnother}
                size="sm"
                variant="outline"
                className="rounded-xl border-primary/10"
              >
                Check Another
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};