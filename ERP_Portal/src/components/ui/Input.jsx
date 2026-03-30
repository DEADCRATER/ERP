import React from 'react';

export const Input = ({ className = '', ...props }) => (
  <input 
    className={`w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${className}`} 
    {...props} 
  />
);
