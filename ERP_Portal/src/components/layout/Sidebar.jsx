import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import superAdminSidebar from '../../config/sidebar/superAdminSidebar.json';
import principalSidebar from '../../config/sidebar/principalSidebar.json';
import studentSidebar from '../../config/sidebar/studentSidebar.json';
import AddDepartmentSidebar from '../principal/AddDepartmentSidebar';

// Icon map — matches the "icon" field in sidebar JSON files
const ICONS = {
  dashboard: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  users: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  documentReport: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  academicCap: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  cog: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  clipboardList: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  userGroup: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 714 0zM7 10a2 2 0 11-4 0 2 2 0 714 0z" />
    </svg>
  ),
  default: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  user: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  pencil: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  fees: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  const [deptSidebarOpen, setDeptSidebarOpen] = useState(false);

  const navItems = useMemo(() => {
    if (!user) return [];
    switch (user.role) {
      case 'SUPER_ADMIN': return superAdminSidebar;
      case 'PRINCIPAL': return principalSidebar;
      case 'STUDENT': return studentSidebar;
      default: return [];
    }
  }, [user]);

  return (
    <aside className="w-full md:w-56 shrink-0 flex flex-col md:h-full z-10 bg-gray-900">
      {/* Brand header */}
      <div className="hidden md:flex flex-col items-center justify-center px-4 py-5 border-b border-gray-700">
        <span className="text-white font-bold text-sm text-center leading-snug">
          {t('portalName', 'ERP Portal')}
        </span>
        <span className="text-gray-400 text-xs mt-0.5 text-center">
          {user?.role?.replace('_', ' ')}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 flex flex-row overflow-x-auto md:flex-col md:space-y-0.5 overflow-y-auto items-center md:items-stretch">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const icon = ICONS[item.icon] || ICONS.default;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                whitespace-nowrap md:whitespace-normal
                group flex items-center gap-3 px-3 py-2.5 mx-1 md:mx-0
                text-sm font-medium rounded-md transition-all duration-150
                ${isActive
                  ? 'bg-white/10 text-white border-l-4 border-white rounded-l-none'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent rounded-l-none'
                }
              `}
            >
              <span className={`shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                {icon}
              </span>
              <span className="truncate">{t(item.label)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Add Department button — Principal only */}
      {user?.role === 'PRINCIPAL' && (
        <div className="hidden md:block px-3 pb-2">
          <button
            onClick={() => setDeptSidebarOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-gray-300 border border-dashed border-gray-600 hover:border-white hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Department
          </button>
        </div>
      )}

      {/* Bottom user info */}
      {user && (
        <div className="hidden md:flex items-center gap-2 px-3 py-3 border-t border-gray-700">
          <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-semibold truncate">{user.name || 'User'}</p>
            <p className="text-gray-400 text-xs truncate">{user.email || ''}</p>
          </div>
        </div>
      )}

      {/* Add Department Slide-over */}
      <AddDepartmentSidebar
        isOpen={deptSidebarOpen}
        onClose={() => setDeptSidebarOpen(false)}
        onCreated={() => {}}
      />
    </aside>
  );
};

export default Sidebar;
