import React, { useState } from 'react';
import { getTeams, registerTeam, deleteTeam } from '../../services/teams';
import { exportToCSV } from '../../services/exportService';
import { getGamerooms } from '../../services/gamerooms';
import { Users, Plus, Trash2, Search, DoorOpen, FileSpreadsheet } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function TeamsManager() {
  const [teams, setTeams] = useState(getTeams());
  const gamerooms = getGamerooms();
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);

  const handleExportCSV = () => {
    const success = exportToCSV('echoform_team_challenges.csv');
    if (success) {
      setToast({ type: 'success', message: 'Exported team details & challenge assignments to CSV!' });
    } else {
      setToast({ type: 'error', message: 'No team data available to export.' });
    }
  };

  const [formData, setFormData] = useState({
    teamName: '',
    gameroomId: 'ROOM-101'
  });

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!formData.teamName.trim()) {
      setToast({ type: 'error', message: 'Team Name is required.' });
      return;
    }

    const created = registerTeam({
      teamName: formData.teamName.trim(),
      gameroomId: (formData.gameroomId || 'ROOM-101').toUpperCase()
    });

    setTeams(getTeams());
    setShowAddForm(false);
    setFormData({
      teamName: '',
      gameroomId: 'ROOM-101'
    });
    setToast({ type: 'success', message: `Registered team ${created.id} (${created.teamName})` });
  };

  const handleDelete = (teamId) => {
    if (window.confirm(`Are you sure you want to delete Team ${teamId}?`)) {
      deleteTeam(teamId);
      setTeams(getTeams());
      setToast({ type: 'success', message: `Deleted Team ${teamId}` });
    }
  };

  const filtered = teams.filter(t => 
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.teamName.toLowerCase().includes(search.toLowerCase()) ||
    (t.gameroomId || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white">
            Team Management ({teams.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            View participating teams and their assigned Gamerooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-dark-900 border border-cyber-cyan/40 text-cyber-cyan font-bold text-xs flex items-center gap-1.5 hover:bg-cyber-cyan/10 transition-all"
            title="Export Team Details & Challenge Matrix"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl bg-cyber-purple text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyber-purple/20 hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel Add Team' : '+ Register Team'}
          </button>
        </div>
      </div>

      {/* Add Team Modal Form */}
      {showAddForm && (
        <form onSubmit={handleAddTeam} className="bg-dark-900 border border-cyber-purple/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="font-outfit font-bold text-lg text-white">Add Participating Team</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase">Team Name *</label>
              <input
                type="text"
                placeholder="e.g. Neon Wave Studio"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase">Gameroom ID</label>
              <select
                value={formData.gameroomId}
                onChange={(e) => setFormData({ ...formData, gameroomId: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white font-mono"
              >
                {gamerooms.map(r => (
                  <option key={r.id} value={r.id}>{r.id} ({r.name})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Submit & Assign ID
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by Team ID, Team Name, or Gameroom ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-dark-900 border border-dark-800 text-xs text-slate-200 focus:outline-none focus:border-cyber-cyan"
        />
      </div>

      {/* Teams Table */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-dark-950 border-b border-dark-800 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Team ID</th>
                <th className="px-6 py-4">Team Name</th>
                <th className="px-6 py-4">Gameroom ID</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-mono">
                    No teams found.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-dark-850/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-cyber-cyan">{t.id}</td>
                    <td className="px-6 py-4 font-outfit font-bold text-white text-sm">{t.teamName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-dark-950 border border-dark-800 text-cyber-pink font-bold text-xs">
                        {t.gameroomId || 'ROOM-101'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete team"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
