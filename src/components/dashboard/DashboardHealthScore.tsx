
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHealthScoreProps {
  hasLinks: boolean;
  healthScore: number;
}

const DashboardHealthScore: React.FC<DashboardHealthScoreProps> = ({
  hasLinks,
  healthScore,
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Health Score</CardTitle>
        <CardDescription>Overall health of your monitored links</CardDescription>
      </CardHeader>
      <CardContent>
        {hasLinks ? (
          <>
            <div className="text-3xl font-bold mb-2">
              {healthScore}%
            </div>
            <Progress 
              value={healthScore} 
              className="h-2"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Critical</span>
              <span className="text-xs text-muted-foreground">Excellent</span>
            </div>
          </>
        ) : (
          <div className="flex items-start gap-3 py-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                Add links to monitor to start tracking your website's health score.
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

export default DashboardHealthScore;
