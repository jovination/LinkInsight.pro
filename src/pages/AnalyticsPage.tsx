
import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  BarChart,
  PieChart,
  LineChart,
  ArrowUpRight,
  Download,
  Share2
} from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            {/* Summary Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> +12% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Response</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">1.2s</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> -0.3s from avg
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Issues Fixed</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 18 this week
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <PieChart className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">96%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> +2% improvement
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Analytics Visualization */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-2xl border-primary/10">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Link Health Over Time</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Tabs defaultValue="week">
                    <div className="flex items-center justify-between">
                      <TabsList className="grid w-40 grid-cols-3 rounded-xl">
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="week" className="mt-4 space-y-4">
                      <div className="h-[250px] flex items-center justify-center border rounded-xl bg-muted/20">
                        <div className="text-center">
                          <LineChart className="h-10 w-10 mx-auto text-primary/60" />
                          <p className="mt-2 text-sm text-muted-foreground">Link health weekly chart</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="month" className="mt-4 space-y-4">
                      <div className="h-[250px] flex items-center justify-center border rounded-xl bg-muted/20">
                        <div className="text-center">
                          <LineChart className="h-10 w-10 mx-auto text-primary/60" />
                          <p className="mt-2 text-sm text-muted-foreground">Link health monthly chart</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="year" className="mt-4 space-y-4">
                      <div className="h-[250px] flex items-center justify-center border rounded-xl bg-muted/20">
                        <div className="text-center">
                          <LineChart className="h-10 w-10 mx-auto text-primary/60" />
                          <p className="mt-2 text-sm text-muted-foreground">Link health yearly chart</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="rounded-2xl border-primary/10">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Response Time Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px] flex items-center justify-center border rounded-xl bg-muted/20">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-primary/60" />
                      <p className="mt-2 text-sm text-muted-foreground">Response time distribution chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
