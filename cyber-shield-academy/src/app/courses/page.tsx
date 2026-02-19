import { getCourses } from '@/db/queries';
import { CourseCatalog } from '@/page-components/course-catalog';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function CoursesPage() {
  const courses = await getCourses();
  return <CourseCatalog initialCourses={courses} />;
}
