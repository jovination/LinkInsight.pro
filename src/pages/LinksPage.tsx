import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { ExternalLink, CheckCircle2, AlertTriangle, Link2, PlusCircle, Search, Trash2, MoreHorizontal, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { typeSafeArray } from '@/utils/typeSafety';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LinksPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [addLinkOpen, setAddLinkOpen] = useState(false);

  const { 
    data: links = [], 
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['links'],
    queryFn: apiService.getLinks,
    placeholderData: [
      { id: '1', url: 'https://example.com/homepage', status: 'healthy', responseTime: '0.8s', lastChecked: '2 hours ago' },
      { id: '2', url: 'https://example.com/about', status: 'healthy', responseTime: '1.2s', lastChecked: '2 hours ago' },
      { id: '3', url: 'https://example.com/products', status: 'broken', responseTime: '-', lastChecked: '2 hours ago' },
      { id: '4', url: 'https://example.com/blog', status: 'healthy', responseTime: '1.5s', lastChecked: '2 hours ago' },
      { id: '5', url: 'https://example.com/contact', status: 'healthy', responseTime: '0.9s', lastChecked: '2 hours ago' },
      { id: '6', url: 'https://example.com/services', status: 'healthy', responseTime: '1.1s', lastChecked: '3 hours ago' },
      { id: '7', url: 'https://example.com/resources', status: 'redirected', responseTime: '1.7s', lastChecked: '3 hours ago' },
      { id: '8', url: 'https://example.com/support', status: 'healthy', responseTime: '0.7s', lastChecked: '3 hours ago' },
    ]
  });

  const deleteMutation = useMutation({
    mutationFn: apiService.deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete link');
    }
  });

  const checkLinkMutation = useMutation({
    mutationFn: apiService.checkLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link checked successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to check link');
    }
  });

  const handleAddLink = () => {
    toast.info('Add link feature will be implemented soon');
  };

  const handleDeleteLink = (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCheckLink = (id: string) => {
    checkLinkMutation.mutate(id);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchTerm}`);
  };

  const filteredLinks = links.filter(link => 
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Links Management" 
        description="Manage and monitor your website links"
      >
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[200px] mr-2 hidden md:flex"
          />
          <Button onClick={() => setAddLinkOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
      </DashboardHeader>
      
      <div className="flex flex-col h-screen overflow-auto">
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <form onSubmit={handleSearch} className="flex max-w-sm items-center space-x-2">
              <Input 
                type="search" 
                placeholder="Search links..." 
                className="rounded-xl" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="rounded-xl">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Card className="rounded-2xl border-primary/10">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base">All Links</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    Loading links...
                  </div>
                ) : isError ? (
                  <div className="px-4 py-8 text-center text-sm text-destructive">
                    Error loading links: {(error as Error).message}
                  </div>
                ) : (
                  <div className="divide-y">
                    <div className="grid grid-cols-[1fr_100px_100px_120px_100px] gap-2 px-4 py-3 text-sm font-medium text-muted-foreground">
                      <div>URL</div>
                      <div>Status</div>
                      <div>Response</div>
                      <div>Last Check</div>
                      <div>Actions</div>
                    </div>
                    
                    {filteredLinks.map((link) => (
                      <div key={link.id} className="grid grid-cols-[1fr_100px_100px_120px_100px] gap-2 px-4 py-3 text-sm items-center">
                        <div className="font-medium truncate">{link.url}</div>
                        <div>
                          {link.status === 'healthy' && (
                            <span className="inline-flex items-center text-emerald-500">
                              <CheckCircle2 className="mr-1 h-4 w-4" /> OK
                            </span>
                          )}
                          {link.status === 'broken' && (
                            <span className="inline-flex items-center text-destructive">
                              <AlertTriangle className="mr-1 h-4 w-4" /> Error
                            </span>
                          )}
                          {link.status === 'redirected' && (
                            <span className="inline-flex items-center text-amber-500">
                              <Link2 className="mr-1 h-4 w-4" /> Redirect
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          {link.status !== 'broken' ? (
                            <>
                              <Clock className="mr-1 h-4 w-4 text-primary" />
                              {link.responseTime}
                            </>
                          ) : (
                            '-'
                          )}
                        </div>
                        <div className="text-muted-foreground">{link.lastChecked}</div>
                        <div className="flex space-x-2">
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive/90"
                            onClick={() => handleDeleteLink(link.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {filteredLinks.length === 0 && (
                      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No links found. Add some links to get started.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default LinksPage;
