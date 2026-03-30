import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-4xl w-full bg-white border border-gray-200 shadow-sm p-10 sm:p-16 rounded sm:rounded-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t('homeTitle', 'Welcome to the Student Management ERP')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 mx-auto max-w-2xl leading-relaxed font-normal">
            {t('homeSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 text-base font-semibold rounded-md text-white bg-gray-900 border border-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors shadow-sm"
            >
              {t('getStarted', 'Get Started')}
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 text-base font-semibold rounded-md text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors shadow-sm"
            >
              {t('loginAccount', 'Log in to your account')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
