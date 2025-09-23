'use strict';

// Minimal MCP server for the Markdown editor.
// Exposes no tools yet; initializes cleanly over stdio so Windsurf can connect.

const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');

const server = new Server(
  { name: 'markdown-editor-mcp', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

server.onerror = (err) => {
  try {
    console.error('MCP server error:', err?.stack || err);
  } catch {}
};

server.connect(new StdioServerTransport());
