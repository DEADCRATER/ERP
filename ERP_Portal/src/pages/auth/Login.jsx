import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PRINCIPAL');

  const executeLogin = async (loginEmail, loginPassword, loginRole) => {
    try {
      await login({ email: loginEmail, password: loginPassword, role: loginRole });
      if (loginRole === 'SUPER_ADMIN') navigate('/super-admin/dashboard');
      else if (loginRole === 'PRINCIPAL') navigate('/principal/dashboard');
      else if (loginRole === 'STUDENT') navigate('/student/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeLogin(email, password, role);
  };

  const handleTestCredentials = (e) => {
  e.preventDefault();

  let testEmail = "";
  let testPassword = "123456";

  if (role === 'SUPER_ADMIN') {
    testEmail = 'test@erp.com';
  } else if (role === 'PRINCIPAL') {
    testEmail = 'bhavesh@erp.com';
  } else if (role === 'STUDENT') {
    testEmail = 'test2@gmail.com';
  }

  setEmail(testEmail);
  setPassword(testPassword);

  // ✅ Use direct values
  executeLogin(testEmail, testPassword, role);
};

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-gray-900 h-full w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-2 text-center sm:text-left">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            {t('home', 'Home')}
          </Link>
        </div>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-gray-900">
          {t('welcome', 'Welcome Back')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('subtitle', 'Log in to your ERP Portal')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email', 'Email Address')}
              </label>
              <div className="mt-1">
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder={t('emailPlaceholder', 'you@example.com')} className="block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password', 'Password')}
              </label>
              <div className="mt-1">
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder={t('passwordPlaceholder', '••••••••')} className="block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                {t('role', 'Select Role')}
              </label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm">
                <option value="PRINCIPAL">Principal</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">{t('rememberMe', 'Remember me')}</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-600 hover:text-gray-900">{t('forgotPassword', 'Forgot password?')}</a>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded border border-transparent bg-gray-900 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors">
                {t('signIn', 'Sign In')}
              </button>
            </div>
          </form>

          {/* Test Credentials Section */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <button 
              onClick={handleTestCredentials}
              type="button" 
              className="flex w-full justify-center rounded border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Use Test Credentials (Auto Login)
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            {t('noAccount', "Don't have an account?")}{' '}
            <Link to="/register" className="font-medium text-gray-900 hover:underline">
              {t('register', 'Register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
