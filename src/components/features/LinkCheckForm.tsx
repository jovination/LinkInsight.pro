
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ScanLine, 
  Loader2, 
  AlertTriangle, 
  LinkIcon,
  FileText
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiService, LinkAnalysisResult } from '@/services/api';

export const LinkCheckForm = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [bulkResults, setBulkResults] = useState<LinkAnalysisResult[]>([]);
  const [progress, setProgress] = useState(0);
  
  // Mutation for analyzing a link
  const analyzeUrlMutation = useMutation({
    mutationFn: apiService.analyzeLink,
    onSuccess: (data) => {
      setIsChecking(false);
      setResult(data);
      setShowResult(true);
      toast.success("Link analysis complete!");
    },
    onError: (error: Error) => {
      setIsChecking(false);
      toast.error(`Analysis failed: ${error.message}`);
    }
  });

  // Mutation for bulk analyzing links
  const bulkAnalyzeMutation = useMutation({
    mutationFn: apiService.bulkAnalyzeLinks,
    onSuccess: (data) => {
      setIsChecking(false);
      setBulkResults(data);
      setShowResult(true);
      toast.success(`Analyzed ${data.length} links successfully!`);
    },
    onError: (error: Error) => {
      setIsChecking(false);
      toast.error(`Bulk analysis failed: ${error.message}`);
    }
  });
  
  const handleSingleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsChecking(true);
    toast.loading("Analyzing link...");
    
    analyzeUrlMutation.mutate(url);
  };
  
  const handleBulkUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUrls) return;
    
    // Count number of URLs
    const urlsArray = bulkUrls.split('\n').filter(line => line.trim() !== '');
    
    if (urlsArray.length > 100) {
      toast.error("Free plan supports maximum 100 URLs. Please upgrade your plan.");
      return;
    }
    
    setIsChecking(true);
    toast.loading(`Analyzing ${urlsArray.length} links...`);
    
    // Set up a progressive counter for visual feedback
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress > 95) {
        clearInterval(interval);
      } else {
        setProgress(progress);
      }
    }, 200);
    
    bulkAnalyzeMutation.mutate(urlsArray, {
      onSettled: () => {
        clearInterval(interval);
        setProgress(100);
      }
    });
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Result copied to clipboard");
    }
  };

  const handleExportBulkResults = () => {
    if (bulkResults.length > 0) {
      const jsonStr = JSON.stringify(bulkResults, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
      const exportFileDefaultName = 'bulk-analysis-results.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success("Exported results to JSON file");
    }
  };

  const handleCheckAnother = () => {
    setShowResult(false);
    setUrl('');
    setBulkUrls('');
    setResult(null);
    setBulkResults([]);
  };

  const getStatusClass = (status: "healthy" | "broken" | "redirected") => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'broken':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'redirected':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
    }
  };

  return (
    <div className="w-full">
      {!showResult ? (
        <Card className="shadow-sm border border-primary/10 bg-background rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="px-3 pt-3">
              <Tabs defaultValue="single" className="w-full">
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
                        disabled={isChecking}
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
                      placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                      className="min-h-[120px] border-primary/10 resize-none rounded-xl"
                      disabled={isChecking}
                    />
                    {isChecking && (
                      <div className="pt-1">
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
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
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Check Now
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
            
            {url && (
              <div className="mt-3 flex items-center justify-between px-4 py-3 border-t border-primary/10 bg-primary/5">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">Check your website for broken links</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm border border-primary/10 bg-background rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ScanLine className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium">
                  {bulkResults.length > 0 
                    ? `Bulk Analysis Results (${bulkResults.length} URLs)` 
                    : "Link Analysis Report"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {bulkResults.length > 0 ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 rounded-lg border-primary/10 flex items-center gap-1"
                    onClick={handleExportBulkResults}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg border-primary/10"
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {result && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg border-primary/10"
                        asChild
                      >
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {bulkResults.length > 0 ? (
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">Status Summary</div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                      {bulkResults.filter(r => r.status === 'healthy').length} Healthy
                    </Badge>
                    <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800">
                      {bulkResults.filter(r => r.status === 'broken').length} Broken
                    </Badge>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                      {bulkResults.filter(r => r.status === 'redirected').length} Redirected
                    </Badge>
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {bulkResults.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${getStatusClass(item.status)}`}>
                            {item.status === 'healthy' && <CheckCircle2 className="h-3.5 w-3.5" />}
                            {item.status === 'broken' && <AlertTriangle className="h-3.5 w-3.5" />}
                            {item.status === 'redirected' && <LinkIcon className="h-3.5 w-3.5" />}
                          </div>
                          <div className="truncate">
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm font-medium hover:underline truncate"
                            >
                              {item.url}
                            </a>
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-foreground">
                          {item.responseTime ? item.responseTime : 'No response'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Status Check</div>
                  <div className="text-xs text-primary font-medium">
                    {result?.status === 'healthy' ? '1 of 1 links valid' : 
                     result?.status === 'broken' ? '0 of 1 links valid' :
                     '1 of 1 links redirected'}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 hover:border-primary/20 transition-all">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center
                      ${result?.status === 'healthy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                        result?.status === 'broken' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'}
                    `}>
                      {result?.status === 'healthy' && <CheckCircle2 className="h-4 w-4" />}
                      {result?.status === 'broken' && <AlertTriangle className="h-4 w-4" />}
                      {result?.status === 'redirected' && <LinkIcon className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{result?.url || url || 'https://example.com'}</div>
                      <div className="text-xs text-muted-foreground">
                        {result?.statusCode} 
                        {result?.status === 'healthy' ? ' OK • ' : 
                         result?.status === 'broken' ? ' Not Found • ' :
                         ' Redirect • '}
                        {result?.responseTime} response time
                      </div>
                    </div>
                  </div>
                  
                  {result?.brokenLinks && result.brokenLinks.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-2">Broken Links Found:</h4>
                      <div className="space-y-2 ml-2">
                        {result.brokenLinks.map((link: string, i: number) => (
                          <div key={i} className="text-xs flex items-center gap-1 text-red-600 dark:text-red-400">
                            <AlertTriangle className="h-3 w-3" />
                            {link}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
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
      )}
    </div>
  );
};
