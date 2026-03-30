import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              {t('portalName', 'ERP Portal')}
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageSwitcher />
            
            {!user ? (
              <div className="hidden sm:flex items-center space-x-3 ml-4">
                <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 px-1 py-1 transition-all">
                  {t('home', 'Home')}
                </Link>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900 px-1 py-1 transition-all">
                  {t('login', 'Login')}
                </Link>
                <Link to="/register" className="text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-all">
                  {t('register', 'Register')}
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 ml-4"
              >
                {t('logout', 'Logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
