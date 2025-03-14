
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash2, Calendar, Clock, Plus, Users, Mail, Sparkles } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService, ReportConfig } from '@/services/api';

const ReportScheduler = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState<Omit<ReportConfig, 'id'>>({
    name: '',
    frequency: 'weekly',
    includeDetails: true,
    recipients: ['']
  });

  // Fetch existing reports
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['scheduledReports'],
    queryFn: apiService.getScheduledReports
  });

  // Create new report
  const createMutation = useMutation({
    mutationFn: apiService.createScheduledReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduledReports'] });
      toast.success('Report scheduled successfully');
      setDialogOpen(false);
      setNewReport({
        name: '',
        frequency: 'weekly',
        includeDetails: true,
        recipients: ['']
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to schedule report');
    }
  });

  const handleAddRecipient = () => {
    setNewReport(prev => ({
      ...prev,
      recipients: [...prev.recipients, '']
    }));
  };

  const handleRemoveRecipient = (index: number) => {
    setNewReport(prev => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== index)
    }));
  };

  const handleRecipientChange = (index: number, value: string) => {
    setNewReport(prev => ({
      ...prev,
      recipients: prev.recipients.map((email, i) => (i === index ? value : email))
    }));
  };

  const handleCreateReport = () => {
    // Validate form
    if (!newReport.name.trim()) {
      toast.error('Please enter a report name');
      return;
    }

    const validEmails = newReport.recipients.filter(email => email.trim() !== '');
    if (validEmails.length === 0) {
      toast.error('Please add at least one recipient');
      return;
    }

    // Filter out empty email addresses
    createMutation.mutate({
      ...newReport,
      recipients: validEmails
    });
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      default:
        return frequency;
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'weekly':
        return <Calendar className="h-4 w-4 text-primary" />;
      case 'monthly':
        return <Calendar className="h-4 w-4 text-primary" />;
      default:
        return <Calendar className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Scheduled Reports</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule a New Report</DialogTitle>
              <DialogDescription>
                Create automated reports that will be sent to your team on a schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="Weekly Link Health Report"
                  value={newReport.name}
                  onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newReport.frequency}
                  onValueChange={(value) => 
                    setNewReport(prev => ({ ...prev, frequency: value as 'daily' | 'weekly' | 'monthly' }))
                  }
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="include-details"
                  checked={newReport.includeDetails}
                  onCheckedChange={(checked) => 
                    setNewReport(prev => ({ ...prev, includeDetails: checked }))
                  }
                />
                <Label htmlFor="include-details">Include detailed breakdown</Label>
              </div>
              <div className="grid gap-2">
                <Label>Recipients</Label>
                {newReport.recipients.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => handleRecipientChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRecipient(index)}
                      disabled={newReport.recipients.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={handleAddRecipient}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Recipient
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleCreateReport}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Scheduling...' : 'Schedule Report'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading scheduled reports...
        </div>
      ) : reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="bg-muted/20 p-4 pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    {report.name}
                  </span>
                  <Badge 
                    variant="outline" 
                    className="ml-2 bg-primary/10 text-primary border-primary/20 text-xs"
                  >
                    {getFrequencyLabel(report.frequency)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  {getFrequencyIcon(report.frequency)}
                  <span className="ml-1">{getFrequencyLabel(report.frequency)} report</span>
                  {report.includeDetails && (
                    <Badge variant="outline" className="ml-2 text-[10px]">Detailed</Badge>
                  )}
                </div>
                <Separator className="my-2" />
                <div className="flex items-center mt-2">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-sm">
                    <span className="text-muted-foreground mr-1">Recipients:</span>
                    <span>{report.recipients.join(', ')}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" className="text-xs mr-2">
                    <Mail className="h-3 w-3 mr-1" />
                    Send Now
                  </Button>
                  <Button variant="destructive" size="sm" className="text-xs">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mx-auto bg-muted/30 h-12 w-12 rounded-full flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Reports Scheduled</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule automated reports to keep your team updated on link health and SEO metrics.
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Your First Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportScheduler;
