import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

const ViewStudentModal = ({ isOpen, onClose, student }) => {
  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Details"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 p-2">

        {/* 🔹 Profile Section */}
        <div className="flex items-center gap-5">
          <img
            src={student.photo || "/default-avatar.png"}
            alt="student"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>

            {/* ✅ Verification Status */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                student.isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {student.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        {/* 🔹 Details Section */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Roll Number</p>
            <p className="font-medium">{student.rollNumber}</p>
          </div>

          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-medium">{student.department}</p>
          </div>

          <div>
            <p className="text-gray-500">Course</p>
            <p className="font-medium">{student.course}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{student.phone}</p>
          </div>
        </div>

        {/* 🔹 Footer */}
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewStudentModal;