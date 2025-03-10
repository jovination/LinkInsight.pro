import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  FileText, 
  Download,
  Calendar,
  ArrowUpRight,
  Clock
} from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { name: 'Monthly Link Health Report', date: 'May 1, 2023', status: '96% links healthy' },
    { name: 'Weekly Performance Analysis', date: 'April 24, 2023', status: '1.2s avg. load time' },
    { name: 'SEO Impact Report', date: 'April 15, 2023', status: '12 SEO issues fixed' },
    { name: 'Custom Domain Report', date: 'April 1, 2023', status: '3 domains analyzed' },
  ];

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Reports</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-600 rounded-xl">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            {/* Report Summary Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Link Health Score</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">96%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> +2% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 4 this month
                    </span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">1.2s</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 0.3s faster than avg.
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Reports Visualization */}
            <Card className="rounded-2xl border-primary/10">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Report History</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="all">
                  <div className="flex items-center justify-between">
                    <TabsList className="grid w-40 grid-cols-3 rounded-xl">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      {reports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between rounded-xl border p-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{report.name}</div>
                              <div className="text-xs text-muted-foreground">{report.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-xs text-muted-foreground">
                              {report.status}
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="weekly" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      {reports.filter((_, i) => i === 1).map((report, index) => (
                        <div key={index} className="flex items-center justify-between rounded-xl border p-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{report.name}</div>
                              <div className="text-xs text-muted-foreground">{report.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-xs text-muted-foreground">
                              {report.status}
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="monthly" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      {reports.filter((_, i) => i === 0 || i === 3).map((report, index) => (
                        <div key={index} className="flex items-center justify-between rounded-xl border p-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{report.name}</div>
                              <div className="text-xs text-muted-foreground">{report.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-xs text-muted-foreground">
                              {report.status}
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
