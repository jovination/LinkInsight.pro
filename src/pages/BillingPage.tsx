import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Download,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

const BillingPage = () => {
  const invoices = [
    { id: 'INV-001', date: 'May 1, 2023', amount: '$19.99', status: 'Paid' },
    { id: 'INV-002', date: 'April 1, 2023', amount: '$19.99', status: 'Paid' },
    { id: 'INV-003', date: 'March 1, 2023', amount: '$19.99', status: 'Paid' },
    { id: 'INV-004', date: 'February 1, 2023', amount: '$19.99', status: 'Paid' },
  ];

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col h-screen overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Billing & Subscription</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-primary hover:bg-primary-600 rounded-xl">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">Pro Plan</div>
                  <p className="text-xs text-muted-foreground mb-4">
                    $19.99 per month, billed monthly
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited link checks</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom reporting</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>API access</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full rounded-xl" asChild>
                      <a href="/pricing">
                        Compare Plans
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 h-10 w-14 rounded-md bg-gradient-to-r from-blue-600 to-blue-400"></div>
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-xs text-muted-foreground">Expires 12/2025</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-xl">Edit</Button>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Next billing date: June 1, 2023
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10">
                <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Usage Summary</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Link Checks</span>
                        <span className="font-medium">758 / Unlimited</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-primary/10">
                        <div className="h-full w-[60%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>API Calls</span>
                        <span className="font-medium">2,456 / 10,000</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-primary/10">
                        <div className="h-full w-[25%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Reports Generated</span>
                        <span className="font-medium">12 / 50</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-primary/10">
                        <div className="h-full w-[24%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="border-primary/10">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Billing History</CardTitle>
                <CardDescription>View and download your past invoices.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-[1fr_100px_100px_80px] gap-2 px-4 py-3 text-sm font-medium text-muted-foreground">
                    <div>Invoice</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div></div>
                  </div>
                  
                  {invoices.map((invoice, index) => (
                    <div key={index} className="grid grid-cols-[1fr_100px_100px_80px] gap-2 px-4 py-3 text-sm items-center">
                      <div className="font-medium">{invoice.id}</div>
                      <div className="text-muted-foreground">{invoice.date}</div>
                      <div>{invoice.amount}</div>
                      <div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BillingPage;
