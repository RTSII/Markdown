import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { 
  FileText, 
  Upload,
  Plus,
  X,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileTab {
  id: string;
  name: string;
  content: string;
  isModified: boolean;
}

export const MarkdownSandbox: React.FC = () => {
  const [files, setFiles] = useState<FileTab[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const { toast } = useToast();

  const activeFile = files.find(f => f.id === activeFileId);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const supportedFiles = droppedFiles.filter(file => 
      file.type === 'text/markdown' || 
      file.type === 'text/plain' || 
      file.name.endsWith('.md') || 
      file.name.endsWith('.txt')
    );

    if (supportedFiles.length === 0) {
      toast({
        title: "Unsupported file type",
        description: "Please drop .md or .txt files only.",
        variant: "destructive"
      });
      return;
    }

    supportedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newFile: FileTab = {
          id: `file-${Date.now()}-${Math.random()}`,
          name: file.name,
          content,
          isModified: false
        };
        
        setFiles(prev => [...prev, newFile]);
        setActiveFileId(newFile.id);
        
        toast({
          title: "File loaded",
          description: `${file.name} is ready to edit.`
        });
      };
      reader.readAsText(file);
    });
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const createNewFile = useCallback(() => {
    if (!newFileName.trim()) return;
    
    const fileName = newFileName.endsWith('.md') ? newFileName : `${newFileName}.md`;
    const newFile: FileTab = {
      id: `file-${Date.now()}-${Math.random()}`,
      name: fileName,
      content: `# ${fileName.replace('.md', '')}\n\nStart writing your markdown here...`,
      isModified: false
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setNewFileName('');
    setShowNewFileInput(false);
    
    toast({
      title: "New file created",
      description: `${fileName} is ready to edit.`
    });
  }, [newFileName, toast]);

  const closeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(f => f.id !== fileId);
      setActiveFileId(remainingFiles.length > 0 ? remainingFiles[0].id : null);
    }
  }, [activeFileId, files]);

  const handleContentChange = useCallback((fileId: string, content: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, content, isModified: f.content !== content }
        : f
    ));
  }, []);

  const handleSave = useCallback((content: string) => {
    if (!activeFile) return;
    
    // Create and download the file
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Mark as saved
    setFiles(prev => prev.map(f => 
      f.id === activeFile.id 
        ? { ...f, isModified: false }
        : f
    ));
  }, [activeFile]);

  if (files.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        <div 
          className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isDragOver ? (
            <div className="text-center">
              <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium">Drop your files here</p>
              <p className="text-sm text-muted-foreground">Supports .md and .txt files</p>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Markdown Sandbox</h2>
                <p className="text-muted-foreground max-w-md">
                  Drop markdown files here to edit them, or create a new file to get started.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {showNewFileInput ? (
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="filename.md"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && createNewFile()}
                      className="w-48"
                      autoFocus
                    />
                    <Button onClick={createNewFile} size="sm">
                      Create
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setShowNewFileInput(false);
                        setNewFileName('');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setShowNewFileInput(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New File
                  </Button>
                )}
                
                <div className="text-sm text-muted-foreground">
                  or drag & drop .md/.txt files
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* File tabs */}
      <div className="border-b bg-toolbar-bg px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {files.map(file => (
            <div
              key={file.id}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                activeFileId === file.id
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => setActiveFileId(file.id)}
            >
              <FileText className="h-3 w-3" />
              <span className="whitespace-nowrap">
                {file.name}
                {file.isModified && <span className="text-primary">*</span>}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNewFileInput(true)}
            className="h-7 px-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {showNewFileInput && (
          <div className="flex gap-2 items-center mt-2">
            <Input
              placeholder="filename.md"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createNewFile()}
              className="w-48 h-8"
              autoFocus
            />
            <Button onClick={createNewFile} size="sm">
              Create
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setShowNewFileInput(false);
                setNewFileName('');
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Active file editor */}
      {activeFile && (
        <div className="flex-1">
          <MarkdownEditor
            key={activeFile.id}
            initialValue={activeFile.content}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
};