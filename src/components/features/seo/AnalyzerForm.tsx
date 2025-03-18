
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { toast } from 'sonner';

interface AnalyzerFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const AnalyzerForm: React.FC<AnalyzerFormProps> = ({ url, setUrl, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Enter website URL (e.g., https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        <SearchIcon className="mr-2 h-4 w-4" />
        Analyze
      </Button>
    </form>
  );
};
