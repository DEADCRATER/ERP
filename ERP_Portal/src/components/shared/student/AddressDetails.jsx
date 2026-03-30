import React from 'react';

const AddressDetails = ({ student }) => {
  const { permanentAddress,address, state, district, pinCode, country } = student?.profile || {};
  return (
    <section className="grid grid-cols-2 gap-8 text-[11px]">
      <div>
        <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight">Permanent Address Details</h4>
        <div className="border border-gray-200 rounded text-gray-900">
          <div className="grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic h-16">Address Details</div>
            <div className="col-span-8 p-2 font-medium">{permanentAddress || address || 'N/A'}</div>
          </div>
          <div className="grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
             <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">State</div>
             <div className="col-span-8 p-2 font-medium">{state || 'BIHAR'}</div>
          </div>
          <div className="grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
             <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">Pin Code</div>
             <div className="col-span-8 p-2 font-medium">{pinCode || '847226'}</div>
          </div>
        </div>
      </div>
      <div className="pt-7">
        <div className="border border-gray-200 rounded mt-1 text-gray-900">
          <div className="grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic h-16">District</div>
            <div className="col-span-8 p-2 font-medium">{district || 'MADHUBANI'}</div>
          </div>
          <div className="grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
             <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">Country</div>
             <div className="col-span-8 p-2 font-medium">{country || 'India'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressDetails;
