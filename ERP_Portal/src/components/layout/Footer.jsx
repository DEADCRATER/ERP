import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500 font-medium tracking-wide">
          <div>
            {t('copyright', { year: new Date().getFullYear() })}
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-900 transition-colors">{t('about', 'About')}</a>
            <a href="#" className="hover:text-gray-900 transition-colors">{t('contact', 'Contact')}</a>
            <a href="#" className="hover:text-gray-900 transition-colors">{t('privacy', 'Privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
