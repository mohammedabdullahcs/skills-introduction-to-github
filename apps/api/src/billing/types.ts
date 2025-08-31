import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  customerId: z.string().min(1),
  lessonIds: z.array(z.string().min(1)),
  dueDate: z.string().datetime(),
  description: z.string().optional(),
});

export const MarkPaidSchema = z.object({
  invoiceId: z.string().min(1),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'paypal', 'cash']),
  transactionId: z.string().optional(),
});

export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>;
export type MarkPaidInput = z.infer<typeof MarkPaidSchema>;

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export type Invoice = {
  id: string;
  customerId: string;
  lessonIds: string[];
  amount: number;
  dueDate: Date;
  description?: string;
  status: InvoiceStatus;
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};