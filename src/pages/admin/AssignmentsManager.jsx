import React, { useState } from 'react';
import { getAssignments, generateAndSaveAssignments, updateSingleAssignment } from '../../services/assignments';
import { getTeams } from '../../services/teams';
import { getSounds } from '../../services/sounds';
import { getContexts } from '../../services/contexts';
import { getEventDetails, toggleAssignmentLock } from '../../services/event';
import { exportToCSV, exportToJSON } from '../../services/exportService';
import { Shuffle, Lock, Unlock, Eye, EyeOff, Download, FileSpreadsheet, Edit3, Dna, Upload, Headphones, Target, Sparkles, X, Check } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function AssignmentsManager() {
  const [eventData, setEventData] = useState(getEventDetails());
  const [assignments, setAssignments] = useState(getAssignments());
  const teams = getTeams();
  const sounds = getSounds();
  const contexts = getContexts();
  const [toast, setToast] = useState(null);

  // Custom Assignment Modal State
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [modalData, setModalData] = useState({
    soundId: '',
    contextId: '',
    useCustomSound: false,
    customSoundName: '',
    customSoundUrl: '',
    customSoundSynth: 'Rain + Traffic',
    useCustomContext: false,
    customContextName: '',
    customContextIcon: '☕',
    customContextDesc: '',
    customDesignDna: ''
  });

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

  const openCustomEditor = (asg) => {
    const team = teams.find(t => t.id === asg.teamId);
    setEditingAssignment({ ...asg, teamName: team?.teamName });
    setModalData({
      soundId: asg.soundId || sounds[0]?.id || '',
      contextId: asg.contextId || contexts[0]?.id || '',
      useCustomSound: !!asg.customSound,
      customSoundName: asg.customSound?.name || '',
      customSoundUrl: asg.customSound?.audioUrl || '',
      customSoundSynth: asg.customSound?.synthType || 'Rain + Traffic',
      useCustomContext: !!asg.customContext,
      customContextName: asg.customContext?.name || '',
      customContextIcon: asg.customContext?.icon || '☕',
      customContextDesc: asg.customContext?.description || '',
      customDesignDna: asg.customDesignDna || ''
    });
  };

  const handleFileUploadInModal = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setModalData(prev => ({
        ...prev,
        useCustomSound: true,
        customSoundUrl: ev.target.result,
        customSoundName: prev.customSoundName || file.name.replace(/\.[^/.]+$/, "")
      }));
      setToast({ type: 'success', message: `Audio file "${file.name}" loaded!` });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCustomAssignment = (e) => {
    e.preventDefault();
    if (!editingAssignment) return;

    const customOverrides = {
      customSound: modalData.useCustomSound ? {
        name: modalData.customSoundName || 'Custom Audio',
        audioUrl: modalData.customSoundUrl || '',
        synthType: modalData.customSoundSynth || 'Rain + Traffic'
      } : null,
      customContext: modalData.useCustomContext ? {
        name: modalData.customContextName || 'Custom Context',
        icon: modalData.customContextIcon || '🎯',
        description: modalData.customContextDesc || ''
      } : null,
      customDesignDna: modalData.customDesignDna ? modalData.customDesignDna.toUpperCase() : null
    };

    updateSingleAssignment(editingAssignment.teamId, modalData.soundId, modalData.contextId, customOverrides);
    setAssignments(getAssignments());
    setEditingAssignment(null);
    setToast({ type: 'success', message: `Custom assignment saved for ${editingAssignment.teamId}!` });
  };

  const getSoundInfo = (asg) => {
    if (asg.customSound?.name) return { name: asg.customSound.name, isCustom: true };
    const sound = sounds.find(s => s.id === asg.soundId);
    return { name: sound?.name || 'Unknown Sound', isCustom: false };
  };

  const getContextInfo = (asg) => {
    if (asg.customContext?.name) {
      return {
        name: asg.customContext.name,
        icon: asg.customContext.icon || '🎯',
        designDna: asg.customDesignDna || 'SONIC TEXTURE',
        isCustom: true
      };
    }
    const ctx = contexts.find(c => c.id === asg.contextId);
    return {
      name: ctx?.name || 'Unknown Context',
      icon: ctx?.icon || '🎯',
      designDna: asg.customDesignDna || ctx?.designDna || 'SONIC TEXTURE',
      isCustom: false
    };
  };

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
                Challenge Assignment & Custom Vector Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Teams: <strong className="text-white">{teams.length}</strong> | Preset Sounds: <strong className="text-cyber-cyan">{sounds.length}</strong> | Preset Contexts: <strong className="text-cyber-pink">{contexts.length}</strong>
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
                : 'Assignments can be edited customly or regenerated before locking.'}
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
                <th className="px-6 py-4">🧬 Design DNA</th>
                <th className="px-6 py-4">Reveal Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800 text-slate-300">
              {assignments.map((asg) => {
                const team = getTeamInfo(asg.teamId);
                const soundInfo = getSoundInfo(asg);
                const ctxInfo = getContextInfo(asg);
                const isCustom = soundInfo.isCustom || ctxInfo.isCustom || !!asg.customDesignDna;

                return (
                  <tr key={asg.id} className="hover:bg-dark-850/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <strong className="text-cyber-cyan font-bold block">{asg.teamId}</strong>
                        {isCustom && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink font-mono flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Custom Vector
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 text-[11px] font-outfit">{team.teamName}</span>
                    </td>

                    <td className="px-6 py-4 font-outfit font-bold text-white text-sm">
                      <div className="flex items-center gap-2">
                        <span>{soundInfo.name}</span>
                        {soundInfo.isCustom && (
                          <span className="text-[10px] font-mono text-cyber-cyan bg-dark-950 px-1.5 py-0.5 rounded border border-cyber-cyan/30">Custom</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-outfit font-bold text-white text-sm">
                        <span>{ctxInfo.icon}</span>
                        <span>{ctxInfo.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-dark-950 border border-cyber-purple/40 text-cyber-purple font-mono text-[11px] font-bold">
                        <Dna className="w-3 h-3" /> {ctxInfo.designDna}
                      </span>
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

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openCustomEditor(asg)}
                        className="px-3 py-1.5 rounded-lg bg-dark-950 border border-cyber-cyan/40 text-cyber-cyan text-xs font-bold flex items-center gap-1.5 ml-auto hover:bg-cyber-cyan/10 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Custom Assignment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOM ASSIGNMENT MODAL */}
      {editingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-dark-900 border border-cyber-pink/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-dark-800 pb-4">
              <div>
                <h3 className="font-outfit font-black text-xl text-white">
                  Custom Assignment: {editingAssignment.teamId}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {editingAssignment.teamName} • Set custom audio, context experience, or Design DNA.
                </p>
              </div>

              <button
                onClick={() => setEditingAssignment(null)}
                className="p-1 rounded-lg bg-dark-950 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5 text-xs font-mono">
              
              {/* SECTION 1: AUDIO SELECTION / CUSTOM AUDIO */}
              <div className="bg-dark-950 border border-dark-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-cyber-cyan flex items-center gap-1.5">
                    <Headphones className="w-4 h-4" /> 1. AUDIO ASSIGNMENT
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={modalData.useCustomSound}
                      onChange={(e) => setModalData({ ...modalData, useCustomSound: e.target.checked })}
                      className="accent-cyber-cyan rounded"
                    />
                    <span>Use Custom Sound</span>
                  </label>
                </div>

                {!modalData.useCustomSound ? (
                  <div>
                    <label className="text-slate-400 block mb-1">Select Sound Preset:</label>
                    <select
                      value={modalData.soundId}
                      onChange={(e) => setModalData({ ...modalData, soundId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-dark-800 text-white font-mono"
                    >
                      {sounds.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.audioUrl ? 'Custom MP3' : s.synthType})</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      placeholder="Custom Sound Title (e.g. Cyberpunk Drone)"
                      value={modalData.customSoundName}
                      onChange={(e) => setModalData({ ...modalData, customSoundName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-dark-800 text-white"
                    />

                    <div>
                      <label className="text-slate-400 block mb-1">Upload MP3/WAV File or enter Audio URL:</label>
                      <div className="flex gap-2">
                        <label className="flex-1 px-3 py-2 rounded-xl bg-dark-900 border border-cyber-cyan/40 text-cyber-cyan cursor-pointer hover:bg-cyber-cyan/10 flex items-center justify-between">
                          <span className="truncate">{modalData.customSoundUrl ? 'Audio file loaded' : 'Upload MP3 file...'}</span>
                          <Upload className="w-4 h-4 shrink-0" />
                          <input type="file" accept="audio/*" onChange={handleFileUploadInModal} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: CONTEXT SELECTION / CUSTOM CONTEXT */}
              <div className="bg-dark-950 border border-dark-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-cyber-pink flex items-center gap-1.5">
                    <Target className="w-4 h-4" /> 2. CONTEXT ASSIGNMENT
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={modalData.useCustomContext}
                      onChange={(e) => setModalData({ ...modalData, useCustomContext: e.target.value })}
                      className="accent-cyber-pink rounded"
                    />
                    <span>Use Custom Context</span>
                  </label>
                </div>

                {!modalData.useCustomContext ? (
                  <div>
                    <label className="text-slate-400 block mb-1">Select Context Preset:</label>
                    <select
                      value={modalData.contextId}
                      onChange={(e) => setModalData({ ...modalData, contextId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-dark-800 text-white font-mono"
                    >
                      {contexts.map(c => (
                        <option key={c.id} value={c.id}>{c.icon} {c.name} [DNA: {c.designDna || 'SONIC TEXTURE'}]</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Context Name"
                        value={modalData.customContextName}
                        onChange={(e) => setModalData({ ...modalData, customContextName: e.target.value })}
                        className="col-span-3 px-3 py-2 rounded-xl bg-dark-900 border border-dark-800 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Icon"
                        value={modalData.customContextIcon}
                        onChange={(e) => setModalData({ ...modalData, customContextIcon: e.target.value })}
                        className="px-3 py-2 rounded-xl bg-dark-900 border border-dark-800 text-center text-white text-base"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: CUSTOM DESIGN DNA */}
              <div className="bg-dark-950 border border-cyber-purple/40 rounded-2xl p-4 space-y-2">
                <label className="font-bold text-cyber-purple flex items-center gap-1.5">
                  <Dna className="w-4 h-4" /> 3. CUSTOM DESIGN DNA OVERRIDE
                </label>
                <input
                  type="text"
                  placeholder="e.g. SONIC TEXTURE, KINETIC HARMONY, NEURAL FREQUENCY..."
                  value={modalData.customDesignDna}
                  onChange={(e) => setModalData({ ...modalData, customDesignDna: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-cyber-purple/50 text-cyber-purple font-mono font-bold uppercase tracking-wider"
                />
                <p className="text-[10px] text-slate-500">
                  Leave blank to use default Design DNA from selected context/sound.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAssignment(null)}
                  className="px-4 py-2 rounded-xl bg-dark-950 border border-dark-800 text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink text-dark-950 font-bold shadow-lg"
                >
                  Save Assignment Vector
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
