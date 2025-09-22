import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle, 
  X, 
  Bold, 
  Italic, 
  List, 
  Link, 
  Image,
  Code,
  Quote,
  Table,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const markdownExamples = [
  {
    category: "Text Formatting",
    icon: Bold,
    examples: [
      { syntax: "**bold text**", description: "Bold text" },
      { syntax: "*italic text*", description: "Italic text" },
      { syntax: "~~strikethrough~~", description: "Strikethrough text" },
      { syntax: "`inline code`", description: "Inline code" }
    ]
  },
  {
    category: "Headers",
    icon: Hash,
    examples: [
      { syntax: "# Header 1", description: "Main title" },
      { syntax: "## Header 2", description: "Section title" },
      { syntax: "### Header 3", description: "Subsection title" }
    ]
  },
  {
    category: "Lists",
    icon: List,
    examples: [
      { syntax: "- Item 1\n- Item 2", description: "Bullet list" },
      { syntax: "1. First\n2. Second", description: "Numbered list" },
      { syntax: "- [ ] Todo\n- [x] Done", description: "Task list" }
    ]
  },
  {
    category: "Links & Images",
    icon: Link,
    examples: [
      { syntax: "[Link text](URL)", description: "Link" },
      { syntax: "![Alt text](image-url)", description: "Image" },
      { syntax: "[Reference link][1]\n\n[1]: URL", description: "Reference link" }
    ]
  },
  {
    category: "Code & Quotes",
    icon: Code,
    examples: [
      { syntax: "```javascript\ncode here\n```", description: "Code block with syntax highlighting" },
      { syntax: "> Quoted text", description: "Blockquote" },
      { syntax: "---", description: "Horizontal rule" }
    ]
  },
  {
    category: "Tables",
    icon: Table,
    examples: [
      { 
        syntax: "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |", 
        description: "Simple table" 
      }
    ]
  }
];

function Hash({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <line x1="4" x2="20" y1="9" y2="9"/>
      <line x1="4" x2="20" y1="15" y2="15"/>
      <line x1="10" x2="8" y1="3" y2="21"/>
      <line x1="16" x2="14" y1="3" y2="21"/>
    </svg>
  );
}

export const HelpPanel: React.FC<HelpPanelProps> = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Text Formatting"]));

  const toggleSection = (category: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedSections(newExpanded);
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 flex flex-col border-l bg-help-panel">
      <div className="px-4 py-3 border-b bg-toolbar-bg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span className="font-medium text-sm">Markdown Guide</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="text-xs text-muted-foreground">
          Quick reference for markdown syntax. Click examples to copy.
        </div>
        
        {markdownExamples.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.has(section.category);
          
          return (
            <Card key={section.category} className="border border-help-border">
              <button
                onClick={() => toggleSection(section.category)}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{section.category}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {isExpanded && (
                <>
                  <Separator />
                  <div className="p-3 space-y-3">
                    {section.examples.map((example, index) => (
                      <div key={index} className="space-y-1">
                        <button
                          onClick={() => navigator.clipboard.writeText(example.syntax)}
                          className="w-full text-left p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors group"
                          title="Click to copy"
                        >
                          <code className="text-xs font-mono block break-all text-primary">
                            {example.syntax}
                          </code>
                          <div className="text-xs text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                            {example.description}
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          );
        })}

        <Card className="border border-help-border p-3">
          <div className="text-sm font-medium mb-2">📝 Professional Markdown Editor</div>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>Welcome to your **professional markdown editor** with live preview! This editor includes:</p>
            
            <div className="mt-3">
              <div className="font-medium text-xs mb-1">✨ Core Functionality</div>
              <div className="ml-2 space-y-1">
                <div>• **Real-time preview** with synchronized rendering</div>
                <div>• **Syntax highlighting** for better readability</div>
                <div>• **Auto-save** functionality with local storage backup</div>
                <div>• **Undo/Redo** operations with full history</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-medium text-xs mb-1">🎨 Professional Interface</div>
              <div className="ml-2 space-y-1">
                <div>• Clean, modern design optimized for writing</div>
                <div>• Resizable split-pane layout</div>
                <div>• Full-screen mode for focused writing</div>
                <div>• Professional toolbar with quick actions</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-medium text-xs mb-1">📝 Markdown Support</div>
              <div className="ml-2 space-y-1">
                <div>• Complete **GitHub Flavored Markdown** support</div>
                <div>• Tables, task lists, and strikethrough text</div>
                <div>• Code blocks with syntax highlighting</div>
                <div>• Math equations and diagrams (coming soon)</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-medium text-xs mb-1">🚀 Getting Started</div>
              <div className="ml-2 space-y-1">
                <div>Try editing content to see the live preview in action! Use the toolbar buttons or type markdown directly.</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="border border-help-border p-3">
          <div className="text-sm font-medium mb-2">💡 Pro Tips</div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• Use Ctrl+B for bold, Ctrl+I for italic</div>
            <div>• Drag & drop images directly into the editor</div>
            <div>• Auto-save keeps your work safe</div>
            <div>• Toggle preview with the eye icon</div>
          </div>
        </Card>
      </div>
    </div>
  );
};