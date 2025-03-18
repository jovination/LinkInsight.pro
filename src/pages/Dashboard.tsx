
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardHealthScore from '@/components/dashboard/DashboardHealthScore';
import DashboardOverviewCard from '@/components/dashboard/DashboardOverviewCard';
import DashboardRecentLinks from '@/components/dashboard/DashboardRecentLinks';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '@/services/supabase';

const Dashboard = () => {
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

  return (
    <DashboardLayout>
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
