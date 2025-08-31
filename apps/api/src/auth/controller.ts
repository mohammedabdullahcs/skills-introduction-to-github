import { Request, Response } from 'express';
import { registerUser, loginUser, getCurrentUser } from './service.js';

export class AuthController {
  async register(req: Request, res: Response) {
    const result = await registerUser(req.body);
    
    if (result.success) {
      res.status(201).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async login(req: Request, res: Response) {
    const result = await loginUser(req.body);
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(401).json({ success: false, error: result.error });
    }
  }
  
  async getCurrentUser(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const result = await getCurrentUser({ token });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(401).json({ success: false, error: result.error });
    }
  }
}