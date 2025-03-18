
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, AlertTriangle, Link, BarChart, Send, Clock } from 'lucide-react';
import { useUserRole } from '@/components/UserRoleProvider';

const ReportGenerator: React.FC = () => {
  const { userRole } = useUserRole();
  const [reportType, setReportType] = useState<'link_health' | 'seo_analysis' | 'performance'>('link_health');
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedReport, setCompletedReport] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [domain, setDomain] = useState('');
  const [dateRange, setDateRange] = useState('last30days');
  const [emailTo, setEmailTo] = useState('');
  
  const handleGenerateReport = async () => {
    if (reportType === 'seo_analysis' && userRole === 'free') {
      toast.error('SEO Analysis reports are only available on Pro and Enterprise plans');
      return;
    }
    
    if (reportType === 'performance' && userRole === 'free') {
      toast.error('Performance reports are only available on Pro and Enterprise plans');
      return;
    }
    
    try {
      setIsGenerating(true);
      setGenerationProgress(0);
      setCompletedReport(null);
      
      // Simulate report generation
      for (let i = 1; i <= 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setGenerationProgress(i * 10);
      }
      
      // Simulate a completed report
      setCompletedReport(`report_${reportType}_${new Date().getTime()}.pdf`);
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleEmailReport = () => {
    if (!emailTo.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    
    if (!completedReport) {
      toast.error('No report to send. Please generate a report first.');
      return;
    }
    
    // Simulate sending email
    toast.success(`Report sent to ${emailTo}`);
    setEmailTo('');
  };

  const getReportTypeIcon = () => {
    switch (reportType) {
      case 'link_health':
        return <Link className="h-6 w-6 text-primary" />;
      case 'seo_analysis':
        return <BarChart className="h-6 w-6 text-primary" />;
      case 'performance':
        return <Clock className="h-6 w-6 text-primary" />;
      default:
        return <FileText className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>
            Create detailed reports for your website analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator" className="space-y-4">
            <TabsList>
              <TabsTrigger value="generator">Report Generator</TabsTrigger>
              <TabsTrigger value="output">Generated Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Report Type</Label>
                  <RadioGroup 
                    defaultValue="link_health" 
                    className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-3"
                    value={reportType}
                    onValueChange={(value) => setReportType(value as 'link_health' | 'seo_analysis' | 'performance')}
                  >
                    <div className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${reportType === 'link_health' ? 'border-primary' : ''}`}>
                      <Link className="mb-3 h-8 w-8" />
                      <RadioGroupItem value="link_health" id="link_health" className="sr-only" />
                      <Label htmlFor="link_health" className="text-center">Link Health</Label>
                    </div>
                    <div className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${reportType === 'seo_analysis' ? 'border-primary' : ''} ${userRole === 'free' ? 'opacity-50' : ''}`}>
                      <BarChart className="mb-3 h-8 w-8" />
                      <RadioGroupItem 
                        value="seo_analysis" 
                        id="seo_analysis" 
                        className="sr-only" 
                        disabled={userRole === 'free'}
                      />
                      <div className="text-center">
                        <Label htmlFor="seo_analysis">SEO Analysis</Label>
                        {userRole === 'free' && (
                          <p className="text-xs text-muted-foreground mt-1">Pro Plan Required</p>
                        )}
                      </div>
                    </div>
                    <div className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${reportType === 'performance' ? 'border-primary' : ''} ${userRole === 'free' ? 'opacity-50' : ''}`}>
                      <Clock className="mb-3 h-8 w-8" />
                      <RadioGroupItem 
                        value="performance" 
                        id="performance" 
                        className="sr-only" 
                        disabled={userRole === 'free'}
                      />
                      <div className="text-center">
                        <Label htmlFor="performance">Performance</Label>
                        {userRole === 'free' && (
                          <p className="text-xs text-muted-foreground mt-1">Pro Plan Required</p>
                        )}
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="domain">Domain (optional)</Label>
                    <Input
                      id="domain"
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to include all monitored domains
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Date Range</Label>
                    <RadioGroup 
                      defaultValue="last30days" 
                      className="grid grid-cols-3 gap-4"
                      value={dateRange}
                      onValueChange={setDateRange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="last7days" id="last7days" />
                        <Label htmlFor="last7days">Last 7 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="last30days" id="last30days" />
                        <Label htmlFor="last30days">Last 30 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="last90days" id="last90days" />
                        <Label htmlFor="last90days">Last 90 days</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeDetails" 
                      checked={includeDetails}
                      onCheckedChange={(checked) => 
                        setIncludeDetails(checked as boolean)
                      }
                    />
                    <Label htmlFor="includeDetails">
                      Include detailed breakdown and recommendations
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="output" className="space-y-4">
              {isGenerating ? (
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium mb-2">Generating Report...</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This may take a few moments to complete
                    </p>
                    <Progress value={generationProgress} className="h-2 max-w-md mx-auto" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {generationProgress}% complete
                    </p>
                  </div>
                </div>
              ) : completedReport ? (
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    {getReportTypeIcon()}
                    <div>
                      <h3 className="font-medium">
                        {reportType === 'link_health' ? 'Link Health Report' : 
                          reportType === 'seo_analysis' ? 'SEO Analysis Report' : 'Performance Report'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Generated on {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 mb-4">
                    <div className="flex items-start space-x-4">
                      <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{completedReport}</p>
                        <p className="text-xs text-muted-foreground">PDF Document • 1.2 MB</p>
                        <div className="flex mt-2 gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Download className="mr-1 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="emailTo" className="mb-2 block">Email this report</Label>
                    <div className="flex gap-2">
                      <Input
                        id="emailTo"
                        placeholder="example@email.com"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                      />
                      <Button type="button" onClick={handleEmailReport}>
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No reports generated yet</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Configure and generate a report to see it here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setReportType('link_health')}>
            Reset
          </Button>
          <Button 
            onClick={handleGenerateReport}
            disabled={
              isGenerating || 
              (reportType === 'seo_analysis' && userRole === 'free') || 
              (reportType === 'performance' && userRole === 'free')
            }
          >
            Generate Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportGenerator;
