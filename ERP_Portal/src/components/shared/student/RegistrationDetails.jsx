import React from 'react';
import { useAuth } from '../../../context/AuthContext';


const RegistrationDetails = ({ student, showSlipOptions, setShowSlipOptions, onViewSlip }) => {
  const { user: currentUser } = useAuth();
  const {  applicationNumber , enrollmentNumber,Course} = student?.profile || {};
  const {collegeName,collegeCode ,submissionDate} = student?.college || {};
  const user = student?.profile?.user || {};
  
  

  return (
    <section>
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight text-[11px]">Student Registration Details</h4>
      <div className="grid grid-cols-12 gap-x-0 border border-gray-200 rounded overflow-hidden text-[11px]">
        <div className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
          <div className="col-span-4 bg-gray-50 p-2 font-bold text-gray-600 border-r border-gray-100 italic">Session: {student?.session || 'Academic Year - 2023'}</div>
          <div className="col-span-8 p-2"></div>
        </div>
        
        {/* Registration Number Row with dropdown */}
        { <div className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
          <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic text-right pr-4">Registration Number</div>
          <div className="col-span-8 p-2 font-medium flex justify-between items-center pr-3">
            <span className="font-bold text-gray-900">{enrollmentNumber || 'Not Generated'}</span>
            
            
          </div>
        </div>}

        {[
          ['Acknowledgement Number', applicationNumber || 'Not Generated'],
          ['College Name', collegeName || 'Not Generated'],
          ['Course Name', Course || 'Not Generated'],
          ['Date of Submission', submissionDate || 'Not Generated'],
          ['Date of Admission', student?.admissionDate || 'Not Generated'],
        ].map(([label, value], idx) => (
          <div key={idx} className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic text-right pr-4">{label}</div>
            <div className="col-span-8 p-2 font-medium text-gray-900">
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RegistrationDetails;
