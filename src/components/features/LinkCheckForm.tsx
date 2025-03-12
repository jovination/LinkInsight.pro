
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Loader2, 
  LinkIcon 
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiService, LinkAnalysisResult } from '@/services/api';

interface LinkCheckFormProps {
  onAnalysisComplete?: () => void;
}

export const LinkCheckForm = ({ onAnalysisComplete }: LinkCheckFormProps) => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<LinkAnalysisResult | null>(null);
  
  // Mutation for analyzing a link
  const analyzeMutation = useMutation({
    mutationFn: apiService.analyzeLink,
    onSuccess: (data) => {
      setResult(data);
      toast.success("Link check complete!");
      if (onAnalysisComplete) {
        onAnalysisComplete();
      }
    },
    onError: (error: Error) => {
      toast.error(`Check failed: ${error.message}`);
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    toast.loading("Checking link...");
    analyzeMutation.mutate(url);
  };
  
  const handleCheckAnother = () => {
    setUrl('');
    setResult(null);
  };
  
  return (
    <div className="w-full">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to check..."
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
      ) : (
        <div className="space-y-4">
          <Card className="border-primary/10 rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate max-w-[300px]">{result.url}</div>
                  {result.status === 'healthy' && (
                    <Badge className="bg-green-500">Healthy</Badge>
                  )}
                  {result.status === 'broken' && (
                    <Badge className="bg-red-500">Broken</Badge>
                  )}
                  {result.status === 'redirected' && (
                    <Badge className="bg-amber-500">Redirected</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2">
                    {result.status === 'healthy' && (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                    {result.status === 'broken' && (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    )}
                    {result.status === 'redirected' && (
                      <LinkIcon className="h-6 w-6 text-amber-500" />
                    )}
                  </div>
                  <div className="text-sm text-center">
                    {result.status === 'healthy' && 'Link is working correctly'}
                    {result.status === 'broken' && 'Link is broken'}
                    {result.status === 'redirected' && 'Link redirects to another URL'}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm text-center">
                    Response Time: {result.responseTime || 'N/A'}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 text-xl font-bold">
                    {result.statusCode || '?'}
                  </div>
                  <div className="text-sm text-center">
                    Status Code
                  </div>
                </div>
              </div>
              
              {(result.brokenLinks?.length || 0) > 0 && (
                <div className="p-4 border-t border-primary/10 bg-red-50 dark:bg-red-950">
                  <div className="text-sm font-medium text-red-700 dark:text-red-300">
                    Warning: {result.brokenLinks?.length} broken links found on this page
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleCheckAnother}
              variant="outline"
              className="rounded-xl border-primary/10"
            >
              Check Another URL
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
