import { Request, Response } from 'express';
import { sendEmail, sendWhatsApp, queueReminder } from './service.js';

export class CommsController {
  async sendEmail(req: Request, res: Response) {
    const result = await sendEmail(req.body);
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async sendWhatsApp(req: Request, res: Response) {
    const result = await sendWhatsApp(req.body);
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async queueReminder(req: Request, res: Response) {
    const result = await queueReminder(req.body);
    
    if (result.success) {
      res.status(201).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
}