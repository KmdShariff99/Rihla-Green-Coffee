# Rihla Global - Indian Green Coffee Exporter

## Overview

This is a B2B export website for Rihla Global, an India-based exporter of green coffee beans. The primary goal is to build trust with international coffee buyers and generate qualified export enquiries through contact forms, an AI chatbot, and WhatsApp integration.

The website is designed for international green coffee importers, roasters, and traders primarily in the Middle East, Europe, and Asia. It follows Coffee Board of India standards and emphasizes transparency, traceability, and reliability.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a page-based structure with reusable components. Pages include Home, About, Products, Export Process, Blog, and Contact. Key UI components handle product cards, blog cards, chatbot interface, and WhatsApp integration.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Build Process**: esbuild for production bundling with selective dependency bundling

The server handles enquiry submissions, AI chat functionality, and serves the static frontend in production. Development uses Vite middleware for hot module replacement.

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Definition**: Zod schemas in `shared/schema.ts` for validation
- **Current Storage**: In-memory storage for enquiries (MemStorage class)
- **Database Ready**: Drizzle config points to PostgreSQL via DATABASE_URL

The schema includes product definitions, enquiry validation, blog posts, and company information. Products are categorized as Arabica, Robusta, or Specialty coffee grades.

### AI Integration
- **Provider**: OpenAI-compatible API via Replit AI Integrations
- **Purpose**: Chatbot assistant for answering buyer questions about products, export process, and company details
- **System Prompt**: Detailed context about products, export steps, and company information

### Design System
- **Typography**: Inter font family
- **Color Palette**: Coffee brown primary, plantation green secondary, warm beige backgrounds
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: Cards, buttons, badges follow B2B professional styling with subtle shadows and hover effects

## External Dependencies

### Third-Party Services
- **AI Chat**: Replit AI Integrations (OpenAI-compatible endpoint)
- **WhatsApp**: Direct WhatsApp links for buyer communication
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)

### Key NPM Packages
- **UI Components**: Full shadcn/ui suite with Radix UI primitives
- **Forms**: react-hook-form with zod validation
- **HTTP Client**: Native fetch with TanStack Query
- **Date Handling**: date-fns
- **Session Management**: express-session with connect-pg-simple for PostgreSQL sessions

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: AI service endpoint (Replit only)
- `AI_INTEGRATIONS_OPENAI_API_KEY`: AI service authentication (Replit only)
- `OPENAI_API_KEY`: Direct OpenAI API key (for AWS/external deployment)
- `SESSION_SECRET`: Session encryption key

## Deployment Options

### Option 1: Static Site Deployment (GitHub Pages, Netlify, Vercel)

The project supports static site deployment without a backend server:

**Static Site Features:**
- No backend server required - Pure HTML/CSS/JS
- Contact form handled by Formspree (third-party service)
- E-catalogue as static HTML file (`/e-catalogue.html`)
- WhatsApp integration works without server
- AI chatbot removed (requires backend)

**Static Deployment Files:**
- `deploy/build-static.sh`: Static build script
- `deploy/STATIC-DEPLOYMENT-GUIDE.md`: Deployment instructions
- `client/public/e-catalogue.html`: Static product catalogue

**Quick Deploy:**
```bash
./deploy/build-static.sh
# Output: dist-static/ folder ready to deploy
```

### Option 2: AWS EC2 Deployment (Full-Stack)

The project includes AWS EC2 deployment configuration for full-stack deployment:

**AWS Deployment Files:**
- `ecosystem.config.js`: PM2 process manager configuration (root directory)
- `deploy/build-production.sh`: Production build script
- `deploy/nginx.conf`: Nginx reverse proxy configuration template
- `deploy/.env.example`: Environment variables template
- `deploy/AWS-DEPLOYMENT-GUIDE.md`: Step-by-step deployment instructions

**Key Features for AWS:**
- Health check endpoint at `/api/health` for monitoring
- PM2 cluster mode for multi-core CPU utilization
- Nginx configuration with gzip compression and caching
- SSL/HTTPS support via Let's Encrypt
- Supports both Replit AI Integrations and direct OpenAI API key
- Full AI chatbot functionality