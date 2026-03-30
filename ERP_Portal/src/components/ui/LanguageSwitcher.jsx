import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
      className="bg-white text-gray-700 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer"
      title={t('language')}
    >
      <option value="en">{t('en')}</option>
      <option value="hi">{t('hi')}</option>
    </select>
  );
};

export default LanguageSwitcher;
