
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, BarChart, Search, Globe, ArrowUpRight, Gauge, CheckCircle } from 'lucide-react';

const SeoHighlightSection = () => {
  return (
    <section className="py-16 px-4 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced SEO Analysis</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive SEO tools to help you optimize your website and improve search rankings
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* SEO Score Card */}
          <Card className="shadow-md relative overflow-hidden border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-primary">87/100</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">SEO Score</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive evaluation of your site's search engine readiness
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Meta Tags</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Content Quality</span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} className="h-2" indicatorClassName="bg-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Mobile Optimization</span>
                    <span className="text-sm text-muted-foreground">95%</span>
                  </div>
                  <Progress value={95} className="h-2" indicatorClassName="bg-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Keyword Analysis Card */}
          <Card className="shadow-md relative overflow-hidden border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Keyword Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Optimize content for target keywords and search intent
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm font-medium">digital marketing</span>
                  <div className="flex items-center">
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm font-medium">seo analytics</span>
                  <div className="flex items-center">
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm font-medium">link building</span>
                  <div className="flex items-center">
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-500">+5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Backlinks Analysis Card */}
          <Card className="shadow-md relative overflow-hidden border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Backlink Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor and analyze your site's incoming links
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">High-quality sources</span>
                  </div>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm">Medium-quality sources</span>
                  </div>
                  <span className="text-sm font-medium">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Domain authority</span>
                  </div>
                  <span className="text-sm font-medium">58/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-muted text-sm mb-6">
            <span className="px-3 py-1">Track your SEO progress over time</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mx-auto max-w-4xl h-64 flex items-center justify-center">
            <LineChart className="h-32 w-32 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoHighlightSection;
