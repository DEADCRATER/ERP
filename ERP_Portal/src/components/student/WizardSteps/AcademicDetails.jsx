import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/Button';
import educationBoards from '../../../data/educationboards';
import api from '../../../lib/axios';

const AcademicDetails = ({ data, setData, onNext, onBack }) => {
  const inputStyle = "no-spinner mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm transition";
  const labelStyle = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1";
  const [availableCourses, setAvailableCourses] = useState([]);
  
  const FetchCourses = async () => {
    try {
      const res = await api.get('/student/collegesbranch');
      setAvailableCourses(res.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  useEffect(() => {
    // Fetch courses/branches from backend
    FetchCourses();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleFillData = () => {
    setData({
      ...data,
      tenthBoard: "CBSE",
      tenthYear: "2021",
      tenthPercentage: "56.6",
      twelfthBoard: "CBSE",
      twelfthYear: "2023",
      twelfthPercentage: "63.00",
      twelfthTotalMarks: "500",
      twelfthMarks: "315",
    });
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">P</span>
          Program Selection
        </h3>
        <div className="mb-6">
          <label className={labelStyle}>Course Applying For <span className="text-red-500">*</span></label>
          <select 
            name="departmentId" 
            required 
            className={inputStyle} 
            value={data.departmentId || ''} 
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedCourse = availableCourses.find(c => c._id === selectedId);
              setData({ 
                ...data, 
                departmentId: selectedId,
                Course: selectedCourse ? selectedCourse.name : '' 
              });
            }}
          >
            <option value="">Select a Course</option>
            {availableCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 italic">Please select the academic program you are applying for.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">

        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
          10th Standard Qualification
        </h3>
        {/* <Button variant="outline" size="sm" className="mb-4" onClick={handleFillData}>
          <span className="text-xs">Fill Data</span>
        </Button> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className={labelStyle}>Board Name</label>
            <select name="tenthBoard" required className={inputStyle} value={data.tenthBoard || ''} onChange={handleChange}>
              <option value="">Select Board</option>
              {educationBoards.map((board) => (
                <option key={board.id} value={board.name}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Passing Year</label>
            <input name="tenthYear" type="text" required className={inputStyle} value={data.tenthYear || ''} onChange={handleChange} placeholder="2021" maxLength={4} minLength={4} pattern="\d{4}" title="Must be a 4-digit year" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div>
              <label className={labelStyle}>Total Marks</label>
              <input name="tenthTotalMarks" type="number" min="0" required className={inputStyle} value={data.tenthTotalMarks || ''} onChange={handleChange} placeholder="500" />
            </div>
            <div>
              <label className={labelStyle}>Marks Obtained</label>
              <input name="tenthMarks" type="number" min="0" required className={inputStyle} value={data.tenthMarks || ''} onChange={handleChange} placeholder="315" />
            </div>
          </div>
          <div>
            <label className={labelStyle}>Percentage (%)</label>
            <input name="tenthPercentage" type="number" min="0" max="100" step="0.01" required className={inputStyle} value={data.tenthPercentage || ''} onChange={handleChange} placeholder="56.6" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2 flex items-center gap-2">
          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
          12th Standard Qualification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className={labelStyle}>Board Name</label>
            <select name="twelfthBoard" required className={inputStyle} value={data.twelfthBoard || ''} onChange={handleChange}>
              <option value="">Select Board</option>
              {educationBoards.map((board) => (
                <option key={board.id} value={board.name}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyle}>Passing Year</label>
            <input name="twelfthYear" type="text" required className={inputStyle} value={data.twelfthYear || ''} onChange={handleChange} placeholder="2023" maxLength={4} minLength={4} pattern="\d{4}" title="Must be a 4-digit year" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div>
              <label className={labelStyle}>Total Marks</label>
              <input name="twelfthTotalMarks" type="number" min="0" required className={inputStyle} value={data.twelfthTotalMarks || ''} onChange={handleChange} placeholder="500" />
            </div>
            <div>
              <label className={labelStyle}>Marks Obtained</label>
              <input name="twelfthMarks" type="number" min="0" required className={inputStyle} value={data.twelfthMarks || ''} onChange={handleChange} placeholder="315" />
            </div>
          </div>
          <div>
            <label className={labelStyle}>Percentage (%)</label>
            <input name="twelfthPercentage" type="number" min="0" max="100" step="0.01" required className={inputStyle} value={data.twelfthPercentage || ''} onChange={handleChange} placeholder="63.00" />
          </div>
        </div>

        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 border-dashed border-gray-200">
           <div>
             <label className={labelStyle}>Physics Marks</label>
             <input name="physicsMarks" type="number" required className={inputStyle} value={data.physicsMarks || ''} onChange={handleChange} />
           </div>
           <div>
             <label className={labelStyle}>Chemistry Marks</label>
             <input name="chemistryMarks" type="number" required className={inputStyle} value={data.chemistryMarks || ''} onChange={handleChange} />
           </div>
           <div>
             <label className={labelStyle}>Math/Biology Marks</label>
             <input name="mathBioMarks" type="number" required className={inputStyle} value={data.mathBioMarks || ''} onChange={handleChange} />
           </div>
        </div>*/}
      </div> 

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="text-gray-600 font-bold hover:text-gray-900 transition flex items-center gap-2">
           &larr; Back
        </button>
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Save & Continue &rarr;
        </button>
      </div>
    </form>
  );
};

export default AcademicDetails;
