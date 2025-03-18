import React from 'react';
import SubscriptionManager from '@/components/billing/SubscriptionManager';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

const BillingPage: React.FC = () => {
  return (
    <DashboardLayout className="container">
      <div>
        <DashboardHeader title="Billing" description="Manage your subscription and billing details" />
        <SubscriptionManager />
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
