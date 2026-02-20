import { getCourseById, getSessionsByCourse, createSession, deleteSession } from '../../actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Edit, Trash2, FileText } from 'lucide-react';

interface CourseSessionsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseSessionsPage({ params }: CourseSessionsPageProps) {
  const { id } = await params;
  const course = await getCourseById(id);
  
  if (!course) {
    redirect('/admin');
  }

  const sessions = await getSessionsByCourse(id);

  async function handleCreateSession(formData: FormData) {
    'use server';
    
    await createSession({
      courseId: id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      orderIndex: parseInt(formData.get('orderIndex') as string),
      duration: parseInt(formData.get('duration') as string) || undefined,
    });
    
    revalidatePath(`/admin/courses/${id}`);
  }

  async function handleDeleteSession(formData: FormData) {
    'use server';
    const sessionId = formData.get('sessionId') as string;
    await deleteSession(sessionId);
    revalidatePath(`/admin/courses/${id}`);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">{course.title}</h1>
              <p className="text-slate-500">Manage sessions and materials</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Session Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">Add Session</h2>
              
              <form action={handleCreateSession} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="Session title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="Session description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Order *</label>
                    <input
                      type="number"
                      name="orderIndex"
                      defaultValue={sessions.length}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Duration (min)</label>
                    <input
                      type="number"
                      name="duration"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                      placeholder="60"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Session
                </Button>
              </form>
            </div>
          </div>

          {/* Sessions List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-slate-100">Sessions ({sessions.length})</h2>
              </div>
              
              <div className="divide-y divide-slate-800">
                {sessions.map((session, index) => (
                  <div key={session.id} className="p-6 hover:bg-slate-800/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <h3 className="font-semibold text-slate-100">{session.title}</h3>
                        </div>
                        
                        {session.description && (
                          <p className="text-sm text-slate-500 mb-2">{session.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{session.duration} minutes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/admin/courses/${id}/sessions/${session.id}/materials`}>
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            Materials
                          </Button>
                        </Link>

                        <form action={handleDeleteSession}>
                          <input type="hidden" name="sessionId" value={session.id} />
                          <Button variant="ghost" size="icon" type="submit" className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}

                {sessions.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    No sessions yet. Add your first session.
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
