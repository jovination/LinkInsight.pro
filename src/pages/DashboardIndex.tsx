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
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  LineChart, 
  BarChart3, 
  Activity, 
  Zap,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { typeSafeArray } from '@/utils/typeSafety';

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('overview');

  // Fetch links count to check if user has any links
  const { 
    data: links, 
    isLoading: isLoadingLinks,
    isError: isLinksError
  } = useQuery({
    queryKey: ['links'],
    queryFn: apiService.getLinks
  });

  // Parse links data safely
  const parsedLinks = typeSafeArray(links);
  const hasLinks = parsedLinks.length > 0;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-auto">
        <DashboardHeader title="Dashboard" description="Welcome to LinkChecker" />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            {/* User Welcome */}
            {user && (
              <div className="bg-primary/5 p-4 rounded-xl">
                <h2 className="text-xl font-semibold">Welcome{user.name ? ` back, ${user.name}` : ''}!</h2>
                <p className="text-muted-foreground mt-1">Let's start monitoring your website links</p>
              </div>
            )}
            
            {isLinksError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was an error loading your links. Please try again later.
                </AlertDescription>
              </Alert>
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
                {hasLinks ? (
                  <>
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
                          <div className="text-2xl font-bold">{parsedLinks.length}</div>
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
                          <div className="text-2xl font-bold">
                            {parsedLinks.filter(link => link.status === 'healthy').length}
                          </div>
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
                          <div className="text-2xl font-bold">
                            {parsedLinks.filter(link => link.status === 'broken').length}
                          </div>
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
                          <div className="text-2xl font-bold">
                            {parsedLinks.length > 0 
                              ? Math.round((parsedLinks.filter(link => link.status === 'healthy').length / parsedLinks.length) * 100)
                              : 0}%
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ) : (
                  <Card className="border-primary/10 rounded-xl shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Info className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">No Links Added Yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Once you add links to monitor, you'll see statistics and metrics here.
                          </p>
                          <Button 
                            onClick={() => navigate('/links')}
                            className="flex items-center gap-2"
                          >
                            Add Your First Link
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="performance">
                <Card className="border-primary/10 rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hasLinks ? (
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">SEO Score</span>
                            <span className="text-sm font-medium">
                              {parsedLinks.length > 0 
                                ? Math.round((parsedLinks.filter(link => link.status === 'healthy').length / parsedLinks.length) * 100)
                                : 0}%
                            </span>
                          </div>
                          <Progress 
                            value={parsedLinks.length > 0 
                              ? Math.round((parsedLinks.filter(link => link.status === 'healthy').length / parsedLinks.length) * 100)
                              : 0} 
                            className="h-2"
                          />
                        </div>
                        
                        <Button 
                          onClick={() => navigate('/analytics')}
                          className="w-full mt-4"
                        >
                          View Detailed Analytics
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">
                          Add links to monitor to see performance metrics here.
                        </p>
                        <Button 
                          onClick={() => navigate('/links')}
                          className="flex items-center gap-2 mx-auto"
                        >
                          Add Your First Link
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="quickCheck">
                <Card className="border-primary/10 rounded-xl shadow-sm">
                  <CardHeader>
                    <CardTitle>Quick Link Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LinkCheckForm onAnalysisComplete={() => {
                      toast({
                        title: "Analysis Complete",
                        description: "Your link has been analyzed successfully.",
                      });
                    }} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
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
