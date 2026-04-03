import React from "react";

const OtherDetails = ({ student, isEditing, onUpdate }) => {
  const {
    lastCourse,
    lastSchool,
    transactionStatus,
    transactionDate,
    paymentId,
    transactionId,
  } = student || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const isCompleted = ["SUCCESS", "FAILED"].includes(transactionStatus);

  const rows = [
    {
       l1: 'Last Course Name',
       v1: isEditing ? (
         <input name="lastCourse" value={lastCourse || 'INTERMEDIATE'} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : lastCourse || 'INTERMEDIATE',
       l2: 'School/College Name',
       v2: isEditing ? (
         <input name="lastSchool" value={lastSchool || ''} onChange={handleInputChange} className="w-full bg-white border border-blue-200 rounded px-1 outline-none focus:ring-1 focus:ring-blue-400" />
       ) : lastSchool || 'N/A'
    },
    {
       l1: 'Registration Fee Status',
       v1: (
         <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase text-white ${
           transactionStatus === "SUCCESS" ? "bg-green-600" : 
           transactionStatus === "FAILED" ? "bg-red-600" : "bg-yellow-500"
         }`}>
           {transactionStatus || "Pending"}
         </span>
       ),
       l2: isCompleted ? `Transaction Date` : "",
       v2: isCompleted ? transactionDate : ""
    },
    {
       l1: isCompleted ? "Payment ID" : "",
       v1: isCompleted ? paymentId : "",
       l2: isCompleted ? "Transaction ID" : "",
       v2: isCompleted ? transactionId : ""
    }
  ];

  return (
    <section>
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight text-[11px]">Other Details</h4>
      <div className="border border-gray-200 rounded overflow-hidden text-[10px]">
        {rows.map((row, idx) => (
          (row.l1 || row.l2) && (
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
          )
        ))}
      </div>
    </section>
  );
};

export default OtherDetails;