import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { courses, sessions, materials } from '../shared/types/schema';
import { desc, eq } from 'drizzle-orm';
import 'server-only';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

export async function getCourses() {
  return await db
    .select()
    .from(courses)
    .where(eq(courses.isPublished, true))
    .orderBy(desc(courses.createdAt));
}

export async function getCourseBySlug(slug: string) {
  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, slug))
    .limit(1);
  
  return result[0] || null;
}

export async function getSessionsByCourseId(courseId: string) {
  return await db
    .select()
    .from(sessions)
    .where(eq(sessions.courseId, courseId))
    .orderBy(sessions.orderIndex);
}

export async function getMaterialsBySessionId(sessionId: string) {
  return await db
    .select()
    .from(materials)
    .where(eq(materials.sessionId, sessionId))
    .orderBy(materials.orderIndex);
}

export type CourseWithSessions = Awaited<ReturnType<typeof getCourseWithSessions>>;

export async function getCourseWithSessions(slug: string) {
  const course = await getCourseBySlug(slug);
  
  if (!course) return null;
  
  const courseSessions = await getSessionsByCourseId(course.id);
  
  const sessionsWithMaterials = await Promise.all(
    courseSessions.map(async (session) => {
      const sessionMaterials = await getMaterialsBySessionId(session.id);
      return {
        ...session,
        materials: sessionMaterials,
      };
    })
  );
  
  return {
    ...course,
    sessions: sessionsWithMaterials,
  };
}
