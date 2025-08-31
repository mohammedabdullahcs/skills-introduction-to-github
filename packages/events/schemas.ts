import { z } from 'zod';

// User Events
export const UserCreatedEventSchema = z.object({
  type: z.literal('user.created'),
  payload: z.object({
    userId: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    role: z.enum(['ADMIN', 'TEACHER', 'STUDENT']),
  }),
  timestamp: z.date(),
});

export const UserUpdatedEventSchema = z.object({
  type: z.literal('user.updated'),
  payload: z.object({
    userId: z.string(),
    changes: z.record(z.unknown()),
  }),
  timestamp: z.date(),
});

// Course Events
export const CourseCreatedEventSchema = z.object({
  type: z.literal('course.created'),
  payload: z.object({
    courseId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
  }),
  timestamp: z.date(),
});

export const CoursePublishedEventSchema = z.object({
  type: z.literal('course.published'),
  payload: z.object({
    courseId: z.string(),
    publishedBy: z.string(),
  }),
  timestamp: z.date(),
});

// Enrollment Events
export const StudentEnrolledEventSchema = z.object({
  type: z.literal('student.enrolled'),
  payload: z.object({
    userId: z.string(),
    courseId: z.string(),
    enrollmentId: z.string(),
  }),
  timestamp: z.date(),
});

// Progress Events
export const LessonCompletedEventSchema = z.object({
  type: z.literal('lesson.completed'),
  payload: z.object({
    userId: z.string(),
    lessonId: z.string(),
    courseId: z.string(),
    completedAt: z.date(),
  }),
  timestamp: z.date(),
});

// Assignment Events
export const AssignmentSubmittedEventSchema = z.object({
  type: z.literal('assignment.submitted'),
  payload: z.object({
    userId: z.string(),
    assignmentId: z.string(),
    lessonId: z.string(),
    submittedAt: z.date(),
  }),
  timestamp: z.date(),
});

// Union type for all events
export const EventSchema = z.union([
  UserCreatedEventSchema,
  UserUpdatedEventSchema,
  CourseCreatedEventSchema,
  CoursePublishedEventSchema,
  StudentEnrolledEventSchema,
  LessonCompletedEventSchema,
  AssignmentSubmittedEventSchema,
]);

// Type exports
export type UserCreatedEvent = z.infer<typeof UserCreatedEventSchema>;
export type UserUpdatedEvent = z.infer<typeof UserUpdatedEventSchema>;
export type CourseCreatedEvent = z.infer<typeof CourseCreatedEventSchema>;
export type CoursePublishedEvent = z.infer<typeof CoursePublishedEventSchema>;
export type StudentEnrolledEvent = z.infer<typeof StudentEnrolledEventSchema>;
export type LessonCompletedEvent = z.infer<typeof LessonCompletedEventSchema>;
export type AssignmentSubmittedEvent = z.infer<typeof AssignmentSubmittedEventSchema>;
export type Event = z.infer<typeof EventSchema>;