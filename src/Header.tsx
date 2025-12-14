// Header.tsx - Application header with branding and actions

// import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onNewInvoice: () => void;
}

export default function Header({ darkMode, setDarkMode, onNewInvoice }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">SMART INVOICE</h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* New Invoice Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewInvoice}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            New Invoice
          </motion.button>
          
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}