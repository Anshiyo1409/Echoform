import React, { useState } from 'react';
import { getGamerooms, createGameroom, updateGameroom, deleteGameroom } from '../../services/gamerooms';
import { getTeams } from '../../services/teams';
import { exportToCSV } from '../../services/exportService';
import { DoorOpen, Plus, Trash2, ToggleLeft, ToggleRight, Users, Copy, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function GameroomsManager() {
  const [rooms, setRooms] = useState(getGamerooms());
  const teams = getTeams();
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
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
    name: '',
    code: '',
    description: '',
    status: 'ACTIVE'
  });

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setToast({ type: 'error', message: 'Gameroom Name is required.' });
      return;
    }

    try {
      const created = createGameroom(formData);
      setRooms(getGamerooms());
      setShowAddForm(false);
      setFormData({ name: '', code: '', description: '', status: 'ACTIVE' });
      setToast({ type: 'success', message: `Gameroom "${created.name}" (${created.id}) created successfully!` });
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to create Gameroom.' });
    }
  };

  const handleToggleStatus = (room) => {
    const nextStatus = room.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
    updateGameroom(room.id, { status: nextStatus });
    setRooms(getGamerooms());
    setToast({ type: 'success', message: `Gameroom ${room.id} is now ${nextStatus}` });
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm(`Are you sure you want to delete Gameroom ${roomId}?`)) {
      deleteGameroom(roomId);
      setRooms(getGamerooms());
      setToast({ type: 'success', message: `Deleted Gameroom ${roomId}` });
    }
  };

  const copyRoomCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getTeamsInRoom = (roomId) => {
    return teams.filter(t => (t.gameroomId || '').toUpperCase() === roomId.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white">
            Gamerooms Management ({rooms.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Create and manage competition gamerooms where teams can log in using Team Name + Gameroom ID.
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
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Cancel Creation' : '+ Create Gameroom'}
          </button>
        </div>
      </div>

      {/* Create Gameroom Form Modal */}
      {showAddForm && (
        <form onSubmit={handleCreateRoom} className="bg-dark-900 border border-cyber-cyan/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="font-outfit font-bold text-lg text-white">Create New Gameroom</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase">Gameroom Name *</label>
              <input
                type="text"
                placeholder="e.g. Cyber Design Arena 2026"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase">Custom Room ID / Code (Optional)</label>
              <input
                type="text"
                placeholder="e.g. ROOM-103 (Auto-generated if empty)"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white font-mono uppercase"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase">Description</label>
            <input
              type="text"
              placeholder="e.g. Morning Sprint for UI/UX teams"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Status:</span>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="bg-dark-950 border border-dark-800 rounded-lg px-2 py-1 text-xs text-white font-mono"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-dark-950 font-outfit font-black text-xs shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
            >
              Save Gameroom
            </button>
          </div>
        </form>
      )}

      {/* Gamerooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.length === 0 ? (
          <div className="col-span-2 bg-dark-900 border border-dark-800 rounded-3xl p-12 text-center text-slate-500 font-mono text-xs">
            No Gamerooms created yet. Click "+ Create Gameroom" above to create one.
          </div>
        ) : (
          rooms.map((room) => {
            const enrolledTeams = getTeamsInRoom(room.id);

            return (
              <div
                key={room.id}
                className="bg-dark-900 border border-dark-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-cyber-cyan/30 transition-colors relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-lg text-cyber-cyan">{room.id}</span>
                      <button
                        onClick={() => copyRoomCode(room.id)}
                        className="p-1 rounded bg-dark-950 border border-dark-800 text-slate-400 hover:text-white transition-colors"
                        title="Copy Room ID"
                      >
                        {copiedCode === room.id ? <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        room.status === 'ACTIVE'
                          ? 'bg-cyber-emerald/20 border border-cyber-emerald/40 text-cyber-emerald'
                          : 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                      }`}>
                        ● {room.status}
                      </span>
                    </div>

                    <h3 className="font-outfit font-black text-xl text-white">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {room.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(room)}
                      className="p-2 rounded-xl bg-dark-950 border border-dark-800 text-slate-400 hover:text-cyber-cyan transition-colors"
                      title={room.status === 'ACTIVE' ? 'Close Room' : 'Activate Room'}
                    >
                      {room.status === 'ACTIVE' ? <ToggleRight className="w-5 h-5 text-cyber-emerald" /> : <ToggleLeft className="w-5 h-5 text-slate-500" />}
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="p-2 rounded-xl bg-dark-950 border border-dark-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Gameroom"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Enrolled Teams Section */}
                <div className="pt-4 border-t border-dark-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-cyber-purple" />
                      Enrolled Teams ({enrolledTeams.length})
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Login Key: Team Name + {room.id}
                    </span>
                  </div>

                  {enrolledTeams.length === 0 ? (
                    <p className="text-[11px] text-slate-500 font-mono italic">
                      No teams logged into this room yet.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {enrolledTeams.map(t => (
                        <span key={t.id} className="px-2.5 py-1 rounded-lg bg-dark-950 border border-dark-800 text-[11px] font-mono text-slate-300">
                          <strong className="text-cyber-cyan">{t.id}</strong> ({t.teamName})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
