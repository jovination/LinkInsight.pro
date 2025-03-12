
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, CreditCard, Download, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiService, InvoiceData } from '@/services/api';
import { toast } from 'sonner';

const BillingPage = () => {
  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Fetch invoices with proper types
  const { 
    data: invoices = [], 
    isLoading: isLoadingInvoices 
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: apiService.getInvoices
  });

  // Payment method update mutation
  const updatePaymentMutation = useMutation({
    mutationFn: (paymentMethodId: string) => apiService.updatePaymentMethod(paymentMethodId),
    onSuccess: () => {
      toast.success('Payment method updated successfully');
      setCardNumber('');
      setCardName('');
      setExpiryDate('');
      setCvv('');
    },
    onError: (error: Error) => {
      toast.error('Failed to update payment method: ' + error.message);
    }
  });

  const handleUpdatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error('Please fill all payment details');
      return;
    }
    
    // In a real app, you would tokenize this card info using a payment processor
    // and send only the token to your server. Never send raw card details!
    const mockPaymentMethodId = 'pm_' + Math.random().toString(36).substr(2, 9);
    updatePaymentMutation.mutate(mockPaymentMethodId);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-auto">
        <DashboardHeader title="Billing & Payments" />
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <Card className="border-primary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-primary/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold capitalize">{user?.plan || 'Free'}</span>
                          <Badge variant="outline" className="uppercase">
                            {user?.plan === 'pro' ? 'Active' : 'Limited'}
                          </Badge>
                        </div>
                      </div>
                      {user?.plan === 'free' && (
                        <Button className="rounded-xl bg-primary hover:bg-primary/90">
                          Upgrade to Pro
                        </Button>
                      )}
                      {user?.plan === 'pro' && (
                        <Button variant="outline" className="rounded-xl border-primary/10">
                          Manage Plan
                        </Button>
                      )}
                    </div>
                    {user?.plan === 'pro' && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        Your next payment of <strong>$19.99</strong> will be processed on <strong>Aug 1, 2023</strong>
                      </div>
                    )}
                  </div>
                  
                  <div className="rounded-xl border border-primary/10 p-4">
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <form onSubmit={handleUpdatePayment} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative mt-1">
                            <Input 
                              id="cardNumber" 
                              placeholder="4242 4242 4242 4242" 
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="pl-10"
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input 
                            id="cardName" 
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input 
                              id="expiryDate" 
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        disabled={updatePaymentMutation.isPending}
                        className="rounded-xl w-full"
                      >
                        {updatePaymentMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Update Payment Method'
                        )}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past invoices and billing history</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingInvoices ? (
                    <div className="flex justify-center p-4">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : invoices.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      No invoices found
                    </div>
                  ) : (
                    <div className="rounded-xl border border-primary/10 divide-y divide-primary/10">
                      {invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{invoice.description}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(invoice.date)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="font-medium">${invoice.amount.toFixed(2)}</div>
                              <div className="flex items-center text-xs">
                                {invoice.status === 'paid' ? (
                                  <>
                                    <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                                    <span className="text-green-500">Paid</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
                                    <span className="text-amber-500">{invoice.status}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="border-primary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle>Plan Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Links Monitored</span>
                      <span className="font-medium">8 / 100</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">API Requests</span>
                      <span className="font-medium">43% used</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '43%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">17% used</span>
                    </div>
                    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-primary/10 bg-primary/5 px-6">
                  <div className="w-full">
                    <div className="text-center text-sm text-muted-foreground mb-2">
                      Need more resources?
                    </div>
                    <Button className="w-full rounded-xl">
                      Upgrade Plan
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="border-primary/10 rounded-2xl">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button className="text-left w-full p-3 rounded-xl hover:bg-primary/5 transition-colors">
                    <h3 className="font-medium">Contact Support</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get help from our support team
                    </p>
                  </button>
                  <Separator className="my-2" />
                  <button className="text-left w-full p-3 rounded-xl hover:bg-primary/5 transition-colors">
                    <h3 className="font-medium">Billing FAQ</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Common billing questions
                    </p>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BillingPage;
