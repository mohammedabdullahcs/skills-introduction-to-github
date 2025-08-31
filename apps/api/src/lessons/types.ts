import { z } from 'zod';

export const ScheduleLessonSchema = z.object({
  bookingId: z.string().min(1),
  startTime: z.string().datetime(),
  duration: z.number().min(15).max(180), // minutes
  meetingLink: z.string().url().optional(),
});

export const RecordAttendanceSchema = z.object({
  lessonId: z.string().min(1),
  studentAttended: z.boolean(),
  teacherAttended: z.boolean(),
  notes: z.string().optional(),
});

export const CompleteLessonSchema = z.object({
  lessonId: z.string().min(1),
  actualDuration: z.number().min(1),
  teacherNotes: z.string().optional(),
  homework: z.string().optional(),
});

export type ScheduleLessonInput = z.infer<typeof ScheduleLessonSchema>;
export type RecordAttendanceInput = z.infer<typeof RecordAttendanceSchema>;
export type CompleteLessonInput = z.infer<typeof CompleteLessonSchema>;

export type LessonStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export type Lesson = {
  id: string;
  bookingId: string;
  startTime: Date;
  duration: number;
  actualDuration?: number;
  meetingLink?: string;
  status: LessonStatus;
  studentAttended?: boolean;
  teacherAttended?: boolean;
  notes?: string;
  teacherNotes?: string;
  homework?: string;
  createdAt: Date;
  updatedAt: Date;
};