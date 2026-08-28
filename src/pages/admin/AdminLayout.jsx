import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, LayoutDashboard, DoorOpen, Users, Headphones, Target, Shuffle, FileCheck, Settings, LogOut, Radio, Layers } from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-dark-900 border border-rose-500/40 rounded-3xl p-8 max-w-md text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="font-outfit font-black text-2xl text-white">Organizer Access Restricted</h2>
          <p className="text-xs text-slate-400 font-mono">
            Please log in with organizer admin credentials to view the dashboard.
          </p>
          <Link to="/login" className="inline-block px-6 py-2.5 rounded-xl bg-cyber-purple text-white font-bold text-sm">
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-dark-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyber-purple/20 border border-cyber-purple/40 flex items-center justify-center text-cyber-purple">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-cyber-purple uppercase tracking-widest block font-bold">
              ORGANIZER CONTROL CENTER
            </span>
            <h1 className="font-outfit font-black text-2xl sm:text-3xl text-white">
              ECHOFORM Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/challenge"
            className="px-4 py-2 rounded-xl bg-dark-900 border border-dark-700 text-xs font-mono text-slate-300 hover:text-white"
          >
            Preview Challenge Room
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-1.5 hover:bg-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Admin
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-dark-800 text-xs font-mono">
        <Link
          to="/admin"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Overview
        </Link>
        <Link
          to="/admin/gamerooms"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/gamerooms')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <DoorOpen className="w-4 h-4 text-cyber-cyan" />
          Gamerooms
        </Link>
        <Link
          to="/admin/teams"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/teams')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          Teams
        </Link>
        <Link
          to="/admin/sounds"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/sounds')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <Headphones className="w-4 h-4" />
          Sounds
        </Link>
        <Link
          to="/admin/contexts"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/contexts')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <Target className="w-4 h-4" />
          Contexts
        </Link>
        <Link
          to="/admin/assignments"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/assignments')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <Shuffle className="w-4 h-4 text-cyber-cyan" />
          Assignments & Lock
        </Link>
        <Link
          to="/admin/mappings"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/mappings')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-cyber-pink" />
          Vector Mappings
        </Link>
        <Link
          to="/admin/submissions"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/submissions')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4 text-cyber-pink" />
          Submissions
        </Link>
        <Link
          to="/admin/settings"
          className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-colors ${
            isActive('/admin/settings')
              ? 'bg-cyber-purple text-white shadow-md'
              : 'bg-dark-900 border border-dark-800 text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>

      {/* Nested Route Outlet */}
      <Outlet />

    </div>
  );
}
