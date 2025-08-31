import { Request, Response } from 'express';
import { scheduleLesson, recordAttendance, completeLesson } from './service.js';

export class LessonsController {
  async schedule(req: Request, res: Response) {
    const result = await scheduleLesson(req.body);
    
    if (result.success) {
      res.status(201).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async recordAttendance(req: Request, res: Response) {
    const result = await recordAttendance({
      lessonId: req.params.id,
      ...req.body,
    });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async complete(req: Request, res: Response) {
    const result = await completeLesson({
      lessonId: req.params.id,
      ...req.body,
    });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
}