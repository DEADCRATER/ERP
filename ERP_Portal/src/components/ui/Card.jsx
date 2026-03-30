import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-sm rounded-lg p-6 border border-gray-200 ${className}`}>
    {children}
  </div>
);
