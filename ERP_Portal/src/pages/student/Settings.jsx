import React from 'react';
import { useTranslation } from 'react-i18next';

const StudentSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {t('sidebar.updateDetails', 'Update Details')}
      </h1>
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          {t('student.settingsForm', "Update your contact information, address, and preferences using the form below.")}
        </p>
        
        <form className="space-y-5 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
            <input type="tel" className="w-full rounded mx-0 border border-gray-300 px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Residential Address</label>
            <textarea rows="4" className="w-full rounded border border-gray-300 px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm" placeholder="Apt 4B, Example Street..."></textarea>
          </div>
          <div className="pt-2">
            <button type="button" className="px-5 py-2.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSettings;
