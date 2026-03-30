import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../lib/axios';

const StudentProfile = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/student/profile');
        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500 text-sm animate-pulse">Loading profile...</div>;
  }

  // Using fallback text inside useTranslation for rapid mocking without immediate strict JSON dependencies
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {t('sidebar.profile', 'My Profile')}
      </h1>
      <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
          {t('student.profileDetails', "View your personal profile details and academic standing below.")}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Student ID</h3>
            <p className="text-gray-900 font-medium">{profile?.rollNo || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Course</h3>
            <p className="text-gray-900 font-medium">{profile?.course || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Current Semester</h3>
            <p className="text-gray-900 font-medium">{profile?.currentSemester || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {profile?.status || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
