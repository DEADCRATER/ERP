import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
// import { dummyCourseStats } from '../../data/mockData';

const Reports = () => {
  const { t } = useTranslation();

  // Dummy data for admission stats
  const admissionStats = [
    { id: 1, title: "Total Applications", value: "1,245", trend: "+12%", trendUp: true, bgColor: "bg-blue-50", textColor: "text-blue-700" },
    { id: 2, title: "Accepted Students", value: "856", trend: "+5%", trendUp: true, bgColor: "bg-green-50", textColor: "text-green-700" },
    { id: 3, title: "Rejected Applications", value: "124", trend: "-2%", trendUp: false, bgColor: "bg-red-50", textColor: "text-red-700" },
    { id: 4, title: "Pending Review", value: "265", trend: "+18%", trendUp: true, bgColor: "bg-yellow-50", textColor: "text-yellow-700" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-ti
        
        
        
        ght">{t('principal.reportsTitle', 'Academic Reports')}</h1>
        <p className="mt-1 text-sm text-gray-600">{t('principal.reportsDesc', 'Review institutional reports and performance analytics.')}</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {admissionStats.map((stat) => (
          <Card key={stat.id} className="p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 truncate mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${stat.bgColor} ${stat.textColor}`}
                >
                  {stat.trendUp ? (
                    <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  {stat.trend}
                </span>
                <span className="ml-2 text-xs text-gray-500">vs last month</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
