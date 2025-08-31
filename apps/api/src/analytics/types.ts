import { z } from 'zod';

export const TrackEventSchema = z.object({
  userId: z.string().min(1).optional(),
  eventName: z.string().min(1),
  properties: z.record(z.any()).optional(),
  timestamp: z.string().datetime().optional(),
});

export const ListEventsSchema = z.object({
  userId: z.string().min(1).optional(),
  eventName: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.number().min(1).max(1000).default(100),
});

export type TrackEventInput = z.infer<typeof TrackEventSchema>;
export type ListEventsInput = z.infer<typeof ListEventsSchema>;

export type AnalyticsEvent = {
  id: string;
  userId?: string;
  eventName: string;
  properties?: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
};