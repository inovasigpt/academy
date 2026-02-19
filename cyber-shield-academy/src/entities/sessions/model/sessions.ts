import { Session, Material } from '@/shared/types';

export const mockSessions: Record<string, Session[]> = {
  'cyber-security-fundamentals': [
    {
      id: 's1',
      courseId: '1',
      title: 'Pertemuan 1: Introduction to Cyber Security',
      description: 'Pengenalan dunia cybersecurity dan career path',
      orderIndex: 1,
      duration: 30,
      createdAt: new Date(),
    },
    {
      id: 's2',
      courseId: '1',
      title: 'Pertemuan 2: CIA Triad & Security Concepts',
      description: 'Memahami Confidentiality, Integrity, dan Availability',
      orderIndex: 2,
      duration: 45,
      createdAt: new Date(),
    },
    {
      id: 's3',
      courseId: '1',
      title: 'Pertemuan 3: Threat Landscape',
      description: 'Mengenal berbagai jenis ancaman siber',
      orderIndex: 3,
      duration: 40,
      createdAt: new Date(),
    },
  ],
};

export const mockMaterials: Record<string, Material[]> = {
  's1': [
    {
      id: 'm1',
      sessionId: 's1',
      type: 'video',
      title: 'Apa itu Cyber Security?',
      content: 'dQw4w9WgXcQ',
      orderIndex: 1,
      createdAt: new Date(),
    },
    {
      id: 'm2',
      sessionId: 's1',
      type: 'video',
      title: 'Career Path di Cyber Security',
      content: 'dQw4w9WgXcQ',
      orderIndex: 2,
      createdAt: new Date(),
    },
    {
      id: 'm3',
      sessionId: 's1',
      type: 'pdf',
      title: 'Modul Pengenalan Cyber Security',
      content: 'https://example.com/modul1.pdf',
      orderIndex: 3,
      createdAt: new Date(),
    },
  ],
  's2': [
    {
      id: 'm4',
      sessionId: 's2',
      type: 'video',
      title: 'Confidentiality Explained',
      content: 'dQw4w9WgXcQ',
      orderIndex: 1,
      createdAt: new Date(),
    },
    {
      id: 'm5',
      sessionId: 's2',
      type: 'video',
      title: 'Integrity & Availability',
      content: 'dQw4w9WgXcQ',
      orderIndex: 2,
      createdAt: new Date(),
    },
  ],
};
