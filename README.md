# Next.js Collaborative Document Editor

A full-stack collaborative document editor built with Next.js 16, featuring real-time collaboration, authentication, and a type-safe API powered by tRPC.

## Features

- 🔐 **Authentication**: Secure user authentication with Better Auth
- 📝 **Document Management**: Create, edit, and organize documents
- 👥 **Real-time Collaboration**: Multi-user editing with WebSocket and Y.js CRDT
- 🎯 **Collaboration Cursors**: See other users' cursors and selections in real-time
- 🔄 **Automatic Conflict Resolution**: CRDT-based merge for concurrent edits
- 🔒 **Permissions**: Granular access control (view, edit, admin)
- 📸 **Snapshots**: Save and restore document versions
- 🎯 **Type-Safe API**: End-to-end type safety with tRPC
- ⚡ **Performance**: Optimized with server components and caching
- 🎨 **Rich Text Editor**: Powered by Tiptap with extensive formatting options

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **API**: tRPC for type-safe APIs
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **Real-time**: Y.js CRDT + WebSocket for collaborative editing
- **WebSocket**: y-websocket provider with custom server
- **Editor**: Tiptap with Collaboration extensions
- **UI**: React with Tailwind CSS
- **State Management**: TanStack Query (React Query)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-store-with-auth
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for authentication
- `BETTER_AUTH_URL`: Application URL (http://localhost:3000 for development)
- `NEXT_PUBLIC_WS_URL`: WebSocket server URL (ws://localhost:3000/api/collaboration for development)

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Real-time Collaboration

The application features real-time collaborative editing powered by Y.js CRDT and WebSocket.

### How it Works

1. **WebSocket Connection**: When a user opens a document, a WebSocket connection is established
2. **Y.js CRDT**: Document changes are represented as CRDT operations
3. **Real-time Sync**: Changes are broadcast to all connected users instantly
4. **Conflict Resolution**: Y.js automatically merges concurrent edits without conflicts
5. **Collaboration Cursors**: See other users' cursor positions and selections
6. **Auto-save**: Document state is periodically saved to the database

### Testing Collaboration

To test real-time collaboration:

1. Open the same document in multiple browser windows or tabs
2. Edit the document in one window
3. See the changes appear instantly in other windows
4. Observe collaboration cursors showing other users' positions

### WebSocket Deployment

For production deployment with WebSocket support, see the [WebSocket Deployment Guide](./docs/websocket-deployment.md).

**Important**: Not all hosting platforms support WebSocket. Recommended platforms:
- Self-hosted (Node.js server)
- Railway
- Render
- DigitalOcean App Platform

For Vercel deployment, consider using PartyKit or Liveblocks as WebSocket providers.

## Project Structure

```
nextjs-store-with-auth/
├── app/                      # Next.js app router pages
│   ├── (auth)/              # Authentication pages
│   ├── api/                 # API routes (REST and tRPC)
│   ├── documents/           # Document management pages
│   └── editor/              # Document editor page
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── documents/          # Document management components
│   ├── editor/             # Editor components (toolbar, menubar, sidebar)
│   └── ui/                 # Reusable UI components
├── lib/                     # Utility libraries
│   ├── auth.ts             # Authentication configuration
│   ├── prisma.ts           # Prisma client
│   ├── errors/             # Error handling utilities
│   └── extensions/         # Tiptap extensions
├── trpc/                    # tRPC configuration and routers
│   ├── routers/            # API routers
│   ├── middleware/         # Authentication and permission middleware
│   ├── schemas/            # Zod validation schemas
│   ├── client.tsx          # Client-side tRPC setup
│   ├── server.tsx          # Server-side tRPC setup
│   └── *.md                # Documentation
├── prisma/                  # Database schema and migrations
└── scripts/                 # Utility scripts
```

## Using tRPC

This project uses tRPC for type-safe API calls. tRPC provides end-to-end type safety from the server to the client without code generation.

### Server Components

Use tRPC in server components for direct function calls (no HTTP overhead):

```typescript
import { trpc } from '@/trpc/server';

export default async function DocumentsPage() {
  const data = await trpc.docs.list.fetch({
    type: 'all',
    page: 1,
    limit: 20,
  });
  
  return <div>{/* render documents */}</div>;
}
```

### Client Components

Use tRPC in client components with TanStack Query:

```typescript
'use client';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export function DocumentList() {
  const trpc = useTRPC();
  
  const { data, isLoading } = useQuery(
    trpc.docs.list.queryOptions({
      type: 'all',
      page: 1,
      limit: 20,
    })
  );
  
  return <div>{/* render documents */}</div>;
}
```

### Documentation

Comprehensive tRPC documentation is available:

- **[Migration Guide](./trpc/MIGRATION_GUIDE.md)** - Step-by-step guide for migrating from REST to tRPC
- **[Server Usage](./trpc/SERVER_USAGE.md)** - Using tRPC in server components
- **[Client Usage](./trpc/CLIENT_USAGE.md)** - Using tRPC in client components
- **[Integration Summary](./trpc/INTEGRATION_SUMMARY.md)** - Overview of the tRPC setup

### Testing tRPC

Test the tRPC integration:

```bash
# Test server integration
npx tsx scripts/verify-trpc-server.ts

# Test client integration
npx tsx scripts/verify-trpc-client.ts
```

Or visit the interactive test pages:
- Server component test: `/documents/__server-example`
- Client component test: `/test-trpc-client`

## Available API Procedures

### Document CRUD
- `docs.list` - List documents with filtering, search, and pagination
- `docs.getById` - Get single document with collaborators
- `docs.create` - Create new document
- `docs.update` - Update document metadata
- `docs.delete` - Delete document

### Collaborator Management
- `docs.addCollaborator` - Add collaborator (by userId or email)
- `docs.updateCollaborator` - Update collaborator permissions
- `docs.removeCollaborator` - Remove collaborator

### Session Management
- `docs.createSession` - Create editing session
- `docs.listSessions` - List active sessions
- `docs.endSession` - End session

### Snapshot Management
- `docs.createSnapshot` - Create document snapshot
- `docs.listSnapshots` - List snapshots
- `docs.restoreSnapshot` - Restore from snapshot

### Y.js State Management
- `docs.getYjsState` - Get Y.js state
- `docs.updateYjsState` - Update Y.js state

## Database Schema

The application uses Prisma with PostgreSQL. Key models:

- **User**: User accounts and authentication
- **Document**: Document metadata and Y.js state
- **Collaborator**: Document sharing and permissions
- **ActiveSession**: Real-time editing sessions
- **DocumentSnapshot**: Version history

Run migrations:
```bash
npx prisma migrate dev
```

Generate Prisma client:
```bash
npx prisma generate
```

## Development

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (if configured)

### Testing

Run tests:
```bash
npm test
```

### Building for Production

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Next.js repository

### tRPC Resources
- [tRPC Documentation](https://trpc.io/docs) - Official tRPC documentation
- [TanStack Query](https://tanstack.com/query/latest) - Data fetching and caching

### Other Resources
- [Prisma Documentation](https://www.prisma.io/docs) - Database ORM
- [Tiptap Documentation](https://tiptap.dev) - Rich text editor
- [Y.js Documentation](https://docs.yjs.dev) - Real-time collaboration

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

The application can be deployed to any platform that supports Node.js:
- AWS
- Google Cloud
- Azure
- Railway
- Render
- Fly.io

Ensure you:
1. Set up a PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build the application
5. Start the production server

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license here]

## Support

For questions or issues:
1. Check the documentation in the `trpc/` directory
2. Review the example components
3. Run the verification scripts
4. Open an issue on GitHub
