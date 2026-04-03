import React from 'react';

const PersonalDetails = ({ student, isEditing, onUpdate }) => {
  const data = student?.profile || student || {};
  const { name, fatherName, motherName, dob, gender, category, domicile, mobile, nationality, aadhar } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ profile: { ...data, [name]: value } });
  };

  const rows = [
    {
      l1: 'Name of Candidate',
      v1: isEditing ? (
        <input name="name" value={name || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : name,
      l2: "Father's Name",
      v2: isEditing ? (
        <input name="fatherName" value={fatherName || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : fatherName || 'N/A'
    },
    {
      l1: 'Date of Birth',
      v1: isEditing ? (
        <input type="date" name="dob" value={dob ? new Date(dob).toISOString().split('T')[0] : ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : (dob ? new Date(dob).toLocaleDateString() : 'N/A'),
      l2: "Mother's Name",
      v2: isEditing ? (
        <input name="motherName" value={motherName || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : motherName || 'N/A'
    },
    {
      l1: 'Gender',
      v1: isEditing ? (
        <select name="gender" value={gender || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400">
          <option value="">Select</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
          <option value="OTHER">OTHER</option>
        </select>
      ) : gender,
      l2: 'Category',
      v2: isEditing ? (
        <input name="category" value={category || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : category || 'N/A'
    },
    {
      l1: 'Domicile State',
      v1: isEditing ? (
        <input name="domicile" value={domicile || 'Bihar'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : domicile || 'Bihar',
      l2: 'Mobile No.',
      v2: isEditing ? (
        <input name="mobile" value={mobile || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : mobile || 'N/A'
    },
    {
      l1: 'Nationality',
      v1: isEditing ? (
        <input name="nationality" value={nationality || 'Indian'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : nationality || 'Indian',
      l2: 'Aadhar Card',
      v2: isEditing ? (
        <input name="aadhar" value={aadhar || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
      ) : aadhar || 'N/A'
    }
  ];

  return (
    <section>
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight text-[11px]">Personal Details</h4>
      <div className="grid grid-cols-12 border border-gray-200 rounded overflow-hidden text-[10px]">
        {rows.map((row, idx) => (
          <div key={idx} className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="col-span-3 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l1}</div>
            <div className="col-span-3 p-2 font-medium border-r border-gray-100 text-gray-900 flex items-center">{row.v1}</div>
            <div className="col-span-3 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l2}</div>
            <div className="col-span-3 p-2 font-medium text-gray-900 flex items-center">{row.v2}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalDetails;
