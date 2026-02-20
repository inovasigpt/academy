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

  return (
    <CourseSessionsClient
      course={course}
      initialSessions={sessions}
      updateCourse={updateCourse.bind(null, id)}
      createSession={createSession.bind(null, { courseId: id })}
      updateSession={updateSession}
      deleteSession={deleteSession}
    />
  );
}
