import { describe, it, expect } from 'vitest';
import { sendEmail, sendWhatsApp, queueReminder } from './service.js';

describe('Comms Service', () => {
  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      const input = {
        to: 'test@example.com',
        subject: 'Test Email',
        body: 'This is a test email',
        isHtml: false,
      };
      
      const result = await sendEmail(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.to).toBe(input.to);
        expect(result.data.subject).toBe(input.subject);
        expect(result.data.body).toBe(input.body);
        expect(result.data.isHtml).toBe(false);
        expect(result.data.status).toBe('sent');
        expect(result.data.sentAt).toBeDefined();
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should fail with invalid email', async () => {
      const input = {
        to: 'invalid-email',
        subject: 'Test',
        body: 'Test body',
      };
      
      const result = await sendEmail(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('sendWhatsApp', () => {
    it('should send WhatsApp message successfully', async () => {
      const input = {
        to: '+1234567890',
        message: 'Hello from WhatsApp!',
      };
      
      const result = await sendWhatsApp(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.to).toBe(input.to);
        expect(result.data.message).toBe(input.message);
        expect(result.data.status).toBe('sent');
        expect(result.data.sentAt).toBeDefined();
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should fail with invalid phone number', async () => {
      const input = {
        to: '123456', // Invalid format
        message: 'Test message',
      };
      
      const result = await sendWhatsApp(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
    
    it('should fail with message too long', async () => {
      const input = {
        to: '+1234567890',
        message: 'x'.repeat(1601), // Too long
      };
      
      const result = await sendWhatsApp(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('queueReminder', () => {
    it('should queue reminder successfully', async () => {
      const input = {
        recipientId: 'user-123',
        type: 'email' as const,
        message: 'Your lesson starts in 1 hour',
        scheduledFor: '2024-02-15T09:00:00Z',
        reminderType: 'lesson' as const,
      };
      
      const result = await queueReminder(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.recipientId).toBe(input.recipientId);
        expect(result.data.type).toBe(input.type);
        expect(result.data.message).toBe(input.message);
        expect(result.data.reminderType).toBe(input.reminderType);
        expect(result.data.status).toBe('queued');
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should fail with invalid scheduled date', async () => {
      const input = {
        recipientId: 'user-123',
        type: 'email' as const,
        message: 'Test reminder',
        scheduledFor: 'invalid-date',
        reminderType: 'lesson' as const,
      };
      
      const result = await queueReminder(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
});