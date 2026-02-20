import { getSessionById, getMaterialsBySession, getCourseById, createMaterial, updateMaterial, deleteMaterial } from '@/app/admin/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2, Video, FileText, Presentation } from 'lucide-react';

interface MaterialsPageProps {
  params: Promise<{ id: string; sessionId: string }>;
}

export default async function MaterialsPage({ params }: MaterialsPageProps) {
  const { id, sessionId } = await params;
  
  const [course, session] = await Promise.all([
    getCourseById(id),
    getSessionById(sessionId)
  ]);

  if (!course || !session) {
    redirect(`/admin/courses/${id}`);
  }

  const materials = await getMaterialsBySession(sessionId);

  async function handleCreateMaterial(formData: FormData) {
    'use server';
    
    await createMaterial({
      sessionId,
      type: formData.get('type') as 'video' | 'pdf' | 'ppt',
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      orderIndex: parseInt(formData.get('orderIndex') as string),
    });
    
    revalidatePath(`/admin/courses/${id}/sessions/${sessionId}/materials`);
  }

  async function handleUpdateMaterial(formData: FormData) {
    'use server';
    const materialId = formData.get('materialId') as string;
    
    await updateMaterial(materialId, {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });
    
    revalidatePath(`/admin/courses/${id}/sessions/${sessionId}/materials`);
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'ppt': return <Presentation className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/admin/courses/${id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <p className="text-slate-500 text-sm">{course.title}</p>
              <h1 className="text-2xl font-bold text-slate-100">{session.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Material Form */}
          <div>
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">Add Material</h2>
              
              <form action={handleCreateMaterial} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Type *</label>
                  <select
                    name="type"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="video">🎥 Video (YouTube URL)</option>
                    <option value="pdf">📄 PDF Document</option>
                    <option value="ppt">📊 PowerPoint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="Material title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Content / URL *</label>
                  <textarea
                    name="content"
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="YouTube URL, PDF link, or embed code"
                  />
                  <p className="text-xs text-slate-500 mt-1">For YouTube: use full URL or embed URL</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Order *</label>
                  <input
                    type="number"
                    name="orderIndex"
                    defaultValue={materials.length}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Material
                </Button>
              </form>
            </div>
          </div>

          {/* Materials List */}
          <div>
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-slate-100">Materials ({materials.length})</h2>
              </div>
              
              <div className="divide-y divide-slate-800">
                {materials.map((material, index) => (
                  <div key={material.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        material.type === 'video' ? 'bg-red-500/20 text-red-400' :
                        material.type === 'pdf' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {getIcon(material.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-slate-500">#{index + 1}</span>
                          <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">{material.type}</span>
                        </div>
                        
                        <form action={handleUpdateMaterial} className="space-y-3">
                          <input type="hidden" name="materialId" value={material.id} />
                          
                          <input
                            type="text"
                            name="title"
                            defaultValue={material.title}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                          />
                          
                          <textarea
                            name="content"
                            defaultValue={material.content || ''}
                            rows={2}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                          />
                          
                          <div className="flex items-center gap-2">
                            <Button type="submit" size="sm" variant="outline">Update</Button>
                            
                            <Button 
                              type="button" 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-400 hover:text-red-300"
                              formAction={async () => {
                                'use server';
                                await deleteMaterial(material.id);
                                revalidatePath(`/admin/courses/${id}/sessions/${sessionId}/materials`);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}

                {materials.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    No materials yet. Add your first video, PDF, or PPT.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
