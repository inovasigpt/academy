import { notFound } from 'next/navigation';
import { getCourseWithSessions, getCourses } from '@/db/queries';
import { CourseDetail } from '@/page-components/course-detail';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const courseData = await getCourseWithSessions(slug);
  
  if (!courseData) {
    notFound();
  }
  
  return <CourseDetail courseData={courseData} />;
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}
