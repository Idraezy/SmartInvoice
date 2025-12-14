// InvoiceList.tsx - Display list of invoice cards

// import React from 'react';
import { FileText } from 'lucide-react';
import type { Invoice } from './types';
import InvoiceCard from './InvoiceCard';

interface InvoiceListProps {
  invoices: Invoice[];
  darkMode: boolean;
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

export default function InvoiceList({ invoices, darkMode, onEdit, onDelete }: InvoiceListProps) {
  // Show empty state if no invoices
  if (invoices.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-xl text-gray-500">No invoices found</p>
        <p className="text-sm text-gray-400 mt-2">
          Create your first invoice or adjust your search filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {invoices.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          darkMode={darkMode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}