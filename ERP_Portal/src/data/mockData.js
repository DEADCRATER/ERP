// Mongoose Schema Synced Mock Data
export const dummyColleges = [
  { _id: "64a2b1c3e4d5f6g7h8i9j0k1", collegeName: "National Institute of Tech", collegeCode: "NIT-01", collegeEmail: "admin@nit.edu", collegePhone: "1234567890", collegeAddress: "Tech Park, City", isActive: true },
  { _id: "64a2b1c3e4d5f6g7h8i9j0k2", collegeName: "State University", collegeCode: "SU-02", collegeEmail: "info@su.edu", collegePhone: "0987654321", collegeAddress: "University Road, Downtown", isActive: true }
];

export const dummyDepartments = [
  // ✅ Your MongoDB data
  {
    _id: "69cad3382605ba57c3df0f19",
    name: "Diploma In Medical Laboratory Technician",
    totalSeats: 60,
    collegeId: "69c83135aa8978206dad09ee"
  },
  {
    _id: "69cad3532605ba57c3df0f1d",
    name: "Diploma in Anaesthesia Technology / O.T. Assistant",
    totalSeats: 60,
    collegeId: "69c83135aa8978206dad09ee"
  },
  {
    _id: "69cad3972605ba57c3df0f23",
    name: "Diploma in Medical Radiology Technology / X-Ray Technician / Radio Imaging",
    totalSeats: 60,
    collegeId: "69c83135aa8978206dad09ee"
  }
];

export const dummyUsers = [
  { _id: "64d5e4f6g7h8i9j0k1l2m3n1", name: "Super Admin", email: "admin@erp.com", role: "SUPER_ADMIN", phone: "9999999999", isVerified: true },
  { _id: "64d5e4f6g7h8i9j0k1l2m3n2", name: "Principal NIT", email: "principal@erp.com", role: "PRINCIPAL", collegeId: "69c83135aa8978206dad09ee", phone: "8888888888", isVerified: true },
  { _id: "64d5e4f6g7h8i9j0k1l2m3n4", name: "Arjun Kumar", email: "studentverified@erp.com", role: "STUDENT", collegeId: "64a2b1c3e4d5f6g7h8i9j0k1", studentDetails: "64c4d3e5f6g7h8i9j0k1l2m3", phone: "9876543210", isVerified: true },
  { _id: "64d5e4f6g7h8i9j0k1l2m3n5", name: "Priya Sharma", email: "studentunverified.com", role: "STUDENT", collegeId: "64a2b1c3e4d5f6g7h8i9j0k1", studentDetails: "64c4d3e5f6g7h8i9j0k1l2m4", phone: "9876543211", isVerified: true }
];



export const dummyStudentverifiedDetails = [
  // Existing mock data
  {
    _id: "64c4d3e5f6g7h8i9j0k1l2m3",
    user: "64d5e4f6g7h8i9j0k1l2m3n4",
    enrollmentNumber: "ENR-2026-001",
    applicationNumber: "APP-2026-001",
    semester: 1,
    name: "Arjun Kumar",
    fatherName: "Rajesh Kumar",
    motherName: "Sunita Devi",
    dob: new Date("2003-05-15").toISOString(),
    gender: "MALE",
    category: "GENERAL",
    domicile: "State",
    nationality: "Indian",
    aadhar: "123456789012",
    email: "arjun@example.com",
    mobile: "9876543210",
    collegeId: "64a2b1c3e4d5f6g7h8i9j0k1",
    Course: { _id: "64b3c2d4e5f6g7h8i9j0k1l2", name: "Computer Science" },
    address: "123 Main St, City",
    state: "State",
    district: "District",
    pinCode: "123456",
    country: "India",
    education: {},
    documents: {},
    media: {},
    feeAmount: "2500",
    transactionStatus: "SUCCESS",
    transactionId: "TXN123456",
    applicationStep: 5,
    isSubmitted: true,
    applicationStatus: "APPROVED",
    academicStatus: "ACTIVE"
  },

  // ✅ YOUR MONGO DATA (converted)
  {
    _id: "69c5b8cacb7af03c9dadc245",
    user: "69c5b8cacb7af03c9dadc243",
    enrollmentNumber: "1234",
    applicationNumber: "123",
    semester: 1,

    name: "bhaves",
    fatherName: "bhavesh",
    motherName: "bhavesh",

    dob: new Date("0001-01-01").toISOString(),
    gender: "MALE",
    category: "GENERAL",
    domicile: "",
    nationality: "Indian",

    aadhar: "12345654321",
    email: "",
    mobile: "11111",

    collegeId: "69c83135aa8978206dad09ee",
    Course: {
      _id: "69cad3382605ba57c3df0f19",
      name: "Diploma In Medical Laboratory Technician"
    },

    address: "124123",
    state: "Bihar",
    district: "asdasd",
    pinCode: "123455",
    country: "India",

    education: {},
    documents: {},
    media: {},

    feeAmount: "2500",
    transactionStatus: "PENDING",
    transactionId: "1111",
    paymentId: "1111",
    transactionDate: "1111",

    submissionDate: "2026-03-30T17:02:15.521Z",

    applicationStep: 5,
    isSubmitted: true,
    applicationStatus: "APPROVED",
    academicStatus: "ACTIVE"
  }
];

export const dummyUnverifiedStudent = {
  _id: "69c5b8cacb7af03c9dadc999",
  user: "69c5b8cacb7af03c9dadc998",

  enrollmentNumber: "",
  applicationNumber: "APP-2026-010",
  semester: 1,

  name: "Rahul Verma",
  fatherName: "Suresh Verma",
  motherName: "Kavita Verma",

  dob: new Date("2004-08-10").toISOString(),
  gender: "MALE",
  category: "OBC",
  domicile: "State",
  nationality: "Indian",

  aadhar: "987654321098",
  email: "rahul@example.com",
  mobile: "9123456780",

  collegeId: "69c83135aa8978206dad09ee",
  Course: {
    _id: "69cad3532605ba57c3df0f1d",
    name: "Diploma in Anaesthesia Technology / O.T. Assistant"
  },

  address: "Village XYZ",
  state: "Uttar Pradesh",
  district: "Lucknow",
  pinCode: "226001",
  country: "India",

  education: {},
  documents: {},   // ❌ Missing docs (reason for unverified)
  media: {},

  feeAmount: "0",
  transactionStatus: "PENDING",
  transactionId: "",

  applicationStep: 2,   // ❗ Not completed
  isSubmitted: false,

  applicationStatus: "PENDING",   // 🔥 KEY FIELD
  academicStatus: "INACTIVE"
};
// Derived format for backward compatibility with older ui table maps
export const dummyCourseStats = dummyDepartments.map((dept, index) => ({
  id: index + 1,
  _id: dept._id,
  courseName: `B.Tech ${dept.name}`,
  department: dept.name,
  totalStudents: Math.floor(dept.totalSeats * 0.8),
  capacity: dept.totalSeats
}));

const allStudentDetails = [...dummyStudentverifiedDetails, dummyUnverifiedStudent];

export const dummyStudents = allStudentDetails.map((sd, i) => ({
  id: i + 1,
  _id: sd._id,
  name: sd.name,
  rollNo: sd.enrollmentNumber || sd.applicationNumber,
  course: sd.Course?.name || "Unknown",
  status: sd.applicationStatus,
  ...sd
}));

