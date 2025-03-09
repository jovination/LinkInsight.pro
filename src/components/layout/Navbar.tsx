
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">L</div>
            <span className="font-bold text-xl hidden md:inline-block">LinkChecker</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          <Link to="/docs" className="text-sm font-medium hover:text-primary transition-colors">Documentation</Link>
          <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-primary hover:bg-primary-600">
              Get Started <ChevronRight className="h-4 w-4 ml-1" />
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">L</div>
                <span className="font-bold text-xl">LinkChecker</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/features" className="text-sm font-medium py-2 hover:text-primary transition-colors">Features</Link>
              <Link to="/pricing" className="text-sm font-medium py-2 hover:text-primary transition-colors">Pricing</Link>
              <Link to="/docs" className="text-sm font-medium py-2 hover:text-primary transition-colors">Documentation</Link>
              <Link to="/blog" className="text-sm font-medium py-2 hover:text-primary transition-colors">Blog</Link>
              <hr className="my-4" />
              <Link to="/login">
                <Button variant="ghost" className="w-full justify-start" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary-600 w-full">
                  Get Started <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
