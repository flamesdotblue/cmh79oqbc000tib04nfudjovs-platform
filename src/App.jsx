import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToasterProvider from './components/Toaster';
import Loader from './components/Loader';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Apply from './pages/Apply';
import CandidateDashboard from './pages/CandidateDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { getAuth } from './utils/storage';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-b from-white to-slate-50">
        <Loader />
      </div>
    );
  }

  return (
    <ToasterProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/apply" element={<Apply />} />
              <Route
                path="/dashboard"
                element={
                  getAuth()?.user ? <CandidateDashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  getAuth()?.admin ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/admin" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToasterProvider>
  );
}
