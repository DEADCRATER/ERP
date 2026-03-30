import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../lib/axios';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const CreatePassword = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('createPassword.pwdMismatch', 'Passwords do not match'));
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Endpoint adapted for password creation logic
      await api.post('/auth/create-password', { token, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Failed to create password:', err);
      setError(err.response?.data?.message || t('createPassword.error', 'Failed to create password. The link might be expired.'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-gray-900 h-full w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow-sm sm:rounded-lg text-center border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('createPassword.successTitle', 'Password Created')}</h2>
          <p className="text-gray-600 mb-6">{t('createPassword.successDesc', 'Your password has been set successfully. You will be redirected to the login page shortly.')}</p>
          <Button onClick={() => navigate('/login')} className="w-full text-center flex justify-center">{t('createPassword.goToLogin', 'Go to Login')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-gray-900 h-full w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-gray-900">
          {t('createPassword.title', 'Create Your Password')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('createPassword.subtitle', 'Set up a secure password to access your ERP Principal account')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('createPassword.newPassword', 'New Password')}
              </label>
              <Input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('createPassword.confirmPassword', 'Confirm Password')}
              </label>
              <Input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center" disabled={loading}>
                {loading ? t('createPassword.saving', 'Saving...') : t('createPassword.submit', 'Set Password')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
