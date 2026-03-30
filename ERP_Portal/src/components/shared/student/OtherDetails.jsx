import React from "react";

const OtherDetails = ({ student }) => {
  const {
    lastCourse,
    lastSchool,
    fee,
    transactionDate,
    paymentId,
    transactionId,
  } = student || {};

  const { aadhar } = student?.profile || {};

  const {
    idProof,
    migrationCertificate,
    rankCard,
    casteCertificate,
  } = student?.profile?.documents || {};

  // ✅ Global Base URL
  const BASE_URL = 'http://localhost:8000'

  // ✅ Helper function
  const getFileUrl = (path) => {
    if (!path) return null;

    // if already full URL
    if (path.startsWith("http")) return path;

    return `${BASE_URL}${path}`;
  };
  const isCompleted = ["SUCCESS", "FAILED"].includes(student?.transactionStatus);
  // ✅ Rows data
  const rows = [
    {
      l1: "Last Attended Course and Migration Certificate",
      l3: "Migration Certificate",
      v3: getFileUrl(migrationCertificate),
    },
    {
      l1: "Course Name",
      v1: lastCourse || "INTERMEDIATE",
      l2: "School/College Name",
      v2: lastSchool || "H.M.Y.J.K.B.V. COLLEGE",
    },
    {
      l1: "ID Proof",
      l3: "Aadhar Card/Passport",
      v3: getFileUrl(idProof),
    },
    {
      l1: "Aadhar Card/Passport",
      v1: aadhar || "758476320337",
    },
    {
      l1: "Other Details",
      l3: "Admission/DCECE Rank Card",
      v3: getFileUrl(rankCard),
    },
    {
      l1: "Admission/DCECE Registration Details",
      l3: "Caste Certificate",
      v3: getFileUrl(casteCertificate),
    },
    {
      l1: "Admission/DCECE Registration No.:",
    },
    {
      l1: "Caste Category Certificate",
    },
    {
  l1: `Registration Fee:`,

  v1: (
    <span
      className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase text-white ${
        student?.transactionStatus === "SUCCESS"
          ? "bg-green-600"
          : student?.transactionStatus === "FAILED"
          ? "bg-red-600"
          : "bg-yellow-500"
      }`}
    >
      {student?.transactionStatus || "Pending"}
    </span>
  ),

  // ✅ Only show if completed
  l2: isCompleted
    ? `Transaction Date: ${transactionDate ?? "12-02-2026 11:55 am"}`
    : "",

  l3: isCompleted ? "Payment Id" : "",

  v3: isCompleted ? paymentId ?? "cpayment_52300" : "",

  extra: isCompleted
    ? `Transaction Id: ${transactionId ?? "114205858636"}`
    : "",
},
  ];

  return (
    <section className="text-[11px]">
      <div className="border border-gray-200 rounded overflow-hidden text-gray-900">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="col-span-12 grid grid-cols-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
          >
            {/* Left */}
            <div className="col-span-4 bg-gray-50 p-2 font-semibold text-gray-600 border-r border-gray-100 italic">
              {row.l1}
            </div>

            {/* Middle */}
            <div className="col-span-4 p-2 font-medium border-r border-gray-100 flex items-center pr-4">
              {row.v1}

              {row.l2 && (
                <>
                  <span className="bg-gray-50 p-2 font-semibold text-gray-600 border-l border-r border-gray-100 mx-2 italic">
                    {row.l2} :
                  </span>
                  {row.v2}
                </>
              )}
            </div>

            {/* Right */}
            <div className="col-span-4 p-2 font-medium flex justify-between items-center pr-3">
              {row.l3 ? (
                <>
                  <span className="font-semibold text-gray-600 mr-2 italic">
                    {row.l3} :
                  </span>

                  {/* ✅ File Link OR Value */}
                  {row.v3 ? (
                    typeof row.v3 === "string" &&
                    row.v3.startsWith("http") ? (
                      <a
                        href={row.v3}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View File
                      </a>
                    ) : (
                      <span className="text-gray-800">
                        {row.v3}
                      </span>
                    )
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </>
              ) : (
                <span className="text-gray-500 italic">
                  {row.extra}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OtherDetails;