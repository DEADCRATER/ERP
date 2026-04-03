import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import api from '../../lib/axios';

const AddPrincipalModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    collegeName: '', collegeCode: '', collegeEmail: '', collegePhone: '', collegeAddress: '', collegeWebsite: '',
    adminName: '', adminRole: 'PRINCIPAL', adminEmail: '', adminPhone: '',
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const collegeRes = await api.post(
        '/super-admin/college-admins',
        {
          collegeName: formData.collegeName,
          collegeCode: formData.collegeCode,
          collegeEmail: formData.collegeEmail,
          collegePhone: formData.collegePhone,
          collegeAddress: formData.collegeAddress,
          collegeWebsite: formData.collegeWebsite,
          adminName: formData.adminName,
          adminEmail: formData.adminEmail,
          adminPhone: formData.adminPhone,
          adminRole: formData.adminRole,
        }
      );

  } catch (err) {
    console.error("Error creating institute/principal:", err);
    alert("Failed to create institute and principal. Please try again.");
    return;
  }

  console.log("New Institute/Principal Created:", formData);

  setFormData({
    collegeName: '',
    collegeCode: '',
    collegeEmail: '',
    collegePhone: '',
    collegeAddress: '',
    collegeWebsite: '',
    adminName: '',
    adminRole: 'PRINCIPAL',
    adminEmail: '',
    adminPhone: '',
  });

  onClose();
};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('superAdmin.registerInstitute', 'Register New Institute & Principal')} maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col relative h-[75vh] md:h-auto md:max-h-[80vh]">
        {/* Scrollable Form Content */}
        <div className="space-y-8 overflow-y-auto pr-2 pb-6 px-1">
          {/* Section 1: Basic College Information */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-5">{t('superAdmin.basicCollegeInfo', '1. Basic College Information')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.collegeName', 'College Name')} *</label>
                <Input required type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="e.g. Institute of Technology" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.collegeCode', 'College Code')}</label>
                <Input type="text" name="collegeCode" value={formData.collegeCode} onChange={handleChange} placeholder="e.g. INST-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.officialEmail', 'Official Email')} *</label>
                <Input required type="email" name="collegeEmail" value={formData.collegeEmail} onChange={handleChange} placeholder="contact@college.edu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.phoneNumber', 'Phone Number')} *</label>
                <Input required type="tel" name="collegePhone" value={formData.collegePhone} onChange={handleChange} placeholder="+1 234 567 8900" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.address', 'Address (City, State, Pincode)')} *</label>
                <Input required type="text" name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} placeholder="123 University Blvd, City, State 12345" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.website', 'Website (Optional)')}</label>
                <Input type="url" name="collegeWebsite" value={formData.collegeWebsite} onChange={handleChange} placeholder="https://www.college.edu" />
              </div>
            </div>
          </div>

          {/* Section 2: Admin Details */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-5">{t('superAdmin.adminDetailsSection', '2. Admin / Contact Person Details')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.fullName', 'Full Name')} *</label>
                <Input required type="text" name="adminName" value={formData.adminName} onChange={handleChange} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.role', 'Role')} *</label>
                <select name="adminRole" value={formData.adminRole} onChange={handleChange} className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-white">
                  <option value="PRINCIPAL">{t('superAdmin.rolePrincipal', 'Principal')}</option>
                  <option value="ADMIN">{t('superAdmin.roleAdmin', 'Admin')}</option>
                  <option value="WARDEN">{t('superAdmin.roleWarden', 'Warden')}</option>
                  <option value="STAFF">{t('superAdmin.roleStaff', 'Staff')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.loginEmail', 'Login Email')} *</label>
                <Input required type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} placeholder="jane.doe@college.edu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('superAdmin.phoneNumber', 'Phone Number')} *</label>
                <Input required type="tel" name="adminPhone" value={formData.adminPhone} onChange={handleChange} placeholder="+1 987 654 3210" />
              </div>
              
            </div>
          </div>
          
          
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="pt-5 pb-1 flex justify-end space-x-3 border-t border-gray-200 bg-white mt-2">
          <Button type="button" onClick={onClose} className="bg-white! text-gray-700! border border-gray-300 hover:bg-gray-50!">
            Cancel
          </Button>
          <Button type="submit">
            {t('superAdmin.createCollegeAccount', 'Create College Account')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPrincipalModal;
