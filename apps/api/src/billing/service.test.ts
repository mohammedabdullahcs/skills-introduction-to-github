import { describe, it, expect } from 'vitest';
import { createInvoice, markPaid, listInvoices } from './service.js';

describe('Billing Service', () => {
  describe('createInvoice', () => {
    it('should create an invoice successfully', async () => {
      const input = {
        customerId: 'customer-1',
        lessonIds: ['lesson-1', 'lesson-2'],
        dueDate: '2024-03-01T00:00:00Z',
        description: 'Math lessons for February',
      };
      
      const result = await createInvoice(input);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.customerId).toBe(input.customerId);
        expect(result.data.lessonIds).toEqual(input.lessonIds);
        expect(result.data.amount).toBe(100); // 2 lessons * $50
        expect(result.data.description).toBe(input.description);
        expect(result.data.status).toBe('draft');
        expect(result.data.id).toBeDefined();
      }
    });
    
    it('should fail with invalid date', async () => {
      const input = {
        customerId: 'customer-1',
        lessonIds: ['lesson-1'],
        dueDate: 'invalid-date',
      };
      
      const result = await createInvoice(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Validation error');
      }
    });
  });
  
  describe('markPaid', () => {
    it('should mark invoice as paid successfully', async () => {
      // First create an invoice
      const createResult = await createInvoice({
        customerId: 'customer-2',
        lessonIds: ['lesson-3'],
        dueDate: '2024-03-01T00:00:00Z',
      });
      
      if (!createResult.success) {
        throw new Error('Failed to create invoice');
      }
      
      const markPaidInput = {
        invoiceId: createResult.data.id,
        paymentMethod: 'credit_card' as const,
        transactionId: 'txn_123456',
      };
      
      const result = await markPaid(markPaidInput);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe('paid');
        expect(result.data.paymentMethod).toBe('credit_card');
        expect(result.data.transactionId).toBe('txn_123456');
        expect(result.data.paidAt).toBeDefined();
      }
    });
    
    it('should fail for non-existent invoice', async () => {
      const input = {
        invoiceId: 'non-existent',
        paymentMethod: 'credit_card' as const,
      };
      
      const result = await markPaid(input);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invoice not found');
      }
    });
    
    it('should fail to mark already paid invoice', async () => {
      // Create and pay an invoice
      const createResult = await createInvoice({
        customerId: 'customer-3',
        lessonIds: ['lesson-4'],
        dueDate: '2024-03-01T00:00:00Z',
      });
      
      if (!createResult.success) {
        throw new Error('Failed to create invoice');
      }
      
      await markPaid({
        invoiceId: createResult.data.id,
        paymentMethod: 'credit_card' as const,
      });
      
      // Try to pay again
      const result = await markPaid({
        invoiceId: createResult.data.id,
        paymentMethod: 'credit_card' as const,
      });
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invoice is already paid');
      }
    });
  });
  
  describe('listInvoices', () => {
    it('should return list of invoices', async () => {
      const result = await listInvoices();
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
        // Should have invoices from previous tests
        expect(result.data.length).toBeGreaterThan(0);
        
        result.data.forEach(invoice => {
          expect(invoice).toHaveProperty('id');
          expect(invoice).toHaveProperty('customerId');
          expect(invoice).toHaveProperty('amount');
          expect(invoice).toHaveProperty('status');
        });
      }
    });
  });
});