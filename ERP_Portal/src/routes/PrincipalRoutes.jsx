import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Dashboard from '../pages/principal/Dashboard';
import Students from '../pages/principal/Students/Students';
import Reports from '../pages/principal/Reports';
import AddCourse from '../pages/principal/AddCourse';
import ExaminationForm from '../pages/principal/ExaminationForm';
import DeliveredLectures from '../pages/principal/DeliveredLectures';
import ViewStudentApplications from '../pages/principal/ViewStudentApplications';

const PrincipalRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['PRINCIPAL']} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="add-course" element={<AddCourse />} />
        <Route path="examination-forms" element={<ExaminationForm />} />
        <Route path="delivered-lectures" element={<DeliveredLectures />} />
        <Route path="view-applications" element={<ViewStudentApplications />} />
      </Route>
    </Routes>
  );
};

export default PrincipalRoutes;
