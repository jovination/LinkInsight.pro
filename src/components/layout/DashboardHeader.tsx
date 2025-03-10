
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Download, 
  Menu, 
  Plus, 
  Search, 
  User,
  Moon,
  Sun
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DashboardSidebar } from './DashboardSidebar';
import { useTheme } from '@/context/ThemeContext';

interface DashboardHeaderProps {
  title: string;
  showSearch?: boolean;
  showExport?: boolean;
  showNewButton?: boolean;
  newButtonText?: string;
  onNewButtonClick?: () => void;
}

export const DashboardHeader = ({
  title,
  showSearch = false,
  showExport = false,
  showNewButton = false,
  newButtonText = "New Check",
  onNewButtonClick,
}: DashboardHeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  
  const handleNewButton = () => {
    if (onNewButtonClick) {
      onNewButtonClick();
    }
  };

  const notifications = [
    { id: 1, content: 'New broken link detected', time: 'Just now' },
    { id: 2, content: 'Link check completed', time: '1 hour ago' },
    { id: 3, content: 'Weekly report ready', time: '5 hours ago' },
  ];

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1">
        <h1 className="text-base sm:text-lg font-semibold">{title}</h1>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {showSearch && (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full bg-background pl-8 rounded-xl" 
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full" 
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                {notifications.length}
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 font-medium">
              <span>Notifications</span>
              <Link to="/dashboard/notifications" className="text-xs text-primary hover:underline">
                View all
              </Link>
            </div>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span>{notification.content}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {showExport && (
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}

        {showNewButton && (
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary-600 rounded-xl"
            onClick={handleNewButton}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{newButtonText}</span>
          </Button>
        )}
      </div>
    </header>
  );
};
