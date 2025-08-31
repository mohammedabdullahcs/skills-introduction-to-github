import { describe, it, expect } from 'vitest';
import { listTeachers, getTeacherById } from './service.js';

describe('Teachers Service', () => {
  describe('listTeachers', () => {
    it('should return list of teachers', async () => {
      const result = await listTeachers();
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0]).toHaveProperty('id');
        expect(result.data[0]).toHaveProperty('name');
        expect(result.data[0]).toHaveProperty('email');
        expect(result.data[0]).toHaveProperty('specialties');
        expect(result.data[0]).toHaveProperty('rating');
        expect(result.data[0]).toHaveProperty('isAvailable');
      }
    });
  });
  
  describe('getTeacherById', () => {
    it('should return teacher for valid id', async () => {
      const result = await getTeacherById({ id: '1' });
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('1');
        expect(result.data.name).toBe('John Smith');
        expect(result.data.email).toBe('john@example.com');
      }
    });
    
    it('should fail for non-existent teacher id', async () => {
      const result = await getTeacherById({ id: 'non-existent' });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Teacher not found');
      }
    });
    
    it('should fail for invalid input', async () => {
      const result = await getTeacherById({ id: '' });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
});