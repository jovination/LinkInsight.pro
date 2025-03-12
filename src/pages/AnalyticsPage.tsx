
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
  Share2,
  Loader2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import {
  ResponsiveContainer,
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  BarChart as RechartBarChart,
  Bar,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock data for charts
const lineChartData = [
  { name: 'Mon', value: 98 },
  { name: 'Tue', value: 92 },
  { name: 'Wed', value: 95 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 88 },
  { name: 'Sat', value: 95 },
  { name: 'Sun', value: 96 },
];

const responseTimeData = [
  { name: '<0.5s', value: 12 },
  { name: '0.5-1s', value: 28 },
  { name: '1-1.5s', value: 35 },
  { name: '1.5-2s', value: 18 },
  { name: '>2s', value: 7 },
];

const statusPieData = [
  { name: 'Healthy', value: 75 },
  { name: 'Broken', value: 15 },
  { name: 'Redirected', value: 10 },
];

const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

const AnalyticsPage = () => {
  // Fetch analytics data
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats
  });

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
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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
                    <div className="text-2xl font-bold">{stats?.totalScans || 0}</div>
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
                    <div className="text-2xl font-bold">{stats?.responseTime || '0s'}</div>
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
                    <div className="text-2xl font-bold">{stats?.issuesFixed || 0}</div>
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
                    <div className="text-2xl font-bold">{stats?.healthScore || 0}%</div>
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
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartLineChart
                              data={lineChartData}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <RechartTooltip
                                contentStyle={{ background: 'var(--background)', borderRadius: '8px', borderColor: 'var(--border)' }}
                              />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                              />
                            </RechartLineChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                      <TabsContent value="month" className="mt-4 space-y-4">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartLineChart
                              data={lineChartData}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <RechartTooltip
                                contentStyle={{ background: 'var(--background)', borderRadius: '8px', borderColor: 'var(--border)' }}
                              />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                              />
                            </RechartLineChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                      <TabsContent value="year" className="mt-4 space-y-4">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartLineChart
                              data={lineChartData}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <RechartTooltip
                                contentStyle={{ background: 'var(--background)', borderRadius: '8px', borderColor: 'var(--border)' }}
                              />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                              />
                            </RechartLineChart>
                          </ResponsiveContainer>
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
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartBarChart
                          data={responseTimeData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <RechartTooltip
                            formatter={(value) => [`${value} pages`, 'Count']}
                            contentStyle={{ background: 'var(--background)', borderRadius: '8px', borderColor: 'var(--border)' }}
                          />
                          <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </RechartBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Add a third chart for the status distribution */}
                <Card className="rounded-2xl border-primary/10 lg:col-span-2">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Link Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={statusPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <RechartTooltip
                            formatter={(value) => [`${value} links`, 'Count']}
                            contentStyle={{ background: 'var(--background)', borderRadius: '8px', borderColor: 'var(--border)' }}
                          />
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
