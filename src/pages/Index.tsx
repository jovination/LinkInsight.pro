import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  CheckCircle, 
  ExternalLink, 
  BarChart2, 
  Clock, 
  AlertTriangle,
  Search,
  Globe,
  FileText,
  Mail,
  Code,
  Zap,
  BellRing
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/20 dark:to-background z-0" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 animate-slide-down">
              Monitor and analyze your links with precision
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-down" style={{ animationDelay: '100ms' }}>
              Powerful link checking and analysis for developers, marketers, and SEO experts.
            </p>
            <div className="max-w-md mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex gap-2">
                <Input 
                  type="url" 
                  placeholder="Enter a website URL" 
                  className="rounded-lg"
                />
                <Link to="/dashboard/links">
                  <Button size="lg" className="bg-primary hover:bg-primary-600">
                    Analyze <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Free plan includes 100 links per month. No credit card required.
              </p>
            </div>
          </div>
          
          {/* Features overview */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center text-success mb-2">
                  <Search className="h-5 w-5" />
                </div>
                <CardTitle>Link Analysis</CardTitle>
                <CardDescription>Check status codes & detect broken links</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Status code verification</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Redirect chain analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Response time metrics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center text-info mb-2">
                  <Globe className="h-5 w-5" />
                </div>
                <CardTitle>Website Scanning</CardTitle>
                <CardDescription>Crawl entire sites for comprehensive analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Full website crawling</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Internal & external link analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>SEO metadata verification</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning mb-2">
                  <BellRing className="h-5 w-5" />
                </div>
                <CardTitle>Alerts & Monitoring</CardTitle>
                <CardDescription>Get notified when links break or change</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Scheduled monitoring</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Email & push notifications</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Custom alert thresholds</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Trusted by */}
          <div className="mt-20 text-center">
            <h2 className="text-lg font-medium text-muted-foreground mb-6">Trusted by thousands of companies worldwide</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, index) => (
                <div key={index} className="text-2xl font-bold opacity-30 hover:opacity-70 transition-opacity">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How LinkChecker Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A powerful toolkit for managing and monitoring your links, websites, and online presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Enter your links</h3>
              <p className="text-muted-foreground">
                Add individual links or upload CSV files with bulk URLs to analyze. Or scan entire websites to discover all links.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <BarChart2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get instant analysis</h3>
              <p className="text-muted-foreground">
                Our system analyzes status codes, response times, redirects, and SEO metrics for all your links.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Review detailed reports</h3>
              <p className="text-muted-foreground">
                Get comprehensive reports with actionable insights. Export data in CSV, PDF or integrate with your tools.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Set up monitoring</h3>
              <p className="text-muted-foreground">
                Schedule regular checks for your important links and websites. Choose hourly, daily, or weekly monitoring.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">5. Get alerts</h3>
              <p className="text-muted-foreground">
                Receive instant notifications when your links break, slow down, or change. Stay ahead of problems.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ExternalLink className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">6. Fix issues</h3>
              <p className="text-muted-foreground">
                Use our suggestions to fix broken links, optimize redirects, and improve website performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage, monitor, and optimize your links and websites.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="order-2 md:order-1">
              <h3 className="heading-md mb-4">Comprehensive Link Analysis</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Status Code Verification</h4>
                    <p className="text-muted-foreground">Check HTTP status codes (200, 404, 301, etc.) for all your links</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Redirect Chain Analysis</h4>
                    <p className="text-muted-foreground">Track and optimize redirect chains to improve SEO and performance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Response Time Metrics</h4>
                    <p className="text-muted-foreground">Monitor load times and performance for every link you track</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Bulk Analysis</h4>
                    <p className="text-muted-foreground">Check hundreds or thousands of links at once with CSV uploads</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex items-center justify-center">
              <div className="bg-card rounded-xl p-6 shadow-card border w-full max-w-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-medium">Link Analysis Results</h4>
                      <p className="text-sm text-muted-foreground">Last checked: 2 mins ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 px-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-success"></div>
                        <span className="text-sm font-medium">Valid Links</span>
                      </div>
                      <span className="font-medium">127</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 px-3 bg-warning/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-warning"></div>
                        <span className="text-sm font-medium">Redirects</span>
                      </div>
                      <span className="font-medium">43</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 px-3 bg-destructive/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-destructive"></div>
                        <span className="text-sm font-medium">Broken Links</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-muted-foreground"></div>
                        <span className="text-sm font-medium">Slow Links (>2s)</span>
                      </div>
                      <span className="font-medium">35</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-px bg-border my-16"></div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex items-center justify-center">
              <div className="bg-card rounded-xl p-6 shadow-card border w-full max-w-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-medium">Website Scan Results</h4>
                      <p className="text-sm text-muted-foreground">example.com - Last scan: Today</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Search className="mr-2 h-4 w-4" /> Rescan
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Pages Scanned</span>
                      <span className="font-medium">152</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Links Found</span>
                      <span className="font-medium">1,367</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Internal Links</span>
                      <span className="font-medium">894</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">External Links</span>
                      <span className="font-medium">473</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Broken Links</span>
                      <span className="font-medium text-destructive">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">SEO Issues</span>
                      <span className="font-medium text-warning">17</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="heading-md mb-4">Website Scanning & SEO</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Full Website Crawler</h4>
                    <p className="text-muted-foreground">Discover and analyze all links on your website automatically</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">SEO Metadata Verification</h4>
                    <p className="text-muted-foreground">Check titles, descriptions, headings, and other SEO elements</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Internal Link Structure</h4>
                    <p className="text-muted-foreground">Analyze your site's link architecture and identify improvements</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Mobile Compatibility</h4>
                    <p className="text-muted-foreground">Ensure your site works perfectly on mobile devices</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that's right for you. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>For individuals and small projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>100 links per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Basic link analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>5 scheduled checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Email reports</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  <Link to="/signup" className="w-full">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="relative border-primary glass-card">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>For professionals and growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>5,000 links per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Advanced analysis & SEO checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>50 scheduled checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Email & slack notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>CSV & PDF exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-primary hover:bg-primary-600">
                  <Link to="/signup" className="w-full">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>For larger teams and enterprises</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>50,000 links per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>All Pro features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Unlimited scheduled checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  <Link to="/signup" className="w-full">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Need a custom plan? <Link to="/contact" className="text-primary font-medium hover:underline">Contact us</Link> for enterprise solutions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">More Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage your online presence effectively
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Mail className="h-5 w-5" />
                </div>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant email alerts when your links break or websites have issues. Stay ahead of problems.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle>Detailed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate comprehensive PDF and CSV reports for your team, clients, or stakeholders.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Code className="h-5 w-5" />
                </div>
                <CardTitle>API Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrate link checking into your own applications with our comprehensive REST API.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle>Scheduled Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set up automatic checks at your preferred intervals - hourly, daily, weekly, or monthly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Globe className="h-5 w-5" />
                </div>
                <CardTitle>Multi-location Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Check your links from different geographic locations to ensure global availability.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Zap className="h-5 w-5" />
                </div>
                <CardTitle>Bulk Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload, check, and manage thousands of links at once with our powerful batch tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about LinkChecker
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is LinkChecker?</AccordionTrigger>
              <AccordionContent>
                LinkChecker is a comprehensive link analysis and monitoring tool that helps you identify broken links, analyze redirects, check status codes, and monitor website health. It&apos;s perfect for developers, marketers, and SEO professionals who need to ensure their online presence is error-free.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the free plan work?</AccordionTrigger>
              <AccordionContent>
                Our free plan allows you to check up to 100 links per month, with basic link analysis features, 5 scheduled checks, and email reports. It&apos;s perfect for individuals and small projects. No credit card is required to sign up.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I scan my entire website?</AccordionTrigger>
              <AccordionContent>
                Yes, LinkChecker can crawl your entire website to discover and analyze all internal and external links. The number of links you can check depends on your subscription plan. Our website crawler respects robots.txt files and can be configured to scan specific parts of your site.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How do notifications work?</AccordionTrigger>
              <AccordionContent>
                You can set up custom notifications via email, Slack, or webhook. Configure alerts for specific events like broken links, slow response times, or changes in status codes. You can also customize the frequency of notifications to avoid alert fatigue.
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
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 md:p-12 text-white">
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
