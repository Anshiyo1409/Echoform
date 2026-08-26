import React, { useState } from 'react';
import { getAssignments, generateAndSaveAssignments } from '../../services/assignments';
import { getTeams } from '../../services/teams';
import { getSounds } from '../../services/sounds';
import { getContexts } from '../../services/contexts';
import { getEventDetails, toggleAssignmentLock } from '../../services/event';
import { exportToCSV, exportToJSON } from '../../services/exportService';
import { Shuffle, Lock, Unlock, CheckCircle2, AlertTriangle, Eye, EyeOff, Download, FileSpreadsheet } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function AssignmentsManager() {
  const [eventData, setEventData] = useState(getEventDetails());
  const [assignments, setAssignments] = useState(getAssignments());
  const teams = getTeams();
  const sounds = getSounds();
  const contexts = getContexts();
  const [toast, setToast] = useState(null);

  const isLocked = eventData.assignmentLocked;

  const handleGenerate = () => {
    if (isLocked) {
      setToast({ type: 'error', message: 'Assignments are LOCKED! Unlock first to regenerate.' });
      return;
    }
    const created = generateAndSaveAssignments();
    setAssignments(created);
    setToast({ type: 'success', message: `Generated ${created.length} random challenge assignments!` });
  };

  const handleLockToggle = () => {
    const updated = toggleAssignmentLock();
    setEventData(updated);
    setToast({
      type: updated.assignmentLocked ? 'success' : 'info',
      message: updated.assignmentLocked ? 'Assignments are now LOCKED!' : 'Assignments UNLOCKED for editing.'
    });
  };

  const handleExportCSV = () => {
    const success = exportToCSV('echoform_team_challenges.csv');
    if (success) {
      setToast({ type: 'success', message: 'Exported team details and challenge matrix to CSV!' });
    } else {
      setToast({ type: 'error', message: 'No team data available to export.' });
    }
  };

  const handleExportJSON = () => {
    const success = exportToJSON('echoform_team_challenges.json');
    if (success) {
      setToast({ type: 'success', message: 'Exported team details and challenge matrix to JSON!' });
    } else {
      setToast({ type: 'error', message: 'No team data available to export.' });
    }
  };

  const getSoundName = (soundId) => sounds.find(s => s.id === soundId)?.name || 'Unknown Sound';
  const getContextInfo = (ctxId) => contexts.find(c => c.id === ctxId) || { name: 'Unknown Context', icon: '🎯' };
  const getTeamInfo = (teamId) => teams.find(t => t.id === teamId) || { teamName: teamId };

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {/* Top Controls Card */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-cyber-cyan" />
              <h2 className="font-outfit font-black text-2xl text-white">
                Challenge Assignment Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Teams: <strong className="text-white">{teams.length}</strong> | Sounds: <strong className="text-cyber-cyan">{sounds.length}</strong> | Contexts: <strong className="text-cyber-pink">{contexts.length}</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-dark-950 border border-cyber-cyan/40 text-cyber-cyan font-outfit font-bold text-xs flex items-center gap-1.5 hover:bg-cyber-cyan/10 transition-all"
              title="Export Team Details & Challenges to CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export CSV
            </button>

            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 rounded-xl bg-dark-950 border border-cyber-purple/40 text-cyber-purple font-outfit font-bold text-xs flex items-center gap-1.5 hover:bg-cyber-purple/10 transition-all"
              title="Export Team Details & Challenges to JSON"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>

            <button
              onClick={handleGenerate}
              disabled={isLocked}
              className={`px-5 py-2.5 rounded-xl font-outfit font-bold text-xs flex items-center gap-2 transition-all ${
                isLocked
                  ? 'bg-dark-950 text-slate-600 border border-dark-800 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 shadow-lg hover:scale-105'
              }`}
            >
              <Shuffle className="w-4 h-4" />
              {assignments.length > 0 ? 'Regenerate Assignments' : 'Generate Assignments'}
            </button>

            <button
              onClick={handleLockToggle}
              className={`px-5 py-2.5 rounded-xl font-outfit font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                isLocked
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-cyber-emerald text-dark-950 hover:scale-105'
              }`}
            >
              {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              {isLocked ? 'LOCK ACTIVE' : 'LOCK ASSIGNMENTS'}
            </button>
          </div>
        </div>

        {/* Status Lock Warning */}
        <div className={`p-4 rounded-2xl border text-xs font-mono flex items-center gap-3 ${
          isLocked
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            : 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan'
        }`}>
          {isLocked ? <Lock className="w-5 h-5 text-rose-400 shrink-0" /> : <Unlock className="w-5 h-5 text-cyber-cyan shrink-0" />}
          <div>
            <strong>Status: {isLocked ? 'ASSIGNMENTS LOCKED' : 'UNLOCKED / DRAFT'}</strong>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isLocked
                ? 'Assignments are fixed. Participants will receive their assigned challenge upon logging in.'
                : 'Assignments can be regenerated before locking. Click LOCK ASSIGNMENTS when ready.'}
            </p>
          </div>
        </div>

      </div>

      {/* Assignments Table */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-dark-950 border-b border-dark-800 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Team</th>
                <th className="px-6 py-4">🎧 Assigned Sound</th>
                <th className="px-6 py-4">🎯 Assigned Context</th>
                <th className="px-6 py-4">Reveal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800 text-slate-300">
              {assignments.map((asg) => {
                const team = getTeamInfo(asg.teamId);
                const soundName = getSoundName(asg.soundId);
                const ctx = getContextInfo(asg.contextId);

                return (
                  <tr key={asg.id} className="hover:bg-dark-850/60 transition-colors">
                    <td className="px-6 py-4">
                      <strong className="text-cyber-cyan font-bold block">{asg.teamId}</strong>
                      <span className="text-slate-400 text-[11px] font-outfit">{team.teamName}</span>
                    </td>

                    <td className="px-6 py-4 font-outfit font-bold text-white text-sm">
                      {soundName}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-outfit font-bold text-white text-sm">
                        <span>{ctx.icon}</span>
                        <span>{ctx.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {asg.revealed ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-[11px]">
                          <Eye className="w-3.5 h-3.5" /> Revealed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-950 border border-dark-800 text-slate-500 text-[11px]">
                          <EyeOff className="w-3.5 h-3.5" /> Not Revealed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
