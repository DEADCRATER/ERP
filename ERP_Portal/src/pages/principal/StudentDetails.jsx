import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RegistrationDetails from "../../components/shared/student/RegistrationDetails";
import PersonalDetails from "../../components/shared/student/PersonalDetails";
import AddressDetails from "../../components/shared/student/AddressDetails";
import AcademicEnclosures from "../../components/shared/student/AcademicEnclosures";
import OtherDetails from "../../components/shared/student/OtherDetails";
import api from "../../lib/axios";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const isPrincipal = currentUser?.role === 'PRINCIPAL';
  const [student, setStudent] = useState(null);


  // Mock data for the demonstration
  const students = {
    ackNo: id || "2310033245",
    regNo: "P2333534010",
    status: "Approved by COE",
    name: "PREM SINGHANIA",
    fatherName: "RAM KUMAR SINGH",
    motherName: "SANJU KUMARI",
    dob: "22-02-2006",
    gender: "MALE",
    category: "BC",
    domicile: "Bihar",
    email: "premsinghania006@gmail.com",
    mobile: "8409930618",
    nationality: "Indian",
    aadhar: "758476320337",
    collegeName: "Om Sri Sai College of Paramedical and Sciences, Madhubani",
    courseName: "Diploma in Medical Laboratory Technician",
    submissionDate: "12-02-2026",
    admissionDate: "15-05-2023",
    address: "VILL-KAMLADARI PO-KAMLADARI PS-JAYNAGAR, MADHUBANI, JAYNAGAR",
    state: "BIHAR",
    district: "MADHUBANI",
    pinCode: "847226",
    country: "India",
    tenthBoard: "BSEB PATNA",
    tenthYear: "2021",
    tenthPercentage: "56.6",
    twelfthBoard: "BSEB PATNA",
    twelfthYear: "2023",
    twelfthMarks: "315",
    twelfthTotalMarks: "500",
    chemistryMarks: "56",
    mathBioMarks: "68",
    physicsMarks: "68",
    lastCourse: "INTERMEDIATE",
    lastSchool: "H.M.Y.J.K.B.V. COLLEGE KAMLADARI JAYNAGAR MADHUBANI",
    fee: "2500",
    transactionDate: "12-02-2026 11:55 am",
    paymentId: "cpayment_52300",
    transactionId: "114205858636",
  };
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await api.get(`/student/application/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });

        const data = res.data;
        console.log(data);
        setStudent(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudent();
  }, [id]);
  const { photo, signature } = student?.profile?.media || {};
  console.log("student", student)
  console.log(photo, signature)


  const [showSlipOptions, setShowSlipOptions] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-[11px] leading-tight text-gray-800">
      {/* Top Header Bar - Principal only */}
      {isPrincipal && <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 text-sm">
              Application Details :{" "}
              {student?.ackNo ? student.ackNo : "Not generated"}
            </span>
            <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-tight text-center">
              {student?.status || "Not Generated"}
            </span>
          </div>
          <nav className="hidden lg:flex items-center space-x-6 text-blue-600 font-medium ml-4 border-l pl-6 border-gray-200">
            <button className="border-b-2 border-blue-600 pb-2 -mb-[10px]">
              Personal Information
            </button>
            <button className="hover:text-blue-800">Enclosures</button>
            <button className="hover:text-blue-800">Status Log & Action</button>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-600 text-white flex items-center px-3 py-1 rounded text-[11px] font-bold cursor-pointer hover:bg-green-700 transition">
            Next : 2310033968 <span className="ml-1">›</span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-900"
            title="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>}

      {/* Main Content Area */}
      <main className="relative flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white max-w-7xl mx-auto w-full shadow-lg my-4 rounded border border-gray-200">
        {/* University Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-wide uppercase leading-tight">
            Bihar University of Health Sciences, Patna
          </h2>
          <h3 className="text-lg font-semibold text-gray-800 mt-1">
            बिहार स्वास्थ्य विज्ञान विश्वविद्यालय, पटना
          </h3>
          <p className="text-gray-600 mt-4 font-bold border-t border-b border-gray-100 inline-block px-8 py-1">
            Student Registration Form Print
          </p>
        </div>

        {/* Registration Slip Button - top right, hidden on print */}
        <div className="absolute top-4 right-6 print:hidden z-20">
          <div className="relative">
            {isPrincipal ? (
              <button
                onClick={() => setShowSlipOptions(!showSlipOptions)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold cursor-pointer hover:bg-blue-700 flex items-center gap-1 shadow-sm transition-colors"
              >
                📥 Registration Slip <span className="text-[7px]">▼</span>
              </button>
            ) : (
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] font-bold cursor-pointer hover:bg-blue-700 flex items-center gap-1 shadow-sm transition-colors"
              >
                📥 Registration Slip
              </button>
            )}
            {isPrincipal && showSlipOptions && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded shadow-xl z-10 overflow-hidden py-1">
                <button
                  onClick={() =>
                    navigate(`/principal/registration-slip/${student?.profile?._id}/college`)
                  }
                  className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-[10px] font-bold text-gray-800 transition flex items-center gap-2"
                >
                  📋 College Copy
                </button>
                <button
                  onClick={() =>
                    navigate(`/principal/registration-slip/${student?.profile?._id}/student`)
                  }
                  className="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-[10px] font-bold text-gray-800 transition border-t border-gray-100 flex items-center gap-2"
                >
                  👤 Student Copy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="relative">
          {/* Photo & Signature Box - Absolute positioned like in the reference image */}
          <div className="absolute right-0 top-0 w-40 flex flex-col items-center space-y-4">
            <div className="w-32 h-40 border border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-1 relative shadow-sm">
              {/* Mock image placeholder */}
              {/* <div className="w-full h-full bg-blue-100 flex items-center justify-center overflow-hidden">
                   <svg className="w-20 h-20 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                   </svg>
                </div> */}
              {/* <div className="absolute -bottom-4 bg-white px-2 py-0.5 text-[9px] font-bold border border-gray-200 whitespace-nowrap"></div> */}

              <img
                src={`http://localhost:8000${photo}` || ""}
                className="w-32 h-40"
                alt="photo"
              />
            </div>

            <div className="w-32 h-12 border-b border-gray-400 mt-6 flex flex-col items-center justify-end pb-1 relative shadow-sm">
              {/* <span className="italic font-serif text-sm text-gray-800 opacity-80">Prem Singhania</span> */}
              {/* <div className="absolute -bottom-4 bg-white px-2 py-0.5 text-[9px] font-bold border border-gray-200 whitespace-nowrap"> Candidate Signature</div>
               */}
              <img
                src={`http://localhost:8000${signature}` || ""}
                className="w-32 h-12"
                alt="signature"
              />
            </div>
          </div>

          {/* Form Sections */}
          <div className="mr-48 space-y-8">
            <RegistrationDetails
              student={student}
              showSlipOptions={showSlipOptions}
              setShowSlipOptions={setShowSlipOptions}
              onViewSlip={(type) =>
                navigate(
                  `/principal/registration-slip/${student.regNo}/${type}`,
                )
              }
            />
            <PersonalDetails student={student} />
            <AddressDetails student={student} />
            <AcademicEnclosures student={student} />
            <OtherDetails student={student} />
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="bg-gray-50 border-t border-gray-200 px-8 py-4 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Copyright ©2026 - BIHAR UNIVERSITY OF HEALTH SCIENCES, PATNA - All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default StudentDetails;
