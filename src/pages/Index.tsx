import React from 'react';
import { MarkdownSandbox } from '@/components/MarkdownSandbox';
import { ThemeProvider } from '@/hooks/useTheme';

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="markdown-editor-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <MarkdownSandbox />
      </div>
    </ThemeProvider>
  );
};

export default Index;
