import { describe, it, expect } from 'vitest';
import { trackEvent, listEvents } from './service.js';

describe('Analytics Service', () => {
  describe('trackEvent', () => {
    it('should track event successfully', async () => {
      const input = {
        userId: 'user-123',
        eventName: 'lesson_completed',
        properties: {
          lessonId: 'lesson-456',
          duration: 60,
          rating: 5,
        },
      };
      
      const result = await trackEvent(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.userId).toBe(input.userId);
        expect(result.data.eventName).toBe(input.eventName);
        expect(result.data.properties).toEqual(input.properties);
        expect(result.data.timestamp).toBeDefined();
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should track event without userId', async () => {
      const input = {
        eventName: 'page_view',
        properties: {
          page: '/dashboard',
          referrer: 'google.com',
        },
      };
      
      const result = await trackEvent(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.userId).toBeUndefined();
        expect(result.data.eventName).toBe(input.eventName);
        expect(result.data.properties).toEqual(input.properties);
      }
    });
    
    it('should track event with custom timestamp', async () => {
      const customTimestamp = '2024-02-15T10:00:00.000Z';
      const input = {
        eventName: 'user_signup',
        timestamp: customTimestamp,
      };
      
      const result = await trackEvent(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.timestamp.toISOString()).toBe(customTimestamp);
      }
    });
    
    it('should fail with invalid event name', async () => {
      const input = {
        eventName: '', // Empty string
      };
      
      const result = await trackEvent(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('listEvents', () => {
    beforeAll(async () => {
      // Track some events for testing
      await trackEvent({
        userId: 'user-list-test',
        eventName: 'test_event_1',
        timestamp: '2024-02-10T10:00:00Z',
      });
      
      await trackEvent({
        userId: 'user-list-test',
        eventName: 'test_event_2',
        timestamp: '2024-02-11T10:00:00Z',
      });
      
      await trackEvent({
        userId: 'other-user',
        eventName: 'test_event_1',
        timestamp: '2024-02-12T10:00:00Z',
      });
    });
    
    it('should list all events by default', async () => {
      const result = await listEvents();
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
        
        // Should be sorted by timestamp descending
        for (let i = 1; i < result.data.length; i++) {
          expect(result.data[i-1].timestamp.getTime()).toBeGreaterThanOrEqual(
            result.data[i].timestamp.getTime()
          );
        }
      }
    });
    
    it('should filter events by userId', async () => {
      const result = await listEvents({ userId: 'user-list-test' });
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(2);
        result.data.forEach(event => {
          expect(event.userId).toBe('user-list-test');
        });
      }
    });
    
    it('should filter events by eventName', async () => {
      const result = await listEvents({ eventName: 'test_event_1' });
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(2);
        result.data.forEach(event => {
          expect(event.eventName).toBe('test_event_1');
        });
      }
    });
    
    it('should filter events by date range', async () => {
      const result = await listEvents({
        from: '2024-02-11T00:00:00Z',
        to: '2024-02-11T23:59:59Z',
      });
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(1);
        expect(result.data[0].eventName).toBe('test_event_2');
      }
    });
    
    it('should apply limit', async () => {
      const result = await listEvents({ limit: 1 });
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(1);
      }
    });
  });
});