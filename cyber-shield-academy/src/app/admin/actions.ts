'use server';

import { revalidatePath } from 'next/cache';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { courses, sessions, materials } from '@/shared/types/schema';
import { eq, desc } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// COURSE ACTIONS
export async function getCourses() {
  return await db.select().from(courses).orderBy(desc(courses.createdAt));
}

export async function getPublishedCourses() {
  return await db
    .select()
    .from(courses)
    .where(eq(courses.isPublished, true))
    .orderBy(desc(courses.createdAt));
}

export async function getCourseById(id: string) {
  const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return result[0] || null;
}

export async function getCourseBySlug(slug: string) {
  const result = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  return result[0] || null;
}

export async function createCourse(data: {
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  level: string;
  category: string;
  duration?: number;
  instructor?: string;
}) {
  const [course] = await db.insert(courses).values({ ...data, isPublished: true }).returning();
  revalidatePath('/admin');
  revalidatePath('/courses');
  return course;
}

export async function updateCourse(id: string, data: Partial<typeof courses.$inferInsert>) {
  const [course] = await db.update(courses).set({ ...data, updatedAt: new Date() }).where(eq(courses.id, id)).returning();
  revalidatePath('/admin');
  revalidatePath('/courses');
  revalidatePath(`/courses/${course.slug}`);
  return course;
}

// FormData wrapper for course update
export async function updateCourseFromForm(formData: FormData) {
  const id = formData.get('id') as string;
  return updateCourse(id, {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    level: formData.get('level') as string,
  });
}

export async function toggleCoursePublish(id: string) {
  const course = await getCourseById(id);
  if (!course) return null;
  
  const [updated] = await db
    .update(courses)
    .set({ isPublished: !course.isPublished, updatedAt: new Date() })
    .where(eq(courses.id, id))
    .returning();
    
  revalidatePath('/admin');
  revalidatePath('/courses');
  return updated;
}

// SESSION ACTIONS
export async function getSessionsByCourse(courseId: string) {
  return await db.select().from(sessions).where(eq(sessions.courseId, courseId)).orderBy(sessions.orderIndex);
}

export async function getSessionById(id: string) {
  const result = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
  return result[0] || null;
}

export async function createSession(data: {
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  duration?: number;
}) {
  const [session] = await db.insert(sessions).values(data).returning();
  revalidatePath(`/admin/courses/${data.courseId}`);
  return session;
}

// FormData wrapper for session create
export async function createSessionFromForm(formData: FormData) {
  return createSession({
    courseId: formData.get('courseId') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    orderIndex: parseInt(formData.get('orderIndex') as string),
  });
}

export async function updateSession(id: string, data: Partial<typeof sessions.$inferInsert>) {
  const [session] = await db.update(sessions).set(data).where(eq(sessions.id, id)).returning();
  revalidatePath(`/admin/courses/${session.courseId}`);
  return session;
}

// FormData wrapper for session update
export async function updateSessionFromForm(formData: FormData) {
  const id = formData.get('sessionId') as string;
  return updateSession(id, {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  });
}

export async function deleteSession(id: string) {
  const session = await getSessionById(id);
  if (session) {
    await db.delete(sessions).where(eq(sessions.id, id));
    revalidatePath(`/admin/courses/${session.courseId}`);
  }
}

// FormData wrapper for session delete
export async function deleteSessionFromForm(formData: FormData) {
  const id = formData.get('sessionId') as string;
  return deleteSession(id);
}

// MATERIAL ACTIONS
export async function getMaterialsBySession(sessionId: string) {
  return await db.select().from(materials).where(eq(materials.sessionId, sessionId)).orderBy(materials.orderIndex);
}

export async function getMaterialById(id: string) {
  const result = await db.select().from(materials).where(eq(materials.id, id)).limit(1);
  return result[0] || null;
}

export async function createMaterial(data: {
  sessionId: string;
  type: 'video' | 'pdf' | 'ppt';
  title: string;
  content?: string;
  orderIndex: number;
}) {
  const [material] = await db.insert(materials).values(data).returning();
  revalidatePath(`/admin/courses`);
  return material;
}

export async function updateMaterial(id: string, data: Partial<typeof materials.$inferInsert>) {
  const [material] = await db.update(materials).set(data).where(eq(materials.id, id)).returning();
  revalidatePath(`/admin/courses`);
  return material;
}

export async function deleteMaterial(id: string) {
  await db.delete(materials).where(eq(materials.id, id));
  revalidatePath(`/admin/courses`);
}
