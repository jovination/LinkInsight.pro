
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LinkIcon, FileUp, Search, ArrowRight } from 'lucide-react';

export const LinkCheckForm = () => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [url, setUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  
  const handleSingleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsChecking(true);
    
    // Mock checking process
    toast({
      title: "Checking link...",
      description: "We're scanning the link for issues.",
    });
    
    setTimeout(() => {
      setIsChecking(false);
      toast({
        title: "Check complete!",
        description: "Link check completed successfully.",
      });
    }, 2000);
  };
  
  const handleBulkUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkUrls) return;
    
    setIsChecking(true);
    
    // Count number of URLs
    const urlsArray = bulkUrls.split('\n').filter(line => line.trim() !== '');
    
    toast({
      title: `Checking ${urlsArray.length} links...`,
      description: "We're scanning multiple links for issues.",
    });
    
    setTimeout(() => {
      setIsChecking(false);
      toast({
        title: "Bulk check complete!",
        description: `${urlsArray.length} links have been checked.`,
      });
    }, 3000);
  };

  return (
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle>Check Your Links</CardTitle>
        <CardDescription>
          Enter a URL to check for broken links, redirects, and SEO issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="single" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              <span>Single URL</span>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              <span>Bulk Check</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="single">
            <form onSubmit={handleSingleUrlCheck}>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="pl-10"
                  required
                />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Enter a complete URL including https:// or http://
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="bulk">
            <form onSubmit={handleBulkUrlCheck}>
              <Textarea
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                className="min-h-[120px]"
              />
              <div className="mt-4 text-sm text-muted-foreground">
                Enter one URL per line (max 100 URLs for free plan)
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Pro tip:</span> Use our browser extension for quick checks
        </div>
        <Button 
          onClick={url ? handleSingleUrlCheck : handleBulkUrlCheck} 
          disabled={isChecking || (!url && !bulkUrls)}
          className="bg-primary hover:bg-primary-600"
        >
          {isChecking ? "Checking..." : "Check Now"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
