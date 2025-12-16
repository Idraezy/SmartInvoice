// WelcomeCard.tsx - Welcome and instructions component

import { motion } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface WelcomeCardProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function WelcomeCard({ darkMode, onClose }: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mb-8 rounded-xl p-6 border-2 ${
        darkMode 
          ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Welcome to Smart Invoice! 🎉</h2>
          </div>
          
          {/* Introduction */}
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Create professional invoices in seconds. Here's how to get started:
          </p>
          
          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Step 1 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Create Invoice</h3>
                <p className="text-sm text-gray-500">
                  Click "New Invoice" button to start. Fill in client details and add line items.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Auto-Calculate</h3>
                <p className="text-sm text-gray-500">
                  Enter quantities and prices - totals calculate automatically with tax!
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Manage Status</h3>
                <p className="text-sm text-gray-500">
                  Track invoices as Draft, Sent, or Paid. Use search to find any invoice.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className={`flex items-start gap-3 p-4 rounded-lg ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Download PDF</h3>
                <p className="text-sm text-gray-500">
                  Click the green "PDF" button to download. Open and print to PDF!
                </p>
              </div>
            </div>
          </div>
          
          {/* Pro Tip */}
          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
            darkMode ? 'bg-gray-800/30' : 'bg-blue-50/50'
          }`}>
            <p className="text-sm">
              💡 <strong>Pro Tip:</strong> All your data is saved automatically in your browser. 
              Your invoices are private and secure - they never leave your device!
            </p>
          </div>
        </div>
        
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className={`ml-4 p-2 rounded-lg ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
          aria-label="Close welcome message"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}