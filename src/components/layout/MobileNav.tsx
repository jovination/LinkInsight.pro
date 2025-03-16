
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4 flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation('/dashboard/links')}
          >
            Links
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation('/dashboard/reports')}
          >
            Reports
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation('/dashboard/analytics')}
          >
            Analytics
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation('/dashboard/seo')}
          >
            SEO
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation('/dashboard/settings')}
          >
            Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
