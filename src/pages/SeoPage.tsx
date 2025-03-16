// Fix the children prop issue in SeoPage.tsx
// Make sure the DashboardLayout is used correctly without passing children as a prop to it
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const SeoPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div>
        <h1>SEO Analysis</h1>
        <p>This is the SEO analysis page.</p>
      </div>
    </DashboardLayout>
  );
};

export default SeoPage;
