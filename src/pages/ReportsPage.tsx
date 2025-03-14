
import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportScheduler from '@/components/features/ReportScheduler';
import { 
  BarChart3, 
  FileText, 
  Download,
  Calendar,
  ArrowUpRight,
  Clock,
  Zap,
  Link2,
  Upload
} from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { name: 'Monthly Link Health Report', date: 'May 1, 2023', status: '96% links healthy' },
    { name: 'Weekly Performance Analysis', date: 'April 24, 2023', status: '1.2s avg. load time' },
    { name: 'SEO Impact Report', date: 'April 15, 2023', status: '12 SEO issues fixed' },
    { name: 'Custom Domain Report', date: 'April 1, 2023', status: '3 domains analyzed' },
  ];

  const generateReport = (type: string) => {
    // This would typically call an API to generate a report
    console.log(`Generating ${type} report...`);
  };

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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              
              <Card className="stats-card border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">SEO Issues Identified</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Link2 className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 flex items-center">
                      <ArrowUpRight className="mr-1 h-3 w-3" /> 5 fixed this week
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Report Actions */}
            <Card className="border-primary/10">
              <CardHeader className="p-4 pb-2">
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Choose a report type to generate instantly</CardDescription>
              </CardHeader>
              <CardContent className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-primary/10 hover:border-primary/30 cursor-pointer" onClick={() => generateReport('link-health')}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 mt-3">
                      <Link2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Link Health</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Status of all monitored links
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10 hover:border-primary/30 cursor-pointer" onClick={() => generateReport('performance')}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 mt-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Performance</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Page speed and load times
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10 hover:border-primary/30 cursor-pointer" onClick={() => generateReport('seo')}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 mt-3">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">SEO Analysis</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      SEO metrics and improvements
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10 hover:border-primary/30 cursor-pointer" onClick={() => generateReport('comprehensive')}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 mt-3">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Comprehensive</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      All site metrics and issues
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="history" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 md:w-auto">
                <TabsTrigger value="history">Report History</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              </TabsList>
              
              {/* Report History Tab */}
              <TabsContent value="history" className="space-y-4">
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
              </TabsContent>
              
              {/* Scheduled Reports Tab */}
              <TabsContent value="scheduled">
                <Card className="rounded-2xl border-primary/10">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Automated Reports</CardTitle>
                    <CardDescription>
                      Schedule reports to be sent automatically to your team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ReportScheduler />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
