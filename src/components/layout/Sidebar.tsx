
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Link as LinkIcon, 
  BarChart2, 
  FileText, 
  Settings, 
  HelpCircle, 
  X,
  AlertTriangle,
  Clock,
  Globe 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Link Checker', icon: LinkIcon, path: '/dashboard/links' },
    { name: 'Website Scan', icon: Globe, path: '/dashboard/website' },
    { name: 'Reports', icon: FileText, path: '/dashboard/reports' },
    { name: 'Analytics', icon: BarChart2, path: '/dashboard/analytics' },
    { name: 'Alerts', icon: AlertTriangle, path: '/dashboard/alerts' },
    { name: 'History', icon: Clock, path: '/dashboard/history' },
  ];
  
  const bottomNavItems = [
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    { name: 'Help & Support', icon: HelpCircle, path: '/dashboard/support' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-card border-r shadow-sm transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">L</div>
              <span className="font-bold text-xl">LinkChecker</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                 (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                                 
                return (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md font-medium transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <div className="bg-secondary rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Free Plan</span>
                <Link to="/dashboard/billing" className="text-xs text-primary hover:underline">Upgrade</Link>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Links: 20/100</span>
                    <span>20%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary-foreground/10 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Reports: 2/5</span>
                    <span>40%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary-foreground/10 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <nav className="space-y-1">
              {bottomNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md font-medium transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};
