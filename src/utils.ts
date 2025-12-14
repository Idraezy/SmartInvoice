// utils.ts - Utility functions for calculations and formatting

import type { LineItem, Invoice } from './types';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Calculate subtotal from line items
export const calculateSubtotal = (items: LineItem[]): number => {
  return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
};

// Calculate tax amount
export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

// Calculate total (subtotal + tax)
export const calculateTotal = (subtotal: number, tax: number): number => {
  return subtotal + tax;
};

// Format number as currency (Nigerian Naira)
export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format date string
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Generate PDF HTML content
export const generatePDFContent = (
  invoice: Invoice, 
  subtotal: number, 
  tax: number, 
  total: number
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${invoice.invoiceNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3B82F6;
    }
    .company-info h1 {
      color: #3B82F6;
      margin: 0 0 10px 0;
    }
    .invoice-details {
      text-align: right;
    }
    .invoice-number {
      font-size: 24px;
      font-weight: bold;
      color: #3B82F6;
    }
    .client-info {
      margin-bottom: 30px;
      padding: 20px;
      background: #F3F4F6;
      border-radius: 8px;
    }
    .client-info h3 {
      margin-top: 0;
      color: #1F2937;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th {
      background: #3B82F6;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #E5E7EB;
    }
    .totals {
      margin-left: auto;
      width: 300px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
    .total-row {
      font-size: 20px;
      font-weight: bold;
      color: #3B82F6;
      border-top: 2px solid #3B82F6;
      padding-top: 12px;
      margin-top: 8px;
    }
    .notes {
      margin-top: 40px;
      padding: 20px;
      background: #F9FAFB;
      border-left: 4px solid #3B82F6;
      border-radius: 4px;
    }
    .footer {
      margin-top: 60px;
      text-align: center;
      color: #6B7280;
      font-size: 14px;
      padding-top: 20px;
      border-top: 1px solid #E5E7EB;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="company-info">
      <h1>InvoicePro</h1>
      <p>Professional Invoice Service</p>
    </div>
    <div class="invoice-details">
      <div class="invoice-number">${invoice.invoiceNumber}</div>
      <p><strong>Date:</strong> ${formatDate(invoice.date)}</p>
      <p><strong>Due Date:</strong> ${formatDate(invoice.dueDate)}</p>
      <p><strong>Status:</strong> <span style="background: ${
        invoice.status === 'Paid' ? '#10B981' : 
        invoice.status === 'Sent' ? '#F59E0B' : '#6B7280'
      }; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${invoice.status}</span></p>
    </div>
  </div>

  <div class="client-info">
    <h3>Bill To:</h3>
    <p><strong>${invoice.clientName}</strong></p>
    <p>${invoice.clientEmail}</p>
    <p>${invoice.clientAddress.replace(/\n/g, '<br>')}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align: center;">Quantity</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items.map(item => `
        <tr>
          <td>${item.description}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">${formatCurrency(item.unitPrice)}</td>
          <td style="text-align: right;">${formatCurrency(item.quantity * item.unitPrice)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row">
      <span>Subtotal:</span>
      <span><strong>${formatCurrency(subtotal)}</strong></span>
    </div>
    <div class="totals-row">
      <span>Tax (${invoice.taxRate}%):</span>
      <span><strong>${formatCurrency(tax)}</strong></span>
    </div>
    <div class="totals-row total-row">
      <span>Total:</span>
      <span>${formatCurrency(total)}</span>
    </div>
  </div>

  ${invoice.notes ? `
    <div class="notes">
      <h4 style="margin-top: 0;">Notes:</h4>
      <p>${invoice.notes}</p>
    </div>
  ` : ''}

  <div class="footer">
    <p>Thank you for your business!</p>
    <p>Generated by InvoicePro</p>
  </div>
</body>
</html>
  `;
};