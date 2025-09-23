// Minimal MCP server for the Markdown editor (ESM)
// Initializes over stdio so Windsurf can connect. No tools exposed yet.

import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';

const server = new Server(
  { name: 'markdown-editor-mcp', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

server.onerror = (err) => {
  // eslint-disable-next-line no-console
  console.error('MCP server error:', err?.stack || err);
};

server.connect(new StdioServerTransport());
