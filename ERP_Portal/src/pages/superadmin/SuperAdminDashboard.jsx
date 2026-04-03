import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AddPrincipalModal from '../../components/modals/AddPrincipalModal';
import MaintenanceToggle from '../../components/super-admin/MaintenanceToggle';

const SuperAdminDashboard = () => {
  const { t } = useTranslation();
  const [isPrincipalModalOpen, setIsPrincipalModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 🛠 Maintenance Mode Control */}
      <MaintenanceToggle />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('superAdmin.dashboardTitle', 'Super Admin Dashboard')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('superAdmin.overview', 'Overview of system status and quick access to core administrative functions.')}</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setIsPrincipalModalOpen(true)}>{t('superAdmin.addPrincipal', 'Add Principal')}</Button>
          <Button className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">{t('superAdmin.addStudent', 'Add Student')}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('superAdmin.totalPrincipals', 'Total Principals')}</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">42</p>
        </Card>
        <Card className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('superAdmin.totalStudents', 'Total Students')}</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">1,205</p>
        </Card>
        <Card className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('superAdmin.activeUsers', 'Active Users')}</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">892</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('superAdmin.recentActivity', 'Recent Activity')}</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-900">Principal John Doe was added.</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-900">System settings updated.</span>
              <span className="text-gray-500">5 hours ago</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-900">Student enrollment bulk upload completed.</span>
              <span className="text-gray-500">1 day ago</span>
            </li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('superAdmin.quickActions', 'Quick Actions')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors">
              {t('sidebar.managePrincipals', 'Manage Principals')}
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors">
              {t('sidebar.manageStudents', 'Manage Students')}
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors">
              System Logs
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors">
              {t('sidebar.settings', 'Settings')}
            </button>
          </div>
        </Card>
      </div>
      <AddPrincipalModal isOpen={isPrincipalModalOpen} onClose={() => setIsPrincipalModalOpen(false)} />
    </div>
  );
};

export default SuperAdminDashboard;
