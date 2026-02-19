# AI Academy

Platform pembelajaran revolusioner di mana AI menciptakan semua materi - Cyber Security, Programming, Automation, Data Science, dan Cloud Computing.

## Features

- **AI-Generated Content** - Semua materi dibuat oleh AI
- **Landing Page** dengan animasi glitch effect
- **Course Catalog** dengan search dan filter
- **Course Detail** dengan video player dan accordion
- **Mark as Complete** - Progress tracking per pertemuan
- **PDF Viewer** untuk dokumen pembelajaran
- **Dark Theme** dengan nuansa cyber
- **PWA Support** untuk akses offline

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Drizzle ORM + Neon PostgreSQL

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Setup environment variables:

```bash
# Buat file .env.local dengan:
DATABASE_URL="postgresql://..."
```

3. Push schema ke database:

```bash
npm run db:push
```

4. Seed data (optional):

```bash
npm run db:seed
```

5. Run development server:

```bash
npm run dev
```

## Database Commands

```bash
npm run db:push    # Push schema ke Neon
npm run db:studio  # Buka Drizzle Studio GUI
npm run db:seed    # Seed data ke database
```

## Architecture (FSD)

```
src/
  app/          # Next.js App Router
  db/           # Database queries & seed
  page-components/  # Page-level components
  widgets/      # Complex compositions (Hero, etc)
  entities/     # Domain models (Courses, Sessions)
  shared/       # Shared utilities (UI, types, lib)
```

## Data Structure

- **Courses**: List kursus dengan metadata (10 AI-generated courses)
- **Sessions**: Pertemuan dalam kursus
- **Materials**: Video (YouTube embed) dan PDF

## Categories

- Cyber Security
- Programming
- Automation
- Data Science
- Cloud Computing

## License

MIT
