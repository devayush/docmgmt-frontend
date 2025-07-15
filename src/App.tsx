// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; // Placeholder for protected page
import UploadDocument from './pages/UploadDocument';

function App() {
  return (
  <>
    <div className="bg-red-500 text-white p-10 text-2xl font-bold text-center">
        Tailwind Test
      </div>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadDocument />} />
        </Route>

        {/* Default fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  </>
  );
} 

export default App;
