// InvoiceCard.tsx - Individual invoice card component

// import React from 'react';
import { motion } from 'framer-motion';
import { Download, Edit2, Trash2, Calendar, User } from 'lucide-react';
import type { Invoice } from './types';
import { calculateSubtotal, calculateTax, calculateTotal, formatCurrency, formatDate, generatePDFContent } from './utils';

interface InvoiceCardProps {
  invoice: Invoice;
  darkMode: boolean;
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

export default function InvoiceCard({ invoice, darkMode, onEdit, onDelete }: InvoiceCardProps) {
  // Calculate totals
  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, tax);

  // Status badge colors
  const statusColors = {
    Draft: 'bg-gray-500',
    Sent: 'bg-yellow-500',
    Paid: 'bg-green-500'
  };

  // Download invoice as PDF (HTML file)
  const handleDownloadPDF = () => {
    const content = generatePDFContent(invoice, subtotal, tax, total);
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-xl border p-6 transition-all hover:shadow-lg ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Invoice Information */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{invoice.invoiceNumber}</h3>
            <span className={`${statusColors[invoice.status]} text-white text-xs px-3 py-1 rounded-full font-medium`}>
              {invoice.status}
            </span>
          </div>
          
          <div className="space-y-1 text-sm">
            {/* Client Name */}
            <div className="flex items-center gap-2 text-gray-500">
              <User className="w-4 h-4" />
              <span>{invoice.clientName}</span>
            </div>
            
            {/* Due Date */}
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(invoice.dueDate)}</span>
            </div>
            
            {/* Total Amount */}
            <div className="flex items-center gap-2 text-gray-500">
              {/* <₦ className="w-4 h-4" /> */}
              <span className="text-lg font-bold text-blue-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Download PDF Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
          >
            <Download className="w-4 h-4" />
            PDF
          </motion.button>
          
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(invoice)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </motion.button>
          
          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(invoice.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}