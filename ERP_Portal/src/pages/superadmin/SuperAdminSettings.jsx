import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const SuperAdminSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('superAdmin.settingsTitle', 'System Settings')}</h1>
        <p className="mt-1 text-sm text-gray-600">{t('superAdmin.settingsDesc', 'Configure global administrative details and security credentials.')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t('superAdmin.adminDetails', 'Admin Details')}</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.name', 'Name')}</label>
              <Input type="text" defaultValue="Super Admin" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.email', 'Email')}</label>
              <Input type="email" defaultValue="admin@erp.com" />
            </div>
            <div className="pt-2">
              <Button type="button">{t('superAdmin.saveChanges', 'Save Changes')}</Button>
            </div>
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t('superAdmin.updatePassword', 'Update Password')}</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="pt-2">
              <Button type="button">{t('superAdmin.updatePassword', 'Update Password')}</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminSettings;
