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
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: AI service endpoint
- `AI_INTEGRATIONS_OPENAI_API_KEY`: AI service authentication