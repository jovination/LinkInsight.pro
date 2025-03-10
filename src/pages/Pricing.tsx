
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Get started with basic link checking',
      features: [
        'Up to 100 links checked per month',
        'Basic link health reports',
        'Email notifications for broken links',
        'Standard support'
      ]
    },
    {
      name: 'Pro',
      price: '$19',
      description: 'For growing websites and small businesses',
      features: [
        'Up to 1,000 links checked per month',
        'Advanced link health analysis',
        'SEO impact reports',
        'Custom scan scheduling',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$49',
      description: 'For large sites with advanced needs',
      features: [
        'Unlimited link checking',
        'Custom API access',
        'Multi-domain support',
        'Advanced analytics and reporting',
        'Custom integrations',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="py-20 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your link checking needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                plan.popular ? 'border-primary shadow-lg relative' : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader className={`p-6 ${plan.popular ? 'bg-primary/5' : ''}`}>
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className={`w-full rounded-xl ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary-600' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                  asChild
                >
                  <Link to="/signup">
                    {plan.name === 'Free' ? 'Sign up' : 'Start Trial'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need something custom?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer tailored solutions for large enterprises and unique use cases.
            Contact our sales team to discuss your specific requirements.
          </p>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
