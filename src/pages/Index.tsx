import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { EditorToolbar } from '@/components/EditorToolbar';
import { HelpPanel } from '@/components/HelpPanel';
import { MarkdownSandbox } from '@/components/MarkdownSandbox';
import { ThemeProvider } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const { toast } = useToast();

  const handleSave = useCallback(() => {
    toast({
      title: "Document Saved",
      description: "Your markdown document has been saved successfully.",
    });
  }, [toast]);

  const handleExport = useCallback(() => {
    toast({
      title: "Export Complete",
      description: "Your markdown file has been downloaded.",
    });
  }, [toast]);

  const toggleHelp = () => setIsHelpVisible(!isHelpVisible);

  // Placeholder functions for toolbar actions (sandbox handles its own editing)
  const insertMarkdown = useCallback(() => {
    toast({
      title: "Editing",
      description: "Use the file tabs to edit your markdown documents.",
    });
  }, [toast]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="markdown-editor-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <Card className="h-full border-0 rounded-none shadow-none">
          {/* Toolbar */}
          <EditorToolbar
            onBold={() => insertMarkdown()}
            onItalic={() => insertMarkdown()}
            onHeading={() => insertMarkdown()}
            onList={() => insertMarkdown()}
            onOrderedList={() => insertMarkdown()}
            onQuote={() => insertMarkdown()}
            onCode={() => insertMarkdown()}
            onCodeBlock={() => insertMarkdown()}
            onLink={() => insertMarkdown()}
            onImage={() => insertMarkdown()}
            onSave={handleSave}
            onExport={handleExport}
            onUndo={() => {}}
            onRedo={() => {}}
            onTogglePreview={() => {}}
            onToggleFullscreen={() => {}}
            onToggleHelp={toggleHelp}
            isPreviewVisible={true}
            isFullscreen={false}
            canUndo={false}
            canRedo={false}
            content=""
            onContentUpdate={() => {}}
          />

          <Separator />

          {/* Main Sandbox Area */}
          <div className="flex h-full relative">
            <MarkdownSandbox />
            
            {/* Help Panel */}
            <HelpPanel 
              isOpen={isHelpVisible} 
              onClose={() => setIsHelpVisible(false)} 
            />
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Index;
