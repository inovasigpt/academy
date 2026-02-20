'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SuccessModal } from '@/components/ui/success-modal';
import { ArrowLeft, Plus, FileText, Trash2, Edit3, Save, X } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
}

interface CourseSessionsClientProps {
  course: Course;
  initialSessions: Session[];
  updateCourse: (formData: FormData) => Promise<void>;
  createSession: (formData: FormData) => Promise<void>;
  updateSession: (formData: FormData) => Promise<void>;
  deleteSession: (formData: FormData) => Promise<void>;
}

export function CourseSessionsClient({ 
  course, 
  initialSessions,
  updateCourse,
  createSession,
  updateSession,
  deleteSession
}: CourseSessionsClientProps) {
  const [sessions, setSessions] = useState(initialSessions);
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  async function handleUpdateCourse(formData: FormData) {
    await updateCourse(formData);
    setSuccessMessage('Course updated successfully!');
    setShowSuccess(true);
  }

  async function handleCreateSession(formData: FormData) {
    await createSession(formData);
    setSuccessMessage('Session created successfully!');
    setShowSuccess(true);
    // Reset form
    const form = document.getElementById('create-session-form') as HTMLFormElement;
    form?.reset();
  }

  async function handleUpdateSession(formData: FormData) {
    await updateSession(formData);
    setEditingSession(null);
    setSuccessMessage('Session updated successfully!');
    setShowSuccess(true);
  }

  return (
    <>
      <SuccessModal 
        message={successMessage}
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

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
            {/* Left Column */}
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
                
                <form id="create-session-form" action={handleCreateSession} className="space-y-4">
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
                      {editingSession === session.id ? (
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
                            <Button 
                              type="button"
                              variant="outline"
                              onClick={() => setEditingSession(null)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
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
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Edit"
                              onClick={() => setEditingSession(session.id)}
                            >
                              <Edit3 className="w-4 h-4 text-slate-400" />
                            </Button>

                            <Link href={`/admin/courses/${course.id}/sessions/${session.id}/materials`}>
                              <Button variant="ghost" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                Materials
                              </Button>
                            </Link>

                            <form action={deleteSession}>
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
    </>
  );
}
