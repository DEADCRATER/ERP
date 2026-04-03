import React from 'react';

const AcademicEnclosures = ({ student, isEditing, onUpdate }) => {
  const data = student?.education || student?.profile?.education || {};
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const rows = [
    {
      l1: '10th Board',
      v1: isEditing ? (
        <input name="tenthBoard" value={data.tenthBoard || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : data.tenthBoard || 'BSEB PATNA',
      l2: '10th Year',
      v2: isEditing ? (
        <input type="number" name="tenthYear" value={data.tenthYear || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : data.tenthYear || '2021',
      l3: 'Marks (%)',
      v3: isEditing ? (
        <input type="number" name="tenthPercentage" value={data.tenthPercentage || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : data.tenthPercentage || '56.6'
    },
    {
      l1: '12th Board',
      v1: isEditing ? (
        <input name="twelfthBoard" value={data.twelfthBoard || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : data.twelfthBoard || 'BSEB PATNA',
      l2: '12th Year',
      v2: isEditing ? (
        <input type="number" name="twelfthYear" value={data.twelfthYear || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : data.twelfthYear || '2023',
      l3: 'Marks Obtained',
      v3: isEditing ? (
        <input type="number" name="twelfthMarks" value={data.twelfthMarks || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : data.twelfthMarks || '315'
    }
  ];

  return (
    <section>
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight text-[11px]">Enclosures</h4>
      <div className="border border-gray-200 rounded overflow-hidden text-[10px]">
        {rows.map((row, idx) => (
          <div key={idx} className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="col-span-2 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l1}</div>
            <div className="col-span-2 p-2 font-medium border-r border-gray-100 text-gray-900 flex items-center">{row.v1}</div>
            <div className="col-span-2 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l2}</div>
            <div className="col-span-2 p-2 font-medium border-r border-gray-100 text-gray-900 flex items-center">{row.v2}</div>
            <div className="col-span-2 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l3}</div>
            <div className="col-span-2 p-2 font-medium text-gray-900 flex items-center">{row.v3}</div>
          </div>
        ))}
      </div>

      {/* Document links (Read-only as per previous UI) */}
      <div className="mt-4 grid grid-cols-12 gap-x-4 gap-y-2">
        {student?.profile?.documents && Object.entries(student.profile.documents).map(([key, value]) => (
          value && (
            <div key={key} className="col-span-12 sm:col-span-4 flex items-center justify-between p-2 border border-blue-50 bg-blue-50/10 rounded">
              <span className="text-[9px] font-bold text-gray-500 uppercase italic">{key.replace(/([A-Z])/g, ' $1')}</span>
              <a 
                href={`http://localhost:8000${value}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 text-[9px] font-bold underline"
              >
                View File
              </a>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default AcademicEnclosures;
