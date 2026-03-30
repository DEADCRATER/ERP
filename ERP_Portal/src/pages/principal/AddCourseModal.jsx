import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import api from '../../lib/axios';

const AddCourseModal = ({ onClose, onSuccess, departments }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    courseName: "",
    department: "",
    courseType: "UG",
    duration: "",
    code: "",
    totalSeats: "",
  });
  const [isAddingDept, setIsAddingDept] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await api.post("/principal/branches", formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    } catch (err) {
      console.error("Error adding course:", err);
      alert(t("principal.courseAddedError", "Failed to add course. Please try again."));
      return;
    }
    console.log("New Course Added:", formData);
    alert(t("principal.courseAddedSuccess", "Course added successfully!"));
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {t("principal.addCourseTitle", "Add New Course")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("principal.courseNameLabel", "Course Name")} *
                </label>
                <Input
                  required
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech Artificial Intelligence"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("principal.departmentLabel", "Department")} *
                </label>

                <select
                  required
                  name="department"
                  value={formData.department}
                  onChange={(e) => {
                    if (e.target.value === "ADD_NEW") {
                      setIsAddingDept(true);
                      setFormData({ ...formData, department: "" });
                    } else {
                      setIsAddingDept(false);
                      handleChange(e);
                    }
                  }}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                >
                  <option value="" disabled>
                    {t("principal.selectDepartment", "-- Select a Department --")}
                  </option>

                  {departments.length > 0 ? departments.map((data, idx) => (
                    <option key={idx} value={data._id}>
                      {data.name}
                    </option>
                  )) : <option value="">No Departments Found</option>}

                  <option value="ADD_NEW">Add New Department</option>
                </select>

                {isAddingDept && (
                  <input
                    type="text"
                    placeholder="Enter new department"
                    value={newDepartment}
                    onChange={(e) => {
                      setNewDepartment(e.target.value);
                      setFormData({ ...formData, department: e.target.value });
                    }}
                    className="mt-3 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                  />
                )}
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("principal.courseCodeLabel", "Course Code")} *
                </label>
                <Input
                  required
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. CS101"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("principal.totalSeatsLabel", "Total Seats")} *
                </label>
                <Input
                  required
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  placeholder="e.g. 60"
                  min="1"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("principal.courseTypeLabel", "Course Type")} *
                </label>
                <select
                  required
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-white"
                >
                  <option value="UG">Undergraduate (UG)</option>
                  <option value="PG">Postgraduate (PG)</option>
                  <option value="DIPLOMA">Diploma</option>
                  <option value="PHD">Doctorate / Ph.D.</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("principal.durationLabel", "Duration")} *
                </label>
                <Input
                  required
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 4 Years"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 mt-6 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <Button type="submit">
                {t("principal.createCourseBtn", "Create Course")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
