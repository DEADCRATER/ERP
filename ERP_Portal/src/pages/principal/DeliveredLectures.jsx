import React, { useState } from 'react';

// Mock data matching the reference image structure
const LECTURE_DATA = [
  // Diploma in Anaesthesia Technology / O.T. Assistant Term-I
  { id: 1, course: 'Diploma in Anaesthesia Technology / O.T. Assistant Term-I', code: 'P050101', subject: 'Anatomy', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 2, course: 'Diploma in Anaesthesia Technology / O.T. Assistant Term-I', code: 'P050102', subject: 'Physiology', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 3, course: 'Diploma in Anaesthesia Technology / O.T. Assistant Term-I', code: 'P050103', subject: 'Microbiology', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 4, course: 'Diploma in Anaesthesia Technology / O.T. Assistant Term-I', code: 'P050104', subject: 'Practical', type: 'Practical', method: 'Practical', lectures: 75 },
  { id: 5, course: 'Diploma in Anaesthesia Technology / O.T. Assistant Term-I', code: 'P050105', subject: 'Viva', type: 'Practical', method: 'Practical', lectures: 75 },
  // Diploma in Medical Laboratory Technician Term-I
  { id: 6, course: 'Diploma in Medical Laboratory Technician Term-I', code: 'P040101', subject: 'Anatomy & Physiology', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 7, course: 'Diploma in Medical Laboratory Technician Term-I', code: 'P040102', subject: 'Principles of Common Clinico Biochemical method', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 8, course: 'Diploma in Medical Laboratory Technician Term-I', code: 'P040103', subject: 'Hematology', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 9, course: 'Diploma in Medical Laboratory Technician Term-I', code: 'P040104', subject: 'Practical', type: 'Practical', method: 'Practical', lectures: 75 },
  { id: 10, course: 'Diploma in Medical Laboratory Technician Term-I', code: 'P040105', subject: 'Viva', type: 'Practical', method: 'Practical', lectures: 75 },
  // Diploma in Medical Radiology Technology
  { id: 11, course: 'Diploma in Medical Radiology Technology /X-Ray Technician /Radio Imaging Technology Term-I', code: 'P060101', subject: 'Applied Anatomy & Physiology', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 12, course: 'Diploma in Medical Radiology Technology /X-Ray Technician /Radio Imaging Technology Term-I', code: 'P060102', subject: 'Radio Physics Pertaining to Radiology', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 13, course: 'Diploma in Medical Radiology Technology /X-Ray Technician /Radio Imaging Technology Term-I', code: 'P060103', subject: 'Practical', type: 'Practical', method: 'Practical', lectures: 75 },
  { id: 14, course: 'Diploma in Medical Radiology Technology /X-Ray Technician /Radio Imaging Technology Term-I', code: 'P060104', subject: 'Viva', type: 'Practical', method: 'Practical', lectures: 75 },
  // Diploma in Physiotherapy Term-I
  { id: 15, course: 'Diploma in Physiotherapy Term-I', code: 'P120101', subject: 'ANATOMY', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 16, course: 'Diploma in Physiotherapy Term-I', code: 'P120102', subject: 'PHYSIOLOGY', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 17, course: 'Diploma in Physiotherapy Term-I', code: 'P120103', subject: 'PATHOLOGY', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 18, course: 'Diploma in Physiotherapy Term-I', code: 'P120104', subject: 'BIO-CHEMISTRY', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 19, course: 'Diploma in Physiotherapy Term-I', code: 'P120105', subject: 'BIO-MECHANICS', type: 'Theory', method: 'Theory', lectures: 75 },
  { id: 20, course: 'Diploma in Physiotherapy Term-I', code: 'P120106', subject: 'Anatomy', type: 'Practical', method: 'Practical', lectures: 75 },
  { id: 21, course: 'Diploma in Physiotherapy Term-I', code: 'P120108', subject: 'Viva/Voce', type: 'Practical', method: 'Practical', lectures: 75 },
  { id: 22, course: 'Diploma in Physiotherapy Term-I', code: 'P120107', subject: 'Physiology', type: 'Practical', method: 'Practical', lectures: 75 },
];

const DeliveredLectures = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [lectureData, setLectureData] = useState(LECTURE_DATA);

  const handleLectureChange = (id, value) => {
    setLectureData(prev =>
      prev.map(row => row.id === id ? { ...row, lectures: Number(value) } : row)
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    // In production: API call to save changes
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Manage Delivered Lectures</h1>
        <p className="text-xs text-gray-500">
          <span className="text-gray-700 hover:underline cursor-pointer">Dashboard</span>
          {' / '}Manage Delivered Lectures
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-800">Manage Delivered Lectures</span>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded hover:bg-yellow-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Info note banner */}
        <div className="mx-4 mt-4 mb-3 flex items-start gap-2 bg-cyan-600 text-white text-xs px-4 py-2.5 rounded">
          <span className="font-bold shrink-0">Note:</span>
          <span>
            The delivered lectures data here is used only for the Examination Form.
            Once a student locks their attendance, any changes to delivered lectures will not be reflected in their record.
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-4 pb-4">
          <table className="min-w-full text-xs text-left border border-gray-200 rounded">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5 font-semibold text-gray-700 w-10">#</th>
                <th className="px-3 py-2.5 font-semibold text-gray-700">Course</th>
                <th className="px-3 py-2.5 font-semibold text-gray-700">Code | Subject | Type | Method</th>
                <th className="px-3 py-2.5 font-semibold text-gray-700 text-right w-24">Lecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lectureData.map((row, i) => (
                <tr key={row.id} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-3 py-2 text-gray-500">{row.id}</td>
                  <td className="px-3 py-2 text-gray-800">{row.course}</td>
                  <td className="px-3 py-2 text-gray-700">
                    <span className="font-medium text-gray-900">{row.code}</span>
                    {' | '}
                    {row.subject}
                    {' | '}
                    <span className={`${row.type === 'Practical' ? 'text-blue-600' : 'text-gray-600'}`}>
                      {row.type}
                    </span>
                    {' | '}
                    {row.method}
                  </td>
                  <td className="px-3 py-2 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        value={row.lectures}
                        onChange={e => handleLectureChange(row.id, e.target.value)}
                        className="w-16 text-right border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900"
                        min={0}
                      />
                    ) : (
                      <span className="font-semibold text-gray-900">{row.lectures}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveredLectures;
