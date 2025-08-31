import { Request, Response } from 'express';
import { requestTrialClass, approveBooking, rejectBooking } from './service.js';

export class BookingController {
  async requestTrial(req: Request, res: Response) {
    const result = await requestTrialClass(req.body);
    
    if (result.success) {
      res.status(201).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async approve(req: Request, res: Response) {
    const result = await approveBooking({
      bookingId: req.params.id,
      ...req.body,
    });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async reject(req: Request, res: Response) {
    const result = await rejectBooking({
      bookingId: req.params.id,
      ...req.body,
    });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
}