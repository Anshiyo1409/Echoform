import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initStorage } from './services/storage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import TeamDashboard from './pages/TeamDashboard';
import ChallengeReveal from './pages/ChallengeReveal';
import ChallengePage from './pages/ChallengePage';
import SubmissionPage from './pages/SubmissionPage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import GameroomsManager from './pages/admin/GameroomsManager';
import TeamsManager from './pages/admin/TeamsManager';
import SoundsManager from './pages/admin/SoundsManager';
import ContextsManager from './pages/admin/ContextsManager';
import AssignmentsManager from './pages/admin/AssignmentsManager';
import SubmissionsManager from './pages/admin/SubmissionsManager';
import EventSettings from './pages/admin/EventSettings';

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark-950 text-slate-100 font-inter">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public & Participant Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<TeamDashboard />} />
              <Route path="/reveal" element={<ChallengeReveal />} />
              <Route path="/challenge" element={<ChallengePage />} />
              <Route path="/submit" element={<SubmissionPage />} />

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="gamerooms" element={<GameroomsManager />} />
                <Route path="teams" element={<TeamsManager />} />
                <Route path="sounds" element={<SoundsManager />} />
                <Route path="contexts" element={<ContextsManager />} />
                <Route path="assignments" element={<AssignmentsManager />} />
                <Route path="submissions" element={<SubmissionsManager />} />
                <Route path="settings" element={<EventSettings />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
