import React from 'react';

const AddressDetails = ({ student, isEditing, onUpdate }) => {
  const data = student?.profile || student || {};
  const { address, state, district, pinCode, country } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const rows = [
    {
       l1: 'Correspondence Address',
       v1: isEditing ? (
         <input name="address" value={address || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : address || 'N/A'
    },
    {
       l1: 'State',
       v1: isEditing ? (
         <input name="state" value={state || 'BIHAR'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : state || 'BIHAR',
       l2: 'District',
       v2: isEditing ? (
         <input name="district" value={district || 'MADHUBANI'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : district || 'MADHUBANI'
    },
    {
       l1: 'Pincode',
       v1: isEditing ? (
         <input name="pinCode" value={pinCode || '847226'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : pinCode || '847226',
       l2: 'Country',
       v2: isEditing ? (
         <input name="country" value={country || 'India'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : country || 'India'
    }
  ];

  return (
    <section>
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight text-[11px]">Address Details</h4>
      <div className="grid grid-cols-12 border border-gray-200 rounded overflow-hidden text-[10px]">
        {rows.map((row, idx) => (
          <div key={idx} className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="col-span-3 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l1}</div>
            <div className="col-span-3 p-2 font-medium border-r border-gray-100 text-gray-900 flex items-center">{row.v1}</div>
            {row.l2 && (
              <>
                <div className="col-span-3 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l2}</div>
                <div className="col-span-3 p-2 font-medium text-gray-900 flex items-center">{row.v2}</div>
              </>
            )}
            {!row.l2 && <div className="col-span-6"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddressDetails;
