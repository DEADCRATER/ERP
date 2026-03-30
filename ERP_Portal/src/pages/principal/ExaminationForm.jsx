import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const COURSES = ['All selected', 'CMD', 'DMLT', 'DOTA', 'DMRT', 'DPHYT', 'DECG'];
const CATEGORIES = ['All selected', 'GEN', 'SC', 'ST', 'OBC', 'EBC', 'BC'];
const APP_STATUSES = [
  'All selected',
  'Submitted',
  'Received at University Verifier Portal',
  'Received at COE Portal',
  'Approved By COE',
  'Pending Payment',
  'Rejected/Withdrawn',
];

const STATUS_STYLES = {
  'Received at University Verifier Portal': 'bg-blue-600 text-white',
  'Approved By COE': 'bg-green-600 text-white',
  'Pending': 'bg-yellow-400 text-gray-900',
  'Pending Payment': 'bg-yellow-400 text-gray-900',
  'Rejected': 'bg-red-600 text-white',
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status] || 'bg-gray-200 text-gray-700';

const MOCK_ENTRIES = Array.from({ length: 20 }, (_, i) => ({
  regNo: `C2333521${String(i + 1).padStart(3, '0')}`,
  examAppNo: '',
  course: 'CMD',
  category: ['BC', 'SC', 'GEN', 'EBC'][i % 4],
  name: ['GOVIND KUMAR YADAV', 'RAKESH KUMAR CHAUPAL', 'SAIMA PARWEEN', 'SACHIN KUMAR MANDAL', 'RAJEEV KUMAR RAM',
    'KANCHAN KUMARI', 'RAMAN KUMAR', 'RISHI KUMAR GOIT', 'PRAKASH KUMAR', 'SAROJ KUMAR BHARTI',
    'MINTU KUMAR YADAV', 'BASANTI KUMARI', 'RADHE KUMAR', 'AMOD KUMAR MANDAL', 'KANCHAN KUMARI',
    'SANDEEP KUMAR', 'RAMUDGAR SAPHI', 'VIKASH KUMAR', 'AANAND KUMAR', 'ASHIF ANSARI'][i],
  fatherName: ['BINDESHWAR YADAV', 'JAGDEESH CHAUPAL', 'HAFIJ TUFAIL', 'BINOD MANDAL', 'JAY KISUN RAM',
    'RAM PRASAD PASWAN', 'SHIV SHANKAR SAHU', 'BRAHMADEV GOIT', 'SHIVCHANDRA PASWAN', 'RADHA KRISHNA BHARATI',
    'JITENDRA YADAV', 'SURENDRA SAW', 'VIJAY KUMAR YADAV', 'JAGESHWAR MANDAL', 'BIHARI PASWAN',
    'DHANESHWAR SAH', 'DOMEE SAPHI', 'VINOD KUMAR YADAV', 'RAMAKANT SINGH', 'ALAM ANSARI'][i],
  mobile: `${7000000000 + i * 1111111}`,
  submission: `${['18', '08', '16', '08', '11', '16', '17', '17', '19', '18', '11', '08', '18', '18', '23', '09', '13', '16', '16', '16'][i]}-12-2025`,
  status: i === 10 || i === 18 ? 'Pending' : 'Received at University Verifier Portal',
  statusExtra: i === 10 || i === 18 ? 'Pending Payment' : null,
}));

const ITEMS_PER_PAGE = 20;

// ─── Component ────────────────────────────────────────────────────────────────
const ExaminationForm = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState('All selected');
  const [category, setCategory] = useState('All selected');
  const [appStatus, setAppStatus] = useState('All selected');
  const [submissionDate, setSubmissionDate] = useState('');
  const [search, setSearch] = useState('');
  const [reviewedByMe, setReviewedByMe] = useState(false);
  const [assignedToMe, setAssignedToMe] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 4;

  const handleReset = () => {
    setCourse('All selected');
    setCategory('All selected');
    setAppStatus('All selected');
    setSubmissionDate('');
    setSearch('');
    setReviewedByMe(false);
    setAssignedToMe(false);
    setPage(1);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">View Examination Form</h1>
        <p className="text-xs text-gray-500">
          <span className="text-gray-700 hover:underline cursor-pointer">Dashboard</span>
          {' / '}
          <span className="text-gray-700 hover:underline cursor-pointer">Manage Examination Forms</span>
          {' / '}View Examination Form
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Filter header */}
        <div className="flex items-center justify-between bg-blue-600 px-4 py-2.5">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filter &amp; Applications
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-white/80 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </button>
            <button className="p-1 text-white/80 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3h3v3H5zM5 9h3v3H5zM5 15h3v3H5zM9 3h3v3H9zM9 9h3v3H9zM9 15h3v3H9zM13 3h3v3h-3zM13 9h3v3h-3zM13 15h3v3h-3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter body */}
        <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Course */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Course</label>
            <select
              value={course}
              onChange={e => setCourse(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white"
            >
              {COURSES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {/* Application Status */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Application Status</label>
            <select
              value={appStatus}
              onChange={e => setAppStatus(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white"
            >
              {APP_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {/* Submission Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Application Submission Date</label>
            <input
              type="date"
              value={submissionDate}
              onChange={e => setSubmissionDate(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white"
              placeholder="Application Submission Date"
            />
          </div>
        </div>

        {/* Second filter row */}
        <div className="px-4 pb-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Search <span className="text-gray-400">ℹ</span>
            </label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by Ack No., Exam App No., Registration No., etc."
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 bg-white"
            />
          </div>
          {/* Checkboxes */}
          <div className="flex flex-col gap-1 pt-4">
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={reviewedByMe}
                onChange={e => setReviewedByMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-gray-900"
              />
              Application Reviewed by Me
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={assignedToMe}
                onChange={e => setAssignedToMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-gray-900"
              />
              Application Assigned to Me
            </label>
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-4">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              Submit
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition-colors"
            >
              ✕ Reset
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Payment Challan ▾
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  'Reg No.', 'Exam App No.', 'Course', 'Category',
                  'Name ℹ', "Father's Name ℹ", 'Mobile No. ℹ',
                  'Submission ℹ', 'Status ℹ', '#'
                ].map((h) => (
                  <th key={h} className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">
                    {h}
                    {!['#', 'Exam App No.'].includes(h) && (
                      <span className="text-gray-400 ml-1">↕</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_ENTRIES.map((row, i) => (
                <tr key={row.regNo} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  <td className="px-3 py-2 text-gray-900 font-medium whitespace-nowrap">{row.regNo}</td>
                  <td className="px-3 py-2 text-gray-400">—</td>
                  <td className="px-3 py-2 text-gray-700">{row.course}</td>
                  <td className="px-3 py-2 text-gray-700">{row.category}</td>
                  <td className="px-3 py-2 text-gray-900 whitespace-nowrap">{row.name}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{row.fatherName}</td>
                  <td className="px-3 py-2 text-gray-600">{row.mobile}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{row.submission}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getStatusStyle(row.status)}`}>
                      {row.status}
                    </span>
                    {row.statusExtra && (
                      <span className={`ml-1 inline-block px-2 py-0.5 rounded text-xs font-semibold ${getStatusStyle(row.statusExtra)}`}>
                        {row.statusExtra}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <button 
                      onClick={() => navigate(`/principal/student-details/${row.regNo}`)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium border border-blue-300 px-2 py-0.5 rounded hover:bg-blue-50 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Showing 1 to {ITEMS_PER_PAGE} of 73 entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 text-xs rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 text-xs rounded border transition-colors ${
                  page === p
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1 text-xs rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminationForm;
