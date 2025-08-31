import { Request, Response } from 'express';
import { listTeachers, getTeacherById } from './service.js';

export class TeachersController {
  async list(req: Request, res: Response) {
    const result = await listTeachers();
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  }
  
  async getById(req: Request, res: Response) {
    const result = await getTeacherById({ id: req.params.id });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(404).json({ success: false, error: result.error });
    }
  }
}