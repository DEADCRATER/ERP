import React, { useState } from 'react';

const StudentStatusView = ({ student, onUpdateNow, onDownload }) => {
  const [showDownloads, setShowDownloads] = useState(false);

  // GATE-style Purple/Lavender theme
  const primaryColor = "bg-[#6A4B9F]"; // Deep Purple
  const secondaryColor = "bg-[#F3E8FF]"; // Light Lavender
  const borderColor = "border-[#D8B4FE]";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-12 animate-in fade-in duration-500">
      {/* Header with Logos */}
      {/* <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-gray-100">
        <div className="flex items-center gap-4">
          <img src="/logo-left.png" alt="University Logo" className="h-20 w-auto" onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=BUHS'} />
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-[#2D1B69] tracking-tighter uppercase">Bihar University of Health Sciences, Patna</h1>
            <h2 className="text-xl md:text-2xl font-bold text-[#4C1D95] mt-1">बिहार स्वास्थ्य विज्ञान विश्वविद्यालय, पटना</h2>
            <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">Organizing Institute: BUHS PATNA CAMPUS</p>
          </div>
        </div>
        <img src="/logo-right.png" alt="State Logo" className="h-20 w-auto" onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=BIHAR'} />
      </div> */}

      {/* Blue/Purple Enrollment ID Bar */}
      <div className={`${primaryColor} text-white px-6 py-3 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mt-4 shadow-md`}>
         <div className="font-bold tracking-wide">Enrollment ID: <span className="font-black text-yellow-300">{student.enrollmentNumber || student.regNo || 'N/A'}</span></div>
         
      </div>

      {/* Welcome Bar */}
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className={`${secondaryColor} border ${borderColor} rounded-lg px-6 py-4 flex items-center gap-3 shadow-sm`}>
           <svg className="w-6 h-6 text-[#6A4B9F]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
           <span className="text-xl font-bold text-[#2D1B69]">Welcome, <span className="uppercase">{student.name}</span></span>
        </div>
      </div>

      {/* Application Status Card */}
      <main className="max-w-5xl mx-auto mt-8 px-4">
        {/* Principal Feedback Alert (Needs Update) */}
        {student.applicationStatus === 'NEEDS_UPDATE' && (
          <div className="mb-8 border-l-8 border-red-600 bg-red-50 p-6 shadow-lg animate-bounce-short">
             <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <div className="flex-1">
                   <h4 className="text-lg font-black text-red-800 uppercase tracking-tight">CORRECTION REQUIRED BY PRINCIPAL</h4>
                   <p className="mt-2 text-red-700 font-bold leading-relaxed italic bg-white p-3 border border-red-100 rounded">
                      "{student.reviewMessage || 'Please review your application details for accuracy.'}"
                   </p>
                   <button 
                     onClick={onUpdateNow}
                     className="mt-6 bg-red-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95"
                   >
                     Update Application Now &rarr;
                   </button>
                </div>
             </div>
          </div>
        )}

        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xl">
          <div className={`${primaryColor} text-white px-8 py-4`}>
             <h3 className="text-xl font-black uppercase tracking-widest">Application Status</h3>
          </div>
          
          <div className="p-8 bg-gray-50/30">
             <div className="grid grid-cols-1 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-white">
                   <div className="p-4 bg-gray-50 font-bold text-gray-500 uppercase text-[11px] tracking-widest border-r">Enrollment Id</div>
                   <div className="p-4 col-span-2 font-black text-[#2D1B69]">{student.enrollmentNumber || student.regNo || 'PENDING GENERATION'}</div>
                </div>
                <div className="grid grid-cols-3 bg-white">
                   <div className="p-4 bg-gray-50 font-bold text-gray-500 uppercase text-[11px] tracking-widest border-r">Applicant Name</div>
                   <div className="p-4 col-span-2 font-black text-[#2D1B69] uppercase">{student.name}</div>
                </div>
                <div className="grid grid-cols-3 bg-white">
                   <div className="p-4 bg-gray-50 font-bold text-gray-500 uppercase text-[11px] tracking-widest border-r">Applicant Status</div>
                   <div className="p-4 col-span-2">
                       <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                         student.applicationStatus === 'APPROVED' ? 'bg-green-100 text-green-700' :
                         student.applicationStatus === 'NEEDS_UPDATE' ? 'bg-red-100 text-red-700' :
                         'bg-yellow-100 text-yellow-700'
                       }`}>
                          {student.applicationStatus === 'APPROVED' ? 'Application Approved & Verified' :
                           student.applicationStatus === 'NEEDS_UPDATE' ? 'Action Required: Correction Needed' :
                           'Application Under Review (PENDING)'}
                       </span>
                       <p className="mt-3 text-xs font-bold text-gray-400 italic">
                          Your BUHS-{student.regNo?.slice(-4) || '2026'} registration results are available for processing.
                       </p>
                   </div>
                </div>
             </div>

             <div className="mt-10 flex flex-col md:flex-row justify-end items-center gap-4">
                <button 
                  onClick={() => window.open(`/principal/student-details/${student._id || student.regNo}`, '_blank')}
                  className="w-full md:w-auto bg-[#523C7C] text-white px-8 py-2.5 rounded shadow-md hover:bg-[#3E2D5D] transition font-black uppercase text-[11px] tracking-widest"
                >
                  View Application Full-Screen
                </button>
             </div>

             {/* <div className="mt-12 group">
                <button 
                  onClick={() => setShowDownloads(!showDownloads)}
                  className="w-full bg-white border border-gray-200 p-4 rounded-lg flex items-center justify-between hover:bg-gray-50 transition shadow-sm group-hover:border-[#6A4B9F]"
                >
                   <span className="font-bold text-gray-600 group-hover:text-[#6A4B9F]">Application Form and Admit Card Download</span>
                   <svg className={`w-5 h-5 text-gray-400 transition-transform ${showDownloads ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {showDownloads && (
                  <div className="mt-2 bg-gray-50 border border-gray-100 rounded-lg p-4 space-y-3 shadow-inner">
                     <button onClick={onDownload} className="flex items-center gap-3 text-sm font-bold text-blue-600 hover:underline">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Download Final Application Form (PDF)
                     </button>
                     <div className="flex items-center gap-3 text-sm font-bold text-gray-400 cursor-not-allowed">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Download Admit Card (Not Available Yet)
                     </div>
                  </div>
                )} */}
             {/* </div> */}
          </div>
          
          <div className="bg-gray-100 px-8 py-4 flex justify-end">
             <span className="text-[10px] font-black text-gray-400 italic">Digital FingerPrint: a30b4faa3d68b57251d7e4bb69ccc0a1</span>
          </div>
        </div>
      </main>

      <footer className="mt-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
         Organized by BUHS Patna &copy; 2026 | Application ID: GATE-B-{student.regNo?.slice(-4) || '99XY'}
      </footer>
    </div>
  );
};

export default StudentStatusView;
