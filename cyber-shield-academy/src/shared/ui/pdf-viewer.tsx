'use client';

import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFViewerProps {
  url: string;
  title: string;
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  const isExternal = url.startsWith('http');

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-rose-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-100 mb-1 truncate">{title}</h4>
          <p className="text-sm text-slate-500 mb-4">Dokumen PDF</p>
          
          <div className="flex gap-3">
            {isExternal ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-700 hover:bg-slate-800 text-slate-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka
                </Button>
              </a>
            ) : null}
            
            <a href={url} download>
              <Button 
                variant="outline" 
                size="sm"
                className="border-slate-700 hover:bg-slate-800 text-slate-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      {isExternal && (
        <div className="mt-4 rounded-lg overflow-hidden border border-slate-800">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
            className="w-full h-96"
            title={title}
          />
        </div>
      )}
    </div>
  );
}
