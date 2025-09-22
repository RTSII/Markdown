# Professional Markdown Editor - Deployment Guide

## Overview

This guide provides detailed instructions for deploying your Professional Markdown Editor with Supermemory integration. The project supports multiple deployment methods including static hosting, Docker containerization, and MCP server integration.

**GitHub Repository:** https://github.com/RTSII/Markdown

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
3. [Docker Deployment](#docker-deployment)
4. [MCP Server Integration (Claude Desktop)](#mcp-server-integration-claude-desktop)
5. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (if using backend features)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RTSII/Markdown.git
   cd Markdown
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_PROJECT_ID="ybzzmutmhavqilwurajd"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlienptdXRtaGF2cWlsd3VyYWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjYxNzQsImV4cCI6MjA2MzA0MjE3NH0.Fig8j6OTkdLe21y5OK-7a2_0yxrYOa_YJG--G75TArU"
   VITE_SUPABASE_URL="https://ybzzmutmhavqilwurajd.supabase.co"
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open http://localhost:8080 in your browser

---

## Vercel Deployment (Recommended)

Vercel is recommended for this project due to its excellent React/Vite support and seamless GitHub integration.

### Method 1: GitHub Integration (Recommended)

1. **Fork or use your existing repository:**
   - Use https://github.com/RTSII/Markdown
   - Ensure you have push access

2. **Deploy to Vercel:**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository: `RTSII/Markdown`
   - Vercel will auto-detect the framework (Vite)

3. **Configure build settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add environment variables:**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   VITE_SUPABASE_PROJECT_ID = ybzzmutmhavqilwurajd
   VITE_SUPABASE_PUBLISHABLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlienptdXRtaGF2cWlsd3VyYWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjYxNzQsImV4cCI6MjA2MzA0MjE3NH0.Fig8j6OTkdLe21y5OK-7a2_0yxrYOa_YJG--G75TArU
   VITE_SUPABASE_URL = https://ybzzmutmhavqilwurajd.supabase.co
   ```

5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a production URL (e.g., `https://your-project.vercel.app`)

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your local project:**
   ```bash
   cd Markdown
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Configure build settings
   - Add environment variables when prompted

### Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Provide deployment previews and rollback capabilities

---

## Docker Deployment

Docker provides a consistent deployment environment across different platforms.

### Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RTSII/Markdown.git
   cd Markdown
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Production: http://localhost:3000
   - Development: http://localhost:8080

### Manual Docker Build

1. **Build the Docker image:**
   ```bash
   docker build -t markdown-editor .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:80 \
     -e VITE_SUPABASE_PROJECT_ID="ybzzmutmhavqilwurajd" \
     -e VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key" \
     -e VITE_SUPABASE_URL="https://ybzzmutmhavqilwurajd.supabase.co" \
     markdown-editor
   ```

### Docker Configuration Files

The project includes optimized Docker configuration:

- **Dockerfile:** Multi-stage build for optimized production image
- **nginx.conf:** High-performance Nginx configuration
- **docker-compose.yml:** Development and production environments
- **.dockerignore:** Optimized build context

---

## MCP Server Integration (Claude Desktop)

MCP (Model Context Protocol) allows your markdown editor to integrate with Claude Desktop for enhanced AI-powered features.

### Why Claude Desktop?

- **Native MCP Support:** Built-in MCP server integration
- **Rich Context:** Access to file system and external APIs
- **Easy Setup:** Minimal configuration required
- **Active Development:** Continuous updates and improvements

### Installation Steps

1. **Install Claude Desktop:**
   - Download from https://claude.ai/download
   - Install and set up your Anthropic account

2. **Install MCP dependencies:**
   ```bash
   cd Markdown
   npm install @anthropic-ai/mcp-server @anthropic-ai/mcp-types
   ```

3. **Configure Claude Desktop:**
   
   **macOS:** Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   **Windows:** Edit `%APPDATA%/Claude/claude_desktop_config.json`

   Add this configuration:
   ```json
   {
     "mcpServers": {
       "markdown-editor": {
         "command": "node",
         "args": ["./mcp-server.js"],
         "cwd": "/path/to/your/Markdown/project"
       }
     }
   }
   ```

4. **Update the cwd path:**
   Replace `/path/to/your/Markdown/project` with your actual project directory

5. **Start the MCP server:**
   ```bash
   node mcp-server.js
   ```

6. **Restart Claude Desktop:**
   - Close Claude Desktop completely
   - Reopen to load the new MCP server configuration

### Available MCP Tools

The MCP server provides these tools to Claude:

- **create_document:** Create new markdown documents
- **save_to_supermemory:** Save content to your Supermemory knowledge base
- **search_supermemory:** Search your Supermemory for relevant content

### Usage Examples

Once configured, you can use Claude Desktop with commands like:

```
"Create a new document about React best practices"
"Save this content to my Supermemory with tags: react, development"
"Search my Supermemory for information about TypeScript interfaces"
```

### Testing MCP Integration

1. **Verify MCP server is running:**
   ```bash
   # Check if the server starts without errors
   node mcp-server.js
   ```

2. **Test in Claude Desktop:**
   - Open Claude Desktop
   - Try creating a document: "Create a new markdown document"
   - Check if the tools are available in Claude's context

---

## Troubleshooting

### Common Issues and Solutions

#### Environment Variables Not Working

**Problem:** App shows blank page or Supabase connection fails

**Solutions:**
- Ensure environment variables are prefixed with `VITE_`
- Check that `.env` file is in the project root
- Verify environment variables are set in your deployment platform
- For Docker: ensure variables are passed correctly in docker run command

#### Supabase Connection Issues

**Problem:** "Failed to connect to Supabase" errors

**Solutions:**
- Verify Supabase URL and keys are correct
- Check Supabase project status in dashboard
- Ensure your Supabase project allows the deployment domain
- Test connection with a simple query

#### Build Failures

**Problem:** `npm run build` fails

**Solutions:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires 18+)
- Verify all TypeScript errors are resolved
- Check for missing dependencies

#### Docker Issues

**Problem:** Docker build or run failures

**Solutions:**
- Ensure Docker Desktop is running
- Check Docker file permissions on Linux/macOS
- Verify port 3000 is not in use: `lsof -i :3000`
- Clear Docker cache: `docker system prune`

#### MCP Server Issues

**Problem:** Claude Desktop doesn't recognize MCP server

**Solutions:**
- Verify claude_desktop_config.json syntax is valid JSON
- Check file paths are absolute and correct
- Ensure Node.js is in system PATH
- Restart Claude Desktop after configuration changes
- Check MCP server logs for connection errors

#### Vercel Deployment Issues

**Problem:** Deployment fails or app doesn't load

**Solutions:**
- Check build logs in Vercel dashboard
- Verify environment variables are set correctly
- Ensure build command and output directory are correct
- Check for any TypeScript or linting errors
- Verify Node.js version compatibility

### Getting Help

If you encounter issues not covered here:

1. Check the GitHub repository issues: https://github.com/RTSII/Markdown/issues
2. Review Vercel documentation: https://vercel.com/docs
3. Check Supabase documentation: https://supabase.com/docs
4. Claude Desktop MCP documentation: https://docs.anthropic.com/claude/docs

---

## Additional Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Docker Documentation:** https://docs.docker.com
- **Supabase Documentation:** https://supabase.com/docs
- **Claude MCP Documentation:** https://docs.anthropic.com/claude/docs
- **Vite Documentation:** https://vitejs.dev/guide/

## Project Structure

```
Markdown/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   └── integrations/       # Supabase integration
├── public/                 # Static assets
├── supabase/              # Supabase configuration
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile            # Docker build instructions
├── nginx.conf           # Nginx configuration
├── mcp-server.js        # MCP server implementation
└── vercel.json          # Vercel configuration
```

This deployment guide should cover all your deployment needs. Choose the method that best fits your requirements and infrastructure.