
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, CreditCard, Rocket, CheckCheck } from 'lucide-react';
import { useUserRole } from '@/components/UserRoleProvider';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const plans = [
  {
    id: 'free',
    name: 'Free Plan',
    price: '$0/month',
    description: 'Basic link checking capabilities',
    features: [
      'Up to 100 links checked per month',
      'Basic link health reports',
      'Email notifications for broken links',
      'Standard support (48-hour response time)'
    ],
    limits: {
      linksPerMonth: 100,
      reportsPerMonth: 1,
      maxBulkLinks: 10,
      apiAccess: false
    }
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$19/month',
    description: 'Advanced link analysis with custom tools',
    features: [
      'Up to 1,000 links checked per month',
      'Advanced link health and SEO analysis',
      'Custom scan scheduling',
      'Priority support (12-hour response time)'
    ],
    limits: {
      linksPerMonth: 1000,
      reportsPerMonth: 10,
      maxBulkLinks: 100,
      apiAccess: true
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: '$49/month',
    description: 'Unlimited checks with custom features',
    features: [
      'Unlimited link checks',
      'API access for automation',
      'Multi-domain monitoring',
      'Dedicated account manager and custom integrations'
    ],
    limits: {
      linksPerMonth: Infinity,
      reportsPerMonth: Infinity,
      maxBulkLinks: 1000,
      apiAccess: true
    }
  }
];

const SubscriptionManager = () => {
  const { userRole, updateUserRole } = useUserRole();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = (plan: typeof plans[0]) => {
    if (plan.id === userRole) {
      toast.info(`You are already subscribed to the ${plan.name}`);
      return;
    }
    
    setSelectedPlan(plan);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user role after successful payment
      await updateUserRole(selectedPlan.id as 'free' | 'pro' | 'enterprise');
      
      toast.success(`Successfully upgraded to ${selectedPlan.name}!`);
      setIsPaymentDialogOpen(false);
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Subscription</h2>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.id === userRole ? 'border-primary ring-1 ring-primary' : ''
            }`}
          >
            {plan.id === userRole && (
              <div className="absolute top-0 right-0 bg-primary text-white rounded-bl-lg px-3 py-1 text-xs font-medium">
                Current Plan
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <p className="mt-2">{plan.description}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id === userRole ? (
                <Button className="w-full" variant="outline" disabled>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Current Plan
                </Button>
              ) : plan.id === 'free' ? (
                <Button className="w-full" variant="outline" onClick={() => handleUpgrade(plan)}>
                  Downgrade
                </Button>
              ) : (
                <Button className="w-full" onClick={() => handleUpgrade(plan)}>
                  {userRole === 'free' ? 'Upgrade' : 'Change Plan'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upgrade to {selectedPlan?.name}</DialogTitle>
            <DialogDescription>
              Enter your payment details to complete the upgrade
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardName" className="text-right">
                  Name on Card
                </Label>
                <Input id="cardName" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardNumber" className="text-right">
                  Card Number
                </Label>
                <Input id="cardNumber" className="col-span-3" required 
                  placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry" className="text-right">
                  Expiry Date
                </Label>
                <Input id="expiry" className="col-span-3" required 
                  placeholder="MM/YY" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cvc" className="text-right">
                  CVC
                </Label>
                <Input id="cvc" className="col-span-3" required 
                  placeholder="123" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>Pay {selectedPlan?.price.split('/')[0]}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Current Plan Details */}
      {userRole !== 'free' && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Billing Period</p>
                <p className="text-sm text-muted-foreground">May 1, 2023 - June 1, 2023</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Payment Method</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CreditCard className="mr-1 h-4 w-4" />
                  Visa ending in 4242
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground">June 1, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{plans.find(p => p.id === userRole)?.price.split('/')[0]}</p>
                <p className="text-sm text-muted-foreground">Next charge</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Button variant="outline" className="text-destructive hover:bg-destructive/10">
              Cancel Subscription
            </Button>
            <Button variant="outline">
              Download Invoices
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionManager;
