
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
  BarChart3, 
  Bell, 
  Globe, 
  LineChart, 
  Lock, 
  Gauge,
  ScanLine,
  QrCode,
  Settings2,
  Users,
  Link2,
  ExternalLink,
  AlertTriangle,
  BarChart4,
  FileText,
  Zap
} from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 overflow-hidden px-4">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <span>Introducing Linklytics Analytics</span>
              <Link to="/features" className="text-xs underline">Read more</Link>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Discover and fix
              <br />
              broken links
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
              Linklytics is the comprehensive link analysis platform for websites that want to deliver flawless user experiences
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                  Start for free
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Get a demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LinkCheckForm />
          </div>
          
          <div className="mt-24">
            <div className="text-center text-sm text-muted-foreground mb-8">
              Trusted by businesses worldwide to maintain website integrity
            </div>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
              <img src="/placeholder.svg" alt="Company logo" className="h-8 opacity-70" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful features for modern websites</h2>
            <p className="text-lg text-muted-foreground">
              Linklytics is more than just a link checker. We've built a suite of powerful features that helps maintain your website integrity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="space-y-3 mb-6">
                <Card className="border shadow-sm overflow-hidden rounded-2xl">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-green-700" />
                        </div>
                        <div className="text-sm font-medium">Valid Link</div>
                      </div>
                      <div className="text-xs text-muted-foreground">87ms response time</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="h-3 w-3 text-primary" />
                        </div>
                        <div className="text-sm font-medium">https://example.com/about</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm overflow-hidden rounded-2xl">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-amber-700" />
                        </div>
                        <div className="text-sm font-medium">301 Redirect</div>
                      </div>
                      <div className="text-xs text-muted-foreground">192ms response time</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="h-3 w-3 text-primary" />
                        </div>
                        <div className="text-sm font-medium">https://example.com/blog</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm overflow-hidden rounded-2xl">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-red-700" />
                        </div>
                        <div className="text-sm font-medium">404 Not Found</div>
                      </div>
                      <div className="text-xs text-muted-foreground">64ms response time</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="h-3 w-3 text-primary" />
                        </div>
                        <div className="text-sm font-medium">https://example.com/old-page</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-bold mb-3">Comprehensive Link Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Scan your entire website for broken links, redirects, and performance issues to identify problems before your visitors do.
              </p>
              <Button variant="outline" size="sm" className="rounded-xl">
                Learn more
              </Button>
            </div>
            
            <div>
              <Card className="border shadow-sm mb-6 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center p-6 bg-muted/30 rounded-xl mb-4">
                    <div className="w-full h-48 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center">
                      <LineChart className="h-32 w-32 text-primary/70" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Total Links</div>
                      <div className="text-sm font-semibold">1,284</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Working Links</div>
                      <div className="text-sm font-semibold text-green-600">1,253</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Redirects</div>
                      <div className="text-sm font-semibold text-amber-600">24</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Broken Links</div>
                      <div className="text-sm font-semibold text-red-600">7</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <h3 className="text-xl font-bold mb-3">Detailed analytics and reporting</h3>
              <p className="text-muted-foreground mb-6">
                Get comprehensive reports with actionable insights to improve website health, user experience, and SEO performance.
              </p>
              <Button variant="outline" size="sm" className="rounded-xl">
                Try the demo
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <Card className="border shadow-sm mb-6 rounded-2xl">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Advanced Analysis</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-5 w-5" />
                        <span>Page Speed</span>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        <span>SEO Analysis</span>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-5 w-5" />
                        <span>External Links</span>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        <span>Alerts & Notifications</span>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <h3 className="text-xl font-bold mb-3">Beyond link checking</h3>
              <p className="text-muted-foreground mb-6">
                Monitor page speed, analyze SEO metrics, check external links, and receive notifications when new issues are detected.
              </p>
              <Button variant="outline" size="sm" className="rounded-xl">
                Learn more
              </Button>
            </div>
            
            <div>
              <Card className="border shadow-sm mb-6 rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-center mb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs mb-2">
                      <span>API ACCESS</span>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 font-mono text-xs overflow-x-auto mb-4">
                    <pre className="text-muted-foreground">
{`GET /api/v1/check?url=https://example.com
{
  "status": 200,
  "response_time": 87,
  "title": "Example Domain",
  "links": 24,
  "broken_links": 0
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              <h3 className="text-xl font-bold mb-3">Developer API</h3>
              <p className="text-muted-foreground mb-6">
                Integrate Linklytics directly into your workflow with our comprehensive API. Build custom solutions, automate testing, and implement continuous monitoring.
              </p>
              <Button variant="outline" size="sm" className="rounded-xl">
                Explore API docs
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24 bg-muted/30 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for you and start improving your website today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border shadow-sm relative rounded-2xl">
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
                  <Button variant="outline" className="w-full rounded-xl">
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border shadow-md relative rounded-2xl">
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
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                    Start Free Trial
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border shadow-sm relative rounded-2xl">
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
                  <Button variant="outline" className="w-full rounded-xl">
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does Linklytics work?</AccordionTrigger>
              <AccordionContent>
                Linklytics crawls your website pages to identify all internal and external links. It then checks each link's status, load time, and other metrics to identify issues like broken links (404 errors), redirects (301/302), slow response times, and SEO problems. You'll receive detailed reports with recommendations for fixing any issues found.
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
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12 text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start checking your links today</h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who trust Linklytics to monitor and optimize their online presence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white text-primary hover:bg-white/90">
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
