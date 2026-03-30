import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

const BASE_URL = 'http://localhost:8000';

const RegistrationSlip = () => {
  const { id, type } = useParams(); // id = StudentDetails._id, type = 'college' | 'student'
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isCollegeCopy = type === 'college';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const res = await api.get(`/student/application/${id}`, {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        });
        setStudent(res.data.profile);
        setCollege(res.data.college);
      } catch (err) {
        console.error(err);
        setError('Failed to load registration slip. Please go back and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Format helpers
  const fmt = (v) => v || '—';
  const fmtDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="text-center space-y-3">
          <svg className="w-10 h-10 animate-spin text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-gray-600 font-medium">Loading Registration Slip...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
        <div className="text-center space-y-4 max-w-sm">
          <p className="text-red-600 font-semibold">{error}</p>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-bold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fields = [
    ['Application No.:', fmt(student?.applicationNumber)],
    ['Enrollment No.:', fmt(student?.enrollmentNumber)],
    ['Session:', fmt(student?.session || 'Academic Year - 2023')],
    ['Name of Student:', fmt(student?.name)],
    ['Date of Birth:', fmtDate(student?.dob)],
    ['College Name:', college?.collegeName || '—'],
    ['Course Name:', fmt(student?.course)],
    ['Gender:', fmt(student?.gender)],
    ['Category:', fmt(student?.category)],
    ["Father's Name:", fmt(student?.fatherName)],
    ["Mother's Name:", fmt(student?.motherName)],
    ['Mobile:', fmt(student?.mobile)],
    ['Email:', fmt(student?.email)],
  ];

  const photoSrc = student?.media?.photo ? `${BASE_URL}${student.media.photo}` : null;
  const sigSrc   = student?.media?.signature ? `${BASE_URL}${student.media.signature}` : null;
  const genDate  = student?.submissionDate ? fmtDate(student.submissionDate) : fmtDate(new Date());

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 font-serif print:p-0 print:bg-white text-gray-900">

      {/* Control bar — hidden when printing */}
      <div className="w-full max-w-3xl mb-4 flex justify-between items-center bg-white p-3 rounded shadow-sm border border-gray-200 print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <div className="flex gap-3 items-center">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
            {isCollegeCopy ? 'College Copy' : 'Student Copy'}
          </span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white text-sm font-bold rounded hover:bg-gray-800 transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Slip
          </button>
        </div>
      </div>

      {/* Printable Slip */}
      <div className="w-full max-w-3xl bg-white p-10 border-[3px] border-gray-100 shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:max-w-none print:w-full">

        {/* University Header */}
        <div className="flex items-start justify-between border-b-[1.5px] border-gray-400 pb-10 mb-8">
          <div className="w-24 h-24 shrink-0 -mt-2">
            <div className="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white border-4 border-gray-200">
              <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2 .712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-3xl font-black text-[#a01c3f] tracking-tight mb-1 uppercase leading-none">
              Bihar University of Health Sciences, Patna
            </h1>
            <h2 className="text-2xl font-bold text-[#a01c3f] mb-2">
              बिहार स्वास्थ्य विज्ञान विश्वविद्यालय, पटना
            </h2>
            {college && (
              <p className="text-sm font-semibold text-gray-700">{college.collegeName}</p>
            )}
          </div>
          <div className="w-24 shrink-0" />
        </div>

        {/* Slip Title */}
        <div className="flex justify-center items-center gap-40 mb-10">
          <div className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-0.5">
            REGISTRATION SLIP
          </div>
          <div className="text-sm font-medium italic">
            ({isCollegeCopy ? 'College Copy' : 'Student Copy'})
          </div>
        </div>

        {/* Content: Fields + Photo */}
        <div className="flex justify-between items-start">
          {/* Data Fields */}
          <div className="flex-1 space-y-4 text-sm">
            {fields.map(([label, value], idx) => (
              <div key={idx} className="flex items-start">
                <span className="w-44 font-black text-gray-800 shrink-0">{label}</span>
                <span className="flex-1 font-semibold text-gray-900 tracking-wide leading-snug">{value}</span>
              </div>
            ))}
          </div>

          {/* Photo & Signature */}
          <div className="w-56 flex flex-col items-center space-y-10 pl-8 shrink-0">
            {/* Photo */}
            <div className="w-44 h-56 border-[1.5px] border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm">
              {photoSrc ? (
                <img src={photoSrc} alt="Student Photo" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-20 h-20 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            {/* Signature */}
            <div className="w-44 border-b border-gray-400 flex flex-col items-center justify-end pb-1">
              {sigSrc ? (
                <img src={sigSrc} alt="Signature" className="h-12 max-w-full object-contain" />
              ) : (
                <span className="italic font-serif text-xs text-gray-400">Signature</span>
              )}
              <p className="text-[10px] text-gray-500 mt-1 text-center">Candidate Signature</p>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-xs font-black text-gray-700 uppercase">Application Status:</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
            student?.applicationStatus === 'APPROVED' ? 'bg-green-100 text-green-800' :
            student?.applicationStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
            student?.applicationStatus === 'NEEDS_UPDATE' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-600'
          }`}>
            {student?.applicationStatus || 'PENDING'}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t-[1.5px] border-gray-400 flex justify-between items-end">
          <div className="space-y-1">
            <div className="text-[11px] font-black uppercase text-gray-900 italic">Date of Generation:</div>
            <div className="text-sm font-bold text-gray-900 tracking-widest">{genDate}</div>
          </div>
          <div className="text-center">
            <div className="w-40 h-14 mx-auto mb-1 flex items-center justify-center opacity-70">
              <svg className="w-32 h-10 text-gray-900" style={{ transform: 'rotate(-2deg)' }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 100 30">
                <path d="M10 20 Q 25 5, 40 20 T 70 20 Q 85 35, 95 15" strokeLinecap="round" />
                <path d="M30 15 Q 45 30, 60 15" strokeLinecap="round" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="text-sm font-black text-gray-900 border-t border-transparent pt-1 mb-0.5">
              Examination Controller
            </div>
            <div className="text-xs font-bold text-gray-800">
              बिहार स्वास्थ्य विज्ञान विश्वविद्यालय, पटना
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
          <div className="w-[500px] h-[500px] bg-red-900 rounded-full" />
        </div>
      </div>

      {/* Print footer */}
      <div className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold print:fixed print:bottom-8 print:w-full print:text-center">
        This is a computer generated document and does not require physical signature.
      </div>
    </div>
  );
};

export default RegistrationSlip;
