
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LinkCheckForm } from '@/components/features/LinkCheckForm';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, AlertTriangle, CheckCircle2, LineChart, BarChart3, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');

  // Fetch dashboard stats
  const { 
    data: stats, 
    isLoading: isLoadingStats,
    isError: isStatsError,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats
  });

  // Fetch links count to check if user has any links
  const { 
    data: links = [], 
    isLoading: isLoadingLinks,
  } = useQuery({
    queryKey: ['links'],
    queryFn: apiService.getLinks
  });

  const hasLinks = links.length > 0;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-auto">
        <DashboardHeader title="Dashboard" />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            {/* User Welcome */}
            {user && (
              <div className="bg-primary/5 p-4 rounded-xl">
                <h2 className="text-xl font-semibold">Welcome{user.name ? ` back, ${user.name}` : ''}!</h2>
                <p className="text-muted-foreground mt-1">Here's an overview of your link monitoring</p>
              </div>
            )}
            
            {!hasLinks && !isLoadingLinks && (
              <Card className="border-primary/10 rounded-xl shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Get Started with Link Monitoring</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Add your first link to start monitoring its health, analyze SEO metrics, and get detailed reports.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => navigate('/links')} className="flex items-center gap-2">
                      Add Your First Link
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('quickCheck')}>
                      Try Quick Check First
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {hasLinks && (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="quickCheck">Quick Check</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  {/* Stats Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-primary/10 rounded-xl shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Activity className="h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isLoadingStats ? (
                          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        ) : (
                          <div className="text-2xl font-bold">{stats?.totalLinks || 0}</div>
                        )}
                      </CardContent>
                    </Card>
                    <Card className="border-primary/10 rounded-xl shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Healthy Links</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isLoadingStats ? (
                          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        ) : (
                          <div className="text-2xl font-bold">{stats?.healthyLinks || 0}</div>
                        )}
                      </CardContent>
                    </Card>
                    <Card className="border-primary/10 rounded-xl shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Broken Links</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isLoadingStats ? (
                          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        ) : (
                          <div className="text-2xl font-bold">{stats?.brokenLinks || 0}</div>
                        )}
                      </CardContent>
                    </Card>
                    <Card className="border-primary/10 rounded-xl shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        {isLoadingStats ? (
                          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        ) : (
                          <div className="text-2xl font-bold">{stats?.healthScore || 0}%</div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Health Score Progress */}
                  {stats?.healthScore && (
                    <Card className="border-primary/10 rounded-xl shadow-sm mt-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Website Health Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress 
                          value={stats.healthScore} 
                          className="h-2"
                          indicatorClassName={
                            stats.healthScore > 80 ? 'bg-green-500' : 
                            stats.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'
                          }
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Critical</span>
                          <span className="text-xs font-medium">{stats.healthScore}%</span>
                          <span className="text-xs text-muted-foreground">Excellent</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recent Issues */}
                  <Card className="border-primary/10 rounded-xl shadow-sm mt-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Issues</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg"
                          onClick={() => navigate('/reports')}
                        >
                          View All
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {links.filter(link => link.status === 'broken').length > 0 ? (
                        <div className="space-y-3">
                          {links.filter(link => link.status === 'broken').slice(0, 3).map(link => (
                            <Alert key={link.id} variant="destructive" className="py-3">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertTitle className="ml-2 text-sm font-medium">Broken Link Detected</AlertTitle>
                              <AlertDescription className="ml-2 text-sm">
                                {link.url} - Last checked {link.lastChecked}
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500" />
                          <p>No issues detected! All your links are healthy.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="performance">
                  <Card className="border-primary/10 rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Average Response Time</span>
                            <span className="text-sm font-medium">{stats?.avgLoadTime || '0.0s'}</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">SEO Score</span>
                            <span className="text-sm font-medium">{stats?.healthScore || 0}%</span>
                          </div>
                          <Progress 
                            value={stats?.healthScore || 0} 
                            className="h-2"
                            indicatorClassName={
                              (stats?.healthScore || 0) > 80 ? 'bg-green-500' : 
                              (stats?.healthScore || 0) > 50 ? 'bg-amber-500' : 'bg-red-500'
                            }
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Page Speed</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" indicatorClassName="bg-green-500" />
                        </div>
                        
                        <Button 
                          onClick={() => navigate('/analytics')}
                          className="w-full mt-4"
                        >
                          View Detailed Analytics
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="quickCheck">
                  <Card className="border-primary/10 rounded-xl shadow-sm">
                    <CardHeader>
                      <CardTitle>Quick Link Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LinkCheckForm onAnalysisComplete={() => refetchStats()} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
            
            {/* Call to Action Section */}
            {hasLinks && (
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <Card className="border-primary/10 rounded-xl shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Bulk Link Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check multiple links at once to save time and identify issues across your website.
                    </p>
                    <Button 
                      variant="default" 
                      onClick={() => navigate('/links')}
                      className="w-full"
                    >
                      Analyze Links
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10 rounded-xl shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">SEO Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get detailed SEO metrics and recommendations to improve your website ranking.
                    </p>
                    <Button 
                      variant="default" 
                      onClick={() => navigate('/seo')}
                      className="w-full"
                    >
                      Analyze SEO
                      <LineChart className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardIndex;
