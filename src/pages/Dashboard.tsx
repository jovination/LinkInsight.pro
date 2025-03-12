import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, CheckCircle2, Loader2, LinkIcon, BarChart3 } from 'lucide-react';
import { LinkCheckForm } from '@/components/features/LinkCheckForm';
import { LinkAnalyzer } from '@/components/features/LinkAnalyzer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('check');

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

  // Handle stats error
  if (isStatsError) {
    toast.error('Failed to load dashboard statistics');
  }

  const handleAnalysisComplete = () => {
    // Refetch stats when analysis is complete
    refetchStats();
    // Other actions after analysis is complete
  };

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
                <h2 className="text-xl font-semibold">Welcome back, {user.name}</h2>
                <p className="text-muted-foreground mt-1">Here's an overview of your link monitoring</p>
              </div>
            )}
            
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-primary/10 rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <LinkIcon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
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
                    <Loader2 className="h-4 w-4 animate-spin" />
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
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="text-2xl font-bold">{stats?.brokenLinks || 0}</div>
                  )}
                </CardContent>
              </Card>
              <Card className="border-primary/10 rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="text-2xl font-bold">{stats?.avgLoadTime || '0.0s'}</div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Health Score */}
            {stats?.healthScore && (
              <Card className="border-primary/10 rounded-xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Website Health Score</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        stats.healthScore > 80 ? 'bg-green-500' : 
                        stats.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${stats.healthScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">0%</span>
                    <span className="text-xs font-medium">{stats.healthScore}%</span>
                    <span className="text-xs text-muted-foreground">100%</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Link Check/Analysis Tools */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Link Tools</h2>
                <Button 
                  size="sm" 
                  className="rounded-xl flex items-center gap-1"
                  onClick={() => navigate('/links')}
                >
                  View All Links
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="max-w-[400px] w-full mb-4 rounded-xl">
                  <TabsTrigger value="check">Quick Check</TabsTrigger>
                  <TabsTrigger value="analyze">Advanced Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="check" className="space-y-4">
                  <LinkCheckForm onAnalysisComplete={handleAnalysisComplete} />
                </TabsContent>
                
                <TabsContent value="analyze" className="space-y-4">
                  <LinkAnalyzer onAnalysisComplete={handleAnalysisComplete} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
