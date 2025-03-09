
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  LinkIcon,
  BarChart3,
  Settings,
  Bell,
  Zap,
  FileText,
  Users,
  CreditCard,
  Key,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({ href, icon: Icon, children, onClick }: SidebarLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>
      )}
    </Link>
  );
};

export const DashboardSidebar = () => {
  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div className="flex h-screen flex-col border-r bg-card">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
            L
          </div>
          <span className="font-bold text-xl">LinkChecker</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarLink href="/dashboard" icon={Home}>Dashboard</SidebarLink>
          <SidebarLink href="/dashboard/links" icon={LinkIcon}>My Links</SidebarLink>
          <SidebarLink href="/dashboard/reports" icon={FileText}>Reports</SidebarLink>
          <SidebarLink href="/dashboard/analytics" icon={BarChart3}>Analytics</SidebarLink>
          <SidebarLink href="/dashboard/notifications" icon={Bell}>Notifications</SidebarLink>
          <SidebarLink href="/dashboard/api-keys" icon={Key}>API Keys</SidebarLink>
          <SidebarLink href="/dashboard/billing" icon={CreditCard}>Billing</SidebarLink>
          
          <div className="my-2 px-3 py-2">
            <div className="border-t"></div>
          </div>
          
          <SidebarLink href="/dashboard/settings" icon={Settings}>Settings</SidebarLink>
          <SidebarLink href="/dashboard/help" icon={HelpCircle}>Help & Support</SidebarLink>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Upgrade to Pro</h4>
              <p className="text-xs text-muted-foreground">Get more features!</p>
            </div>
          </div>
          <Link to="/pricing">
            <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-600">
              Upgrade Plan
            </button>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center gap-2 justify-center rounded-md border px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
