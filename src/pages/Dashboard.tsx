import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardHealthScore from '@/components/dashboard/DashboardHealthScore';
import DashboardOverviewCard from '@/components/dashboard/DashboardOverviewCard';
import DashboardRecentLinks from '@/components/dashboard/DashboardRecentLinks';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '@/services/supabase';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, LineChart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Fetch all links data
  const { data: links, isLoading: isLoadingLinks } = useQuery({
    queryKey: ['links'],
    queryFn: supabaseService.getLinks
  });

  // Calculate stats
  const healthScore = links ? 
    Math.round((links.filter(link => link.status === 'healthy').length / links.length) * 100) : 0;
  
  const avgLoadTime = links?.reduce((acc, link) => {
    const time = parseFloat(link.response_time);
    return isNaN(time) ? acc : acc + time;
  }, 0) / (links?.length || 1);

  const handleGenerateReport = () => {
    toast.success('Report generation started');
    // This would be expanded to actually generate reports in a real implementation
    setTimeout(() => {
      navigate('/reports');
    }, 1500);
  };

  return (
    <DashboardLayout className="container">
      <div>
        <DashboardHeader title="Dashboard" />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats 
            links={links || []}
            isLoadingStats={isLoadingLinks}
            avgLoadTime={avgLoadTime ? `${avgLoadTime.toFixed(1)}s` : '-'}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <div className="md:col-span-1 lg:col-span-2">
            <DashboardHealthScore 
              hasLinks={!!links?.length}
              healthScore={healthScore}
            />
          </div>
          
          <div className="md:col-span-1 lg:col-span-3">
            <DashboardOverviewCard 
              title="Recent Activity"
              isLoading={isLoadingLinks}
              value={links?.length ? `${links.length} links monitored` : 'No links'}
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-2">
            <DashboardRecentLinks 
              links={links || []}
              isLoading={isLoadingLinks}
            />
          </div>
        </div>
        
        {/* Quick Actions Section */}
        {links && links.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">URL Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Check health and performance of your website links
                </p>
                <Button 
                  onClick={() => navigate('/links')}
                  className="w-full"
                >
                  Analyze Links
                  <Activity className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">SEO Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize your pages for better search engine rankings
                </p>
                <Button 
                  onClick={() => navigate('/seo')}
                  className="w-full"
                >
                  Analyze SEO
                  <LineChart className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View detailed performance and analytics data
                </p>
                <Button 
                  onClick={() => navigate('/analytics')}
                  className="w-full"
                >
                  View Analytics
                  <BarChart3 className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Generate Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a comprehensive report of your link health
                </p>
                <Button 
                  onClick={handleGenerateReport}
                  className="w-full"
                >
                  Create Report
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
