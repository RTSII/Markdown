import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const customComponents = {
    // Custom heading styles
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mb-6 text-foreground border-b border-border pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold mb-4 text-foreground border-b border-border pb-1">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-lg font-medium mb-2 text-foreground">
        {children}
      </h4>
    ),
    h5: ({ children }: { children: React.ReactNode }) => (
      <h5 className="text-base font-medium mb-2 text-foreground">
        {children}
      </h5>
    ),
    h6: ({ children }: { children: React.ReactNode }) => (
      <h6 className="text-sm font-medium mb-2 text-muted-foreground">
        {children}
      </h6>
    ),

    // Custom paragraph styles
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 text-foreground leading-relaxed">
        {children}
      </p>
    ),

    // Custom list styles
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="mb-4 ml-6 list-disc text-foreground space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="mb-4 ml-6 list-decimal text-foreground space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-foreground leading-relaxed">
        {children}
      </li>
    ),

    // Custom blockquote styles
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4 bg-muted/30 text-muted-foreground italic">
        {children}
      </blockquote>
    ),

    // Custom code styles
    code: ({ inline, children }: { inline?: boolean; children: React.ReactNode }) => {
      if (inline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-accent-foreground border">
            {children}
          </code>
        );
      }
      return (
        <code className="block bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
          {children}
        </code>
      );
    },

    // Custom pre styles for code blocks
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto border">
        {children}
      </pre>
    ),

    // Custom table styles
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
      <thead className="bg-muted">
        {children}
      </thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
      <tbody>
        {children}
      </tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
      <tr className="border-b border-border">
        {children}
      </tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
      <td className="border border-border px-4 py-2 text-foreground">
        {children}
      </td>
    ),

    // Custom link styles
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a 
        href={href} 
        className="text-accent hover:text-accent-hover underline font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // Custom image styles
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full h-auto rounded-lg shadow-sm mb-4 border"
      />
    ),

    // Custom horizontal rule
    hr: () => (
      <hr className="my-8 border-border" />
    ),

    // Custom strong and emphasis
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-foreground">
        {children}
      </em>
    ),
  };

  if (!content.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">Start typing to see your preview</p>
          <p className="text-sm">Your markdown will appear here in real-time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-preview-panel min-h-full">
      <div className="max-w-none prose prose-slate dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={customComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};