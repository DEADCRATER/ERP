import React from 'react';
import { useTranslation } from 'react-i18next';

const StudentFees = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {t('sidebar.fees', 'Fees')}
      </h1>
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          {t('student.feesInfo', "Review your current fee balances, past payments, and outstanding dues.")}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-5 sm:p-6 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Outstanding Balance</h3>
            <p className="text-3xl font-extrabold text-gray-900">$1,250.00</p>
          </div>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFees;
