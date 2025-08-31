import { Result, createSuccess, createError } from '../types.js';
import {
  Invoice,
  CreateInvoiceInput,
  MarkPaidInput,
  CreateInvoiceSchema,
  MarkPaidSchema,
} from './types.js';

// Mock data store
const invoices: Invoice[] = [];

// Mock lesson pricing
const LESSON_RATE = 50; // $50 per lesson

export async function createInvoice(input: unknown): Promise<Result<Invoice>> {
  try {
    const validatedInput = CreateInvoiceSchema.parse(input);
    
    // Calculate amount based on lessons (in real app, get actual lesson durations/rates)
    const amount = validatedInput.lessonIds.length * LESSON_RATE;
    
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      customerId: validatedInput.customerId,
      lessonIds: validatedInput.lessonIds,
      amount,
      dueDate: new Date(validatedInput.dueDate),
      description: validatedInput.description,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    invoices.push(invoice);
    return createSuccess(invoice);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function markPaid(input: unknown): Promise<Result<Invoice>> {
  try {
    const validatedInput = MarkPaidSchema.parse(input);
    
    const invoice = invoices.find(i => i.id === validatedInput.invoiceId);
    if (!invoice) {
      return createError('Invoice not found');
    }
    
    if (invoice.status === 'paid') {
      return createError('Invoice is already paid');
    }
    
    if (invoice.status === 'cancelled') {
      return createError('Cannot mark cancelled invoice as paid');
    }
    
    // Update invoice
    invoice.status = 'paid';
    invoice.paymentMethod = validatedInput.paymentMethod;
    invoice.transactionId = validatedInput.transactionId;
    invoice.paidAt = new Date();
    invoice.updatedAt = new Date();
    
    return createSuccess(invoice);
  } catch (error) {
    return createError(`Validation error: ${error}`);
  }
}

export async function listInvoices(): Promise<Result<Invoice[]>> {
  try {
    // In real app, this would have filtering, pagination, etc.
    return createSuccess([...invoices]);
  } catch (error) {
    return createError(`Failed to list invoices: ${error}`);
  }
}