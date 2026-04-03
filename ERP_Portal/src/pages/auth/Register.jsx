import React, { useState ,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [college, setCollege] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeCode: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchColleges = async () => {
    try {
      const response = await api.get('student/colleges');
      setCollege(response.data.data);
    } catch (err) {
      setError('Failed to fetch colleges');
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/student/register-step1', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        collegeCode: formData.collegeCode
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/student/verify-otp', {
        email: formData.email,
        otp: formData.otp
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    }
    setLoading(false);
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/student/setup-password', {
        email: formData.email,
        otp: formData.otp,
        password: formData.password
      });
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to setup password');
    }
    setLoading(false);
  };

  // Helper styles
  const inputTheme = "block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm";
  const btnTheme = "flex w-full justify-center rounded border border-transparent bg-gray-900 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors disabled:opacity-50";

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-gray-900 min-h-full w-full bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-2 text-center sm:text-left">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            {t('home', 'Home')}
          </Link>
        </div>
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
          Student Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Step {step} of 3
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-200">
          
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <form className="space-y-5" onSubmit={handleStep1}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange} required className={inputTheme} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputTheme} placeholder="student@university.edu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className={inputTheme} placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">College Code</label>
                <select name="collegeCode" value={formData.collegeCode} onChange={handleChange} required className={inputTheme}>
                  <option value="">Select a college</option>
                   <div className='flex items-center justify-center'>
                  {college.map((c) => (
                      <option key={c._id} value={c.collegeCode}>{c.collegeName} ({c.collegeCode})</option>
                  ))}
                   </div>
                </select>
              </div>
              <button type="submit" disabled={loading} className={btnTheme}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form className="space-y-5" onSubmit={handleStep2}>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 mb-4 text-center border border-gray-200">
                OTP sent to <span className="font-semibold">{formData.email}</span>
                <br/><button type="button" onClick={() => setStep(1)} className="text-gray-900 hover:underline mt-2 text-xs font-semibold">change email?</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter 6-digit OTP</label>
                <input name="otp" type="text" maxLength={6} value={formData.otp} onChange={handleChange} required className={`${inputTheme} text-center tracking-widest text-lg`} placeholder="------" />
              </div>
              <button type="submit" disabled={loading} className={btnTheme}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* STEP 3: Setup Password */}
          {step === 3 && (
            <form className="space-y-5" onSubmit={handleStep3}>
              <div className="p-4 bg-green-50 text-green-700 text-sm rounded border border-green-200 text-center font-medium">
                Email successfully verified!
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Set Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} required className={inputTheme} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className={inputTheme} />
              </div>
              <button type="submit" disabled={loading} className={btnTheme}>
                {loading ? 'Finalizing...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-6">
              <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
              <p className="text-sm text-gray-600 mb-8">
                Your application number and college details have been sent to your email. Check your inbox to view your registration confirmation.
              </p>
              <Link to="/login" className={btnTheme}>
                Go to Login
              </Link>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-100 pt-6">
              {t('alreadyHaveAccount', 'Already have an account?')} <Link to="/login" className="font-semibold text-gray-900 hover:underline">{t('signIn', 'Sign In')}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
