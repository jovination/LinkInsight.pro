
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Info, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { safeParse, typeSafeArray } from '@/utils/typeSafety';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Fetch dashboard stats
  const { 
    data: stats, 
    isLoading: isLoadingStats,
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats
  });

  // Fetch links to show recent activity
  const { 
    data: links,
    isLoading: isLoadingLinks
  } = useQuery({
    queryKey: ['links'],
    queryFn: apiService.getLinks
  });

  const parsedStats = safeParse(stats, {});
  const parsedLinks = typeSafeArray(links);
  const hasLinks = parsedLinks.length > 0;

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Overview" 
        description="A summary of your website's link health and performance"
      >
      </DashboardHeader>
      
      <div className="p-4 md:p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              ) : (
                <div className="text-2xl font-bold">{parsedLinks.length}</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Healthy Links</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              ) : (
                <div className="text-2xl font-bold">
                  {parsedLinks.filter(link => link.status === 'healthy').length}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Broken Links</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              ) : (
                <div className="text-2xl font-bold">
                  {parsedLinks.filter(link => link.status === 'broken').length}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Avg. Load Time</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              ) : (
                <div className="text-2xl font-bold">
                  {parsedStats.avgLoadTime || '0.0s'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Health Score */}
        <Card>
          <CardHeader>
            <CardTitle>Website Health Score</CardTitle>
            <CardDescription>Overall health of your monitored links</CardDescription>
          </CardHeader>
          <CardContent>
            {hasLinks ? (
              <>
                <div className="text-3xl font-bold mb-2">
                  {parsedLinks.length > 0 
                    ? Math.round((parsedLinks.filter(link => link.status === 'healthy').length / parsedLinks.length) * 100)
                    : 0}%
                </div>
                <Progress 
                  value={parsedLinks.length > 0 
                    ? Math.round((parsedLinks.filter(link => link.status === 'healthy').length / parsedLinks.length) * 100)
                    : 0} 
                  className="h-2"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Critical</span>
                  <span className="text-xs text-muted-foreground">Excellent</span>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-3 py-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    Add links to monitor to start tracking your website's health score.
                  </p>
                  <Button 
                    onClick={() => navigate('/links')}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    Add Your First Link
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Links</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/links')}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingLinks ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            ) : hasLinks ? (
              <div className="space-y-2">
                {parsedLinks.slice(0, 5).map((link, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <ExternalLink className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{link.url}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      link.status === 'healthy' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {link.status === 'healthy' ? 'Healthy' : 'Broken'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-3 py-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    No links have been added yet. Start by adding your first link to monitor.
                  </p>
                  <Button 
                    onClick={() => navigate('/links')}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    Add Your First Link
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
