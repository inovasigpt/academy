'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, PlayCircle, Sparkles, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Course, LEVEL_LABELS, LEVEL_COLORS } from '@/entities/courses/model/courses';
import { mockSessions, mockMaterials } from '@/entities/sessions/model/sessions';
import { SessionAccordion } from '@/entities/sessions/ui/session-accordion';

interface CourseDetailProps {
  course: Course;
}

export function CourseDetail({ course }: CourseDetailProps) {
  const [openSession, setOpenSession] = useState<string | null>(null);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(new Set());
  
  const sessions = mockSessions[course.slug] || [];
  const totalMaterials = sessions.reduce((acc, session) => {
    const materials = mockMaterials[session.id] || [];
    return acc + materials.length;
  }, 0);

  // Load completed sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`completed-${course.slug}`);
    if (saved) {
      setCompletedSessions(new Set(JSON.parse(saved)));
    }
  }, [course.slug]);

  // Save to localStorage when completed sessions change
  useEffect(() => {
    localStorage.setItem(
      `completed-${course.slug}`,
      JSON.stringify(Array.from(completedSessions))
    );
  }, [completedSessions, course.slug]);

  const toggleSession = (sessionId: string) => {
    setOpenSession(openSession === sessionId ? null : sessionId);
  };

  const toggleComplete = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCompleted = new Set(completedSessions);
    if (newCompleted.has(sessionId)) {
      newCompleted.delete(sessionId);
    } else {
      newCompleted.add(sessionId);
    }
    setCompletedSessions(newCompleted);
  };

  const progressPercentage = sessions.length > 0 
    ? Math.round((completedSessions.size / sessions.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-slate-950" />
        
        <div className="container mx-auto px-4 py-8 relative">
          <Link href="/courses">
            <Button variant="ghost" className="text-slate-400 hover:text-slate-200 mb-6 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Katalog
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${LEVEL_COLORS[course.level]}`}>
                  {LEVEL_LABELS[course.level]}
                </div>

                {/* AI Generated Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </div>
              </div>

              {/* Title & Description */}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                {course.title}
              </h1>
              
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-slate-400">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Dibuat oleh AI</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} menit</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <BookOpen className="w-4 h-4" />
                  <span>{sessions.length} Pertemuan</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <PlayCircle className="w-4 h-4" />
                  <span>{totalMaterials} Materi</span>
                </div>
              </div>

              {/* Progress Bar */}
              {sessions.length > 0 && (
                <div className="mb-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Progress Belajar</span>
                    <span className="text-sm font-bold text-cyan-400">{progressPercentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {completedSessions.size} dari {sessions.length} pertemuan selesai
                  </p>
                </div>
              )}
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Kurikulum</h2>
              
              <div className="space-y-3">
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <SessionAccordion
                      key={session.id}
                      session={session}
                      materials={mockMaterials[session.id] || []}
                      isOpen={openSession === session.id}
                      onToggle={() => toggleSession(session.id)}
                      isCompleted={completedSessions.has(session.id)}
                      onToggleComplete={(e) => toggleComplete(session.id, e)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
                    <p className="text-slate-500">Kurikulum belum tersedia</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
