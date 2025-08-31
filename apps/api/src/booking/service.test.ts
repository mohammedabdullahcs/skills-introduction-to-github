import { describe, it, expect } from 'vitest';
import { requestTrialClass, approveBooking, rejectBooking } from './service.js';

describe('Booking Service', () => {
  describe('requestTrialClass', () => {
    it('should create a trial class request successfully', async () => {
      const input = {
        studentId: 'student-1',
        teacherId: 'teacher-1',
        preferredDate: '2024-02-15T10:00:00Z',
        subject: 'Math',
      };
      
      const result = await requestTrialClass(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.studentId).toBe(input.studentId);
        expect(result.data.teacherId).toBe(input.teacherId);
        expect(result.data.subject).toBe(input.subject);
        expect(result.data.status).toBe('pending');
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should fail with invalid date', async () => {
      const input = {
        studentId: 'student-1',
        teacherId: 'teacher-1',
        preferredDate: 'invalid-date',
        subject: 'Math',
      };
      
      const result = await requestTrialClass(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('approveBooking', () => {
    it('should approve a pending booking', async () => {
      // First create a booking
      const createResult = await requestTrialClass({
        studentId: 'student-2',
        teacherId: 'teacher-2',
        preferredDate: '2024-02-16T10:00:00Z',
        subject: 'Physics',
      });
      
      if (!createResult.success) {
        throw new Error('Failed to create booking');
      }
      
      const approveInput = {
        bookingId: createResult.data.id,
        confirmedDate: '2024-02-16T11:00:00Z',
      };
      
      const result = await approveBooking(approveInput);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('approved');
        expect(result.data.confirmedDate).toBeDefined();
      }
    });
    
    it('should fail for non-existent booking', async () => {
      const input = {
        bookingId: 'non-existent',
        confirmedDate: '2024-02-16T11:00:00Z',
      };
      
      const result = await approveBooking(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Booking not found');
      }
    });
  });
  
  describe('rejectBooking', () => {
    it('should reject a pending booking', async () => {
      // First create a booking
      const createResult = await requestTrialClass({
        studentId: 'student-3',
        teacherId: 'teacher-3',
        preferredDate: '2024-02-17T10:00:00Z',
        subject: 'Chemistry',
      });
      
      if (!createResult.success) {
        throw new Error('Failed to create booking');
      }
      
      const rejectInput = {
        bookingId: createResult.data.id,
        reason: 'Teacher unavailable',
      };
      
      const result = await rejectBooking(rejectInput);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('rejected');
        expect(result.data.reason).toBe('Teacher unavailable');
      }
    });
    
    it('should fail for non-existent booking', async () => {
      const input = {
        bookingId: 'non-existent',
        reason: 'Some reason',
      };
      
      const result = await rejectBooking(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Booking not found');
      }
    });
  });
});