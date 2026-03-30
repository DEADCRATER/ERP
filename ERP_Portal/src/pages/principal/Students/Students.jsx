import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../../../components/ui/Card";
import api from "../../../lib/axios";

const Students = () => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState(null); // 'reject' or 'request'
  const [reasonNote, setReasonNote] = useState("");

  const handleViewStudent = async (student) => {
    // Commented Axios logic for API integration:
    /*
    try {
      // const res = await api.get(`/principal/students/${student._id || student.rollNo}`);
      // setSelectedStudent(res.data.data); // Assuming the API returns the full details in res.data.data
    } catch (error) {
      console.error("Failed to fetch student details", error);
    }
    */
    
    // Using dummy data merged with selected student for now
    setSelectedStudent({
      ...student,
      photograph: "https://ui-avatars.com/api/?name=" + (student.user?.name || "Student") + "&size=150&background=random",
      address: "123 Main Street, Tech Park, Silicon Valley, CA 94025",
      branch: student.course || "Computer Science",
      dob: "2002-05-15",
      email: student.user?.name ? `${student.user.name.toLowerCase().replace(' ', '.')}@example.com` : "student@example.com",
      phone: "+1 987 654 3210",
      bloodGroup: "O+",
      guardianName: "Robert Doe",
      admissionDate: "2023-08-01",
    });
    setIsModalOpen(true);
  };

  const handleApprove = async () => {
    // Commented Axios logic:
    // try {
    //   await api.post(`/principal/students/${selectedStudent._id || selectedStudent.rollNo}/approve`);
    //   alert(`Student approved successfully`);
    //   // Update local state or re-fetch
    // } catch (error) {
    //   console.error("Failed to approve student", error);
    // }
    alert(`Approved student ${selectedStudent.user?.name || selectedStudent.name}`);
    
    // Close and reset
    setIsModalOpen(false);
    setActionStatus(null);
    setReasonNote("");
  };

  const handleActionWithNote = async (actionType) => {
    if (!reasonNote.trim()) {
      alert("Please provide a reason or note for the student.");
      return;
    }
    
    // Commented Axios logic:
    // const endpoint = actionType === 'reject' ? 'reject' : 'request-details';
    // try {
    //   await api.post(`/principal/students/${selectedStudent._id || selectedStudent.rollNo}/${endpoint}`, { 
    //     reason: reasonNote 
    //   });
    //   alert(`Student ${actionType === 'reject' ? 'rejected' : 'details requested'} successfully`);
    //   // Update local state or re-fetch
    // } catch (error) {
    //   console.error(`Failed to ${endpoint} student`, error);
    // }
    
    alert(`${actionType === 'reject' ? 'Rejected' : 'Requested details for'} student ${selectedStudent.user?.name || selectedStudent.name} with note: ${reasonNote}`);
    
    // Close and reset
    setIsModalOpen(false);
    setActionStatus(null);
    setReasonNote("");
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const res = await api.get("/principal/students");
        const res = {
          data: [
            {
              user: {
                name: "John Doe",
              },
              rollNo: "1",
              course: "Computer Science",
              status: "Active",
            },
            {
              user: {
                name: "Jane Doe",
              },
              rollNo: "2",
              course: "Mechanical Engineering",
              status: "Active",
            },
          ],
        };
        setStudents(res.data);
        const uniqueCourses = [...new Set(res.data.map((s) => s.course))];
        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents =
    selectedCourse === "All"
      ? students
      : students.filter((s) => s.course === selectedCourse);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {t("principal.studentsTitle", "Student Directory")}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {t(
              "principal.studentsDesc",
              "View and manage all enrolled students in your institution.",
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {t("principal.filterByCourse", "Filter by Course")}:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-white"
          >
            <option value="All">
              {t("principal.allCoursesOption", "All Courses")}
            </option>
            {courses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">
                  {t("principal.studentName", "Student Name")}
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900">
                  {t("principal.rollNo", "Roll No")}
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900">
                  {t("principal.course", "Course")}
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900">
                  {t("principal.status", "Status")}
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">
                  {t("principal.actions", "Actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student._id || student.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {student.user?.name || student.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.course}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {student.status
                          ? t(
                              `superAdmin.${student.status.toLowerCase()}`,
                              student.status,
                            )
                          : "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {/* <button className="text-gray-600 hover:text-gray-900 font-medium">{t('principal.view', 'View')}</button> */}
                      <button
                        className="text-gray-600 hover:text-gray-900 font-medium"
                        onClick={() => handleViewStudent(student)}
                      >
                        {t('principal.view', 'View')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No students found for this course.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Details Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm print:bg-white print:block print:p-0 print:z-99999">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto print:shadow-none print:max-w-none print:max-h-none print:overflow-visible">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {t("principal.studentDetailsTitle", "Student Details")}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setActionStatus(null);
                  setReasonNote("");
                }}
                className="text-gray-400 hover:text-gray-700 transition-colors print:hidden"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8 print:p-0">
              {/* College Header for Print */}
              <div className="hidden print:block text-center border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900">Institute of Technology & Science</h1>
                <p className="text-sm text-gray-600 uppercase font-semibold mt-1">Student Verification & Enrollment Record</p>
              </div>

              <div className="flex flex-col sm:flex-row-reverse justify-between gap-8 mb-6">
                {/* Photograph Section (Right side) */}
                <div className="shrink-0 flex flex-col items-center space-y-3">
                  <div className="w-32 h-40 border-2 border-gray-400 p-1 bg-white shadow-sm print:shadow-none print:border-gray-800">
                    <img
                      src={selectedStudent.photograph}
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center print:hidden">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedStudent.status === "Active" ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>

                {/* Details Table (Left side) */}
                <div className="grow">
                  <table className="w-full text-sm text-left border-collapse border border-gray-300 print:border-gray-800">
                    <tbody>
                      <tr>
                        <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/3 md:w-1/4 uppercase text-xs tracking-wider">{t("principal.fullName", "Full Name")}</th>
                        <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900 font-bold uppercase">{selectedStudent.user?.name || selectedStudent.name || "N/A"}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/3 md:w-1/4 uppercase text-xs tracking-wider">{t("principal.rollNo", "Roll No")}</th>
                        <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900 font-bold uppercase">{selectedStudent.rollNo}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/3 md:w-1/4 uppercase text-xs tracking-wider">{t("principal.course", "Course/Program")}</th>
                        <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.course}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/3 md:w-1/4 uppercase text-xs tracking-wider">{t("principal.branch", "Branch")}</th>
                        <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.branch}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/3 md:w-1/4 uppercase text-xs tracking-wider">{t("principal.dob", "Date of Birth")}</th>
                        <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.dob}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/3 md:w-1/4 uppercase text-xs tracking-wider">{t("principal.bloodGroup", "Blood Group")}</th>
                        <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.bloodGroup}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Extended Details Table */}
              <table className="w-full text-sm text-left border-collapse border border-gray-300 print:border-gray-800 mt-4">
                <tbody>
                  <tr>
                    <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/4 md:w-1/5 uppercase text-xs tracking-wider">{t("principal.guardianName", "Guardian Name")}</th>
                    <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.guardianName}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/4 md:w-1/5 uppercase text-xs tracking-wider">{t("principal.email", "Email Address")}</th>
                    <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.email}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/4 md:w-1/5 uppercase text-xs tracking-wider">{t("principal.phone", "Phone Number")}</th>
                    <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.phone}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 border border-gray-300 print:border-gray-800 bg-gray-50 print:bg-transparent text-gray-900 font-semibold w-1/4 md:w-1/5 uppercase text-xs tracking-wider">{t("principal.address", "Residential Address")}</th>
                    <td className="px-4 py-3 border border-gray-300 print:border-gray-800 text-gray-900">{selectedStudent.address}</td>
                  </tr>
                </tbody>
              </table>
              
              {/* Signature Section for Print */}
              <div className="hidden print:flex justify-between items-end mt-24 px-8">
                  <div className="text-center">
                      <div className="border-b-2 border-gray-800 w-48 mb-2"></div>
                      <p className="font-semibold text-xs tracking-wider uppercase text-gray-900">Student Signature</p>
                  </div>
                  <div className="text-center">
                      <div className="border-b-2 border-gray-800 w-48 mb-2"></div>
                      <p className="font-semibold text-xs tracking-wider uppercase text-gray-900">Auth Signature / Seal</p>
                  </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl mt-auto print:hidden">
              {actionStatus ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {actionStatus === 'reject' ? "Reason for Rejection" : "Required Details / Note for Student"} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={reasonNote}
                      onChange={(e) => setReasonNote(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm px-3 py-2 outline-none"
                      placeholder={`Enter the reason or note to be sent to the student...`}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setActionStatus(null);
                        setReasonNote("");
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleActionWithNote(actionStatus)}
                      className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors ${actionStatus === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {actionStatus === 'reject' ? "Confirm Reject" : "Send Request"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    Status: <span className="font-semibold text-gray-700">{selectedStudent.status}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                      Print
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setActionStatus(null);
                        setReasonNote("");
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {t("principal.close", "Close")}
                    </button>
                    
                    <button
                      onClick={() => setActionStatus('request')}
                      className="px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
                    >
                      Request Details
                    </button>
                    
                    <button
                      onClick={() => setActionStatus('reject')}
                      className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Reject
                    </button>
                    
                    <button
                      onClick={handleApprove}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
