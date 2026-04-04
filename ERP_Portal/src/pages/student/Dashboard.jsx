import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

// Modular Step Components
import BasicDetails from '../../components/student/WizardSteps/BasicDetails';
import AcademicDetails from '../../components/student/WizardSteps/AcademicDetails';
import DocumentUploads from '../../components/student/WizardSteps/DocumentUploads';
import FeesPayment from '../../components/student/WizardSteps/FeesPayment';

import StudentStatusView from '../../components/student/StudentStatusView';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [application, setApplication] = useState(null);
  const [college, setCollege] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false); // To handle "Update Now" flow
  const [saving, setSaving] = useState(false);
  const [showSlipOptions, setShowSlipOptions] = useState(false);

  // Consolidated Form State
  const [formData, setFormData] = useState({
    name: '', fatherName: '', motherName: '', dob: '', gender: '', category: '',
    domicile: '', nationality: 'Indian', aadhar: '', email: '', mobile: '',
    address: '', state: '', district: '', pinCode: '', country: 'India',
    tenthBoard: '', tenthYear: '', tenthPercentage: '',
    twelfthBoard: '', twelfthYear: '', twelfthTotalMarks: '', twelfthMarks: '', twelfthPercentage: '',
    physicsMarks: '', chemistryMarks: '', mathBioMarks: '',
    transactionDate: '', paymentId: '', transactionId: '', fee: '2500'
  });

  const [files, setFiles] = useState({
    photo: null, signature: null, tenthMarkSheet: null, twelfthMarkSheet: null,
    migrationCertificate: null, idProof: null, rankCard: null, casteCertificate: null
  });

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      setLoading(true);
      const userString = localStorage.getItem('user');
      if (!userString) return;
      const user = JSON.parse(userString);
      const id = user?._id;

      const res = await api.get(`/student/application/${id}`);
      const data = res.data;
      console.log('Fetched Profile Data:', data);

      if (data) {
        // Correctly set step from profile nested object or top level
        const currentStep = data.profile?.applicationStep || data.applicationStep || 1;
        setStep(currentStep);
        setApplication(data); // Always set application data if found

        const profileData = data.profile || {};

        setFormData(prev => ({
          ...prev,
          ...profileData,
          ...(profileData.education || {}), // Flatten education fields
          dob: profileData.dob ? profileData.dob.split('T')[0] : '',
          departmentId: profileData.departmentId?._id || profileData.departmentId || '',
          course: profileData.course || ''
        }));


        // Keep track of submission status from backend
        if (data.profile?.studentDetails?.isSubmitted) {
          setIsSubmitted(true);
        }
      }

    } catch (err) {
      if (err.response?.status === 404) {
        // No application found, this is a new student
        setStep(1);
        console.log('No existing application found, starting from step 1');
      } else {
        console.error('Fetch error:', err);
        setError('Failed to fetch data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }

  };



  const handleNextStep = async () => {
    setSaving(true);
    try {
      if (step === 1) {
        // Step 1: Basic Details
        await api.patch('/student/application/step1', formData);
      } else if (step === 2) {
        // Step 2: Academic Details & Essential Documents
        const step2Data = new FormData();

        const education = {
          tenthBoard: formData.tenthBoard,
          tenthYear: formData.tenthYear,
          tenthPercentage: formData.tenthPercentage,
          twelfthBoard: formData.twelfthBoard,
          twelfthYear: formData.twelfthYear,
          twelfthTotalMarks: formData.twelfthTotalMarks,
          twelfthMarks: formData.twelfthMarks,
          twelfthPercentage: formData.twelfthPercentage,
        };

        step2Data.append('education', JSON.stringify(education));
        
        // Include Course Selection which is now in Step 2
        if (formData.departmentId) step2Data.append('departmentId', formData.departmentId);
        if (formData.course) step2Data.append('course', formData.course);

        // Append files
        if (files.tenthMarkSheet) {
          step2Data.append('tenthMarkSheet', files.tenthMarkSheet);
        } else if (formData.documents?.tenthMarkSheet) {
          step2Data.append('existingTenthMarkSheet', formData.documents.tenthMarkSheet);
        }

        if (files.twelfthMarkSheet) {
          step2Data.append('twelfthMarkSheet', files.twelfthMarkSheet);
        } else if (formData.documents?.twelfthMarkSheet) {
          step2Data.append('existingTwelfthMarkSheet', formData.documents.twelfthMarkSheet);
        }

        await api.patch('/student/application/step2', step2Data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
      } else if (step === 3) {
        // Step 3: Media & Other Documents
        const step3Data = new FormData();
        Object.keys(files).forEach(key => {
          if (files[key] && !['tenthMarkSheet', 'twelfthMarkSheet'].includes(key)) {
            step3Data.append(key, files[key]);
          }
        });
        await api.patch('/student/application/step3', step3Data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Error saving step:', err);
      alert(err.response?.data?.message || 'Error saving progress');
    } finally {
      setSaving(false);
    }
  };

// const finalSubmit = async (e) => {
//   if (e) e.preventDefault();
//   console.log("finalSubmit");
//   const confirmSubmit = window.confirm(
//     "Are you sure? No changes can be made after submission."
//   );
//   console.log("after");
//   if (!confirmSubmit) return;

//   setSaving(true);
//   console.log("before try");
//   try {
//     // Step 4: Finalize payment/step 4
//     const step4Data = new FormData();
//     step4Data.append('transactionDate', formData.transactionDate);
//     step4Data.append('paymentId', formData.paymentId);
//     step4Data.append('transactionId', formData.transactionId);
//     step4Data.append('feeAmount', formData.fee);
//     console.log("before files");
//     if (files.feesReceipt) {
//       step4Data.append('feesReceipt', files.feesReceipt);
//     } else if (formData.documents?.feesReceipt) {
//       step4Data.append('existingFeesReceipt', formData.documents.feesReceipt);
//     }
//     console.log("after files");

//     await api.patch('/student/application/step4', step4Data, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     console.log("after step4");

//     // Final Submit
//     await api.post('/student/application/submit', {});
//     console.log("after submit");

//     // 🔥 small delay so UI doesn't instantly switch
//     setTimeout(() => {
//       setIsSubmitted(true);
//       setIsCorrecting(false);
//       window.scrollTo(0, 0);
//       fetchData();
//     }, 3000); // 300ms delay (smooth UX)

//   } catch (err) {
//     console.error('Final submit error:', err);
//     alert(err.response?.data?.message || 'Error submitting application');
//   } finally {
//     setSaving(false);
//   }
// };

const finalSubmit = async () => {
  setSaving(true);
  try {
    const step4Data = new FormData();
    step4Data.append('transactionDate', formData.transactionDate);
    step4Data.append('paymentId', formData.paymentId);
    step4Data.append('transactionId', formData.transactionId);
    step4Data.append('feeAmount', formData.fee);

    if (files.feesReceipt) {
      step4Data.append('feesReceipt', files.feesReceipt);
    } else if (formData.documents?.feesReceipt) {
      step4Data.append('existingFeesReceipt', formData.documents.feesReceipt);
    }

    await api.patch('/student/application/step4', step4Data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    await api.post('/student/application/submit', {});

    setIsSubmitted(true);
    setIsCorrecting(false);
    window.scrollTo(0, 0);
    fetchData();

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Error submitting');
  } finally {
    setSaving(false);
    setConfirmOpen(false);
  }
};

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading Application Data...</div>;

  // New Redesigned Status View 
  if ((isSubmitted || step >= 5) && application && !isCorrecting) {


    return (
      <StudentStatusView
        student={{ ...formData, ...application }}
        onUpdateNow={() => {
          setIsCorrecting(true);
          setStep(1);
        }}
        onDownload={() => window.print()}
      />
    );
  }


  // Active Wizard Mode
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-2">Confirm</h2>
            <p className="text-sm mb-4">
              Are you sure? No changes can be made after submission.
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmOpen(false)} disabled={saving} className="px-4 py-2 text-gray-600 hover:text-black">
                Cancel
              </button>

              <button
                onClick={finalSubmit}
                disabled={saving}
                className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
              >
                {saving ? "Processing..." : "Yes, Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Registration Portal</h1>
          <p className="text-gray-500 font-medium mt-1">Complete your profile to generate enrollment details.</p>
        </div>

      </div>

      {/* Step Progress Indicator */}
      <div className="mb-12 relative flex justify-between items-center max-w-3xl mx-auto px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
        <div className={`absolute top-1/2 left-0 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

        {[
          { id: 1, label: 'Basic' },
          { id: 2, label: 'Academic' },
          { id: 3, label: 'Documents' },
          { id: 4, label: 'Fees & Final' }
        ].map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-300 ${step === s.id ? 'bg-blue-600 text-white border-blue-100 scale-110 shadow-lg' :
              step > s.id ? 'bg-green-500 text-white border-green-50' : 'bg-white text-gray-400 border-gray-50'
              }`}>
              {step > s.id ? '✓' : s.id}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {step === 1 && <BasicDetails data={formData} setData={setFormData} onNext={handleNextStep} savedProfile={application?.profile} />}

        {step === 2 && <AcademicDetails data={formData} setData={setFormData} onNext={handleNextStep} onBack={() => setStep(1)} />}
        {step === 3 && <DocumentUploads data={formData} files={files} setFiles={setFiles} onNext={handleNextStep} onBack={() => setStep(2)} />}
        {step === 4 && <FeesPayment data={formData} setData={setFormData} files={files} setFiles={setFiles} onFinalSubmit={(e) => { e.preventDefault(); setConfirmOpen(true); }} onBack={() => setStep(3)} saving={saving} />}
      </div>

      {/* <footer className="mt-20 text-center border-t pt-8">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Powered by Antigravity ERP Framework v2.0</p>
      </footer> */}
    </div>
  );
};

export default Dashboard;
