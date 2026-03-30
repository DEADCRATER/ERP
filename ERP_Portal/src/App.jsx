import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';

// Common & Auth Pages
import Home from './pages/common/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreatePassword from './pages/auth/CreatePassword';
import NotFound from './pages/common/NotFound';

// Modular Role Routes
import StudentRoutes from './routes/StudentRoutes';
import PrincipalRoutes from './routes/PrincipalRoutes';
import SuperAdminRoutes from './routes/SuperAdminRoutes';
import StudentDetails from './pages/principal/StudentDetails';
import RegistrationSlip from './pages/principal/RegistrationSlip';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route layout free endpoints */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-password/:token" element={<CreatePassword />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes wrapped in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/student/*" element={<StudentRoutes />} />
            <Route path="/principal/*" element={<PrincipalRoutes />} />
            <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
          </Route>

          {/* Full Screen Pages */}
          <Route path="/principal/student-details/:id" element={<StudentDetails />} />
          <Route path="/principal/registration-slip/:id/:type" element={<RegistrationSlip />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;