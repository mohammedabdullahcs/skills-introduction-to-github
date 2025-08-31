import { Result, createSuccess, createError } from '../types.js';
import {
  Lesson,
  ScheduleLessonInput,
  RecordAttendanceInput,
  CompleteLessonInput,
  ScheduleLessonSchema,
  RecordAttendanceSchema,
  CompleteLessonSchema,
} from './types.js';

// Mock data store
const lessons: Lesson[] = [];

export async function scheduleLesson(input: unknown): Promise<Result<Lesson>> {
  try {
    const validatedInput = ScheduleLessonSchema.parse(input);
    
    // In real app, verify booking exists and is approved
    // Check teacher availability at the time slot
    
    const lesson: Lesson = {
      id: crypto.randomUUID(),
      bookingId: validatedInput.bookingId,
      startTime: new Date(validatedInput.startTime),
      duration: validatedInput.duration,
      meetingLink: validatedInput.meetingLink,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    lessons.push(lesson);
    return createSuccess(lesson);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function recordAttendance(input: unknown): Promise<Result<Lesson>> {
  try {
    const validatedInput = RecordAttendanceSchema.parse(input);
    
    const lesson = lessons.find(l => l.id === validatedInput.lessonId);
    if (!lesson) {
      return createError('Lesson not found');
    }
    
    if (lesson.status !== 'scheduled' && lesson.status !== 'in-progress') {
      return createError('Cannot record attendance for this lesson status');
    }
    
    // Update lesson
    lesson.studentAttended = validatedInput.studentAttended;
    lesson.teacherAttended = validatedInput.teacherAttended;
    lesson.notes = validatedInput.notes;
    lesson.status = 'in-progress';
    lesson.updatedAt = new Date();
    
    return createSuccess(lesson);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function completeLesson(input: unknown): Promise<Result<Lesson>> {
  try {
    const validatedInput = CompleteLessonSchema.parse(input);
    
    const lesson = lessons.find(l => l.id === validatedInput.lessonId);
    if (!lesson) {
      return createError('Lesson not found');
    }
    
    if (lesson.status !== 'in-progress') {
      return createError('Lesson must be in progress to complete');
    }
    
    // Update lesson
    lesson.actualDuration = validatedInput.actualDuration;
    lesson.teacherNotes = validatedInput.teacherNotes;
    lesson.homework = validatedInput.homework;
    lesson.status = 'completed';
    lesson.updatedAt = new Date();
    
    return createSuccess(lesson);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}