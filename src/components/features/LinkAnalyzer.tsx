
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  LinkIcon, 
  Loader2, 
  AlertTriangle, 
  Search,
  Globe,
  Info,
  Clock,
  FileDown,
  Trash
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiService, LinkAnalysisResult } from '@/services/api';
import { Textarea } from '@/components/ui/textarea';

interface LinkAnalyzerProps {
  onAnalysisComplete?: () => void;
}

export const LinkAnalyzer = ({ onAnalysisComplete }: LinkAnalyzerProps) => {
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [result, setResult] = useState<LinkAnalysisResult | null>(null);
  const [bulkResults, setBulkResults] = useState<LinkAnalysisResult[]>([]);
  const [analyzeMode, setAnalyzeMode] = useState<'single' | 'bulk'>('single');
  
  // Mutation for analyzing a single link
  const analyzeMutation = useMutation({
    mutationFn: apiService.analyzeLink,
    onSuccess: (data) => {
      setResult(data);
      toast.success("Link analysis complete!");
      if (onAnalysisComplete) {
        onAnalysisComplete();
      }
    },
    onError: (error: Error) => {
      toast.error(`Analysis failed: ${error.message}`);
    }
  });
  
  // Mutation for bulk analyzing links
  const bulkAnalyzeMutation = useMutation({
    mutationFn: apiService.bulkAnalyzeLinks,
    onSuccess: (data) => {
      setBulkResults(data);
      toast.success(`Analyzed ${data.length} links successfully!`);
      if (onAnalysisComplete) {
        onAnalysisComplete();
      }
    },
    onError: (error: Error) => {
      toast.error(`Bulk analysis failed: ${error.message}`);
    }
  });
  
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (analyzeMode === 'single') {
      if (!url) return;
      toast.loading("Analyzing link...");
      analyzeMutation.mutate(url);
    } else {
      if (!bulkUrls) return;
      const urls = bulkUrls.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
        
      if (urls.length === 0) {
        toast.error("Please enter at least one valid URL");
        return;
      }
      
      toast.loading(`Analyzing ${urls.length} links...`);
      bulkAnalyzeMutation.mutate(urls);
    }
  };

  const handleCopy = () => {
    let contentToCopy;
    
    if (analyzeMode === 'single' && result) {
      contentToCopy = JSON.stringify(result, null, 2);
    } else if (analyzeMode === 'bulk' && bulkResults.length > 0) {
      contentToCopy = JSON.stringify(bulkResults, null, 2);
    } else {
      return;
    }
    
    navigator.clipboard.writeText(contentToCopy);
    toast.success("Result copied to clipboard");
  };

  const handleDownload = () => {
    let contentToDownload;
    let filename;
    
    if (analyzeMode === 'single' && result) {
      contentToDownload = JSON.stringify(result, null, 2);
      filename = `link-analysis-${new Date().getTime()}.json`;
    } else if (analyzeMode === 'bulk' && bulkResults.length > 0) {
      contentToDownload = JSON.stringify(bulkResults, null, 2);
      filename = `bulk-link-analysis-${new Date().getTime()}.json`;
    } else {
      return;
    }
    
    const blob = new Blob([contentToDownload], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    
    toast.success(`Downloaded results as ${filename}`);
  };

  const handleCheckAnother = () => {
    if (analyzeMode === 'single') {
      setUrl('');
      setResult(null);
    } else {
      setBulkUrls('');
      setBulkResults([]);
    }
  };

  const getStatusBadge = (status: "healthy" | "broken" | "redirected") => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500">Healthy</Badge>;
      case 'broken':
        return <Badge className="bg-red-500">Broken</Badge>;
      case 'redirected':
        return <Badge className="bg-amber-500">Redirected</Badge>;
    }
  };

  const renderSingleAnalysisForm = () => (
    <form onSubmit={handleAnalyze} className="space-y-4">
      <div className="relative">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze..."
          className="pr-12 border-primary/10 rounded-xl"
          disabled={analyzeMutation.isPending}
        />
        <Button 
          type="submit"
          size="icon"
          disabled={analyzeMutation.isPending || !url}
          className="absolute right-1 top-1 bg-primary hover:bg-primary/90 w-8 h-8 flex items-center justify-center rounded-lg"
        >
          {analyzeMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Enter a complete URL including https:// or http://
      </div>
    </form>
  );

  const renderBulkAnalysisForm = () => (
    <form onSubmit={handleAnalyze} className="space-y-4">
      <Textarea
        value={bulkUrls}
        onChange={(e) => setBulkUrls(e.target.value)}
        placeholder="Enter URLs to analyze (one per line)..."
        className="min-h-[120px] border-primary/10 rounded-xl"
        disabled={bulkAnalyzeMutation.isPending}
      />
      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Enter complete URLs (one per line) including https:// or http://
        </div>
        <Button 
          type="submit"
          size="sm"
          disabled={bulkAnalyzeMutation.isPending || !bulkUrls}
          className="bg-primary hover:bg-primary/90 rounded-lg flex items-center gap-2"
        >
          {bulkAnalyzeMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Analyze URLs
        </Button>
      </div>
    </form>
  );

  const renderSingleAnalysisResult = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">{result.url}</h3>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(result.status)}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-lg border-primary/10"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-3 rounded-xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="font-medium">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  {result.status === 'healthy' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {result.status === 'broken' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {result.status === 'redirected' && <LinkIcon className="h-5 w-5 text-amber-500" />}
                  <span>
                    {result.statusCode} 
                    {result.status === 'healthy' ? ' OK' : 
                     result.status === 'broken' ? ' Not Found' : 
                     ' Redirect'}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Performance</span>
                </div>
                <div>
                  {result.responseTime ? `Response time: ${result.responseTime}` : 'No response'}
                </div>
              </div>
            </div>
            
            <Alert className={`
              ${result.status === 'healthy' ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 
                result.status === 'broken' ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' : 
                'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800'}
            `}>
              <AlertDescription>
                {result.status === 'healthy' ? 
                  'This link is working correctly.' : 
                  result.status === 'broken' ? 
                  'This link is broken and returns an error.' : 
                  'This link redirects to another URL.'}
              </AlertDescription>
            </Alert>
            
            {result.title && (
              <div>
                <h4 className="text-sm font-medium mb-1">Page Title</h4>
                <p className="text-sm text-muted-foreground">{result.title}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="metadata" className="space-y-4">
            {result.metadata ? (
              <>
                {result.metadata.description && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">{result.metadata.description}</p>
                  </div>
                )}
                
                {result.metadata.keywords && result.metadata.keywords.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.metadata.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No metadata available for this URL.</p>
            )}
          </TabsContent>
          
          <TabsContent value="links" className="space-y-4">
            {(result.brokenLinks?.length || result.redirectLinks?.length) ? (
              <>
                {result.brokenLinks && result.brokenLinks.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Broken Links Found ({result.brokenLinks.length})</h4>
                    <div className="space-y-2">
                      {result.brokenLinks.map((link, index) => (
                        <div key={index} className="p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm truncate">{link}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {result.redirectLinks && result.redirectLinks.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Redirected Links Found ({result.redirectLinks.length})</h4>
                    <div className="space-y-2">
                      {result.redirectLinks.map((link, index) => (
                        <div key={index} className="p-2 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-amber-500" />
                          <span className="text-sm truncate">{link}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No link issues detected on this page.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderBulkAnalysisResults = () => {
    if (!bulkResults.length) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Analysis Results ({bulkResults.length} URLs)</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-lg border-primary/10"
              onClick={handleCopy}
              title="Copy results to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-lg border-primary/10"
              onClick={handleDownload}
              title="Download results as JSON"
            >
              <FileDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {bulkResults.map((result, index) => (
            <Card key={index} className="border-primary/10 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b border-primary/10 p-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium truncate max-w-[300px]">{result.url}</span>
                </div>
                {getStatusBadge(result.status)}
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Status:</span>{' '}
                    <span className="font-medium">
                      {result.statusCode} 
                      {result.status === 'healthy' ? ' OK' : 
                       result.status === 'broken' ? ' Not Found' : 
                       ' Redirect'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Response time:</span>{' '}
                    <span className="font-medium">{result.responseTime || 'N/A'}</span>
                  </div>
                </div>
                {result.title && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Title:</span>{' '}
                    <span>{result.title}</span>
                  </div>
                )}
                {(result.brokenLinks?.length || 0) > 0 && (
                  <div className="text-sm text-red-500">
                    {result.brokenLinks?.length} broken links found
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <Card className="p-4 border-primary/10 rounded-xl shadow-sm">
            <CardTitle className="text-xl font-bold text-green-500">
              {bulkResults.filter(r => r.status === 'healthy').length}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Healthy</p>
          </Card>
          <Card className="p-4 border-primary/10 rounded-xl shadow-sm">
            <CardTitle className="text-xl font-bold text-red-500">
              {bulkResults.filter(r => r.status === 'broken').length}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Broken</p>
          </Card>
          <Card className="p-4 border-primary/10 rounded-xl shadow-sm">
            <CardTitle className="text-xl font-bold text-amber-500">
              {bulkResults.filter(r => r.status === 'redirected').length}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Redirected</p>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <Card className="shadow-sm border border-primary/10 bg-background rounded-2xl overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Advanced Link Analyzer</CardTitle>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-l-lg ${analyzeMode === 'single' ? 'bg-primary/10' : ''}`} 
                onClick={() => {
                  setAnalyzeMode('single');
                  setBulkResults([]);
                }}
              >
                Single URL
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-r-lg ${analyzeMode === 'bulk' ? 'bg-primary/10' : ''}`}
                onClick={() => {
                  setAnalyzeMode('bulk');
                  setResult(null);
                }}
              >
                Bulk Check
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {analyzeMode === 'single' && !result && renderSingleAnalysisForm()}
          {analyzeMode === 'bulk' && !bulkResults.length && renderBulkAnalysisForm()}
          {analyzeMode === 'single' && renderSingleAnalysisResult()}
          {analyzeMode === 'bulk' && renderBulkAnalysisResults()}
        </CardContent>
        
        {((analyzeMode === 'single' && result) || (analyzeMode === 'bulk' && bulkResults.length > 0)) && (
          <CardFooter className="border-t border-primary/10 bg-primary/5 px-6 py-4">
            <Button 
              onClick={handleCheckAnother}
              variant="outline"
              className="ml-auto rounded-xl border-primary/10"
            >
              Analyze Another {analyzeMode === 'single' ? 'URL' : 'Batch'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
