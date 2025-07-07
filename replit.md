# DocCreator - Simple Document Editor

## Overview

DocCreator is a bilingual document editing application that supports Arabic and English content creation. The application allows users to create professional documents with bilingual support and export them to PDF and Word formats. It features a modern React-based frontend with a clean, intuitive interface designed for document creation and editing.

## System Architecture

The application follows a full-stack architecture with a clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with custom document editor hook
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM for database operations
- **Database**: PostgreSQL with Neon serverless database
- **Session Management**: express-session with PostgreSQL store

## Key Components

### Frontend Components
1. **Document Editor**: Main editing interface with language selection
2. **Language Selector**: Radio group for choosing Arabic, English, or bilingual modes
3. **Text Editor**: Textarea components with RTL/LTR support for different languages
4. **Image Uploader**: Drag-and-drop interface for adding images to documents
5. **Document Preview**: Real-time preview of the document content
6. **Export Actions**: PDF and Word export functionality using client-side libraries

### Backend Components
1. **API Routes**: Express routes with /api prefix for all endpoints
2. **Storage Interface**: Abstracted storage layer supporting both memory and database storage
3. **User Management**: Basic user schema with authentication capabilities
4. **Database Schema**: Drizzle schema definitions for PostgreSQL

### Shared Components
1. **Schema Definitions**: Shared TypeScript types and Zod validation schemas
2. **Database Models**: User model with insert/select types

## Data Flow

1. **Document Creation**: Users interact with the frontend to create and edit documents
2. **Real-time Preview**: Content changes are immediately reflected in the preview panel
3. **Image Handling**: Images are processed client-side and stored as base64 data URLs
4. **Export Process**: Documents are generated client-side using jsPDF and docx libraries
5. **State Management**: Document state is managed locally with React hooks
6. **API Communication**: TanStack Query handles API requests with proper error handling

## External Dependencies

### Frontend Libraries
- **UI Framework**: React with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with PostCSS for processing
- **Forms**: React Hook Form with Hookform Resolvers for validation
- **Date Handling**: date-fns for date formatting and manipulation
- **Export Libraries**: jsPDF for PDF generation, docx for Word document creation
- **File Handling**: FileSaver.js for downloading generated documents

### Backend Libraries
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for runtime type checking and validation

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full TypeScript support across frontend and backend
- **Code Quality**: ESBuild for backend bundling

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: tsx for TypeScript execution in development
- **Database**: Neon serverless PostgreSQL with Drizzle migrations

### Production Build
- **Frontend**: Vite build process generates optimized static assets
- **Backend**: ESBuild bundles the Express server into a single file
- **Assets**: Static files served from dist/public directory
- **Database**: Production PostgreSQL database with connection pooling

### Build Scripts
- `dev`: Development mode with tsx for server and Vite for frontend
- `build`: Production build combining Vite frontend build and ESBuild backend bundle
- `start`: Production server startup
- `db:push`: Database schema synchronization using Drizzle

### Environment Configuration
- **DATABASE_URL**: Required for PostgreSQL connection
- **NODE_ENV**: Environment-specific configuration
- **Session Management**: PostgreSQL-backed sessions for user state

## Changelog

- July 06, 2025. Initial setup
- July 06, 2025. Fixed Arabic text support in PDF export using html2canvas method

## User Preferences

Preferred communication style: Simple, everyday language.