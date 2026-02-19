import { HeroSection } from '@/widgets/hero-section';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSection />
    </main>
  );
}
