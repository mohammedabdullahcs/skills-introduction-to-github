import { Result, createSuccess, createError } from '../types.js';
import {
  Booking,
  RequestTrialClassInput,
  ApproveBookingInput,
  RejectBookingInput,
  RequestTrialClassSchema,
  ApproveBookingSchema,
  RejectBookingSchema,
} from './types.js';

// Mock data store
const bookings: Booking[] = [];

export async function requestTrialClass(input: unknown): Promise<Result<Booking>> {
  try {
    const validatedInput = RequestTrialClassSchema.parse(input);
    
    // Check if teacher exists and is available (in real app, check against teachers service)
    // Check if student has too many pending requests, etc.
    
    const booking: Booking = {
      id: crypto.randomUUID(),
      studentId: validatedInput.studentId,
      teacherId: validatedInput.teacherId,
      subject: validatedInput.subject,
      preferredDate: new Date(validatedInput.preferredDate),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    bookings.push(booking);
    return createSuccess(booking);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function approveBooking(input: unknown): Promise<Result<Booking>> {
  try {
    const validatedInput = ApproveBookingSchema.parse(input);
    
    const booking = bookings.find(b => b.id === validatedInput.bookingId);
    if (!booking) {
      return createError('Booking not found');
    }
    
    if (booking.status !== 'pending') {
      return createError('Booking is not in pending status');
    }
    
    // Update booking
    booking.status = 'approved';
    booking.confirmedDate = new Date(validatedInput.confirmedDate);
    booking.updatedAt = new Date();
    
    return createSuccess(booking);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function rejectBooking(input: unknown): Promise<Result<Booking>> {
  try {
    const validatedInput = RejectBookingSchema.parse(input);
    
    const booking = bookings.find(b => b.id === validatedInput.bookingId);
    if (!booking) {
      return createError('Booking not found');
    }
    
    if (booking.status !== 'pending') {
      return createError('Booking is not in pending status');
    }
    
    // Update booking
    booking.status = 'rejected';
    booking.reason = validatedInput.reason;
    booking.updatedAt = new Date();
    
    return createSuccess(booking);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}