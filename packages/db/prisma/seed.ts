import { PrismaClient, Role } from './generated/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@quran-crm-lms.com' },
    update: {},
    create: {
      email: 'admin@quran-crm-lms.com',
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });

  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@quran-crm-lms.com' },
    update: {},
    create: {
      email: 'teacher@quran-crm-lms.com',
      name: 'Teacher User',
      role: Role.TEACHER,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@quran-crm-lms.com' },
    update: {},
    create: {
      email: 'student@quran-crm-lms.com',
      name: 'Student User',
      role: Role.STUDENT,
    },
  });

  // Create sample course
  const quranCourse = await prisma.course.upsert({
    where: { slug: 'quran-basics' },
    update: {},
    create: {
      title: 'Quran Basics',
      description: 'Learn the fundamentals of Quran reading and understanding',
      slug: 'quran-basics',
      published: true,
    },
  });

  // Create sample lessons
  await prisma.lesson.createMany({
    data: [
      {
        title: 'Introduction to Arabic Alphabet',
        content: 'Learn the 28 letters of the Arabic alphabet',
        order: 1,
        published: true,
        courseId: quranCourse.id,
      },
      {
        title: 'Basic Tajweed Rules',
        content: 'Understanding the proper pronunciation rules',
        order: 2,
        published: true,
        courseId: quranCourse.id,
      },
      {
        title: 'Reading Short Surahs',
        content: 'Practice reading common short chapters',
        order: 3,
        published: true,
        courseId: quranCourse.id,
      },
    ],
    skipDuplicates: true,
  });

  // Enroll student in the course
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: studentUser.id,
        courseId: quranCourse.id,
      },
    },
    update: {},
    create: {
      userId: studentUser.id,
      courseId: quranCourse.id,
    },
  });

  console.log('✅ Database seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });