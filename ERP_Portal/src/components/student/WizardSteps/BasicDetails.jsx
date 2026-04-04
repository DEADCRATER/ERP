import React from 'react';
import states from '../../../data/state';
import { Button } from '../../ui/Button';
const BasicDetails = ({ data, setData, onNext, savedProfile }) => {
  const inputStyle = "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm transition disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";
  const labelStyle = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1";


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleFillData = () => {
    setData({
      ...data,
      name: "John Doe",
      fatherName: "Father Name",
      motherName: "Mother Name",
      dob: "2000-01-01",
      gender: "MALE",
      category: "GENERAL",
      aadhar: "123456789012",
      address: "123 Main Street, City, Bihar, 123456",
      district: "Madhubani",
      pinCode: "123456",
      country: "India",
      state: "Bihar",
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
          Personal Information
        </h3>
        {/* <Button variant="outline" size="sm" className="mb-4" onClick={handleFillData}>
          <span className="text-xs">Fill Data</span>
        </Button> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Full Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className={inputStyle} 
              value={data.name || ''} 
              onChange={handleChange} 
              placeholder="Full Name" 
              disabled={!!savedProfile?.name} 
              title={savedProfile?.name ? "Name cannot be changed once saved" : "Only letters and spaces allowed"}
              pattern="[A-Za-z\s]+"
            />
          </div>

          <div>
            <label className={labelStyle}>Father's Name</label>
            <input name="fatherName" type="text" required className={inputStyle} value={data.fatherName || ''} onChange={handleChange} placeholder="Father's Name" pattern="[A-Za-z\s]+" title="Only letters and spaces allowed" />
          </div>
          <div>
            <label className={labelStyle}>Mother's Name</label>
            <input name="motherName" type="text" required className={inputStyle} value={data.motherName || ''} onChange={handleChange} placeholder="Mother's Name" pattern="[A-Za-z\s]+" title="Only letters and spaces allowed" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Date of Birth</label>
              <input name="dob" type="date" required className={inputStyle} value={data.dob || ''} onChange={handleChange} />
            </div>
            <div>
              <label className={labelStyle}>Gender</label>
              <select name="gender" required className={inputStyle} value={data.gender || ''} onChange={handleChange}>
                <option value="">Select</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelStyle}>Category</label>
            <select name="category" required className={inputStyle} value={data.category || ''} onChange={handleChange}>
              <option value="">ategory</option>
              <option value="GENERAL">GENERAL</option>
              <option value="BC">BC</option>
              <option value="EBC">EBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Aadhar Number</label>
            <input name="aadhar" type="text" required className={inputStyle} value={data.aadhar || ''} onChange={handleChange} placeholder="Aadhar Number" maxLength={12} minLength={12} pattern="\d{12}" title="Must be exactly 12 digits" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Address Details
        </h3>
        <div className="space-y-6">
          <div>
            <label className={labelStyle}>Permanent Address</label>
            <textarea name="address" required rows={3} className={inputStyle} value={data.address || ''} onChange={handleChange} placeholder="" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className={labelStyle}>State</label>
              <select name="state" required className={inputStyle} value={data.state || ''} onChange={handleChange}>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelStyle}>District</label>
              <input name="district" type="text" required className={inputStyle} value={data.district || ''} onChange={handleChange} placeholder="Madhubani" pattern="[A-Za-z\s]+" title="Only letters and spaces allowed" />
            </div>
            <div>
              <label className={labelStyle}>Pin Code</label>
              <input name="pinCode" type="text" required className={inputStyle} value={data.pinCode || ''} onChange={handleChange} placeholder="Pin Code" maxLength={6} minLength={6} pattern="\d{6}" title="Must be exactly 6 digits" />
            </div>
            <div>
              <label className={labelStyle}>Country</label>
              <input name="country" type="text" required className={inputStyle} value={data.country || 'India'} onChange={handleChange} pattern="[A-Za-z\s]+" title="Only letters and spaces allowed" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Save & Continue &rarr;
        </button>
      </div>
    </form>
  );
};

export default BasicDetails;
