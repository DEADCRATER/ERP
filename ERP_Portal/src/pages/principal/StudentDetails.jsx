import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RegistrationDetails from "../../components/shared/student/RegistrationDetails";
import PersonalDetails from "../../components/shared/student/PersonalDetails";
import AddressDetails from "../../components/shared/student/AddressDetails";
import AcademicEnclosures from "../../components/shared/student/AcademicEnclosures";
import OtherDetails from "../../components/shared/student/OtherDetails";
import ReviewActionModal from "../../components/principal/ReviewActionModal";
import RegistrationSlip from "./RegistrationSlip";
import ReviewHistory from "../../components/principal/ReviewHistory";
import api from "../../lib/axios";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/Button";

const StudentDetails = () => {
  const { id } = useParams();
  
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const isPrincipal = currentUser?.role === 'PRINCIPAL';
  const [viewingSlip, setViewingSlip] = useState(false); 
  
  const [student, setStudent] = useState(null);// { type: 'registration' | 'admission', data: {} }
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'enclosures' | 'status'
  const [nextStudent, setNextStudent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const viewSlip = (type) => {
    navigate(`/principal/registration-slip/${id}/${type}`);
    setViewingSlip({ type });
  };

  const fetchStudentRecords = async (showToast = false) => {
    if (showToast) setIsRefreshing(true);
    try {
      // 1. Fetch current student details
      const response = await api.get(`/student/studentData/${id}`);
      setStudent(response.data);
      setFormData(response.data);

      // 2. Fetch all students to determine "Next" in queue
      // Determine the course/department name from the fetched student data
      const courseName = response.data?.data?.Course?.name || response.data?.profile?.Course?.name;
      let allStudentsRes;
      try {
        allStudentsRes = await api.get(courseName ? `/principal/students/${encodeURIComponent(courseName)}` : '/principal/students');
      } catch (err) {
        allStudentsRes = { data: { data: [] } };
      }
      
      const students = allStudentsRes.data.data;
      const currentIndex = students.findIndex(s => s._id === id);
      
      if (currentIndex !== -1 && currentIndex < students.length - 1) {
        const next = students[currentIndex + 1];
        setNextStudent({
          id: next._id,
          applicationNumber: next.applicationNumber || next.ackNo || "Next"
        });
      } else {
        setNextStudent(null);
      }

      // 3. Fetch audit history
      const historyRes = await api.get(`/principal/students/${id}/history`);
      setHistory(historyRes.data.data);
      
      if (showToast) toast.success("Data Refreshed Successfully");
    } catch (error) {
      console.error('Error fetching student details:', error);
      if (showToast) toast.error("Failed to Refresh Data");
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNextStudent = () => {
    if (nextStudent) {
      navigate(`/principal/student-details/${nextStudent.id}`);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchStudentRecords();
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await api.put(`/principal/students/${student?._id}/update`, formData);
      setStudent(res.data.data);
      setIsEditing(false);
      toast.success("Details updated successfully");
      fetchStudentRecords();
    } catch (err) {
      console.error("Error updating student:", err);
      toast.error(err.response?.data?.message || "Failed to update details");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReviewSubmit = async (message) => {
    try {
      const res = await api.put(`/principal/students/${id}/review`, {
        status: reviewStatus,
        message
      });
      setStudent(res.data.data);
      setIsReviewModalOpen(false);
      toast.success(`Application ${reviewStatus.toLowerCase()} successfully`);
      fetchStudentRecords();
      if (reviewStatus === 'APPROVED') {
          setTimeout(() => navigate('/principal/students'), 1500);
      }
    } catch (err) {
      console.error("Error reviewing application:", err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  const openReviewModal = (status) => {
    setReviewStatus(status);
    setIsReviewModalOpen(true);
  };

  if (!student) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-bold animate-pulse">Loading Application Details...</p>
    </div>
  );

  const { photo, signature } = student?.profile?.media || {};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-[11px] leading-tight text-gray-800">
      {/* Editing Header Bar (Visible only when editing) */}
      {isEditing && (
        <header className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-100 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-sm">Review & Edit Mode</h2>
              <p className="text-[10px] opacity-80 italic">You are currently modifying {student?.name}'s details directly.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setIsEditing(false); setFormData(student); }}
              className="px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-white text-blue-600 px-6 py-1.5 rounded-lg font-bold text-sm shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>
      )}

      {/* Main Header with Navigation & Tabs */}
      {!isEditing && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Logo/Title & Ack No */}
              <div className="flex items-center space-x-3 border-r border-gray-200 pr-6">
                <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                  Application Details : {student?.profile?.applicationNumber || student?.ackNo || "N/A"}
                </span>
                <span className={`text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-tight ${
                  student?.profile?.applicationStatus === 'APPROVED' ? 'bg-green-600' : 
                  student?.profile?.applicationStatus === 'NEEDS_UPDATE' ? 'bg-orange-500' : 
                  student?.profile?.applicationStatus === 'REJECTED' ? 'bg-red-600' : 'bg-blue-600'
                }`}>
                  {student?.profile?.applicationStatus || "PENDING"}
                </span>
              </div>

              {/* Tab Navigation */}
              <nav className="flex items-center space-x-8 h-full">
                {[
                  { id: 'personal', label: 'Personal Information' },
                  { id: 'enclosures', label: 'Enclosures' },
                  { id: 'status', label: 'Status Log & Action' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-10 text-xs font-bold transition-all relative px-1 ${
                      activeTab === tab.id 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fetchStudentRecords(true)}
                disabled={isRefreshing}
                className={`p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition shadow-sm ${isRefreshing ? 'animate-spin opacity-70' : ''}`}
                title="Refresh Data"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              
              <button 
                onClick={handleNextStudent}
                disabled={!nextStudent}
                className={`flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded font-bold text-[10px] shadow-sm transition-all ${
                  nextStudent ? 'hover:bg-green-700 active:scale-95' : 'opacity-50 cursor-not-allowed grayscale'
                }`}
              >
                {nextStudent ? `Next : ${nextStudent.applicationNumber}` : "No More Applications"}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <button 
                onClick={() => navigate(-1)} 
                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="relative flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white max-w-7xl mx-auto w-full shadow-lg my-4 rounded border border-gray-200 min-h-[600px]">
        {activeTab === 'personal' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
              <Button onClick={() => viewSlip('registration')} className="absolute right-4 top-4 bg-blue-600 text-white px-3 py-1.5 rounded font-bold text-[10px] shadow-sm hover:bg-blue-700 transition-all print:hidden">
                View Registration Slip
              </Button>
              <h2 className="text-xl font-bold text-gray-900 tracking-wide uppercase">Bihar University of Health Sciences, Patna</h2>
              <p className="text-gray-600 mt-2 font-bold border-t border-b border-gray-100 inline-block px-8 py-1">Student Registration Details</p>
            </div>

            <div className="relative">
              {/* Photo & Signature Section */}
              <div className="absolute right-0 top-0 w-32 flex flex-col items-center space-y-4 print:right-0">
                <div className="w-28 h-32 border border-gray-300 bg-gray-50 flex items-center justify-center p-1 shadow-sm overflow-hidden">
                  {photo ? (
                    <img src={`http://localhost:8000${photo}`} className="w-full h-full object-cover" alt="Student Photo" />
                  ) : (
                    <div className="text-gray-300 flex flex-col items-center">
                      <svg className="w-8 h-8 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                      <span className="text-[8px] mt-1 font-bold">PHOTO</span>
                    </div>
                  )}
                </div>
                <div className="w-28 h-10 border-b border-gray-400 flex items-center justify-center shadow-sm overflow-hidden bg-gray-50/50">
                  {signature ? (
                    <img src={`http://localhost:8000${signature}`} className="max-w-full max-h-full" alt="Student Signature" />
                  ) : (
                    <div className="text-gray-300 text-[8px] font-bold">SIGNATURE</div>
                  )}
                </div>
              </div>

              {/* Form Sections */}
              <div className="mr-36 space-y-8">
                <RegistrationDetails student={isEditing ? formData : student} />
                <PersonalDetails 
                  student={isEditing ? formData : student} 
                  isEditing={isEditing} 
                  onUpdate={(data) => setFormData(prev => ({ ...prev, ...data }))}
                />
                <AddressDetails 
                  student={isEditing ? formData : student} 
                  isEditing={isEditing} 
                  onUpdate={(data) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, ...data } }))}
                />
                <AcademicEnclosures 
                  student={isEditing ? formData : student} 
                  isEditing={isEditing} 
                  onUpdate={(data) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, education: { ...prev.profile.education, ...data } } }))}
                />
                <OtherDetails 
                  student={isEditing ? formData : student} 
                  isEditing={isEditing} 
                  onUpdate={(data) => setFormData(prev => ({ ...prev, profile: { ...prev.profile, ...data } }))}
                />
              </div>
              
              {/* Floating Edit Button (Only in Personal Tab) */}
              {isPrincipal && !isEditing && (
                <button 
                   onClick={() => setIsEditing(true)}
                   className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all group flex items-center gap-2"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                   <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm">Edit Personal Details</span>
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'enclosures' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Standard Enclosures & Documents
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'High School (10th) Marksheet', key: 'tenthMarkSheet' },
                { label: 'Intermediate (12th) Marksheet', key: 'twelfthMarkSheet' },
                { label: 'Migration Certificate', key: 'migrationCertificate' },
                { label: 'Identity Proof (Aadhar/Voter)', key: 'idProof' },
                { label: 'Rank Card', key: 'rankCard' },
                { label: 'Caste Certificate', key: 'casteCertificate' },
                { label: 'Profile Photograph', key: 'photo', isMedia: true },
                { label: 'Digital Signature', key: 'signature', isMedia: true }
              ].map((doc) => {
                const docPath = doc.isMedia 
                  ? student?.profile?.media?.[doc.key] 
                  : student?.profile?.documents?.[doc.key];
                  
                return (
                  <div key={doc.key} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
                    <div className="w-full aspect-4/3 bg-white border border-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-inner relative">
                      {docPath ? (
                        <img 
                          src={`http://localhost:8000${docPath}`} 
                          alt={doc.label} 
                          className="w-full h-full object-contain p-2"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=PDF/Doc'; }}
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-300">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span className="text-[10px] mt-2 font-bold uppercase">Not Uploaded</span>
                        </div>
                      )}
                      
                      {docPath && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <a 
                            href={`http://localhost:8000${docPath}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            View Full Document
                          </a>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-gray-800">{doc.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col md:flex-row gap-8">
              {/* History Timeline */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Application Lifecycle & History
                </h3>
                <ReviewHistory history={history} />
              </div>

              {/* Action Sidebar */}
              {isPrincipal && (
                <div className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit sticky top-24">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Take Action</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Core Decisions</p>
                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => openReviewModal('APPROVED')}
                          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-green-700 transition shadow-md flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          Approve Application
                        </button>
                        <button 
                          onClick={() => openReviewModal('REJECTED')}
                          className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-red-700 transition shadow-md flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          Reject Application
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Feedback & Correction</p>
                      <button 
                        onClick={() => openReviewModal('NEEDS_UPDATE')}
                        className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg font-bold text-sm hover:bg-orange-50 transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Request Changes
                      </button>
                      <p className="text-[9px] text-gray-400 mt-3 italic text-center">Student will be notified by email to update relevant fields.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <ReviewActionModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        status={reviewStatus}
      />

      <footer className="bg-gray-50 border-t border-gray-200 px-8 py-4 text-center mt-auto">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Copyright ©2026 - BIHAR UNIVERSITY OF HEALTH SCIENCES, PATNA</p>
      </footer>
    </div>
  );
};

export default StudentDetails;
