
import React from 'react';
import { MobileNav } from './MobileNav';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  subtitle?: string; // For backward compatibility
  children?: React.ReactNode;
}

export const DashboardHeader = ({ title, description, subtitle, children }: DashboardHeaderProps) => {
  // Use description if provided, otherwise use subtitle for backward compatibility
  const headerDescription = description || subtitle || '';

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-4 md:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
        {headerDescription && (
          <p className="text-sm text-muted-foreground">
            {headerDescription}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <MobileNav />
      </div>
    </div>
  );
};
