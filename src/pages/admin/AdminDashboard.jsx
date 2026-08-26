import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGamerooms } from '../../services/gamerooms';
import { getTeams } from '../../services/teams';
import { getSounds } from '../../services/sounds';
import { getContexts } from '../../services/contexts';
import { getAssignments } from '../../services/assignments';
import { getSubmissions } from '../../services/submissions';
import { getEventDetails, setEventStatus } from '../../services/event';
import { DoorOpen, Users, Headphones, Target, Shuffle, FileText } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function AdminDashboard() {
  const [eventData, setEventData] = useState(getEventDetails());
  const [gamerooms, setGamerooms] = useState(getGamerooms());
  const [teams, setTeams] = useState(getTeams());
  const [sounds, setSounds] = useState(getSounds());
  const [contexts, setContexts] = useState(getContexts());
  const [assignments, setAssignments] = useState(getAssignments());
  const [submissions, setSubmissions] = useState(getSubmissions());
  const [toast, setToast] = useState(null);

  const handleStatusToggle = (newStatus) => {
    const updated = setEventStatus(newStatus);
    setEventData(updated);
    setToast({ type: 'success', message: `Event status updated to ${newStatus}` });
  };

  return (
    <div className="space-y-8">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {/* Top Event Status Banner */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${
            eventData.status === 'LIVE' ? 'bg-cyber-emerald animate-ping' : 'bg-amber-400'
          }`}></span>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              EVENT STATUS
            </span>
            <strong className="font-outfit font-black text-xl text-white">
              ● {eventData.status} ({eventData.date} • {eventData.startTime} - {eventData.endTime})
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStatusToggle('LIVE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              eventData.status === 'LIVE' ? 'bg-cyber-emerald text-dark-950' : 'bg-dark-950 text-slate-400 border border-dark-800'
            }`}
          >
            SET LIVE
          </button>
          <button
            onClick={() => handleStatusToggle('UPCOMING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              eventData.status === 'UPCOMING' ? 'bg-cyber-amber text-dark-950' : 'bg-dark-950 text-slate-400 border border-dark-800'
            }`}
          >
            UPCOMING
          </button>
          <button
            onClick={() => handleStatusToggle('ENDED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              eventData.status === 'ENDED' ? 'bg-rose-500 text-white' : 'bg-dark-950 text-slate-400 border border-dark-800'
            }`}
          >
            ENDED
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        
        <Link to="/admin/gamerooms" className="bg-dark-900 border border-dark-800 hover:border-cyber-cyan/40 rounded-2xl p-5 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <DoorOpen className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono">Gamerooms</span>
          </div>
          <span className="font-outfit font-black text-3xl text-white">{gamerooms.length}</span>
        </Link>

        <Link to="/admin/teams" className="bg-dark-900 border border-dark-800 hover:border-cyber-purple/40 rounded-2xl p-5 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Users className="w-5 h-5 text-cyber-purple group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono">Teams</span>
          </div>
          <span className="font-outfit font-black text-3xl text-white">{teams.length}</span>
        </Link>

        <Link to="/admin/sounds" className="bg-dark-900 border border-dark-800 hover:border-cyber-cyan/40 rounded-2xl p-5 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Headphones className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono">Sounds</span>
          </div>
          <span className="font-outfit font-black text-3xl text-white">{sounds.length}</span>
        </Link>

        <Link to="/admin/contexts" className="bg-dark-900 border border-dark-800 hover:border-cyber-pink/40 rounded-2xl p-5 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Target className="w-5 h-5 text-cyber-pink group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono">Contexts</span>
          </div>
          <span className="font-outfit font-black text-3xl text-white">{contexts.length}</span>
        </Link>

        <Link to="/admin/assignments" className="bg-dark-900 border border-dark-800 hover:border-cyber-purple/40 rounded-2xl p-5 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <Shuffle className="w-5 h-5 text-cyber-purple group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono">Assignments</span>
          </div>
          <span className="font-outfit font-black text-3xl text-white">{assignments.length}</span>
        </Link>

        <Link to="/admin/submissions" className="bg-dark-900 border border-dark-800 hover:border-cyber-emerald/40 rounded-2xl p-5 transition-all group">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <FileText className="w-5 h-5 text-cyber-emerald group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono">Submissions</span>
          </div>
          <span className="font-outfit font-black text-3xl text-white">{submissions.length}</span>
        </Link>

      </div>

      {/* Quick Action Matrix */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-outfit font-bold text-lg text-white">
          Event Operations Shortcuts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/gamerooms"
            className="p-5 rounded-2xl bg-dark-950 border border-dark-800 hover:border-cyber-cyan text-left space-y-2 group transition-all"
          >
            <DoorOpen className="w-6 h-6 text-cyber-cyan" />
            <h4 className="font-outfit font-bold text-white text-sm">Create & Manage Gamerooms</h4>
            <p className="text-xs text-slate-400 font-mono">
              Generate room codes (e.g. ROOM-101) for team login.
            </p>
          </Link>

          <Link
            to="/admin/assignments"
            className="p-5 rounded-2xl bg-dark-950 border border-dark-800 hover:border-cyber-purple text-left space-y-2 group transition-all"
          >
            <Shuffle className="w-6 h-6 text-cyber-purple group-hover:rotate-180 transition-transform duration-500" />
            <h4 className="font-outfit font-bold text-white text-sm">Generate & Lock Assignments</h4>
            <p className="text-xs text-slate-400 font-mono">
              Assign audio soundscapes and design contexts to teams.
            </p>
          </Link>

          <Link
            to="/admin/submissions"
            className="p-5 rounded-2xl bg-dark-950 border border-dark-800 hover:border-cyber-pink text-left space-y-2 group transition-all"
          >
            <FileText className="w-6 h-6 text-cyber-pink" />
            <h4 className="font-outfit font-bold text-white text-sm">Review Work Submissions</h4>
            <p className="text-xs text-slate-400 font-mono">
              Inspect Figma, prototype, and project links.
            </p>
          </Link>
        </div>
      </div>

    </div>
  );
}
