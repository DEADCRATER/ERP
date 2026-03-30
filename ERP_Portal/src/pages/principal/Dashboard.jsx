import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

// Derives a short abbreviation from the course name
const getAbbr = (name) =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 4);

// Builds mock registration pipeline stats per course
const buildStats = (course) => [
  { label: "Total Registrations", value: Math.floor(course.totalSeats * 0.9), link: true },
  { label: "Submitted", value: 0, link: true },
  { label: "Assigned to College Nodal Officer", value: 0, link: true },
  { label: "Received at College Principal Portal", value: 0, link: true },
  { label: "Received at University Verifier Portal", value: 0, link: true },
  { label: "Received at COE Portal", value: 0, link: true },
  { label: "Approved By COE", value: Math.floor(course.totalSeats * 0.6), link: true },
  { label: "Rejected/Withdrawn Applications", value: 0, link: true },
];



const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const stats = buildStats(course);
  const abbr = getAbbr(course.name);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Card header — gray-900 background, matches sidebar active state */}
      <div className="bg-gray-900 px-4 py-3">
        <h3 className="text-white font-bold text-sm leading-tight">
          {course.courseName}
        </h3>
        <p className="text-gray-400 text-xs font-semibold mt-0.5 tracking-wider">{abbr}</p>
      </div>

      {/* Stats body */}
      <div className="flex-1 px-4 py-3 bg-white">
        {/* Total seats row */}
        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 border-b border-gray-100 pb-2 mb-2">
          <span>Total Seats</span>
          <span className="bg-gray-100 text-gray-900 px-2 py-0.5 rounded font-bold">{course.totalSeats}</span>
        </div>

        <div className="space-y-1">
          {stats.map((stat, i) => (
            <div key={i} className="flex justify-between items-center text-xs py-0.5 border-b border-gray-50">
              <span
                className="text-gray-600 hover:text-gray-900 cursor-pointer truncate pr-2 hover:underline"
                style={{ maxWidth: '78%' }}
              >
                {stat.label}
              </span>
              <span
                className={`font-bold shrink-0 text-xs px-1.5 py-0.5 rounded ${stat.value > 0
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-500'
                  }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <button
        onClick={() => navigate(`/principal/view-applications?course=${encodeURIComponent(course.courseName)}`)}
        className="w-full py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors active:bg-gray-700"
      >
        View Applications
      </button>
    </div>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await api.get(
        `/principal/college/${user?._id}/departments`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      console.log(res.data.data);
      setDepartments(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartments();
  }, []);

  const filtered = departments.filter((c) =>
    c?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {t('principal.dashboardTitle', 'Student')}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            <span className="text-gray-900 font-medium cursor-pointer hover:underline">Dashboard</span>
            {' / '}Student
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
            style={{ minWidth: 200 }}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* View All button */}
          <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
            View All Application
          </button>
          {/* Grid/List toggles */}
          <button className="p-2 rounded border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-colors" title="List view">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 rounded border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors" title="Grid view">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3h3v3H5zM5 9h3v3H5zM5 15h3v3H5zM9 3h3v3H9zM9 9h3v3H9zM9 15h3v3H9zM13 3h3v3h-3zM13 9h3v3h-3zM13 15h3v3h-3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-20 bg-white border border-gray-200 rounded-lg">
          No courses found for <strong className="text-gray-700">"{search}"</strong>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
