
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, Moon, Sun } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/context/ThemeContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-background py-3 border-b border-border/40 md:px-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">LinkInsight</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Features
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Link Analysis</DropdownMenuItem>
                <DropdownMenuItem>SEO Tools</DropdownMenuItem>
                <DropdownMenuItem>Analytics Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            
            <Link to="/resources" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Resources
            </Link>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              Sign up
            </Button>
          </Link>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-bold text-xl">LinkInsight</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/features" className="text-sm font-medium py-2 hover:text-primary transition-colors">Features</Link>
              <Link to="/pricing" className="text-sm font-medium py-2 hover:text-primary transition-colors">Pricing</Link>
              <Link to="/resources" className="text-sm font-medium py-2 hover:text-primary transition-colors">Resources</Link>
              <div className="flex items-center gap-2 py-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <span className="text-sm font-medium">{theme === 'light' ? 'Light' : 'Dark'} Mode</span>
              </div>
              <hr className="my-4" />
              <Link to="/login">
                <Button variant="ghost" className="w-full justify-start" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white w-full">
                  Sign up
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
