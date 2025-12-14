// types.ts - All TypeScript interfaces and types

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  date: string;
  dueDate: string;
  items: LineItem[];
  taxRate: number;
  status: 'Draft' | 'Sent' | 'Paid';
  notes: string;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid';