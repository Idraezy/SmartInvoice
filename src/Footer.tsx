// Footer.tsx - Application footer component

// import React from 'react';


interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`border-t mt-12 py-8 transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm">
            © {currentYear} Smart-Invoice. All rights reserved.
          </div>
          
          {/* Built by */}
          <div className="flex items-center gap-2 text-sm">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Built with 💚
            </span>
            {/* <Heart className="w-4 h-4 text-green-500 fill-green-500" /> */}
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              By
            </span>
            <span className="font-semibold text-blue-500">
              Idraezy
            </span>
          </div>
          
          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a 
              href="https://at-sify.vercel.app/" 
              className={`hover:text-blue-500 transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              ATS Pro -Resume & ATS checker 
            </a>
            <a 
              href="https://landing-page-generator-taupe.vercel.app/" 
              className={`hover:text-blue-500 transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Landing Page Generator
            </a>
            <a 
              href="https://dali-m2rk.vercel.app/" 
              className={`hover:text-blue-500 transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Dali E-commerce website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}