import React from 'react';

export const Button = ({ children, className = '', ...props }) => (
  <button 
    className={`px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm ${className}`} 
    {...props}
  >
    {children}
  </button>
);
