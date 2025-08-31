import { z } from 'zod';

export const RequestTrialClassSchema = z.object({
  studentId: z.string().min(1),
  teacherId: z.string().min(1),
  preferredDate: z.string().datetime(),
  subject: z.string().min(1),
});

export const ApproveBookingSchema = z.object({
  bookingId: z.string().min(1),
  confirmedDate: z.string().datetime(),
});

export const RejectBookingSchema = z.object({
  bookingId: z.string().min(1),
  reason: z.string().min(1),
});

export type RequestTrialClassInput = z.infer<typeof RequestTrialClassSchema>;
export type ApproveBookingInput = z.infer<typeof ApproveBookingSchema>;
export type RejectBookingInput = z.infer<typeof RejectBookingSchema>;

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export type Booking = {
  id: string;
  studentId: string;
  teacherId: string;
  subject: string;
  preferredDate: Date;
  confirmedDate?: Date;
  status: BookingStatus;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
};