
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, BarChart, Globe, ArrowUpRight, CheckCircle, Gauge } from 'lucide-react';

const SeoHighlightSection = () => {
  return (
    <div className="container px-6 md:px-12 py-12 mx-auto">
       <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advanced SEO Analysis
            </h2>
            <p className="text-lg text-muted-foreground">
            Comprehensive SEO tools to help you optimize your website and improve search rankings

</p>
          </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      <Card className="relative overflow-hidden rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">SEO Score</span>
            </div>
            <Badge variant="secondary">87/100</Badge>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-muted-foreground">Meta Tags</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-1" />
            </div>
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-muted-foreground">Content Quality</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-1" />
            </div>
            <div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-muted-foreground">Mobile Optimization</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Analysis Card */}
      <Card className="relative overflow-hidden rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Keyword Analysis</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm">digital marketing</span>
              <div className="flex items-center gap-1 text-emerald-500">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-xs">+12%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm">seo analytics</span>
              <div className="flex items-center gap-1 text-emerald-500">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-xs">+8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <span className="text-sm">link building</span>
              <div className="flex items-center gap-1 text-emerald-500">
                <ArrowUpRight className="h-3 w-3" />
                <span className="text-xs">+5%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backlink Profile Card */}
      <Card className="relative overflow-hidden rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Backlink Profile</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">High-quality sources</span>
              </div>
              <Badge variant="secondary">24</Badge>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Medium-quality sources</span>
              </div>
              <Badge variant="secondary">42</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                <span className="text-sm">Domain authority</span>
              </div>
              <Badge variant="secondary">58/100</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default SeoHighlightSection;
