
import React from 'react';
import { typeSafeArray } from '@/utils/typeSafety';
import DashboardOverviewCard from './DashboardOverviewCard';

interface LinkData {
  id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  response_time: string;
  last_checked: string;
}

interface DashboardStatsProps {
  links: LinkData[];
  isLoadingStats: boolean;
  avgLoadTime: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  links,
  isLoadingStats,
  avgLoadTime,
}) => {
  return (
    <>
      <DashboardOverviewCard
        title="Total Links"
        isLoading={isLoadingStats}
        value={links.length}
      />
      <DashboardOverviewCard
        title="Healthy Links"
        isLoading={isLoadingStats}
        value={links.filter(link => link.status === 'healthy').length}
      />
      <DashboardOverviewCard
        title="Broken Links"
        isLoading={isLoadingStats}
        value={links.filter(link => link.status === 'broken').length}
      />
      <DashboardOverviewCard
        title="Avg. Load Time"
        isLoading={isLoadingStats}
        value={avgLoadTime}
      />
    </>
  );
};

export default DashboardStats;
