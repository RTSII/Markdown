import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MarkdownPreview } from './MarkdownPreview';
import { EditorToolbar } from './EditorToolbar';
import { HelpPanel } from './HelpPanel';
import { SupermemoryIntegration } from './SupermemoryIntegration';
import { useToast } from '@/hooks/use-toast';

interface MarkdownEditorProps {
  initialValue?: string;
  onSave?: (content: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '',
  onSave
}) => {
  const [content, setContent] = useState(initialValue);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [history, setHistory] = useState<string[]>([initialValue]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      localStorage.setItem('markdown-editor-content', content);
      localStorage.setItem('markdown-editor-timestamp', Date.now().toString());
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [content]);

  // Load saved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('markdown-editor-content');
    if (savedContent && !initialValue) {
      setContent(savedContent);
      setHistory([savedContent]);
    }
  }, [initialValue]);

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    
    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const insertMarkdown = useCallback((before: string, after: string = '', placeholder: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      content.substring(0, start) + 
      before + textToInsert + after + 
      content.substring(end);
    
    handleContentChange(newContent);
    
    // Set cursor position
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  }, [content, handleContentChange]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
    }
    toast({
      title: "Document Saved",
      description: "Your markdown document has been saved successfully.",
    });
  }, [content, onSave, toast]);

  const handleExport = useCallback(() => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Your markdown file has been downloaded.",
    });
  }, [content, toast]);

  const togglePreview = () => setIsPreviewVisible(!isPreviewVisible);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleHelp = () => setIsHelpVisible(!isHelpVisible);

  const getLayoutClasses = () => {
    if (isFullscreen) {
      return "fixed inset-0 z-50 bg-background";
    }
    return "min-h-screen";
  };

  const getEditorClasses = () => {
    if (!isPreviewVisible) return "w-full";
    return "w-1/2";
  };

  const getPreviewClasses = () => {
    if (!isPreviewVisible) return "hidden";
    return "w-1/2";
  };

  return (
    <div className={getLayoutClasses()}>
      <Card className="h-full border-0 rounded-none shadow-none">
        {/* Toolbar */}
        <EditorToolbar
          onBold={() => insertMarkdown('**', '**', 'bold text')}
          onItalic={() => insertMarkdown('*', '*', 'italic text')}
          onHeading={() => insertMarkdown('# ', '', 'heading')}
          onList={() => insertMarkdown('- ', '', 'list item')}
          onOrderedList={() => insertMarkdown('1. ', '', 'list item')}
          onQuote={() => insertMarkdown('> ', '', 'quote')}
          onCode={() => insertMarkdown('`', '`', 'code')}
          onCodeBlock={() => insertMarkdown('```\n', '\n```', 'code block')}
          onLink={() => insertMarkdown('[', '](url)', 'link text')}
          onImage={() => insertMarkdown('![', '](image-url)', 'alt text')}
          onSave={handleSave}
          onExport={handleExport}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onTogglePreview={togglePreview}
          onToggleFullscreen={toggleFullscreen}
          onToggleHelp={toggleHelp}
          isPreviewVisible={isPreviewVisible}
          isFullscreen={isFullscreen}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          content={content}
          onContentUpdate={setContent}
        />

        <Separator />

        {/* Main Content Area */}
        <div className="flex h-full">
          {/* Editor Panel */}
          <div className={`${getEditorClasses()} flex flex-col`}>
            <div className="bg-editor-panel px-4 py-2 border-b flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Markdown Editor</span>
              <div className="text-xs text-muted-foreground">
                {content.length} characters • {content.split('\n').length} lines
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full h-full p-4 border-0 resize-none font-mono text-sm bg-editor-panel focus:outline-none focus:ring-0 transition-colors"
                placeholder="# Welcome to Markdown Editor! 👋

Click the **?** button in the toolbar to see the markdown guide.

## Quick Start
- Use **bold** and *italic* text
- Create [links](https://example.com) and add images
- Make lists and tables
- Add code blocks with syntax highlighting

💡 **Pro tip**: All your work is auto-saved as you type!

🧠 **Supermemory Integration**: Save and search your memories using the AI panel on the right."
                spellCheck={false}
                style={{ minHeight: 'calc(100vh - 180px)' }}
                onKeyDown={(e) => {
                  // Add keyboard shortcuts
                  if (e.ctrlKey || e.metaKey) {
                    if (e.key === 'b') {
                      e.preventDefault();
                      insertMarkdown('**', '**', 'bold text');
                    } else if (e.key === 'i') {
                      e.preventDefault();
                      insertMarkdown('*', '*', 'italic text');
                    } else if (e.key === 's') {
                      e.preventDefault();
                      handleSave();
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Divider */}
          {isPreviewVisible && (
            <Separator orientation="vertical" className="h-full" />
          )}

          {/* Preview Panel */}
          <div className={`${getPreviewClasses()} flex flex-col`}>
            <div className="bg-preview-panel px-4 py-2 border-b flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Live Preview</span>
              <div className="text-xs text-muted-foreground">
                {Math.ceil(content.split(' ').length / 200)} min read
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <MarkdownPreview content={content} />
            </div>
          </div>

          {/* Help Panel */}
          <HelpPanel 
            isOpen={isHelpVisible} 
            onClose={() => setIsHelpVisible(false)} 
          />
        </div>
      </Card>
    </div>
  );
};