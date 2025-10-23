# BeActive - Swedish Activity Booking Platform (Turborepo)

This is a modern Swedish activity booking platform built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui components, organized as a Turborepo monorepo.

## Architecture

This monorepo contains:

- `apps/web` - Next.js 16 application
- `packages/ui` - Shared UI components (shadcn/ui)
- `packages/shared` - Shared utilities, types, and hooks

## Key Technologies

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Mapbox GL JS** for interactive maps
- **Swiper** for carousels
- **Unsplash API** for images
- **Lucide React** for icons
- **Turborepo** for monorepo management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp apps/web/env.example apps/web/.env.local
   ```

3. Set up API keys for Mapbox and Unsplash in `apps/web/.env.local`:
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## Development Commands

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages and apps
- `npm run lint` - Run ESLint on all packages
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean all build artifacts

## Project Structure

```
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── ui/                  # Shared UI components
│   └── shared/              # Shared utilities and types
├── turbo.json               # Turborepo configuration
└── package.json             # Root package.json
```

## Package Details

### `apps/web`
The main Next.js application containing:
- Pages and layouts
- App-specific components
- API routes
- Static assets

### `packages/ui`
Shared UI components based on shadcn/ui:
- Button, Card, Input components
- Reusable UI primitives
- TypeScript definitions

### `packages/shared`
Shared utilities and business logic:
- TypeScript types and interfaces
- Utility functions
- Custom React hooks
- Mock data and API integrations

## Development Workflow

1. Make changes to shared packages
2. Changes are automatically reflected in the web app
3. Use `npm run build` to build all packages
4. Use `npm run dev` to start development servers

## Deployment

The web app can be deployed to Vercel or any other Next.js hosting platform. Make sure to:

1. Set environment variables in your deployment platform
2. Build the project with `npm run build`
3. Deploy the `apps/web` directory

## Environment Variables

Required environment variables for the web app:

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` - For map functionality
- `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` - For fetching images