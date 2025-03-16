
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface DashboardOverviewCardProps {
  title: string;
  isLoading: boolean;
  value: React.ReactNode;
}

const DashboardOverviewCard: React.FC<DashboardOverviewCardProps> = ({
  title,
  isLoading,
  value,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardOverviewCard;
