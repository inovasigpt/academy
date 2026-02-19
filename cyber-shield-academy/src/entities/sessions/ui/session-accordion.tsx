'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, FileText, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Session, Material } from '@/shared/types';
import { VideoPlayer } from '@/shared/ui/video-player';
import { PDFViewer } from '@/shared/ui/pdf-viewer';

interface SessionAccordionProps {
  session: Session;
  materials: Material[];
  isOpen: boolean;
  onToggle: () => void;
  isCompleted?: boolean;
  onToggleComplete?: (e: React.MouseEvent) => void;
}

export function SessionAccordion({ 
  session, 
  materials, 
  isOpen, 
  onToggle,
  isCompleted = false,
  onToggleComplete
}: SessionAccordionProps) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${
      isCompleted 
        ? 'border-emerald-500/30 bg-emerald-950/10' 
        : 'border-slate-800 bg-slate-900/50'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3 text-left flex-1">
          {/* Mark as Complete Button */}
          {onToggleComplete && (
            <div
              onClick={onToggleComplete}
              onKeyDown={(e) => e.key === 'Enter' && onToggleComplete(e as any)}
              role="button"
              tabIndex={0}
              className="flex-shrink-0 focus:outline-none cursor-pointer"
              title={isCompleted ? "Tandai belum selesai" : "Tandai selesai"}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 hover:text-emerald-300 transition-colors" />
              ) : (
                <Circle className="w-6 h-6 text-slate-600 hover:text-cyan-400 transition-colors" />
              )}
            </div>
          )}

          {/* Session Number */}
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isCompleted 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-cyan-500/10 text-cyan-400'
          }`}>
            <span className="text-sm font-semibold">{session.orderIndex}</span>
          </div>

          {/* Session Info */}
          <div className="flex-1">
            <h4 className={`font-semibold ${isCompleted ? 'text-emerald-100' : 'text-slate-100'}`}>
              {session.title}
              {isCompleted && (
                <span className="ml-2 text-xs font-normal text-emerald-400">(Selesai)</span>
              )}
            </h4>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Clock className="w-3 h-3" />
              <span>{session.duration} menit</span>
              <span className="mx-1">•</span>
              <span>{materials.length} materi</span>
            </div>
          </div>
        </div>
        
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-slate-800">
              {session.description && (
                <p className="text-slate-400 text-sm my-4">{session.description}</p>
              )}
              
              <div className="space-y-4">
                {materials.map((material) => (
                  <div key={material.id}>
                    {material.type === 'video' && material.content && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Play className="w-4 h-4 text-cyan-400" />
                          <span className="font-medium">{material.title}</span>
                        </div>
                        <VideoPlayer videoId={material.content} title={material.title} />
                      </div>
                    )}
                    
                    {material.type === 'pdf' && material.content && (
                      <PDFViewer url={material.content} title={material.title} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
