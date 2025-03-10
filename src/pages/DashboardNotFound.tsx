
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Home, AlertCircle } from "lucide-react";

const DashboardNotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent dashboard route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Page Not Found</h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <AlertCircle className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-6xl font-bold mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-8">
                This dashboard page doesn't exist or has been moved.
              </p>
              <Button size="lg" className="rounded-xl" asChild>
                <Link to="/dashboard">
                  <Home className="mr-2 h-5 w-5" />
                  Return to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardNotFound;
