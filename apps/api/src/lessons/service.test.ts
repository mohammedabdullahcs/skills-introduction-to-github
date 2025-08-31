import { describe, it, expect } from 'vitest';
import { scheduleLesson, recordAttendance, completeLesson } from './service.js';

describe('Lessons Service', () => {
  describe('scheduleLesson', () => {
    it('should schedule a lesson successfully', async () => {
      const input = {
        bookingId: 'booking-1',
        startTime: '2024-02-15T10:00:00Z',
        duration: 60,
        meetingLink: 'https://zoom.us/j/123456789',
      };
      
      const result = await scheduleLesson(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.bookingId).toBe(input.bookingId);
        expect(result.data.duration).toBe(input.duration);
        expect(result.data.meetingLink).toBe(input.meetingLink);
        expect(result.data.status).toBe('scheduled');
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should fail with invalid duration', async () => {
      const input = {
        bookingId: 'booking-1',
        startTime: '2024-02-15T10:00:00Z',
        duration: 5, // Too short
      };
      
      const result = await scheduleLesson(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('recordAttendance', () => {
    it('should record attendance successfully', async () => {
      // First schedule a lesson
      const scheduleResult = await scheduleLesson({
        bookingId: 'booking-2',
        startTime: '2024-02-16T10:00:00Z',
        duration: 45,
      });
      
      if (!scheduleResult.success) {
        throw new Error('Failed to schedule lesson');
      }
      
      const attendanceInput = {
        lessonId: scheduleResult.data.id,
        studentAttended: true,
        teacherAttended: true,
        notes: 'Student was prepared',
      };
      
      const result = await recordAttendance(attendanceInput);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.studentAttended).toBe(true);
        expect(result.data.teacherAttended).toBe(true);
        expect(result.data.notes).toBe('Student was prepared');
        expect(result.data.status).toBe('in-progress');
      }
    });
    
    it('should fail for non-existent lesson', async () => {
      const input = {
        lessonId: 'non-existent',
        studentAttended: true,
        teacherAttended: true,
      };
      
      const result = await recordAttendance(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Lesson not found');
      }
    });
  });
  
  describe('completeLesson', () => {
    it('should complete a lesson successfully', async () => {
      // First schedule and start a lesson
      const scheduleResult = await scheduleLesson({
        bookingId: 'booking-3',
        startTime: '2024-02-17T10:00:00Z',
        duration: 60,
      });
      
      if (!scheduleResult.success) {
        throw new Error('Failed to schedule lesson');
      }
      
      await recordAttendance({
        lessonId: scheduleResult.data.id,
        studentAttended: true,
        teacherAttended: true,
      });
      
      const completeInput = {
        lessonId: scheduleResult.data.id,
        actualDuration: 55,
        teacherNotes: 'Good progress on algebra',
        homework: 'Complete exercises 1-10',
      };
      
      const result = await completeLesson(completeInput);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.actualDuration).toBe(55);
        expect(result.data.teacherNotes).toBe('Good progress on algebra');
        expect(result.data.homework).toBe('Complete exercises 1-10');
        expect(result.data.status).toBe('completed');
      }
    });
    
    it('should fail for non-existent lesson', async () => {
      const input = {
        lessonId: 'non-existent',
        actualDuration: 60,
      };
      
      const result = await completeLesson(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Lesson not found');
      }
    });
  });
});