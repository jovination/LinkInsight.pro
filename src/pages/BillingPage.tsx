
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, CreditCard, Receipt, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '@/services/supabase';
import SubscriptionManager from '@/components/billing/SubscriptionManager';
import { UserRoleProvider } from '@/components/UserRoleProvider';

const BillingPage: React.FC = () => {
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: supabaseService.getInvoices
  });

  return (
    <UserRoleProvider>
      <DashboardLayout>
        <div className="space-y-6">
          <DashboardHeader 
            title="Billing & Subscription" 
            description="Manage your subscription plan and payment methods"
          />
          
          <Tabs defaultValue="subscription" className="space-y-6">
            <TabsList>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionManager />
            </TabsContent>
            
            <TabsContent value="invoices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : !invoices || invoices.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No invoices found</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <Receipt className="h-4 w-4 mr-2 text-muted-foreground" />
                                {invoice.description || `Invoice #${invoice.id.substring(0, 8)}`}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(invoice.date).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>${invoice.amount}</TableCell>
                            <TableCell>
                              <Badge variant={invoice.status === 'paid' ? 'outline' : 'destructive'}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Link Checks</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Link checks used this month</span>
                            <span className="font-medium">245 / 1,000</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '24.5%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Reports Generated</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Reports used this month</span>
                            <span className="font-medium">3 / 10</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bulk Analysis</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Bulk analyses used this month</span>
                            <span className="font-medium">12 / 50</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '24%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </UserRoleProvider>
  );
};

export default BillingPage;
