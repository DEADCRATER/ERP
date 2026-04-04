import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

const COURSES = [
  'All selected',
  'Diploma in Medical Laboratory Technician (DMLT)',
  'Diploma in Anaesthesia Technology (DOTA)',
  'Diploma in Medical Radiology Technology (DMRT)',
  'Diploma in Physiotherapy (DPHYT)',
  'Diploma in ECG Technician (DECG)',
  'Dresser Certificate Course (CMD)',
];

const CATEGORIES = ['All selected', 'GEN', 'SC', 'ST', 'OBC', 'EBC', 'BC'];
const APP_STATUSES = ['All selected', 'Submitted', 'Approved by COE', 'Pending Payment', 'Received at University Verifier Portal', 'Rejected/Withdrawn'];

const STATUS_STYLES = {
  'Approved by COE': 'bg-green-600 text-white',
  'Approved By COE': 'bg-green-600 text-white',
  'Pending Payment': 'bg-yellow-400 text-gray-900',
  'Received at University Verifier Portal': 'bg-blue-600 text-white',
  'Rejected/Withdrawn': 'bg-red-600 text-white',
  'Submitted': 'bg-gray-500 text-white',
};

const getStatusStyle = (status) => STATUS_STYLES[status] || 'bg-gray-200 text-gray-700';


const ITEMS_PER_PAGE = 10;

const ViewStudentApplications = () => {
  const [searchParams] = useSearchParams();
  
  const navigate = useNavigate();

  // Pre-populate course from query param (set by dashboard card)
  const presetCourse = searchParams.get('course') || 'All selected';
  const [course, setCourse] = useState(
    COURSES.find(c => c.includes(presetCourse)) || presetCourse || 'All selected'
  );
  const [category, setCategory] = useState('All selected');
  const [appStatus, setAppStatus] = useState('All selected');
  const [searchName, setSearchName] = useState('');
  const [ackNo, setAckNo] = useState('');
  const [appDate, setAppDate] = useState('');
  const [reviewedByMe, setReviewedByMe] = useState(false);
  const [assignedToMe, setAssignedToMe] = useState(false);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  // Derive abbreviation from preset course
  const courseAbbr = presetCourse.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 4);
  const totalEntries = 75;
  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
  const displayed = students.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);


  const getStudents = async () => {
    try {
      const endpoint = (course && course !== 'All selected') 
        ? `principal/students/${encodeURIComponent(course)}` 
        : `principal/students`;
      const res = await api.get(endpoint);
      console.log(res.data.data);
      setStudents(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  const handleReset = () => {
    setCourse('All selected');
    setCategory('All selected');
    setAppStatus('All selected');
    setSearchName('');
    setAckNo('');
    setAppDate('');
    setReviewedByMe(false);
    setAssignedToMe(false);
    setPage(1);
  };


  useEffect(() => {
    getStudents();
  }, [course]);

  return (
    <div className="space-y-4 max-w-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">View Student</h1>
        <p className="text-xs text-gray-500">
          <span className="text-gray-700 hover:underline cursor-pointer" onClick={() => navigate('/principal/dashboard')}>Dashboard</span>
          {' / '}
          <span className="text-gray-700 hover:underline cursor-pointer" onClick={() => navigate('/principal/students')}>Manage Students</span>
          {' / '}View Student
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

        {/* Filter row 1 */}
        <div className="px-4 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
            <input
              type="text"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              placeholder="Search by Name"
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Filter row 2 */}
        <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Ack No.</label>
            <input
              type="text"
              value={ackNo}
              onChange={e => setAckNo(e.target.value)}
              placeholder="Search Ack No."
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Application Date</label>
            <input
              type="date"
              value={appDate}
              onChange={e => setAppDate(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input type="checkbox" checked={reviewedByMe} onChange={e => setReviewedByMe(e.target.checked)} className="w-3.5 h-3.5 accent-gray-900" />
              Application Reviewed by Me
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
              <input type="checkbox" checked={assignedToMe} onChange={e => setAssignedToMe(e.target.checked)} className="w-3.5 h-3.5 accent-gray-900" />
              Application Assigned to Me
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              Submit
            </button>
            <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition-colors">
              ✕ Reset
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
                {['Ack No.', 'Course', 'Category', 'Name', "Father's Name", 'Mobile No.', 'Date', 'Status', '#'].map(h => (
                  <th key={h} className="px-3 py-2.5 font-semibold text-gray-700 whitespace-nowrap">
                    {h}
                    {!['#'].includes(h) && <span className="text-gray-400 ml-1">↕</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayed.map((row, i) => (
                <tr key={row.ackNo} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{row.applicationNumber}</td>
                  <td className="px-3 py-2 text-gray-700">{row.Course?.name}</td>
                  <td className="px-3 py-2 text-gray-700">{row.category}</td>
                  <td className="px-3 py-2 text-gray-900 whitespace-nowrap">{row.name}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{row.fatherName}</td>
                  <td className="px-3 py-2 text-gray-600">{row.mobile}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(row.submissionDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getStatusStyle(row.academicStatus)}`}>
                      {row.academicStatus}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button 
                      onClick={() => navigate(`/principal/student-details/${row._id}`)}
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
            Showing 1 to {displayed.length} of {displayed.length} entries
            {presetCourse !== 'All selected' && (
              <span className="ml-1">(filtered from {totalEntries} total entries)</span>
            )}
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
                  page === p ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
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

export default ViewStudentApplications;
