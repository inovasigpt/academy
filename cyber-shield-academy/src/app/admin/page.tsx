import { getCourses } from './actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { deleteCourse } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const coursesList = await getCourses();

  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await deleteCourse(id);
    revalidatePath('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-100">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">Manage courses, sessions, and materials</p>
            </div>
            <Link href="/admin/courses/new">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Desktop Table */}
        <div className="hidden md:block bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Level</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {coursesList.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {course.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-slate-100">{course.title}</p>
                          <p className="text-sm text-slate-500">{course.duration} minutes</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{course.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        course.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {course.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.isPublished ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/courses/${course.slug}`}>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="w-4 h-4 text-slate-400" />
                          </Button>
                        </Link>
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4 text-slate-400" />
                          </Button>
                        </Link>
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={course.id} />
                          <Button variant="ghost" size="icon" type="submit" className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {coursesList.map((course) => (
            <div key={course.id} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
              <div className="flex gap-4 mb-4">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-100 text-lg mb-1">{course.title}</p>
                  <p className="text-sm text-slate-500 mb-2">{course.category} • {course.duration} min</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      course.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {course.level}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.isPublished ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4 border-t border-slate-800">
                <Link href={`/courses/${course.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/courses/${course.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <form action={handleDelete} className="flex-1">
                  <input type="hidden" name="id" value={course.id} />
                  <Button variant="outline" type="submit" className="w-full text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
