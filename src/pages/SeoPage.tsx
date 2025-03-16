
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, FileText, Link, Share2, BarChart } from 'lucide-react';
import SeoAnalyzer from '@/components/features/SeoAnalyzer';
import SeoHighlightSection from '@/components/features/SeoHighlightSection';

const SeoPage = () => {
  return (
    <DashboardLayout>
      <>
        <DashboardHeader title="SEO Analysis" />
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* SEO Score Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall SEO Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-2">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">78/100</p>
                <p className="text-sm text-muted-foreground mt-1">Good - Up 6% from last scan</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Content Quality Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Content Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average word count:</span>
                  <span className="font-medium">1,230</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Readability:</span>
                  <span className="font-medium">Good</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Keyword density:</span>
                  <span className="font-medium">2.4%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Technical SEO Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Technical SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-2">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2 mt-2">
                <Badge variant="outline" className="mr-1 bg-green-50 text-green-800 hover:bg-green-100">Schema markup</Badge>
                <Badge variant="outline" className="mr-1 bg-green-50 text-green-800 hover:bg-green-100">SSL enabled</Badge>
                <Badge variant="outline" className="mr-1 bg-red-50 text-red-800 hover:bg-red-100">Mobile optimization needed</Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100">Page speed improvements</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-2">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Page load time:</span>
                  <span className="font-medium">2.3s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mobile speed:</span>
                  <span className="font-medium">3.1s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server response:</span>
                  <span className="font-medium">0.8s</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Keyword Rankings Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-2">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">"link checker tool"</span>
                  <span className="text-sm">Position 12 (+3)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">"broken link finder"</span>
                  <span className="text-sm">Position 8 (+1)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">"seo analysis tool"</span>
                  <span className="text-sm">Position 24 (-2)</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Backlinks Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-2">
                <Link className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total backlinks:</span>
                  <span className="font-medium">246</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Referring domains:</span>
                  <span className="font-medium">78</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Domain Rating:</span>
                  <span className="font-medium">32/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Social Signals */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Social Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-2">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Facebook:</span>
                  <span className="font-medium">143 shares</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Twitter:</span>
                  <span className="font-medium">89 mentions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">LinkedIn:</span>
                  <span className="font-medium">62 shares</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* SEO Analyzer Component */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Website SEO Analysis</CardTitle>
              <CardDescription>
                Enter a URL to analyze its SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SeoAnalyzer />
            </CardContent>
          </Card>
        </div>
        
        {/* SEO Highlight Section */}
        <div className="mt-6">
          <SeoHighlightSection />
        </div>
      </>
    </DashboardLayout>
  );
};

export default SeoPage;
