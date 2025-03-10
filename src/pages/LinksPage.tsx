
import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LinkIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const LinksPage = () => {
  const links = [
    { url: 'https://example.com/homepage', status: 'healthy', responseTime: '0.8s', lastChecked: '2 hours ago' },
    { url: 'https://example.com/about', status: 'healthy', responseTime: '1.2s', lastChecked: '2 hours ago' },
    { url: 'https://example.com/products', status: 'broken', responseTime: '-', lastChecked: '2 hours ago' },
    { url: 'https://example.com/blog', status: 'healthy', responseTime: '1.5s', lastChecked: '2 hours ago' },
    { url: 'https://example.com/contact', status: 'healthy', responseTime: '0.9s', lastChecked: '2 hours ago' },
    { url: 'https://example.com/services', status: 'healthy', responseTime: '1.1s', lastChecked: '3 hours ago' },
    { url: 'https://example.com/resources', status: 'redirected', responseTime: '1.7s', lastChecked: '3 hours ago' },
    { url: 'https://example.com/support', status: 'healthy', responseTime: '0.7s', lastChecked: '3 hours ago' },
  ];

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">My Links</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-600 rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              Add New Link
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search links..." className="rounded-xl" />
              <Button type="submit" className="rounded-xl">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Card className="rounded-2xl border-primary/10">
              <CardHeader className="p-4 pb-3">
                <CardTitle className="text-base">All Links</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-[1fr_100px_100px_120px_50px] gap-2 px-4 py-3 text-sm font-medium text-muted-foreground">
                    <div>URL</div>
                    <div>Status</div>
                    <div>Response</div>
                    <div>Last Check</div>
                    <div></div>
                  </div>
                  
                  {links.map((link, index) => (
                    <div key={index} className="grid grid-cols-[1fr_100px_100px_120px_50px] gap-2 px-4 py-3 text-sm items-center">
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
                            <LinkIcon className="mr-1 h-4 w-4" /> Redirect
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
                      <div>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LinksPage;
