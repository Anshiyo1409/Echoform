import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Radio, ShieldAlert, LogOut, Sparkles, Trophy, Menu, X, Clock, HelpCircle, FileText } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-950/80 border-b border-dark-800/60 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyber-cyan via-cyber-purple to-cyber-pink p-0.5 shadow-lg shadow-cyber-purple/20 group-hover:shadow-cyber-cyan/30 transition-all duration-300">
              <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                <Radio className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyber-cyan">
                ECHOFORM
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyber-cyan/80 -mt-1 uppercase">
                Digital Design Club
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-cyber-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Home
            </Link>
            <Link 
              to="/#rules" 
              className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              How It Works
            </Link>
            
            {currentUser?.role === 'participant' && (
              <>
                <Link 
                  to="/challenge" 
                  className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${isActive('/challenge') || isActive('/reveal') ? 'text-cyber-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Sparkles className="w-4 h-4 text-cyber-cyan animate-pulse" />
                  My Challenge
                </Link>
                <Link 
                  to="/submit" 
                  className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${isActive('/submit') ? 'text-cyber-cyan font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <FileText className="w-4 h-4 text-cyber-pink" />
                  Submit Work
                </Link>
              </>
            )}

            {currentUser?.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border border-cyber-purple/40 bg-cyber-purple/10 text-cyber-purple flex items-center gap-1.5 transition-all hover:bg-cyber-purple/20`}
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Portal
              </Link>
            )}
          </div>

          {/* User Status / Actions */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'participant' ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></span>
                    <span className="text-cyber-cyan font-bold">{currentUser.team.id}</span>
                    <span className="text-slate-400 max-w-[120px] truncate">{currentUser.team.teamName}</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-full border border-cyber-purple/30 bg-cyber-purple/10 text-xs font-mono text-cyber-purple font-semibold">
                    ORGANIZER
                  </div>
                )}
                
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-extrabold text-sm shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
                >
                  Join Gameroom / Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border border-dark-800 bg-dark-900 text-slate-300"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-dark-800 bg-dark-950/95 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-300 hover:text-white py-2 font-medium"
          >
            Home
          </Link>
          {currentUser?.role === 'participant' && (
            <>
              <Link
                to="/challenge"
                onClick={() => setMobileOpen(false)}
                className="block text-cyber-cyan py-2 font-semibold"
              >
                My Challenge
              </Link>
              <Link
                to="/submit"
                onClick={() => setMobileOpen(false)}
                className="block text-cyber-pink py-2 font-semibold"
              >
                Submit Work
              </Link>
            </>
          )}
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="block text-cyber-purple py-2 font-semibold"
            >
              Admin Portal
            </Link>
          )}

          <div className="pt-4 border-t border-dark-800 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                  navigate('/');
                }}
                className="w-full text-left py-2 text-rose-400 font-medium"
              >
                Log Out ({currentUser.role === 'participant' ? currentUser.team.id : 'Admin'})
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-sm"
                >
                  Join Gameroom / Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
