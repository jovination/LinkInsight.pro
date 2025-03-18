import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle2, ExternalLink, AlertTriangle, LineChart, Gauge, Globe, Link2, Bell } from 'lucide-react'

function FeatureSection() {
  return (
    <div>
      <section className="py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful features for modern websites</h2>
            <p className="text-lg text-muted-foreground">
              LinkInsight is more than just a link checker. We've built a suite of powerful features that helps maintain your website integrity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="space-y-3 mb-6">
                <Card className="border shadow-sm overflow-hidden rounded-3xl">
                  <CardContent className="p-2">
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
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">https://example.com/about</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm overflow-hidden rounded-3xl">
                  <CardContent className="p-2">
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
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">https://example.com/blog</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border shadow-sm overflow-hidden rounded-3xl">
                  <CardContent className="p-2">
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
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-primary" />
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
              <Card className="border shadow-sm overflow-hidden rounded-3xl mb-6">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-xl">Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center p-6 bg-muted/30  rounded-3xl mb-4">
                    <div className="w-full h-48  rounded-2xl flex items-center justify-center">
                      <LineChart className="h-32 w-32 text-primary/70 font-thin" />
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
              <Card className="w-full border shadow-sm overflow-hidden rounded-3xl mb-6">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-xl">Advanced Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Gauge className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">Page Speed</div>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">SEO Analysis</div>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Link2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">External Links</div>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm font-medium">Alerts & Notifications</div>
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
              <Card className="border shadow-sm overflow-hidden rounded-3xl mb-6">
                <CardHeader className="px-6 py-4">
                  <CardTitle className="text-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      <span>API ACCESS</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
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
                Integrate LinkInsight directly into your workflow with our comprehensive API. Build custom solutions, automate testing, and implement continuous monitoring.
              </p>
              <Button variant="outline" size="sm" className="rounded-xl">
                Explore API docs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeatureSection