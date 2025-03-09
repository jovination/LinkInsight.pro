
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LinkCheckForm } from '@/components/features/LinkCheckForm';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Bell, 
  CreditCard, 
  Globe, 
  LineChart, 
  Lock, 
  Gauge
} from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden px-4">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Monitor and fix broken links <span className="text-primary">automatically</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                LinkChecker helps you find and fix broken links, improve SEO, and enhance user experience on your website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary-600 w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Log In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="lg:px-8">
              <div className="rounded-xl overflow-hidden shadow-lg border">
                <LinkCheckForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Website Optimization</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to monitor, analyze, and improve your website's links and SEO.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Link Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Scan your entire website for broken links, redirects, and slow-loading pages in one go.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-Time Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get notified instantly when new broken links are detected or fixed on your website.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>SEO Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track key SEO metrics and get actionable recommendations to improve your search rankings.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Measure page load times and identify slow-loading resources affecting user experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Custom Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate detailed reports on your website's health and export in various formats.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>API Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrate with your tools and automate link checking with our powerful API (paid plans).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for you and start improving your website today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border shadow-sm relative">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>For personal projects</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {["100 link checks/month", "Basic SEO metrics", "Email reports", "1 project", "Community support"].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border shadow-md relative">
              <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For professional websites</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {[
                    "1,000 link checks/month", 
                    "Advanced SEO metrics", 
                    "Scheduled reports", 
                    "5 projects", 
                    "Priority support",
                    "API access",
                    "Custom exports"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary-600">
                    Start Free Trial
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border shadow-sm relative">
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <CardDescription>For larger websites & teams</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {[
                    "5,000 link checks/month", 
                    "Full SEO suite", 
                    "White-label reports", 
                    "Unlimited projects", 
                    "24/7 support",
                    "Advanced API access",
                    "Team collaboration",
                    "Custom integrations"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button variant="outline" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">
              Need something custom? Contact us for enterprise options.
            </p>
            <Link to="/contact">
              <Button variant="ghost">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does LinkChecker work?</AccordionTrigger>
              <AccordionContent>
                LinkChecker crawls your website pages to identify all internal and external links. It then checks each link's status, load time, and other metrics to identify issues like broken links (404 errors), redirects (301/302), slow response times, and SEO problems. You'll receive detailed reports with recommendations for fixing any issues found.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Is there a limit to how many URLs I can check?</AccordionTrigger>
              <AccordionContent>
                Yes, each plan has a specific limit on the number of link checks per month. The Free plan includes 100 checks, Pro plan includes 1,000 checks, and Business plan includes 5,000 checks. If you need more, we offer custom enterprise plans to suit your needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I schedule automatic link checks?</AccordionTrigger>
              <AccordionContent>
                Yes, paid plans include the ability to schedule automatic link checks on a daily, weekly, or monthly basis. You can also set up email notifications to receive reports when checks are completed or when new issues are found.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time from your account settings. Once canceled, you'll continue to have access to your paid features until the end of your current billing period. We don't offer refunds for partial months.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Do you offer enterprise solutions?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer custom enterprise plans for larger organizations with specific needs. Enterprise plans include dedicated support, custom integrations, SLA guarantees, and can be tailored to your exact requirements. Contact our sales team for more information.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I export my reports?</AccordionTrigger>
              <AccordionContent>
                Yes, paid plans allow you to export reports in various formats including CSV, PDF, and JSON. You can also schedule automated reports to be generated and emailed to you or your team on a regular basis.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary to-primary-700 rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12 text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start checking your links today</h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who trust LinkChecker to monitor and optimize their online presence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/demo">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white/10 hover:bg-white/20 text-white">
                      Request Demo
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-white/60 mt-4">
                  No credit card required. 14-day free trial on all plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
