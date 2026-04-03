import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';

const AddDepartmentSidebar = ({ isOpen, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);


  // Fetch existing departments whenever the sidebar opens
  useEffect(() => {
    if (!isOpen) return;
    const fetchDepts = async () => {
      setLoadingDepts(true);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const res = await api.get(`/principal/college/${user._id}/departments`);
        setDepartments(res.data?.data || []);
      } catch {
        setDepartments([]);
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchDepts();
    setName('');
    setTotalSeats('');
    setError('');
    setSuccess('');
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Department name is required.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post(
        '/principal/departments',
        { name: name.trim(), totalSeats: totalSeats || 0 }
      );
      setSuccess('Department created successfully!');
      setDepartments((prev) => [...prev, res.data.data]);
      setName('');
      setTotalSeats('');
      if (onCreated) onCreated(res.data.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create department.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-over panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gray-900 text-white">
          <div>
            <h2 className="text-sm font-bold tracking-tight">Add Department</h2>
            <p className="text-gray-400 text-[10px] mt-0.5">Create a new department for your college</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition"
            title="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4 border-b border-gray-100">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Total Seats
            </label>
            <input
              type="number"
              value={totalSeats}
              min="0"
              onChange={(e) => setTotalSeats(e.target.value)}
              placeholder="e.g. 60"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors placeholder-gray-400"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 text-xs font-medium">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-xs font-medium">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-900 text-white text-sm font-bold rounded-md hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating...
              </>
            ) : (
              '+ Create Department'
            )}
          </button>
        </form>

        {/* Existing departments list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Existing Departments
          </h3>
          {loadingDepts ? (
            <div className="flex items-center justify-center py-10 text-gray-400 text-xs">Loading...</div>
          ) : departments.length === 0 ? (
            <div className="text-center text-gray-400 text-xs py-10">No departments yet.</div>
          ) : (
            <ul className="space-y-1.5">
              {departments.map((dept, i) => (
                <li
                  key={dept._id || i}
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md border border-gray-100 text-sm text-gray-800 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-900 shrink-0" />
                    {dept.name}
                  </div>
                  {dept.totalSeats > 0 && (
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-semibold">
                      {dept.totalSeats} seats
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default AddDepartmentSidebar;
