import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AddPrincipalModal from '../../components/modals/AddPrincipalModal';

const ManagePrincipals = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dummyPrincipals = [
    { id: 1, name: "Alice Johnson", email: "alice.j@erp.com", status: "Active" },
    { id: 2, name: "Robert Smith", email: "robert.s@erp.com", status: "Active" },
    { id: 3, name: "Maria Garcia", email: "maria.g@erp.com", status: "Inactive" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('superAdmin.managePrincipalsTitle', 'Manage Principals')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('superAdmin.managePrincipalsDesc', 'View and manage all principal accounts across the system.')}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>{t('superAdmin.addPrincipal', 'Add Principal')}</Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900">{t('superAdmin.name', 'Name')}</th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900">{t('superAdmin.email', 'Email')}</th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900">{t('superAdmin.status', 'Status')}</th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-right">{t('superAdmin.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {dummyPrincipals.map((principal) => (
                <tr key={principal.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{principal.name}</td>
                  <td className="px-6 py-4 text-gray-600">{principal.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${principal.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {t(`superAdmin.${principal.status.lowerCase}`, principal.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-gray-600 hover:text-gray-900 font-medium">{t('superAdmin.view', 'View')}</button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium">{t('superAdmin.edit', 'Edit')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <AddPrincipalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ManagePrincipals;
