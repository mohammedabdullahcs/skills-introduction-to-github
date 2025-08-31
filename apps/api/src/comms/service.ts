import { Result, createSuccess, createError } from '../types.js';
import {
  EmailMessage,
  WhatsAppMessage,
  Reminder,
  SendEmailInput,
  SendWhatsAppInput,
  QueueReminderInput,
  SendEmailSchema,
  SendWhatsAppSchema,
  QueueReminderSchema,
} from './types.js';

// Mock data stores
const emails: EmailMessage[] = [];
const whatsappMessages: WhatsAppMessage[] = [];
const reminders: Reminder[] = [];

export async function sendEmail(input: unknown): Promise<Result<EmailMessage>> {
  try {
    const validatedInput = SendEmailSchema.parse(input);
    
    const email: EmailMessage = {
      id: crypto.randomUUID(),
      to: validatedInput.to,
      subject: validatedInput.subject,
      body: validatedInput.body,
      isHtml: validatedInput.isHtml,
      status: 'sent', // In real app, this would be async
      sentAt: new Date(),
      createdAt: new Date(),
    };
    
    emails.push(email);
    
    // In real app, integrate with email service (SendGrid, AWS SES, etc.)
    console.log(`Email sent to ${email.to}: ${email.subject}`);
    
    return createSuccess(email);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function sendWhatsApp(input: unknown): Promise<Result<WhatsAppMessage>> {
  try {
    const validatedInput = SendWhatsAppSchema.parse(input);
    
    const message: WhatsAppMessage = {
      id: crypto.randomUUID(),
      to: validatedInput.to,
      message: validatedInput.message,
      status: 'sent', // In real app, this would be async
      sentAt: new Date(),
      createdAt: new Date(),
    };
    
    whatsappMessages.push(message);
    
    // In real app, integrate with WhatsApp Business API
    console.log(`WhatsApp sent to ${message.to}: ${message.message}`);
    
    return createSuccess(message);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function queueReminder(input: unknown): Promise<Result<Reminder>> {
  try {
    const validatedInput = QueueReminderSchema.parse(input);
    
    const reminder: Reminder = {
      id: crypto.randomUUID(),
      recipientId: validatedInput.recipientId,
      type: validatedInput.type,
      message: validatedInput.message,
      scheduledFor: new Date(validatedInput.scheduledFor),
      reminderType: validatedInput.reminderType,
      status: 'queued',
      createdAt: new Date(),
    };
    
    reminders.push(reminder);
    
    // In real app, this would be queued in a job system (Redis, AWS SQS, etc.)
    console.log(`Reminder queued for ${reminder.scheduledFor}: ${reminder.message}`);
    
    return createSuccess(reminder);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}