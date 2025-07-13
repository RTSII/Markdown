import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { 
  Bold, 
  Italic, 
  Heading1,
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Code2,
  Link, 
  Image, 
  Eye, 
  EyeOff,
  Download,
  Save,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  HelpCircle
} from 'lucide-react';

interface EditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onHeading: () => void;
  onList: () => void;
  onOrderedList: () => void;
  onQuote: () => void;
  onCode: () => void;
  onCodeBlock: () => void;
  onLink: () => void;
  onImage: () => void;
  onSave: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onTogglePreview: () => void;
  onToggleFullscreen: () => void;
  onToggleHelp: () => void;
  isPreviewVisible: boolean;
  isFullscreen: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onBold,
  onItalic,
  onHeading,
  onList,
  onOrderedList,
  onQuote,
  onCode,
  onCodeBlock,
  onLink,
  onImage,
  onSave,
  onExport,
  onUndo,
  onRedo,
  onTogglePreview,
  onToggleFullscreen,
  onToggleHelp,
  isPreviewVisible,
  isFullscreen,
  canUndo,
  canRedo
}) => {
  return (
    <div className="bg-toolbar-bg border-b px-4 py-2 flex items-center gap-1 flex-wrap">
      {/* History Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onBold}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onItalic}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onHeading}
          title="Heading"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists and Blocks */}
      <div className="flex items-center gap-1">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onList}
          title="Unordered List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onOrderedList}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onQuote}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Code */}
      <div className="flex items-center gap-1">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onCode}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onCodeBlock}
          title="Code Block"
        >
          <Code2 className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Media */}
      <div className="flex items-center gap-1">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onLink}
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onImage}
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* View Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onToggleHelp}
          title="Toggle Help Panel"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onTogglePreview}
          title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
        >
          {isPreviewVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
        <ThemeToggle />
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* File Operations */}
      <div className="flex items-center gap-1">
        <Button
          variant="accent"
          size="sm"
          onClick={onSave}
          title="Save (Ctrl+S)"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          title="Export as Markdown"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};