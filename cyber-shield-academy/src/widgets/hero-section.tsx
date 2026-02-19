'use client';

import { Sparkles, Cpu, Code, Zap, ChevronRight, Bot } from 'lucide-react';
import { GlitchText } from '@/shared/ui/glitch-text';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    icon: Bot,
    title: '100% AI Generated',
    description: 'Semua materi dibuat oleh AI canggih dengan kurikulum terstruktur',
  },
  {
    icon: Sparkles,
    title: 'Selalu Update',
    description: 'Konten diperbarui otomatis dengan perkembangan teknologi terbaru',
  },
  {
    icon: Zap,
    title: 'Gratis Selamanya',
    description: 'Akses unlimited tanpa biaya. Belajar sepuasnya kapan saja',
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by Artificial Intelligence</span>
            <Cpu className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <GlitchText 
              text="AI Academy" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto font-light"
          >
            Platform pembelajaran revolusioner di mana{' '}
            <span className="text-cyan-400 font-semibold">AI menciptakan semua materi</span>
            {' '}dari Cyber Security, Programming, hingga Automation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto"
          >
            Tidak perlu mentor mahal. Tidak perlu biaya berlangganan. 
            Cukup satu klik, AI siap mengajari kamu 24/7.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/courses">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-6 text-lg group shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]"
              >
                <Code className="w-5 h-5 mr-2" />
                Mulai Belajar Gratis
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 mb-20 text-center"
          >
            <div>
              <div className="text-3xl font-bold text-cyan-400">∞</div>
              <div className="text-sm text-slate-500">Materi Tersedia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-slate-500">AI Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">24/7</div>
              <div className="text-sm text-slate-500">Akses Tanpa Batas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">Rp 0</div>
              <div className="text-sm text-slate-500">Biaya Belajar</div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)] group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-cyan-500/30">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
