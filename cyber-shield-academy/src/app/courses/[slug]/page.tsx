import { notFound } from 'next/navigation';
import { mockCourses } from '@/entities/courses/model/courses';
import { CourseDetail } from '@/page-components/course-detail';

export const dynamic = 'force-static';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = mockCourses.find((c) => c.slug === slug);
  
  if (!course) {
    notFound();
  }
  
  return <CourseDetail course={course} />;
}

export async function generateStaticParams() {
  return mockCourses.map((course) => ({
    slug: course.slug,
  }));
}
