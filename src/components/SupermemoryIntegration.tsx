import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Upload, 
  Search, 
  Loader2, 
  CheckCircle, 
  XCircle,
  Settings,
  Database
} from 'lucide-react';

interface SupermemoryConfig {
  apiKey: string;
  domain: string;
}

interface SupermemoryIntegrationProps {
  content: string;
  onContentUpdate: (newContent: string) => void;
}

export const SupermemoryIntegration: React.FC<SupermemoryIntegrationProps> = ({ 
  content, 
  onContentUpdate 
}) => {
  const [config, setConfig] = useState<SupermemoryConfig>(() => {
    const saved = localStorage.getItem('supermemory-config');
    return saved ? JSON.parse(saved) : { apiKey: '', domain: '' };
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(!config.apiKey || !config.domain);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const saveConfig = () => {
    if (!config.apiKey || !config.domain) {
      toast({
        title: "Configuration Required",
        description: "Please enter both API key and domain.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('supermemory-config', JSON.stringify(config));
    setShowConfig(false);
    toast({
      title: "Configuration Saved",
      description: "Supermemory integration is now ready!",
    });
  };

  const uploadToSupermemory = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "Please write some content before uploading.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulated API call - replace with actual Supermemory API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "✅ Uploaded Successfully",
        description: "Your markdown content has been saved to Supermemory!",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload to Supermemory. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchSupermemory = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search term.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulated search - replace with actual Supermemory API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = `## Search Results for "${searchQuery}"

### Found in Supermemory:
- **Memory 1**: Related content about ${searchQuery}
- **Memory 2**: Previous notes on ${searchQuery}
- **Memory 3**: Connected ideas and references

*Click to insert specific memories into your document.*`;

      onContentUpdate(content + '\n\n' + mockResults);
      setSearchQuery('');
      
      toast({
        title: "🔍 Search Complete",
        description: "Found memories have been added to your document!",
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search Supermemory. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showConfig) {
    return (
      <Card className="p-4 border border-help-border">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Supermemory Configuration</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">API Key</label>
            <Input
              type="password"
              placeholder="Enter your Supermemory API key"
              value={config.apiKey}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Domain</label>
            <Input
              placeholder="your-domain.supermemory.ai"
              value={config.domain}
              onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={saveConfig} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
            {(config.apiKey || config.domain) && (
              <Button variant="ghost" onClick={() => setShowConfig(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Supermemory</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowConfig(true)}
          className="h-6 w-6 p-0"
        >
          <Settings className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search your memories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchSupermemory()}
          className="flex-1"
        />
        <Button
          size="sm"
          onClick={searchSupermemory}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Button
        onClick={uploadToSupermemory}
        disabled={isLoading}
        className="w-full"
        variant="outline"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Save to Supermemory
          </>
        )}
      </Button>
    </div>
  );
};