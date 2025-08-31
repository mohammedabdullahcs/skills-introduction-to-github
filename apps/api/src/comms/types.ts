import { z } from 'zod';

export const SendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  isHtml: z.boolean().default(false),
});

export const SendWhatsAppSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
  message: z.string().min(1).max(1600), // WhatsApp message limit
});

export const QueueReminderSchema = z.object({
  recipientId: z.string().min(1),
  type: z.enum(['email', 'whatsapp', 'both']),
  message: z.string().min(1),
  scheduledFor: z.string().datetime(),
  reminderType: z.enum(['lesson', 'payment', 'booking', 'homework']),
});

export type SendEmailInput = z.infer<typeof SendEmailSchema>;
export type SendWhatsAppInput = z.infer<typeof SendWhatsAppSchema>;
export type QueueReminderInput = z.infer<typeof QueueReminderSchema>;

export type EmailStatus = 'sent' | 'failed' | 'delivered' | 'bounced';
export type WhatsAppStatus = 'sent' | 'failed' | 'delivered' | 'read';
export type ReminderStatus = 'queued' | 'sent' | 'failed' | 'cancelled';

export type EmailMessage = {
  id: string;
  to: string;
  subject: string;
  body: string;
  isHtml: boolean;
  status: EmailStatus;
  sentAt?: Date;
  createdAt: Date;
};

export type WhatsAppMessage = {
  id: string;
  to: string;
  message: string;
  status: WhatsAppStatus;
  sentAt?: Date;
  createdAt: Date;
};

export type Reminder = {
  id: string;
  recipientId: string;
  type: 'email' | 'whatsapp' | 'both';
  message: string;
  scheduledFor: Date;
  reminderType: string;
  status: ReminderStatus;
  sentAt?: Date;
  createdAt: Date;
};