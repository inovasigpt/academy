# Cyber-Shield Academy

Cybersecurity learning platform built with Next.js 15, Turborepo, and Drizzle ORM.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Dark Theme)
- **Database**: Drizzle ORM + Neon PostgreSQL
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Serwist

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
academy/
├── apps/
│   └── web/                 # Next.js 15 application
│       ├── app/             # App Router
│       ├── components/      # React components
│       └── lib/             # Utilities & database
├── packages/
│   ├── config/              # Shared configurations
│   ├── ui/                  # Shared UI components
│   └── typescript/          # Shared TypeScript config
```

## Database

Database schema uses Drizzle ORM with the following tables:
- `users` - User accounts
- `categories` - Course categories
- `courses` - Course content
- `modules` - Course modules
- `lessons` - Individual lessons with attachments

## License

MIT