
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseLink } from '@/services/supabase';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, ArrowUpDown, ExternalLink, Clock, Search, Plus, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LinkAnalyzer } from '@/components/features/LinkAnalyzer';

const LinksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [filteredLinks, setFilteredLinks] = useState<SupabaseLink[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SupabaseLink;
    direction: 'ascending' | 'descending';
  } | null>(null);

  // Fetch links with React Query
  const {
    data: links,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error(`Error fetching links: ${error.message}`);
        throw error;
      }
      
      return data as SupabaseLink[];
    },
  });

  // Filter and sort links whenever dependencies change
  useEffect(() => {
    if (!links) return;
    
    // First filter by search query
    let result = [...links];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(link => 
        link.url.toLowerCase().includes(query) || 
        link.status.toLowerCase().includes(query)
      );
    }
    
    // Then apply sorting if configured
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredLinks(result);
  }, [links, searchQuery, sortConfig]);

  // Handle sort request
  const requestSort = (key: keyof SupabaseLink) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Add new link handler
  const handleAddLink = async () => {
    if (!newLinkUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      // Simple URL validation
      new URL(newLinkUrl);

      // Simulate a link analysis (in real app, call an actual API endpoint)
      const { data, error } = await supabase
        .from('links')
        .insert([
          { 
            url: newLinkUrl,
            status: Math.random() > 0.2 ? 'healthy' : Math.random() > 0.5 ? 'broken' : 'redirected', 
            response_time: `${(Math.random() * 2 + 0.5).toFixed(1)}s`,
            last_checked: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      toast.success("Link added successfully");
      setNewLinkUrl("");
      setIsAddLinkOpen(false);
      refetch();
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Failed to add link. Please check the URL and try again.");
    }
  };

  // Delete link handler
  const handleDeleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Link deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Failed to delete link");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <DashboardHeader 
          title="Link Management" 
          description="Monitor, analyze and manage your website links"
        />
        
        <Tabs defaultValue="links" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <TabsList>
              <TabsTrigger value="links">My Links</TabsTrigger>
              <TabsTrigger value="analyzer">Link Analyzer</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search links..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Link</DialogTitle>
                    <DialogDescription>
                      Enter the URL of the link you want to monitor
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Input
                        placeholder="https://example.com"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddLinkOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddLink}>Add Link</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <TabsContent value="links" className="space-y-4">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle>Your Links</CardTitle>
                <CardDescription>
                  {filteredLinks.length} links found
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : isError ? (
                  <div className="flex justify-center items-center p-8 text-destructive">
                    Failed to load links. Please try again later.
                  </div>
                ) : filteredLinks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? "No links match your search" : "You haven't added any links yet"}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => setIsAddLinkOpen(true)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Your First Link
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead onClick={() => requestSort('url')} className="cursor-pointer">
                            URL
                            <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                          </TableHead>
                          <TableHead onClick={() => requestSort('status')} className="cursor-pointer">
                            Status
                            <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                          </TableHead>
                          <TableHead onClick={() => requestSort('response_time')} className="cursor-pointer">
                            Response Time
                            <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                          </TableHead>
                          <TableHead onClick={() => requestSort('last_checked')} className="cursor-pointer">
                            Last Checked
                            <ArrowUpDown className="ml-1 h-3 w-3 inline" />
                          </TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLinks.map((link) => (
                          <TableRow key={link.id}>
                            <TableCell className="max-w-[200px] truncate font-medium">
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center hover:underline"
                              >
                                {link.url}
                                <ExternalLink className="ml-1 h-3 w-3 inline" />
                              </a>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  link.status === 'healthy' 
                                    ? 'outline' 
                                    : link.status === 'broken' 
                                      ? 'destructive' 
                                      : 'outline'
                                }
                                className={link.status === 'redirected' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : ''}
                              >
                                {link.status === 'healthy' && (
                                  <Check className="mr-1 h-3 w-3" />
                                )}
                                {link.status === 'broken' && (
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                )}
                                {link.status === 'redirected' && (
                                  <ExternalLink className="mr-1 h-3 w-3" />
                                )}
                                {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>{link.response_time}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {new Date(link.last_checked).toLocaleString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => window.open(link.url, '_blank')}>
                                    Visit Link
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => refetch()}>
                                    Recheck Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteLink(link.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-6 py-4 flex items-center justify-between">
                <Button variant="outline" onClick={() => refetch()}>
                  Refresh
                </Button>
                <div className="text-sm text-muted-foreground">
                  {filteredLinks.length} of {links?.length || 0} links shown
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analyzer" className="space-y-4">
            <LinkAnalyzer />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LinksPage;
