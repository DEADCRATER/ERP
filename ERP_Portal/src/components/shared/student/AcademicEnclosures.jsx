import React from 'react';

const AcademicEnclosures = ({ student }) => {
  const { tenthBoard, tenthYear, tenthPercentage, twelfthBoard, twelfthYear, twelfthMarks, twelfthTotalMarks, twelfthPercentage } = student?.profile?.education || {};


  return (
    <section className="text-[11px]">
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight">Enclosures</h4>
      
      {/* Academic Details Sub-section */}
      <div className="mb-6">
        <h5 className="font-bold text-gray-800 mb-2 italic">Academic Details</h5>
        <div className="border border-gray-200 rounded overflow-hidden text-gray-900">
           {[
             {l1: '10th Board', v1: tenthBoard || 'BSEB PATNA', l2: '', v2: '', l3: '10th Board Certificate', v3: 'Yes, File Link'},
             {l1: 'Marks Percentage', v1: tenthPercentage || '56.6', l2: 'Year of Passing', v2: tenthYear || '2021', l3: 'Board Name', v3: tenthBoard || 'BSEB PATNA'},
             {l1: '12th Board', v1: twelfthBoard || 'BSEB PATNA', l2: '', v2: '', l3: '12th Board Marksheet', v3: 'Yes, File Link'},
             {l1: 'Year of Passing', v1: twelfthYear || '2023', l2: 'Board Name', v2: twelfthBoard || 'BSEB PATNA', l3: 'Total Marks', v3: twelfthTotalMarks || '500'},
             {l1: 'Marks Obtained', v1: twelfthMarks || '315', l2: 'Percentage(%)', v2: twelfthPercentage || '63.00'},
           ].map((row, idx) => (
              <div key={idx} className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                <div className="col-span-2 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l1}</div>
                <div className="col-span-2 p-2 font-medium border-r border-gray-100">{row.v1}</div>
                <div className="col-span-2 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l2}</div>
                <div className="col-span-2 p-2 font-medium border-r border-gray-100">{row.v2}</div>
                <div className="col-span-2 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l3}</div>
                {/* <div className="col-span-2 p-2 font-medium text-blue-600 underline">
                   {row.v3?.startsWith('Yes') ? <><span className="text-gray-900 mr-1">Yes,</span> <span className="cursor-pointer hover:text-blue-800">File Link</span></> : row.v3}
                </div> */}
              </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicEnclosures;
