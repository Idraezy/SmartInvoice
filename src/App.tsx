// App.tsx - Main application component with state management

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Invoice } from './types';
import { mockInvoices } from './mockData';
import Header from './Header';
import SearchBar from './SearchBar';
import InvoiceList from './InvoiceList';
import InvoiceModal from './InvoiceModal';
import WelcomeCard from './WelcomeCard';
import Footer from './Footer';

export default function App() {
  // State management
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load invoices from localStorage on mount
  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    } else {
      // Use mock data if no stored invoices
      setInvoices(mockInvoices);
      localStorage.setItem('invoices', JSON.stringify(mockInvoices));
    }
    
    // Load theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
    
    // Check if user has seen welcome message
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    if (invoices.length > 0) {
      localStorage.setItem('invoices', JSON.stringify(invoices));
    }
  }, [invoices]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Save invoice (create or update)
  const handleSaveInvoice = (invoice: Invoice) => {
    if (editingInvoice) {
      // Update existing invoice
      setInvoices(prev => 
        prev.map(inv => inv.id === invoice.id ? invoice : inv)
      );
    } else {
      // Add new invoice
      setInvoices(prev => [...prev, invoice]);
    }
    
    // Close modal and reset editing state
    setShowModal(false);
    setEditingInvoice(null);
  };

  // Delete invoice
  const handleDeleteInvoice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    }
  };

  // Edit invoice
  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setShowModal(true);
  };

  // Open new invoice modal
  const handleNewInvoice = () => {
    setEditingInvoice(null);
    setShowModal(true);
  };
  
  // Close welcome card
  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onNewInvoice={handleNewInvoice}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Card */}
        <AnimatePresence>
          {showWelcome && (
            <WelcomeCard 
              darkMode={darkMode}
              onClose={handleCloseWelcome}
            />
          )}
        </AnimatePresence>

        {/* Search and Filter Bar */}
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          darkMode={darkMode}
        />

        {/* Invoice List */}
        <InvoiceList 
          invoices={filteredInvoices}
          darkMode={darkMode}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
        />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Invoice Modal */}
      <AnimatePresence>
        {showModal && (
          <InvoiceModal
            darkMode={darkMode}
            invoice={editingInvoice}
            onClose={() => {
              setShowModal(false);
              setEditingInvoice(null);
            }}
            onSave={handleSaveInvoice}
          />
        )}
      </AnimatePresence>
    </div>
  );
}