import { getCourseById, getSessionsByCourse, updateCourse, createSession, updateSession, deleteSession } from '@/app/admin/actions';
import { redirect } from 'next/navigation';
import { CourseSessionsClient } from './course-sessions-client';

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

  // Wrapper functions untuk client component
  async function handleUpdateCourse(formData: FormData) {
    'use server';
    await updateCourse(id, {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      level: formData.get('level') as string,
    });
  }

  async function handleCreateSession(formData: FormData) {
    'use server';
    await createSession({
      courseId: id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      orderIndex: parseInt(formData.get('orderIndex') as string),
    });
  }

  async function handleUpdateSession(formData: FormData) {
    'use server';
    const sessionId = formData.get('sessionId') as string;
    await updateSession(sessionId, {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
    });
  }

  async function handleDeleteSession(formData: FormData) {
    'use server';
    const sessionId = formData.get('sessionId') as string;
    await deleteSession(sessionId);
  }

  return (
    <CourseSessionsClient
      course={course}
      initialSessions={sessions}
      updateCourse={handleUpdateCourse}
      createSession={handleCreateSession}
      updateSession={handleUpdateSession}
      deleteSession={handleDeleteSession}
    />
  );
}
