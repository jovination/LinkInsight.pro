
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Search, AlertCircle, Clock, ExternalLink, RefreshCcw, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

const LinksPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<Array<{
    id: string;
    url: string;
    status: 'healthy' | 'broken' | 'redirected';
    response_time: string;
    last_checked: string;
  }>>([
    {
      id: '1',
      url: 'https://example.com',
      status: 'healthy',
      response_time: '0.8s',
      last_checked: '2023-05-15T10:30:00Z',
    },
    {
      id: '2',
      url: 'https://broken-link.example.com',
      status: 'broken',
      response_time: '-',
      last_checked: '2023-05-15T10:30:00Z',
    },
    {
      id: '3',
      url: 'http://old-domain.example.com',
      status: 'redirected',
      response_time: '1.2s',
      last_checked: '2023-05-15T10:30:00Z',
    },
    {
      id: '4',
      url: 'https://blog.example.com/article',
      status: 'healthy',
      response_time: '0.5s',
      last_checked: '2023-05-15T10:30:00Z',
    },
    {
      id: '5',
      url: 'https://api.example.com/endpoint',
      status: 'broken',
      response_time: '-',
      last_checked: '2023-05-15T10:30:00Z',
    },
  ]);

  const [showAddLinkSheet, setShowAddLinkSheet] = useState(false);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddLink = async () => {
    if (!newLinkUrl) return;
    
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLink = {
        id: String(links.length + 1),
        url: newLinkUrl,
        status: Math.random() > 0.3 ? 'healthy' : Math.random() > 0.5 ? 'broken' : 'redirected',
        response_time: Math.random() > 0.2 ? `${(Math.random() * 1.5).toFixed(1)}s` : '-',
        last_checked: new Date().toISOString(),
      } as const;
      
      setLinks([newLink, ...links]);
      setNewLinkUrl('');
      setShowAddLinkSheet(false);
      
      toast({
        title: "Link added successfully",
        description: "Your link has been added and analyzed.",
      });
    } catch (error) {
      toast({
        title: "Failed to add link",
        description: "An error occurred while adding your link.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBulkLinks = async () => {
    if (!bulkUrls) return;
    
    setIsLoading(true);
    
    try {
      // Split by newlines and filter empty lines
      const urls = bulkUrls.split('\n').filter(url => url.trim());
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newLinks = urls.map((url, index) => ({
        id: String(links.length + index + 1),
        url: url.trim(),
        status: Math.random() > 0.3 ? 'healthy' : Math.random() > 0.5 ? 'broken' : 'redirected',
        response_time: Math.random() > 0.2 ? `${(Math.random() * 1.5).toFixed(1)}s` : '-',
        last_checked: new Date().toISOString(),
      }));
      
      setLinks([...newLinks, ...links]);
      setBulkUrls('');
      setShowAddLinkSheet(false);
      
      toast({
        title: `${newLinks.length} links added successfully`,
        description: "Your links have been added and analyzed.",
      });
    } catch (error) {
      toast({
        title: "Failed to add links",
        description: "An error occurred while adding your links.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLinks = links.filter(link => 
    link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <>
        <DashboardHeader 
          title="Links" 
          newButtonText="Add Link"
          onNewButtonClick={() => setShowAddLinkSheet(true)}
        />
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search links..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Links</CardTitle>
            <CardDescription>
              Monitor your links and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No links found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchQuery ? "No links match your search query." : "You haven't added any links yet."}
                </p>
                {searchQuery ? (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    className="mt-4"
                    onClick={() => setShowAddLinkSheet(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add your first link
                  </Button>
                )}
              </div>
            ) : (
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLinks.map(link => (
                      <TableRow key={link.id}>
                        <TableCell className="font-medium truncate max-w-xs">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                            {link.url}
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={link.status === 'healthy' ? 'success' : 
                                  link.status === 'broken' ? 'destructive' : 'warning'}
                            className="capitalize"
                          >
                            {link.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                            {link.response_time}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(link.last_checked).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                toast({ title: "Refreshing link..." });
                              }}>
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Refresh
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  setLinks(links.filter(l => l.id !== link.id));
                                  toast({ title: "Link deleted" });
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
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
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredLinks.length} of {links.length} links
            </div>
          </CardFooter>
        </Card>
        
        <Sheet open={showAddLinkSheet} onOpenChange={setShowAddLinkSheet}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Add Links</SheetTitle>
              <SheetDescription>
                Add one or multiple links to monitor.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <Tabs defaultValue="single">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">Single Link</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="single" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="https://example.com"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleAddLink}
                    disabled={isLoading || !newLinkUrl}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </>
                    )}
                  </Button>
                </TabsContent>
                <TabsContent value="bulk" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <textarea
                      className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Enter one URL per line:&#10;https://example.com&#10;https://example.org"
                      value={bulkUrls}
                      onChange={(e) => setBulkUrls(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleAddBulkLinks}
                    disabled={isLoading || !bulkUrls}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Links
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </>
    </DashboardLayout>
  );
};

export default LinksPage;
