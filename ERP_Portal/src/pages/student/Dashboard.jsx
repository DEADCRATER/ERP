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

  const [application, setApplication] = useState(false);
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

      const [appRes] = await Promise.all([
        api.get(`/student/application/${id}`).catch(() => ({ data: { profile: { isSubmitted: false } } })),
      ]);

      const prof = appRes.data;
      console.log('Fetched Profile:', prof);
      setStep((prof?.profile?.applicationStep ));
      console.log('Setting step to:', prof?.profile?.applicationStep );
      setFormData(prev => ({
        ...prev,
        aadhar: prof.aadhar
      }));

      if (prof?.profile?.studentDetails?.isSubmitted || prof?.profile?.studentDetails?.applicationStatus === 'PENDING') {
       setIsSubmitted(true);
        setApplication(true);
        // Ensure formData is also populated just in case they need to correct later
        if (prof) {
          setFormData(prev => ({
            ...prev,
            ...prof,
            ...(prof.education || {}), // Flatten education fields for components
            dob: prof.dob ? prof.dob.split('T')[0] : '',
            departmentId: prof.departmentId?._id || prof.departmentId || ''
          }));
        }
      } else {
        setStep(prof?.applicationStep || 1);
        if (prof) {
          setFormData(prev => ({
            ...prev,
            ...prof,
            ...(prof.education || {}), // Flatten education fields for components
            dob: prof.dob ? prof.dob.split('T')[0] : '',
            departmentId: prof.departmentId?._id || prof.departmentId || ''
          }));
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    const demoData = {
      regNo: 'P2333534010',
      enrollmentNumber: 'G551A23',
      name: 'PREM SINGHANIA',
      fatherName: 'RAM KUMAR SINGH',
      motherName: 'SANJU KUMARI',
      dob: '2006-02-22',
      gender: 'MALE',
      category: 'BC',
      domicile: 'Bihar',
      email: 'premsinghania006@gmail.com',
      mobile: '8409930618',
      nationality: 'Indian',
      aadhar: '758476320337',
      address: 'VILL-KAMLADARI PO-KAMLADARI PS-JAYNAGAR, MADHUBANI, JAYNAGAR',
      state: 'BIHAR',
      district: 'MADHUBANI',
      pinCode: '847226',
      country: 'India',
      tenthBoard: 'BSEB PATNA',
      tenthYear: '2021',
      tenthPercentage: '56.6',
      twelfthBoard: 'BSEB PATNA',
      twelfthYear: '2023',
      twelfthMarks: '315',
      twelfthTotalMarks: '500',
      twelfthPercentage: '63.00',
      chemistryMarks: '56',
      mathBioMarks: '68',
      physicsMarks: '68',
      lastCourse: 'INTERMEDIATE',
      lastSchool: 'H.M.Y.J.K.B.V. COLLEGE KAMLADARI JAYNAGAR MADHUBANI',
      fee: '2500',
      transactionDate: '12-02-2026 11:55 am',
      paymentId: 'cpayment_52300',
      transactionId: '114205858636',
      applicationStatus: 'PENDING',
      isSubmitted: true
    };

    setFormData(demoData);
    setApplication(demoData);
    setIsSubmitted(true);
    setIsCorrecting(false);
  };

  const handleNextStep = async () => {
    setSaving(true);
    try {
      if (step === 1) {
        const res = await api.put('/student/application/step1', formData);
        if (res.status === 200) {
          setIsSubmitted(true);
        }
      } else if (step === 2) {
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

        // ✅ NEW LOGIC
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
      } else if (step === 3) {
        const step3Data = new FormData();
        Object.keys(files).forEach(key => {
          if (files[key] && !['tenthMarkSheet', 'twelfthMarkSheet'].includes(key)) {
            step3Data.append(key, files[key]);
          }
        });
        await api.put('/student/application/step3', step3Data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving progress');
    } finally {
      setSaving(false);
    }
  };

  const finalSubmit = async () => {
    if (!window.confirm("Are you sure? No changes can be made after submission.")) return;
    setSaving(true);
    try {
      // Step 4: Save payment details
      await api.put('/student/application/step4', {
        transactionDate: formData.transactionDate,
        paymentId: formData.paymentId,
        transactionId: formData.transactionId,
        feeAmount: formData.fee
      });

      // Final Submit
      await api.post('/student/application/submit', {});

      setIsSubmitted(true);
      setIsCorrecting(false);
      window.scrollTo(0, 0);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error submitting application');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Loading Application Data...</div>;

  // New Redesigned Status View 
  if (isSubmitted &&  application) {
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Registration Portal</h1>
          <p className="text-gray-500 font-medium mt-1">Complete your profile to generate enrollment details.</p>
        </div>
        <button onClick={loadDemoData} className="group flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm">
          <svg className="w-4 h-4 text-blue-500 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Load Demo Data (For Testing)
        </button>
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
        {step === 1 && <BasicDetails data={formData} setData={setFormData} onNext={handleNextStep} />}
        {step === 2 && <AcademicDetails data={formData} setData={setFormData} onNext={handleNextStep} onBack={() => setStep(1)} />}
        {step === 3 && <DocumentUploads data={formData} files={files} setFiles={setFiles} onNext={handleNextStep} onBack={() => setStep(2)} />}
        {step === 4 && <FeesPayment data={formData} setData={setFormData} onFinalSubmit={finalSubmit} onBack={() => setStep(3)} saving={saving} />}
      </div>

      {/* <footer className="mt-20 text-center border-t pt-8">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Powered by Antigravity ERP Framework v2.0</p>
      </footer> */}
    </div>
  );
};

export default Dashboard;
