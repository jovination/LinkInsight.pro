
import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CreditCard, 
  Download, 
  FileText, 
  Check, 
  Clock,
  CreditCardIcon,
  BadgeCheck,
  BellRing,
  ArrowRight,
  Plus,
  Settings,
  Zap
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiService, InvoiceData, SubscriptionPlan } from '@/services/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';

const BillingPage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch invoices data
  const { 
    data: invoices = [], 
    isLoading: isLoadingInvoices 
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: apiService.getInvoices
  });
  
  // Fetch subscription plans
  const {
    data: plans = [],
    isLoading: isLoadingPlans
  } = useQuery({
    queryKey: ['subscriptionPlans'],
    queryFn: apiService.getSubscriptionPlans
  });

  // Update payment method mutation
  const updatePaymentMutation = useMutation({
    mutationFn: () => apiService.updatePaymentMethod(),
    onSuccess: () => {
      toast.success('Payment method updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update payment method');
    }
  });
  
  // Upgrade plan mutation
  const upgradePlanMutation = useMutation({
    mutationFn: apiService.upgradePlan,
    onSuccess: () => {
      toast.success('Plan upgraded successfully');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upgrade plan');
    }
  });

  const handleUpdatePayment = () => {
    updatePaymentMutation.mutate();
  };

  const handleUpgradePlan = (planId: string) => {
    if (confirm(`Are you sure you want to upgrade to the ${planId} plan?`)) {
      upgradePlanMutation.mutate(planId);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-auto">
        <DashboardHeader title="Billing & Subscription" />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <Tabs defaultValue="subscription" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>

              <TabsContent value="subscription" className="space-y-6">
                {/* Current Plan */}
                <Card className="border-primary/10 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Current Plan</CardTitle>
                    <CardDescription>
                      Your current subscription plan and details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1)} Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          {user?.plan === 'free' ? 'Limited access to features' : 
                           user?.plan === 'pro' ? 'Full access to most features' : 
                           'Complete access to all features'}
                        </p>
                      </div>
                      <Badge className="px-3 py-1 text-sm rounded-full bg-green-500 text-white">Active</Badge>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Plan Features</h4>
                      <ul className="space-y-2">
                        {user?.plan === 'free' && (
                          <>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              10 link checks per day
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Basic link health monitoring
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Email notifications
                            </li>
                          </>
                        )}
                        {user?.plan === 'pro' && (
                          <>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              100 link checks per day
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Advanced SEO metrics
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Scheduled reports
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              API access
                            </li>
                          </>
                        )}
                        {user?.plan === 'enterprise' && (
                          <>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Unlimited link checks
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Custom integrations
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Priority support
                            </li>
                            <li className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Team collaboration
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleUpdatePayment}
                      disabled={updatePaymentMutation.isPending}
                      className="rounded-xl border-primary/10"
                    >
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Update Payment Method
                    </Button>
                    {user?.plan !== 'enterprise' && (
                      <Button className="rounded-xl">
                        Upgrade Plan
                      </Button>
                    )}
                  </CardFooter>
                </Card>
                
                {/* Available Plans */}
                <h2 className="text-xl font-semibold mt-6">Available Plans</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {isLoadingPlans ? (
                    <div className="col-span-3 py-8 text-center">Loading available plans...</div>
                  ) : (
                    plans.map((plan) => (
                      <Card key={plan.id} className={`border-primary/10 rounded-2xl shadow-sm ${user?.plan === plan.id ? 'ring-2 ring-primary' : ''}`}>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            {plan.price === 0 ? 'Free' : `${formatPrice(plan.price)}/month`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant={user?.plan === plan.id ? 'outline' : 'default'} 
                            className="w-full rounded-xl"
                            disabled={user?.plan === plan.id || upgradePlanMutation.isPending}
                            onClick={() => handleUpgradePlan(plan.id)}
                          >
                            {user?.plan === plan.id ? 'Current Plan' : 'Upgrade'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="invoices" className="space-y-6">
                <Card className="border-primary/10 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Invoices & Payments</CardTitle>
                    <CardDescription>
                      View and download your past invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingInvoices ? (
                      <div className="py-8 text-center">Loading invoices...</div>
                    ) : invoices.length === 0 ? (
                      <div className="py-8 text-center text-muted-foreground">
                        No invoices found
                      </div>
                    ) : (
                      <div className="divide-y">
                        {invoices.map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between py-4">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <div>
                                <p className="font-medium">{invoice.description || `Invoice #${invoice.id}`}</p>
                                <p className="text-sm text-muted-foreground">{invoice.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`text-sm font-medium ${
                                invoice.status === 'paid' ? 'text-green-500' : 
                                invoice.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                              }`}>
                                {invoice.amount}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => window.open(invoice.downloadUrl, '_blank')}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="space-y-6">
                <Card className="border-primary/10 rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Usage Statistics</CardTitle>
                    <CardDescription>
                      Monitor your service usage and limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Link Checks Usage</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used</span>
                          <span>156 / 3000</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '5%' }} />
                        </div>
                        <p className="text-xs text-muted-foreground">5% of monthly allowance used</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Reports Generated</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used</span>
                          <span>3 / 10</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '30%' }} />
                        </div>
                        <p className="text-xs text-muted-foreground">30% of monthly allowance used</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">API Calls</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used</span>
                          <span>423 / 10,000</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '4%' }} />
                        </div>
                        <p className="text-xs text-muted-foreground">4% of monthly allowance used</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

// Missing component, need to define it
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {children}
    </span>
  );
};

export default BillingPage;
