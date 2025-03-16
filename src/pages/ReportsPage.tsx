
import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportGenerator from '@/components/features/ReportGenerator';
import ReportScheduler from '@/components/features/ReportScheduler';

const ReportsPage = () => {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-auto">
        <DashboardHeader 
          title="Reports" 
          subtitle="Generate, schedule, and manage reports for your website links and SEO"
        />
        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="generate" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="generate">Generate Reports</TabsTrigger>
              <TabsTrigger value="schedule">Scheduled Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <ReportGenerator />
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <ReportScheduler />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
