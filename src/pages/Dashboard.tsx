
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { typeSafeArray, typeSafeGet } from '@/utils/typeSafety';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardHealthScore from '@/components/dashboard/DashboardHealthScore';
import DashboardRecentLinks from '@/components/dashboard/DashboardRecentLinks';

interface DashboardStats {
  totalLinks?: number;
  healthyLinks?: number;
  brokenLinks?: number;
  avgLoadTime?: string;
  healthScore?: number;
}

interface LinkData {
  id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  responseTime: string;
  lastChecked: string;
}

const Dashboard = () => {
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

  const parsedLinks = typeSafeArray<LinkData>(links);
  const hasLinks = parsedLinks.length > 0;
  const avgLoadTime = typeSafeGet(stats as Record<string, unknown>, 'avgLoadTime', '0.0s');
  const healthScore = hasLinks 
    ? Math.round((parsedLinks.filter(link => link.status === 'healthy').length / parsedLinks.length) * 100)
    : 0;

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Overview" 
        description="A summary of your website's link health and performance"
      />
      
      <div className="p-4 md:p-6 space-y-6">
        {/* Overview Cards */}
        <DashboardStats 
          links={links} 
          stats={stats} 
          isLoadingStats={isLoadingStats} 
          avgLoadTime={avgLoadTime}
        />

        {/* Health Score */}
        <DashboardHealthScore hasLinks={hasLinks} healthScore={healthScore} />

        {/* Recent Links */}
        <DashboardRecentLinks links={links} isLoading={isLoadingLinks} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
