import React from 'react';
import { useTranslation } from 'react-i18next';

const SuperAdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Super Admin {t('sidebar.dashboard', 'Dashboard')}
      </h1>
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600">{t('superAdminWelcome')}</p>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
