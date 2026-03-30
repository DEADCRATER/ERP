import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from '../../lib/axios';
import AddDepartmentSidebar from "../../components/principal/AddDepartmentSidebar";

const AddCourse = () => {
  const { t } = useTranslation();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.get(`/principal/college/${user?._id}/departments`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {t("principal.departmentsTitle", "Departments")}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {t("principal.departmentsDesc", "View and manage academic departments for your college.")}
          </p>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading departments...</div>
      ) : departments.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-20 bg-gray-50">
          <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg font-medium text-gray-900 mb-1">No Departments Yet</p>
          <p className="text-sm text-gray-500 max-w-xs text-center">Click "Add Department" to create your first department.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments.map((dept, i) => (
            <div
              key={dept._id || i}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-900 px-4 py-3">
                <h3 className="text-white font-bold text-sm leading-tight truncate">{dept.name}</h3>
              </div>
              <div className="flex-1 px-4 py-3 text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Created: {dept.createdAt ? new Date(dept.createdAt).toLocaleDateString('en-IN') : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Department Slide-over */}
      <AddDepartmentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCreated={(newDept) => setDepartments((prev) => [...prev, newDept])}
      />
    </div>
  );
};

export default AddCourse;
