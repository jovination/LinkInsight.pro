
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '@/services/supabase';
import { PlusCircle, Calendar, Mail, Clock, Trash2, Edit, MoreHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface ReportSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  includeDetails: boolean;
  recipients: string[];
  created_at: string;
}

const ReportScheduler: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    frequency: 'weekly' as const,
    includeDetails: true,
    recipients: ''
  });

  // Fetch scheduled reports data
  const { data: scheduledReports, isLoading, refetch } = useQuery({
    queryKey: ['scheduledReports'],
    queryFn: supabaseService.getScheduledReports
  });

  const handleCreateReport = async () => {
    try {
      // Validate input
      if (!newReport.name.trim()) {
        toast.error("Please enter a report name");
        return;
      }
      
      if (!newReport.recipients.trim()) {
        toast.error("Please enter at least one recipient email");
        return;
      }
      
      // In a real implementation, this would call an API to create the report
      // Here we're just simulating success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Report scheduled successfully");
      setIsCreateOpen(false);
      setNewReport({
        name: '',
        frequency: 'weekly',
        includeDetails: true,
        recipients: ''
      });
      
      // Refetch the list to show the new report
      refetch();
    } catch (error) {
      console.error("Error scheduling report:", error);
      toast.error("Failed to schedule report");
    }
  };

  const handleDeleteReport = async (id: string) => {
    try {
      // In a real implementation, this would call an API to delete the report
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Report deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error("Failed to delete report");
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">Daily</Badge>;
      case 'weekly':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">Weekly</Badge>;
      case 'monthly':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300">Monthly</Badge>;
      default:
        return <Badge variant="outline">{frequency}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Scheduled Reports</h2>
          <p className="text-muted-foreground">
            Automate your reports to be delivered on a schedule
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Schedule New Report</DialogTitle>
              <DialogDescription>
                Set up an automated report to be delivered on a regular schedule
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  placeholder="Weekly Performance Report"
                  value={newReport.name}
                  onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Frequency</Label>
                <RadioGroup 
                  value={newReport.frequency}
                  onValueChange={(value) => setNewReport({
                    ...newReport, 
                    frequency: value as 'daily' | 'weekly' | 'monthly'
                  })}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeDetails" 
                  checked={newReport.includeDetails}
                  onCheckedChange={(checked) => 
                    setNewReport({...newReport, includeDetails: checked as boolean})
                  }
                />
                <label
                  htmlFor="includeDetails"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include detailed breakdown and recommendations
                </label>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="recipients">Recipients (comma separated)</Label>
                <Input
                  id="recipients"
                  placeholder="email1@example.com, email2@example.com"
                  value={newReport.recipients}
                  onChange={(e) => setNewReport({...newReport, recipients: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateReport}>
                Schedule Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Your Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !scheduledReports || scheduledReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't scheduled any reports yet
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule Your First Report
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report: ReportSchedule) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {report.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getFrequencyBadge(report.frequency)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-muted-foreground">
                          <Mail className="h-4 w-4 mr-1" />
                          {report.recipients.length} recipients
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportScheduler;
