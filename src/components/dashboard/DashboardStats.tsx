
import React from 'react';
import { typeSafeArray } from '@/utils/typeSafety';
import DashboardOverviewCard from './DashboardOverviewCard';

interface LinkData {
  id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  responseTime: string;
  lastChecked: string;
}

interface DashboardStatsProps {
  links: unknown;
  stats: unknown;
  isLoadingStats: boolean;
  avgLoadTime: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  links,
  stats,
  isLoadingStats,
  avgLoadTime,
}) => {
  const parsedLinks = typeSafeArray<LinkData>(links);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardOverviewCard
        title="Total Links"
        isLoading={isLoadingStats}
        value={parsedLinks.length}
      />
      <DashboardOverviewCard
        title="Healthy Links"
        isLoading={isLoadingStats}
        value={parsedLinks.filter(link => link.status === 'healthy').length}
      />
      <DashboardOverviewCard
        title="Broken Links"
        isLoading={isLoadingStats}
        value={parsedLinks.filter(link => link.status === 'broken').length}
      />
      <DashboardOverviewCard
        title="Avg. Load Time"
        isLoading={isLoadingStats}
        value={avgLoadTime}
      />
    </div>
  );
};

export default DashboardStats;
