
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { 
  BarChart3, 
  LinkIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Plus, 
  Download 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const { 
    data: statsData, 
    isLoading: statsLoading,
    error: statsError 
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats,
    // Mock data for development until backend is ready
    placeholderData: {
      totalLinks: 248,
      brokenLinks: 16,
      healthyLinks: 224,
      avgLoadTime: '1.2s'
    }
  });

  const { 
    data: linksData,
    isLoading: linksLoading
  } = useQuery({
    queryKey: ['recentLinks'],
    queryFn: apiService.getLinks,
    // Mock data for development
    placeholderData: [
      { id: '1', url: 'https://example.com/blog', status: 'healthy', lastChecked: 'Just now' },
      { id: '2', url: 'https://example.com/about', status: 'broken', lastChecked: '5 min ago' },
      { id: '3', url: 'https://example.com/products', status: 'healthy', lastChecked: '25 min ago' },
      { id: '4', url: 'https://example.com/contact', status: 'healthy', lastChecked: '1 hour ago' }
    ]
  });

  const handleNewCheck = () => {
    // In a real app, this would open a modal or navigate to a new page
    toast.info('New link check feature will be implemented soon');
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-auto">
        <DashboardHeader 
          title="Dashboard" 
          showExport={true}
          showNewButton={true}
          newButtonText="New Check"
          onNewButtonClick={handleNewCheck}
        />
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                  <LinkIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">{statsData?.totalLinks}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> +12% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              {/* Similar cards for other stats */}
              <Card className="stats-card border-destructive/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Broken Links</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">{statsData?.brokenLinks}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-destructive flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> +3 since last check
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-emerald-500/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Healthy Links</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">{statsData?.healthyLinks}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 94% success rate
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Load Time</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">{statsData?.avgLoadTime}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 0.3s faster than avg.
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Usage Stats */}
            <Card className="overflow-hidden rounded-2xl border-primary/10">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Usage</CardTitle>
                <CardDescription>Your plan usage for the current month</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Link Checks</div>
                      <div className="text-muted-foreground">248 / 500</div>
                    </div>
                    <Progress value={49.6} className="h-2 bg-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Reports</div>
                      <div className="text-muted-foreground">12 / 20</div>
                    </div>
                    <Progress value={60} className="h-2 bg-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">API Calls</div>
                      <div className="text-muted-foreground">1,024 / 5,000</div>
                    </div>
                    <Progress value={20.48} className="h-2 bg-primary/20" />
                  </div>
                  <div className="flex justify-end">
                    <Link to="/dashboard/billing">
                      <Button variant="outline" size="sm" className="rounded-xl">View Plan Options</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-2xl border-primary/10">
                <CardHeader className="p-4 pb-3">
                  <CardTitle className="text-base">Recent Link Checks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {linksLoading ? (
                      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        Loading recent links...
                      </div>
                    ) : linksData?.map((link, index) => (
                      <div key={link.id} className="flex items-center justify-between border-t px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          {link.status === 'broken' ? (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          )}
                          <span className="font-medium">{link.url}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {link.lastChecked}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t px-4 py-3 text-center">
                    <Link to="/dashboard/links" className="text-sm text-primary hover:underline">
                      View all links
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-primary/10">
                <CardHeader className="p-4 pb-3">
                  <CardTitle className="text-base">Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Tabs defaultValue="week">
                    <div className="flex items-center justify-between">
                      <TabsList className="grid w-40 grid-cols-3 rounded-xl">
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                      </TabsList>
                      <Button variant="ghost" size="sm" className="gap-1 rounded-xl">
                        <BarChart3 className="h-4 w-4" />
                        Details
                      </Button>
                    </div>
                    <TabsContent value="week" className="mt-4 space-y-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-xl bg-muted/20">
                        <div className="text-center">
                          <BarChart3 className="h-10 w-10 mx-auto text-primary/60" />
                          <p className="mt-2 text-sm text-muted-foreground">Weekly analytics chart</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="month" className="mt-4 space-y-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-xl bg-muted/20">
                        <div className="text-center">
                          <BarChart3 className="h-10 w-10 mx-auto text-primary/60" />
                          <p className="mt-2 text-sm text-muted-foreground">Monthly analytics chart</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="year" className="mt-4 space-y-4">
                      <div className="h-[200px] flex items-center justify-center border rounded-xl bg-muted/20">
                        <div className="text-center">
                          <BarChart3 className="h-10 w-10 mx-auto text-primary/60" />
                          <p className="mt-2 text-sm text-muted-foreground">Yearly analytics chart</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
