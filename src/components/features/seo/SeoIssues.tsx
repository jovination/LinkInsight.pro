
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { typeSafeString, typeSafeArray } from '@/utils/typeSafety';

interface SeoIssue {
  type: string;
  description: string;
  impact: string;
  location?: string;
}

interface SeoIssuesProps {
  issues: SeoIssue[];
}

const getIssueIcon = (type: string) => {
  switch (type) {
    case 'critical':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'info':
      return <Info className="h-5 w-5 text-primary" />;
    default:
      return <Info className="h-5 w-5" />;
  }
};

const getIssueBadge = (type: string) => {
  switch (type) {
    case 'critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'warning':
      return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Warning</Badge>;
    case 'info':
      return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Info</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getImpactBadge = (impact: string) => {
  switch (impact) {
    case 'high':
      return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">High Impact</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Medium Impact</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Low Impact</Badge>;
    default:
      return null;
  }
};

export const SeoIssues: React.FC<SeoIssuesProps> = ({ issues }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Issues Found</CardTitle>
        <CardDescription>
          {typeSafeArray<SeoIssue>(issues).length} issues detected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {typeSafeArray<SeoIssue>(issues).map((issue, index) => (
            <Alert key={index} variant="default" className="border-l-4 border-l-primary">
              <div className="flex items-center gap-2">
                {getIssueIcon(typeSafeString(issue.type))}
                <AlertTitle className="text-sm font-medium">
                  {typeSafeString(issue.description)}
                </AlertTitle>
              </div>
              <AlertDescription className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mt-1 w-full">
                  {getIssueBadge(typeSafeString(issue.type))}
                  {getImpactBadge(typeSafeString(issue.impact))}
                  {issue.location && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-md">
                      Location: {typeSafeString(issue.location)}
                    </span>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
