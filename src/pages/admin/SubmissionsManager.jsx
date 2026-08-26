import React, { useState } from 'react';
import { getSubmissions, deleteSubmission } from '../../services/submissions';
import { getTeams } from '../../services/teams';
import { FileText, ExternalLink, Figma, Trash2, Clock, Palette } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState(getSubmissions());
  const teams = getTeams();
  const [toast, setToast] = useState(null);

  const getTeamInfo = (teamId) => teams.find(t => t.id === teamId) || { teamName: teamId };

  const handleDelete = (subId, teamId) => {
    if (window.confirm(`Are you sure you want to delete submission for Team ${teamId}?`)) {
      deleteSubmission(subId);
      setSubmissions(getSubmissions());
      setToast({ type: 'success', message: `Deleted submission for Team ${teamId}` });
    }
  };

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white">
            Design Work Submissions ({submissions.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Review Figma and Canva links and sound interpretation rationales submitted by participating teams.
          </p>
        </div>
      </div>

      {/* Submissions List */}
      <div className="grid grid-cols-1 gap-4">
        {submissions.length === 0 ? (
          <div className="bg-dark-900 border border-dark-800 rounded-3xl p-12 text-center text-slate-500 font-mono text-xs">
            No design submissions received yet.
          </div>
        ) : (
          submissions.map((sub) => {
            const team = getTeamInfo(sub.teamId);

            return (
              <div
                key={sub.id}
                className="bg-dark-900 border border-dark-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl hover:border-cyber-cyan/30 transition-colors"
              >
                <div className="space-y-3 max-w-2xl flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-cyber-cyan text-sm">{sub.teamId}</span>
                    <span className="text-xs font-mono text-slate-300">• {team.teamName}</span>
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      Submitted: {new Date(sub.submittedAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <h3 className="font-outfit font-black text-xl text-white">
                    {sub.projectName}
                  </h3>

                  {sub.description && (
                    <p className="text-xs text-slate-300 font-mono">
                      {sub.description}
                    </p>
                  )}

                  {sub.rationale && (
                    <div className="bg-dark-950 p-3 rounded-xl border border-dark-800 text-[11px] font-mono text-slate-400">
                      <span className="text-cyber-purple font-bold block mb-0.5">Audio Rationale:</span>
                      "{sub.rationale}"
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                    {sub.figmaUrl && (
                      <a 
                        href={sub.figmaUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/20 transition-colors"
                      >
                        <Figma className="w-3.5 h-3.5" /> Figma Design
                      </a>
                    )}
                    {sub.canvaUrl && (
                      <a 
                        href={sub.canvaUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
                      >
                        <Palette className="w-3.5 h-3.5" /> Canva Presentation
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-dark-800 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <button
                    onClick={() => handleDelete(sub.id, sub.teamId)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Remove submission"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
