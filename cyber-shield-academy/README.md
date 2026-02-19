# Cyber-Shield Academy

Platform edukasi cyber security berbasis web dengan fitur lengkap.

## Features

- **Landing Page** dengan animasi glitch effect
- **Course Catalog** dengan search dan filter
- **Course Detail** dengan video player dan accordion
- **PDF Viewer** untuk dokumen pembelajaran
- **Dark Theme** khusus cyber security
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
cp .env.local.example .env.local
# Edit .env.local dengan konfigurasi database Anda
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Architecture (FSD)

```
src/
  app/          # Next.js App Router
  pages/        # Page components
  widgets/      # Complex compositions
  features/     # Business features
  entities/     # Domain models
  shared/       # Shared utilities
```

## Data Structure

- **Courses**: List kursus dengan metadata
- **Sessions**: Pertemuan dalam kursus
- **Materials**: Video (YouTube embed) dan PDF

## License

MIT
