'use client';

import { motion } from 'framer-motion';
import { Clock, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Course, LEVEL_LABELS, LEVEL_COLORS } from '@/entities/courses/model/courses';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/courses/${course.slug}`}>
        <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]">
          {/* Thumbnail */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            
            {/* Level Badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${LEVEL_COLORS[course.level]}`}>
              {LEVEL_LABELS[course.level]}
            </div>
            
            {/* AI Generated Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{course.category}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
              {course.title}
            </h3>

            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>{course.duration} menit</span>
              </div>

              <div className="flex items-center gap-1 text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                <span>Lihat Detail</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
