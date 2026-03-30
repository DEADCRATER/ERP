import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const ManageStudents = () => {
  const { t } = useTranslation();

  const dummyStudents = [
    { id: 1, name: "David Kim", rollNo: "STU-2026-001", course: "Computer Science" },
    { id: 2, name: "Emma Watson", rollNo: "STU-2026-002", course: "Business Administration" },
    { id: 3, name: "Liam Ness", rollNo: "STU-2026-003", course: "Mechanical Engineering" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('superAdmin.manageStudentsTitle', 'Global Student Management')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('superAdmin.manageStudentsDesc', 'System-wide access to student profiles, registration data, and roles.')}</p>
        </div>
        <Button>{t('superAdmin.addStudent', 'Add Student')}</Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900">{t('superAdmin.name', 'Name')}</th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900">{t('superAdmin.rollNo', 'Roll No')}</th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900">{t('superAdmin.course', 'Course')}</th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-right">{t('superAdmin.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {dummyStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.rollNo}</td>
                  <td className="px-6 py-4 text-gray-600">{student.course}</td>
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
    </div>
  );
};

export default ManageStudents;
