
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import { ArrowRight, Copy, ExternalLink } from 'lucide-react';

export const LinkCheckForm = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  const handleSingleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsChecking(true);
    
    // Mock checking process
    toast.loading("Checking link...");
    
    setTimeout(() => {
      setIsChecking(false);
      setShowResult(true);
      toast.success("Check complete!");
    }, 2000);
  };
  
  const handleBulkUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUrls) return;
    
    setIsChecking(true);
    
    // Count number of URLs
    const urlsArray = bulkUrls.split('\n').filter(line => line.trim() !== '');
    
    toast.loading(`Checking ${urlsArray.length} links...`);
    
    setTimeout(() => {
      setIsChecking(false);
      toast.success(`${urlsArray.length} links have been checked.`);
    }, 3000);
  };

  return (
    <div className="w-full">
      {!showResult ? (
        <Card className="shadow-sm border border-border/60 bg-background rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="px-3 pt-3">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-3">
                  <TabsTrigger value="single">Single URL</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Check</TabsTrigger>
                </TabsList>
                
                <TabsContent value="single">
                  <form onSubmit={handleSingleUrlCheck} className="space-y-3">
                    <div className="relative flex items-center">
                      <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Shorten any link..."
                        className="pr-12 border-border/60"
                      />
                      <Button 
                        type="submit"
                        size="icon"
                        disabled={isChecking || !url}
                        className="absolute right-1 bg-primary hover:bg-primary-600 w-8 h-8 flex items-center justify-center rounded-md"
                      >
                        <ArrowRight className="h-4 w-4" />
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
                      className="min-h-[120px] border-border/60 resize-none"
                    />
                    <div className="flex justify-between items-center pb-3">
                      <div className="text-xs text-muted-foreground">
                        Enter one URL per line (max 100 URLs for free plan)
                      </div>
                      <Button 
                        type="submit"
                        size="sm"
                        disabled={isChecking || !bulkUrls}
                        className="bg-primary hover:bg-primary-600"
                      >
                        Check Now
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
            
            {url && (
              <div className="mt-3 flex items-center justify-between px-4 py-3 border-t border-border/60 bg-muted/40">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">Try it out</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm border border-border/60 bg-background rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">LC</span>
                </div>
                <div className="text-sm font-medium">link.checker/report</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Status Check</div>
                <div className="text-xs text-primary font-medium">62.6K clicks</div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-md border border-border/60">
                  <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    200
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">{url || 'https://example.com'}</div>
                    <div className="text-xs text-muted-foreground">5ms response • Valid</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-border/60 bg-muted/40">
              <Button 
                onClick={() => {
                  setShowResult(false);
                  setUrl('');
                }}
                size="sm"
                variant="outline"
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
