
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import { 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ScanLine, 
  Loader2, 
  AlertTriangle, 
  LinkIcon 
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export const LinkCheckForm = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // Mutation for creating a new link
  const createLinkMutation = useMutation({
    mutationFn: apiService.createLink,
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
  
  const handleSingleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsChecking(true);
    toast.loading("Analyzing link...");
    
    createLinkMutation.mutate(url);
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
    
    // For now, just handle the first URL for demonstration
    if (urlsArray.length > 0) {
      createLinkMutation.mutate(urlsArray[0]);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      toast.success("Result copied to clipboard");
    }
  };

  const handleCheckAnother = () => {
    setShowResult(false);
    setUrl('');
    setBulkUrls('');
    setResult(null);
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
                <div className="text-sm font-medium">Link Analysis Report</div>
              </div>
              <div className="flex items-center gap-2">
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
              </div>
            </div>
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
                    ${result?.status === 'healthy' ? 'bg-green-100 text-green-700' : 
                      result?.status === 'broken' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'}
                  `}>
                    {result?.status === 'healthy' && <CheckCircle2 className="h-4 w-4" />}
                    {result?.status === 'broken' && <AlertTriangle className="h-4 w-4" />}
                    {result?.status === 'redirected' && <LinkIcon className="h-4 w-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{result?.url || url || 'https://example.com'}</div>
                    <div className="text-xs text-muted-foreground">
                      {result?.status === 'healthy' ? '200 OK • ' : 
                       result?.status === 'broken' ? '404 Not Found • ' :
                       '301 Redirect • '}
                      {result?.responseTime} response time
                    </div>
                  </div>
                </div>
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
      )}
    </div>
  );
};
