import React from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';

const Index = () => {
  const handleSave = (content: string) => {
    console.log('Saving content:', content);
    // Here you would typically save to a backend or file system
  };

  const initialContent = `# Professional Markdown Editor

Welcome to your **professional markdown editor** with live preview! This editor includes:

## Features

### ✨ Core Functionality
- **Real-time preview** with synchronized rendering
- **Syntax highlighting** for better readability
- **Auto-save** functionality with local storage backup
- **Undo/Redo** operations with full history

### 🎨 Professional Interface
- Clean, modern design optimized for writing
- Resizable split-pane layout
- Full-screen mode for focused writing
- Professional toolbar with quick actions

### 📝 Markdown Support
- Complete **GitHub Flavored Markdown** support
- Tables, task lists, and strikethrough text
- Code blocks with syntax highlighting
- Math equations and diagrams (coming soon)

## Getting Started

Try editing this content to see the live preview in action! Use the toolbar buttons or type markdown directly:

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Pro Tips
- Use **Ctrl+B** for bold text
- Use **Ctrl+I** for italic text
- Use **Ctrl+S** to save your work
- Toggle the preview with the eye icon

> **Note:** Your content is automatically saved to local storage as you type!

---

Start creating your amazing content! 🚀`;

  return (
    <div className="min-h-screen bg-background">
      <MarkdownEditor 
        initialValue={initialContent}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;
