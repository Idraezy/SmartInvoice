// mockData.ts - Mock invoice data for demonstration

import type{ Invoice } from './types';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    clientName: 'Acme Corporation',
    clientEmail: 'contact@acme.com',
    clientAddress: '123 Business St, New York, NY 10001',
    date: '2024-12-01',
    dueDate: '2024-12-31',
    items: [
      { 
        id: '1', 
        description: 'Web Design Services', 
        quantity: 1, 
        unitPrice: 2500 
      },
      { 
        id: '2', 
        description: 'Logo Design', 
        quantity: 1, 
        unitPrice: 800 
      }
    ],
    taxRate: 8.5,
    status: 'Paid',
    notes: 'Thank you for your business!'
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    clientName: 'TechStart Inc',
    clientEmail: 'hello@techstart.io',
    clientAddress: '456 Innovation Ave, San Francisco, CA 94102',
    date: '2024-12-10',
    dueDate: '2025-01-09',
    items: [
      { 
        id: '1', 
        description: 'Mobile App Development', 
        quantity: 40, 
        unitPrice: 150 
      }
    ],
    taxRate: 9.5,
    status: 'Sent',
    notes: 'Payment due within 30 days'
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    clientName: 'Global Solutions Ltd',
    clientEmail: 'billing@globalsolutions.com',
    clientAddress: '789 Enterprise Blvd, Chicago, IL 60601',
    date: '2024-12-14',
    dueDate: '2025-01-14',
    items: [
      { 
        id: '1', 
        description: 'Consulting Services', 
        quantity: 20, 
        unitPrice: 200 
      },
      { 
        id: '2', 
        description: 'Technical Support', 
        quantity: 10, 
        unitPrice: 100 
      }
    ],
    taxRate: 7.0,
    status: 'Draft',
    notes: 'Draft invoice - review before sending'
  }
];