import React from 'react';

const PersonalDetails = ({ student }) => {
  
  const { name, fatherName, motherName, dob, gender, category, domicile, mobile , nationality, aadhar } = student?.profile || {};
  return (
    <section>
      <h4 className="font-black text-gray-900 border-b border-gray-200 pb-1 mb-3 uppercase tracking-tight text-[11px]">Personal Details</h4>
      <div className="grid grid-cols-12 border border-gray-200 rounded overflow-hidden text-[11px]">
        {[
           {l1: 'Name of Candidate', v1: name, l2: "Father's Name", v2: fatherName || 'Not Generated'},
           {l1: 'Date of Birth : ' + (dob || '22-02-2006'), v1: '', l2: "Mother's Name", v2: motherName || 'Not Generated'},
           {l1: 'Gender', v1: gender, l2: 'Category', v2: category || 'Not Generated'},
           {l1: 'Domicile State', v1: domicile || 'Bihar', l2: 'Person with Disability', v2: student?.profile?.pwd || 'No', l3: 'Staff Military Quota', v3: student?.profile?.military || 'No'},
           {l1: 'Email id', v1: <span className="text-blue-600 underline font-medium">{student?.profile?.user?.email}</span>, l2: 'Mobile No.', v2: mobile || 'Not Generated'},
           {l1: 'Nationality', v1: nationality || 'Indian', l2: 'Aadhar Card', v2: aadhar || 'Not Generated'},
        ].map((row, idx) => (
           <div key={idx} className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
             <div className="col-span-3 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l1}</div>
             <div className="col-span-3 p-2 font-medium border-r border-gray-100 text-gray-900">{row.v1}</div>
             <div className="col-span-3 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">{row.l2}</div>
             <div className="col-span-3 p-2 font-medium flex gap-4 text-gray-900">
                {row.v2}
                {row.l3 && <><span className="font-semibold text-gray-600 ml-4 italic">{row.l3} :</span> <span>{row.v3}</span></>}
             </div>
           </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalDetails;
