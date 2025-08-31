import { Request, Response } from 'express';
import { createInvoice, markPaid, listInvoices } from './service.js';

export class BillingController {
  async create(req: Request, res: Response) {
    const result = await createInvoice(req.body);
    
    if (result.success) {
      res.status(201).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async markPaid(req: Request, res: Response) {
    const result = await markPaid({
      invoiceId: req.params.id,
      ...req.body,
    });
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  }
  
  async list(req: Request, res: Response) {
    const result = await listInvoices();
    
    if (result.success) {
      res.status(200).json({ success: true, data: result.data });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  }
}