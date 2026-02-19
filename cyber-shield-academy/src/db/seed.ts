import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { courses, sessions, materials } from '../shared/types/schema';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  console.log('🌱 Starting seed...');
  
  // Seed Courses
  console.log('📚 Seeding courses...');
  const coursesData = [
    {
      title: 'Cyber Security Fundamentals',
      slug: 'cyber-security-fundamentals',
      description: 'AI-generated course: Pelajari dasar-dasar keamanan siber dengan pendekatan modern. Dari konsep CIA triad, threat landscape, hingga security controls. Semua materi dibuat dan dikurasi oleh AI untuk pembelajar mandiri.',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      level: 'beginner',
      category: 'Cyber Security',
      duration: 180,
    },
    {
      title: 'Ethical Hacking & Penetration Testing',
      slug: 'ethical-hacking-pentest',
      description: 'AI-generated course: Metodologi penetration testing lengkap yang dibuat oleh AI. Pelajari reconnaissance, exploitation, dan reporting dengan tools modern - tanpa perlu mentor mahal.',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      level: 'advanced',
      category: 'Cyber Security',
      duration: 360,
    },
    {
      title: 'Python for Automation',
      slug: 'python-automation',
      description: 'AI-generated course: Kuasai Python untuk otomasi tugas-tugas repetitif. Dari scripting dasar hingga automation framework. AI akan membimbingmu step-by-step tanpa biaya.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
      level: 'beginner',
      category: 'Programming',
      duration: 240,
    },
    {
      title: 'Full-Stack Web Development',
      slug: 'fullstack-web-dev',
      description: 'AI-generated course: Dari HTML/CSS dasar hingga React dan Node.js. Kurikulum lengkap dibuat oleh AI berdasarkan best practices industri terkini. Belajar coding gratis 24/7.',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      level: 'intermediate',
      category: 'Programming',
      duration: 480,
    },
    {
      title: 'Machine Learning Basics',
      slug: 'machine-learning-basics',
      description: 'AI-generated course: Pengenalan Machine Learning untuk pemula. Dari supervised learning, neural networks, hingga deployment model. Dibuat oleh AI, untuk pembelajar AI.',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      level: 'intermediate',
      category: 'Programming',
      duration: 320,
    },
    {
      title: 'DevOps & CI/CD Automation',
      slug: 'devops-cicd',
      description: 'AI-generated course: Automatisasi deployment dengan Docker, Kubernetes, dan CI/CD pipelines. Dibuat oleh AI berdasarkan workflow modern startup unicorn. Gratis dan selalu update.',
      thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
      level: 'advanced',
      category: 'Automation',
      duration: 360,
    },
    {
      title: 'RPA: Robotic Process Automation',
      slug: 'rpa-automation',
      description: 'AI-generated course: Automatisasi proses bisnis dengan RPA tools. Dari use case identification hingga bot deployment. Tingkatkan produktivitas tanpa coding expert.',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      level: 'beginner',
      category: 'Automation',
      duration: 210,
    },
    {
      title: 'Infrastructure as Code',
      slug: 'infrastructure-as-code',
      description: 'AI-generated course: Kelola infrastruktur dengan Terraform dan Ansible. Dibuat oleh AI dengan contoh real-world scenarios. Belajar DevOps modern tanpa biaya.',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      level: 'intermediate',
      category: 'Automation',
      duration: 280,
    },
    {
      title: 'Data Analysis with Python',
      slug: 'data-analysis-python',
      description: 'AI-generated course: Analisis data dengan Pandas, NumPy, dan Matplotlib. Dibuat oleh AI dengan dataset praktis. Jadi data analyst tanpa bootcamp mahal.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      level: 'beginner',
      category: 'Data Science',
      duration: 270,
    },
    {
      title: 'Cloud Computing Fundamentals',
      slug: 'cloud-computing',
      description: 'AI-generated course: AWS, Azure, dan GCP untuk pemula. Konsep cloud yang disederhanakan oleh AI. Siap sertifikasi tanpa kursus berbayar.',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      level: 'beginner',
      category: 'Cloud',
      duration: 200,
    },
  ];

  for (const course of coursesData) {
    await db.insert(courses).values(course).onConflictDoNothing();
  }
  console.log(`✅ Seeded ${coursesData.length} courses`);

  // Seed Sessions for Cyber Security Fundamentals
  console.log('📝 Seeding sessions...');
  const sessionsData = [
    {
      title: 'Pertemuan 1: Introduction to Cyber Security',
      description: 'Pengenalan dunia cybersecurity dan career path',
      orderIndex: 1,
      duration: 30,
      courseSlug: 'cyber-security-fundamentals',
    },
    {
      title: 'Pertemuan 2: CIA Triad & Security Concepts',
      description: 'Memahami Confidentiality, Integrity, dan Availability',
      orderIndex: 2,
      duration: 45,
      courseSlug: 'cyber-security-fundamentals',
    },
    {
      title: 'Pertemuan 3: Threat Landscape',
      description: 'Mengenal berbagai jenis ancaman siber',
      orderIndex: 3,
      duration: 40,
      courseSlug: 'cyber-security-fundamentals',
    },
  ];

  // Get course ID for cyber-security-fundamentals
  const courseResult = await sql`
    SELECT id FROM courses WHERE slug = 'cyber-security-fundamentals'
  `;
  const courseId = courseResult[0]?.id;

  if (courseId) {
    for (const session of sessionsData) {
      await db.insert(sessions).values({
        ...session,
        courseId: courseId,
      }).onConflictDoNothing();
    }
    console.log(`✅ Seeded ${sessionsData.length} sessions`);

    // Seed Materials
    console.log('🎥 Seeding materials...');
    
    // Get session IDs
    const sessionsResult = await sql`
      SELECT id, order_index FROM sessions WHERE course_id = ${courseId}
    `;
    
    const sessionMap = sessionsResult.reduce((acc: any, s: any) => {
      acc[s.order_index] = s.id;
      return acc;
    }, {});

    const materialsData = [
      // Session 1 materials
      {
        type: 'video',
        title: 'Apa itu Cyber Security?',
        content: 'dQw4w9WgXcQ',
        orderIndex: 1,
        sessionId: sessionMap[1],
      },
      {
        type: 'video',
        title: 'Career Path di Cyber Security',
        content: 'dQw4w9WgXcQ',
        orderIndex: 2,
        sessionId: sessionMap[1],
      },
      {
        type: 'pdf',
        title: 'Modul Pengenalan Cyber Security',
        content: 'https://example.com/modul1.pdf',
        orderIndex: 3,
        sessionId: sessionMap[1],
      },
      // Session 2 materials
      {
        type: 'video',
        title: 'Confidentiality Explained',
        content: 'dQw4w9WgXcQ',
        orderIndex: 1,
        sessionId: sessionMap[2],
      },
      {
        type: 'video',
        title: 'Integrity & Availability',
        content: 'dQw4w9WgXcQ',
        orderIndex: 2,
        sessionId: sessionMap[2],
      },
    ];

    for (const material of materialsData) {
      if (material.sessionId) {
        await db.insert(materials).values(material).onConflictDoNothing();
      }
    }
    console.log(`✅ Seeded ${materialsData.length} materials`);
  }

  console.log('🎉 Seed completed!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
