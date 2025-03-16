import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Send, 
  ChevronRight, 
  ChevronDown, 
  LineChart, 
  Link as LinkIcon,
  BarChart,
  Loader2
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('link-health');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Generate report mutation
  const generateMutation = useMutation({
    mutationFn: (reportType: string) => apiService.generateReport(reportType),
    onSuccess: (data) => {
      toast.success('Report generated successfully');
      // In a real app, you'd likely download the report or open it in a new tab
      if (typeof data === 'string') {
        window.open(data, '_blank');
      }
      setLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate report');
      setLoading(false);
    }
  });

  const handleGenerateReport = () => {
    setLoading(true);
    generateMutation.mutate(reportType);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    apiService.exportLinks(format)
      .then(url => {
        window.open(url, '_blank');
        toast.success(`Exported as ${format.toUpperCase()}`);
      })
      .catch(error => {
        toast.error(`Export failed: ${error.message}`);
      });
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Generate New Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link-health">Link Health Report</SelectItem>
                    <SelectItem value="seo-analysis">SEO Analysis</SelectItem>
                    <SelectItem value="performance">Performance Metrics</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">Specific URL (Optional)</Label>
                <Input 
                  id="url" 
                  placeholder="https://example.com" 
                  value={url} 
                  onChange={e => setUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to include all monitored links
                </p>
              </div>
              
              <Button 
                onClick={handleGenerateReport}
                disabled={loading || generateMutation.isPending}
                className="w-full"
              >
                {(loading || generateMutation.isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: '1', name: 'Monthly Link Health - June 2023', type: 'link-health', date: '2023-06-30', size: '1.2 MB' },
                  { id: '2', name: 'SEO Analysis - Q2 2023', type: 'seo-analysis', date: '2023-06-15', size: '2.4 MB' },
                  { id: '3', name: 'Performance Metrics - May 2023', type: 'performance', date: '2023-05-31', size: '0.8 MB' },
                ].map(report => (
                  <div key={report.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          {report.type === 'link-health' && <LinkIcon className="h-5 w-5 text-primary" />}
                          {report.type === 'seo-analysis' && <BarChart className="h-5 w-5 text-primary" />}
                          {report.type === 'performance' && <LineChart className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-xs text-muted-foreground">Generated on {report.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {report.size}
                        </Badge>
                        <Button variant="ghost" size="icon" onClick={() => toggleExpand(report.id)}>
                          {expanded[report.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {expanded[report.id] && (
                      <div className="mt-3 pt-3 border-t flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Export Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Links Database</h3>
                      <p className="text-sm text-muted-foreground">
                        Export all your monitored links with their status
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">SEO Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Export SEO metrics and performance data
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Historical Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Export historical link health and performance trends
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <LinkIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Basic Link Health</h3>
                        <p className="text-sm text-muted-foreground">
                          Simple overview of link statuses
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Detailed SEO Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive SEO metrics and recommendations
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-3 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <LineChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Executive Summary</h3>
                        <p className="text-sm text-muted-foreground">
                          High-level overview for stakeholders
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Create Custom Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportGenerator;
