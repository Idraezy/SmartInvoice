// InvoiceModal.tsx - Modal for creating and editing invoices

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Invoice, LineItem } from './types';
import { generateId, calculateSubtotal, calculateTax, calculateTotal, formatCurrency } from './utils';

interface InvoiceModalProps {
  darkMode: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
}

export default function InvoiceModal({ darkMode, invoice, onClose, onSave }: InvoiceModalProps) {
  // Initialize form data
  const [formData, setFormData] = useState<Invoice>(
    invoice || {
      id: generateId(),
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0 }],
      taxRate: 0,
      status: 'Draft',
      notes: ''
    }
  );

  // Calculate totals
  const subtotal = calculateSubtotal(formData.items);
  const tax = calculateTax(subtotal, formData.taxRate);
  const total = calculateTotal(subtotal, tax);

  // Add new line item
  const addLineItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: generateId(), description: '', quantity: 1, unitPrice: 0 }]
    });
  };

  // Remove line item
  const removeLineItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter(item => item.id !== id)
      });
    }
  };

  // Update line item field
  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-5xl rounded-xl shadow-2xl my-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className="text-2xl font-bold">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-opacity-80 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Invoice Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Invoice Number</label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Right Column - Client Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client Email</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client Address</label>
                <textarea
                  value={formData.clientAddress}
                  onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  }`}
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Line Items</h3>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addLineItem}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </motion.button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {formData.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`grid grid-cols-12 gap-3 p-4 rounded-lg border ${
                      darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="col-span-12 md:col-span-5">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border outline-none ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                        className={`w-full px-3 py-2 rounded-lg border outline-none ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <input
                        type="number"
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                        className={`w-full px-3 py-2 rounded-lg border outline-none ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2 flex items-center justify-end">
                      <span className="font-semibold">
                        {formatCurrency(item.quantity * item.unitPrice)}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      {formData.items.length > 1 && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeLineItem(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Tax and Totals */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                className={`w-full px-4 py-2 rounded-lg border outline-none ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-300'
                }`}
              />
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({formData.taxRate}%):</span>
                  <span className="font-semibold">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-400">
                  <span>Total:</span>
                  <span className="text-blue-500">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-300'
              }`}
              rows={3}
              placeholder="Additional notes or payment terms..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}