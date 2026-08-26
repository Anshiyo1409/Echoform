import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGamerooms } from '../services/gamerooms';
import { LogIn, ShieldAlert, Users, Key, DoorOpen, Sparkles } from 'lucide-react';
import NotificationToast from '../components/NotificationToast';

export default function Login() {
  const navigate = useNavigate();
  const { loginTeam, loginAdmin } = useAuth();
  const gamerooms = getGamerooms();

  const [tab, setTab] = useState('participant'); // 'participant' | 'admin'
  const [teamName, setTeamName] = useState('');
  const [gameroomId, setGameroomId] = useState('ROOM-101');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [toast, setToast] = useState(null);

  const handleParticipantLogin = (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setToast({ type: 'error', message: 'Please enter your Team Name.' });
      return;
    }
    if (!gameroomId.trim()) {
      setToast({ type: 'error', message: 'Please enter a Gameroom ID.' });
      return;
    }

    const res = loginTeam(teamName.trim(), gameroomId.trim());
    if (res.success) {
      navigate('/reveal');
    } else {
      setToast({ type: 'error', message: res.error || 'Login failed. Please check your Gameroom ID.' });
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminPasscode) {
      setToast({ type: 'error', message: 'Please enter admin passcode.' });
      return;
    }

    const res = loginAdmin(adminPasscode);
    if (res.success) {
      navigate('/admin');
    } else {
      setToast({ type: 'error', message: res.error || 'Invalid admin passcode.' });
    }
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-outfit font-black text-3xl sm:text-4xl text-white tracking-wide">
            ECHOFORM Portal
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Enter your Team Name and Gameroom ID to join the competition portal.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-dark-900 border border-dark-800 p-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setTab('participant')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              tab === 'participant'
                ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Team Login
          </button>
          <button
            type="button"
            onClick={() => setTab('admin')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              tab === 'admin'
                ? 'bg-cyber-purple text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Organizer Admin
          </button>
        </div>

        {/* Participant Gameroom Login Form */}
        {tab === 'participant' ? (
          <form onSubmit={handleParticipantLogin} className="bg-dark-900 border border-dark-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            
            {/* Team Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                Team Name *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-cyber-cyan absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Neon Wave Studio or Pixel Pioneers"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-cyan text-slate-100 font-mono text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Gameroom ID Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                Gameroom ID / Code *
              </label>
              <div className="relative">
                <DoorOpen className="w-4 h-4 text-cyber-pink absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={gameroomId}
                  onChange={(e) => setGameroomId(e.target.value.toUpperCase())}
                  placeholder="e.g. ROOM-101"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-pink text-slate-100 font-mono text-sm uppercase focus:outline-none transition-colors"
                />
              </div>
              
              {/* Active Rooms Quick Selector */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-mono block mb-1.5">
                  Available Active Gamerooms:
                </span>
                <div className="flex flex-wrap gap-2">
                  {gamerooms.filter(r => r.status === 'ACTIVE').map(room => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setGameroomId(room.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-colors ${
                        gameroomId === room.id
                          ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan font-bold'
                          : 'bg-dark-950 border-dark-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {room.id} ({room.name})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-[1.02] transition-transform"
            >
              <LogIn className="w-5 h-5" />
              Enter Gameroom Portal
            </button>

            <p className="text-[11px] text-center text-slate-500 font-mono">
              No account required. Entering your Team Name & Gameroom ID connects you instantly to the active challenge room.
            </p>

          </form>
        ) : (
          /* Admin Login Form */
          <form onSubmit={handleAdminLogin} className="bg-dark-900 border border-cyber-purple/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="space-y-1">
              <label className="text-xs font-mono text-cyber-purple uppercase tracking-wider block">
                Organizer Admin Key *
              </label>
              <div className="relative">
                <ShieldAlert className="w-4 h-4 text-cyber-purple absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter admin passcode"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-cyber-purple text-white font-outfit font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-cyber-purple/30 hover:scale-[1.02] transition-transform"
            >
              <ShieldAlert className="w-5 h-5" />
              Enter Organizer Dashboard
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
