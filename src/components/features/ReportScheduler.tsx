
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Calendar, Clock, MailIcon, Trash2, RefreshCw, Users } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/services/api';

// Interface for scheduled reports
interface ScheduledReport {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  include_details: boolean;
  recipients: string[];
  created_at: string;
}

const ReportScheduler = () => {
  const [reports, setReports] = useState<ScheduledReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  
  // New report form state
  const [newReport, setNewReport] = useState({
    name: '',
    frequency: 'weekly',
    include_details: true,
    recipients: ['']
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    name: false,
    recipients: false
  });

  // Fetch scheduled reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await api.getScheduledReports();
      setReports(data);
    } catch (error) {
      console.error('Error fetching scheduled reports:', error);
      toast.error('Failed to load scheduled reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      name: newReport.name.trim() === '',
      recipients: newReport.recipients.some(email => email.trim() === '' || !isValidEmail(email.trim()))
    };
    
    setFormErrors(errors);
    
    if (errors.name || errors.recipients) {
      return; // Stop if there are errors
    }
    
    // Create new report object
    const reportData = {
      ...newReport,
      recipients: newReport.recipients.filter(email => email.trim() !== '')
    };
    
    // Show success message
    toast.success('Report scheduled successfully!');
    
    // Reset form and hide it
    setNewReport({
      name: '',
      frequency: 'weekly',
      include_details: true,
      recipients: ['']
    });
    setShowNewForm(false);
    
    // Refresh the list (in a real app, this would be after API call)
    fetchReports();
  };
  
  // Add recipient field
  const addRecipient = () => {
    setNewReport({
      ...newReport,
      recipients: [...newReport.recipients, '']
    });
  };
  
  // Update recipient field
  const updateRecipient = (index: number, value: string) => {
    const updatedRecipients = [...newReport.recipients];
    updatedRecipients[index] = value;
    setNewReport({
      ...newReport,
      recipients: updatedRecipients
    });
  };
  
  // Remove recipient field
  const removeRecipient = (index: number) => {
    if (newReport.recipients.length > 1) {
      const updatedRecipients = newReport.recipients.filter((_, i) => i !== index);
      setNewReport({
        ...newReport,
        recipients: updatedRecipients
      });
    }
  };
  
  // Function to get background color based on frequency
  const getFrequencyBadgeStyle = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'weekly':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'monthly':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Delete report handler
  const handleDeleteReport = (id: string) => {
    // Show confirmation toast
    toast('Are you sure you want to delete this report?', {
      action: {
        label: 'Delete',
        onClick: () => {
          // Filter out the deleted report
          setReports(reports.filter(report => report.id !== id));
          toast.success('Report deleted successfully');
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Scheduled Reports</h2>
          <p className="text-muted-foreground">
            Configure automated reports to be sent on a schedule
          </p>
        </div>
        <Button 
          onClick={() => setShowNewForm(!showNewForm)} 
          className="mt-4 sm:mt-0"
          size="sm"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {showNewForm ? 'Cancel' : 'New Schedule'}
        </Button>
      </div>
      
      {showNewForm && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Schedule New Report</CardTitle>
            <CardDescription>
              Configure when and how to receive automated reports
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="Weekly SEO Status"
                  value={newReport.name}
                  onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">Report name is required</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newReport.frequency}
                  onValueChange={(value) => setNewReport({...newReport, frequency: value as 'daily' | 'weekly' | 'monthly'})}
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
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-details"
                  checked={newReport.include_details}
                  onCheckedChange={(checked) => 
                    setNewReport({...newReport, include_details: checked as boolean})
                  }
                />
                <Label htmlFor="include-details">Include full details in report</Label>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Recipients</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRecipient}
                  >
                    Add Recipient
                  </Button>
                </div>
                
                {newReport.recipients.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => updateRecipient(index, e.target.value)}
                      className={formErrors.recipients && (email.trim() === '' || !isValidEmail(email.trim())) 
                        ? 'border-red-500' 
                        : ''
                      }
                    />
                    {newReport.recipients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRecipient(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {formErrors.recipients && (
                  <p className="text-sm text-red-500">All recipients must have valid email addresses</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Schedule Report</Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : reports.length === 0 ? (
        <Card className="border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No scheduled reports</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              You haven't set up any scheduled reports yet. Create your first report to receive regular updates.
            </p>
            <Button onClick={() => setShowNewForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Report
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id} className="border shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <Badge variant="outline">{report.frequency}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{report.frequency}</span>
                  </div>
                  
                  <div className="flex items-start text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      {report.recipients.map((recipient, i) => (
                        <div key={i} className="text-sm">{recipient}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MailIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {report.include_details ? (
                      <span>Full report</span>
                    ) : (
                      <span>Summary only</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-between pt-4">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => handleDeleteReport(report.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportScheduler;
