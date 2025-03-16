
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardHealthScore } from '@/components/dashboard/DashboardHealthScore';
import { DashboardOverviewCard } from '@/components/dashboard/DashboardOverviewCard';
import { DashboardRecentLinks } from '@/components/dashboard/DashboardRecentLinks';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <>
        <DashboardHeader title="Dashboard" />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <div className="md:col-span-1 lg:col-span-2">
            <DashboardHealthScore />
          </div>
          
          <div className="md:col-span-1 lg:col-span-3">
            <DashboardOverviewCard />
          </div>
          
          <div className="md:col-span-2 lg:col-span-2">
            <DashboardRecentLinks />
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default Dashboard;
