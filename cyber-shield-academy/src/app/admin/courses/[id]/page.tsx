import { getCourseById, getSessionsByCourse, createSession, deleteSession, updateCourse, updateSession } from '@/app/admin/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, FileText, Trash2, Edit3, Save, X } from 'lucide-react';

interface CourseSessionsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ editSession?: string }>;
}

export default async function CourseSessionsPage({ params, searchParams }: CourseSessionsPageProps) {
  const { id } = await params;
  const { editSession } = await searchParams;
  
  const course = await getCourseById(id);
  
  if (!course) {
    redirect('/admin');
  }

  const sessions = await getSessionsByCourse(id);

  async function handleUpdateCourse(formData: FormData) {
    'use server';
    await updateCourse(id, {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      level: formData.get('level') as string,
    });
    revalidatePath(`/admin/courses/${id}`);
  }

  async function handleCreateSession(formData: FormData) {
    'use server';
    await createSession({
      courseId: id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      orderIndex: parseInt(formData.get('orderIndex') as string),
    });
    revalidatePath(`/admin/courses/${id}`);
  }

  async function handleUpdateSession(formData: FormData) {
    'use server';
    const sessionId = formData.get('sessionId') as string;
    await updateSession(sessionId, {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
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
          {/* Left Column - Course Edit & Add Session */}
          <div className="lg:col-span-1 space-y-6">
            {/* Edit Course */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">Edit Course</h2>
              
              <form action={handleUpdateCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={course.title}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={course.category}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Level</label>
                  <select
                    name="level"
                    defaultValue={course.level}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={course.description}
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Save className="w-4 h-4 mr-2" />
                  Update Course
                </Button>
              </form>
            </div>

            {/* Add Session */}
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

                <Button type="submit" variant="outline" className="w-full">
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
                    {editSession === session.id ? (
                      // Edit Mode
                      <form action={handleUpdateSession} className="space-y-4">
                        <input type="hidden" name="sessionId" value={session.id} />
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                          <input
                            type="text"
                            name="title"
                            defaultValue={session.title}
                            required
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                          <textarea
                            name="description"
                            defaultValue={session.description || ''}
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-500">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Link href={`/admin/courses/${id}`}>
                            <Button variant="outline">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </form>
                    ) : (
                      // View Mode
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
                        </div>

                        <div className="flex items-center gap-2">
                          <Link href={`/admin/courses/${id}?editSession=${session.id}`}>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Edit3 className="w-4 h-4 text-slate-400" />
                            </Button>
                          </Link>

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
                    )}
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
