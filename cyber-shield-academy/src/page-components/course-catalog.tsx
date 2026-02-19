'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DifficultyLevel, LEVEL_LABELS } from '@/shared/types';
import { CourseCard } from '@/entities/courses/ui/course-card';
import { Course } from '@/shared/types/schema';

const levels: { value: DifficultyLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Level' },
  { value: 'beginner', label: 'Pemula' },
  { value: 'intermediate', label: 'Menengah' },
  { value: 'advanced', label: 'Lanjutan' },
];

interface CourseCatalogProps {
  initialCourses: Course[];
}

export function CourseCatalog({ initialCourses }: CourseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');

  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel, initialCourses]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="relative py-20 bg-gradient-to-b from-purple-900/20 to-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Generated Courses</span>
              <Bot className="w-4 h-4" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
              Kursus Dibuat oleh AI
            </h1>
            <p className="text-slate-400">
              Dari Cyber Security, Programming, Automation, hingga Data Science. 
              Semua materi dibuat dan dikurasi oleh Artificial Intelligence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Cari kursus AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
            />
          </div>

          {/* Level Filter */}
          <div className="flex gap-2 flex-wrap">
            {levels.map((level) => (
              <Button
                key={level.value}
                variant={selectedLevel === level.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel(level.value)}
                className={
                  selectedLevel === level.value
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600'
                    : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course as any} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              Tidak ada kursus ditemukan
            </h3>
            <p className="text-slate-500">
              Coba ubah kata kunci pencarian atau filter yang dipilih
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
