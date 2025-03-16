
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Download, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/services/api';

interface ExportReportProps {
  className?: string;
}

const ExportReport = ({ className }: ExportReportProps) => {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [type, setType] = useState<'links' | 'seo' | 'performance'>('links');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setProgress(0);
      setDownloadUrl(null);
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.floor(Math.random() * 10) + 1;
        });
      }, 300);
      
      // Call the export API
      const result = await api.exportBulkData(format, type);
      
      clearInterval(progressInterval);
      setProgress(100);
      setDownloadUrl(result.url);
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} data exported as ${format.toUpperCase()} successfully`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">Export Data</CardTitle>
        <CardDescription>Download your data in different formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Export Type</Label>
          <RadioGroup 
            defaultValue="links" 
            value={type} 
            onValueChange={(value) => setType(value as 'links' | 'seo' | 'performance')}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="links" id="links" />
              <Label htmlFor="links" className="cursor-pointer">Links</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="seo" id="seo" />
              <Label htmlFor="seo" className="cursor-pointer">SEO</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="performance" id="performance" />
              <Label htmlFor="performance" className="cursor-pointer">Performance</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label>File Format</Label>
          <Select 
            defaultValue="csv" 
            value={format} 
            onValueChange={(value) => setFormat(value as 'csv' | 'pdf')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isExporting && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Export Progress</Label>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        {downloadUrl ? (
          <Button 
            className="w-full sm:w-auto"
            onClick={() => window.open(downloadUrl, '_blank')}
            variant="default"
          >
            <Download className="mr-2 h-4 w-4" />
            Download File
          </Button>
        ) : (
          <Button 
            className="w-full sm:w-auto"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExportReport;
