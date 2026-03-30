import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <div>
          <h2 className="text-8xl sm:text-9xl font-extrabold text-gray-900 tracking-tight">404</h2>
          <p className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Page not found</p>
          <p className="mt-3 text-base sm:text-lg text-gray-600">Sorry, we couldn't find the page you're looking for or you don't have the correct role permissions to view it.</p>
        </div>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
