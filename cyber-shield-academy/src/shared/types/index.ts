export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration?: number;
  instructor?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export interface Session {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  duration?: number;
  createdAt: Date;
}

export interface Material {
  id: string;
  sessionId: string;
  type: 'video' | 'pdf' | 'ppt';
  title: string;
  content?: string;
  orderIndex: number;
  createdAt: Date;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  beginner: 'Pemula',
  intermediate: 'Menengah',
  advanced: 'Lanjutan',
};

export const LEVEL_COLORS: Record<DifficultyLevel, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  advanced: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};
