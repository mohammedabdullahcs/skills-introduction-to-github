import { Request, Response } from 'express';
import { trackEvent, listEvents } from './service.js';

export class AnalyticsController {
  async track(req: Request, res: Response) {
    const result = await trackEvent(req.body);
    
    if (result.success) {
      res.status(201).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async list(req: Request, res: Response) {
    const result = await listEvents(req.query);
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
}