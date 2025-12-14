// SearchBar.tsx - Search and filter invoices component

// import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  darkMode: boolean;
}

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  darkMode 
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className={`flex-1 relative ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by client name or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
              : 'bg-white border-gray-300 focus:border-blue-500'
          } outline-none`}
        />
      </div>
      
      {/* Status Filter Dropdown */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className={`px-4 py-3 rounded-lg border outline-none transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}
      >
        <option value="All">All Status</option>
        <option value="Draft">Draft</option>
        <option value="Sent">Sent</option>
        <option value="Paid">Paid</option>
      </select>
    </div>
  );
}