
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { typeSafeArray } from '@/utils/typeSafety';

interface LinkData {
  id: string;
  url: string;
  status: 'healthy' | 'broken' | 'redirected';
  responseTime: string;
  lastChecked: string;
}

interface DashboardRecentLinksProps {
  links: unknown;
  isLoading: boolean;
}

const DashboardRecentLinks: React.FC<DashboardRecentLinksProps> = ({
  links,
  isLoading,
}) => {
  const navigate = useNavigate();
  const parsedLinks = typeSafeArray<LinkData>(links);
  const hasLinks = parsedLinks.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Links</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/links')}
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        ) : hasLinks ? (
          <div className="space-y-2">
            {parsedLinks.slice(0, 5).map((link, i) => (
              <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2 overflow-hidden">
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm truncate">{link.url}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  link.status === 'healthy' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {link.status === 'healthy' ? 'Healthy' : 'Broken'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-3 py-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                No links have been added yet. Start by adding your first link to monitor.
              </p>
              <Button 
                onClick={() => navigate('/links')}
                className="flex items-center gap-2"
                size="sm"
              >
                Add Your First Link
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentLinks;
