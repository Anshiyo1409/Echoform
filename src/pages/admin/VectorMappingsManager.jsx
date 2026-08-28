import React, { useState, useEffect } from 'react';
import { getVectorMappings, saveVectorMapping, createVectorMapping, deleteVectorMapping, resetVectorMappingsToDefault } from '../../services/vectorMappings';
import { getSounds, createMultipleSounds, createSound, deleteSound, deleteAllSounds } from '../../services/sounds';
import { getContexts } from '../../services/contexts';
import { Headphones, Target, Dna, Upload, Play, Pause, Plus, Trash2, Check, RefreshCw, Layers, Sparkles, Edit3, X, AlertTriangle } from 'lucide-react';
import { playSynthSound, stopSynthSound } from '../../audio/soundSynth';
import NotificationToast from '../../components/NotificationToast';
import { DESIGN_DNA_OPTIONS } from '../../utils/constants';

export default function VectorMappingsManager() {
  const [sounds, setSounds] = useState(getSounds());
  const [mappings, setMappings] = useState(getVectorMappings());
  const contexts = getContexts();
  const [playingId, setPlayingId] = useState(null);
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);

  const [newVector, setNewVector] = useState({
    soundName: '',
    audioUrl: '',
    contextId: contexts[0] ? contexts[0].id : '',
    designDna: 'Texture'
  });

  // Sync sound library with vector mappings list on mount and changes
  useEffect(() => {
    syncSoundsAndMappings();
  }, []);

  const syncSoundsAndMappings = () => {
    const currentSounds = getSounds();
    const currentMappings = getVectorMappings();
    const updatedMappings = [...currentMappings];

    let hasChanges = false;
    currentSounds.forEach((snd, idx) => {
      let existingMapping = updatedMappings.find(m => m.soundId === snd.id || m.soundName === snd.name);
      if (!existingMapping) {
        const ctx = contexts[idx % contexts.length] || contexts[0];
        const newMap = createVectorMapping({
          soundName: snd.name,
          soundId: snd.id,
          contextName: ctx ? ctx.name : 'Custom Context',
          contextId: ctx ? ctx.id : '',
          designDna: snd.designDna || (ctx ? ctx.designDna : 'Texture'),
          icon: ctx ? ctx.icon : '🎯',
          audioUrl: snd.audioUrl
        });
        updatedMappings.push(newMap);
        hasChanges = true;
      }
    });

    setSounds(currentSounds);
    setMappings(hasChanges ? getVectorMappings() : updatedMappings);
  };

  // BULK AUDIO FILE UPLOADER
  const handleBulkUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessingBulk(true);
    setBulkProgress(0);

    const validFiles = files.filter(f => f.type.startsWith('audio/') || f.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i));

    if (validFiles.length === 0) {
      setToast({ type: 'error', message: 'No valid audio files selected.' });
      setIsProcessingBulk(false);
      return;
    }

    const batchSounds = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });

      if (dataUrl) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "");
        const matchedContext = contexts[i % contexts.length] || contexts[0];

        batchSounds.push({
          name: cleanName,
          audioUrl: dataUrl,
          description: `Custom uploaded audio track: ${cleanName}`,
          designDna: matchedContext ? matchedContext.designDna : 'Texture'
        });
      }

      setBulkProgress(Math.round(((i + 1) / validFiles.length) * 100));
    }

    if (batchSounds.length > 0) {
      const created = await createMultipleSounds(batchSounds);
      
      // Auto create vector mappings for newly uploaded sounds
      created.forEach((soundItem, idx) => {
        const ctx = contexts[idx % contexts.length] || contexts[0];
        createVectorMapping({
          soundName: soundItem.name,
          soundId: soundItem.id,
          contextName: ctx ? ctx.name : 'Custom Context',
          contextId: ctx ? ctx.id : '',
          designDna: ctx ? (ctx.designDna || 'Texture') : 'Texture',
          icon: ctx ? ctx.icon : '🎯',
          audioUrl: soundItem.audioUrl
        });
      });

      syncSoundsAndMappings();
      setToast({ type: 'success', message: `Successfully uploaded & mapped ${batchSounds.length} audio tracks!` });
    }

    setIsProcessingBulk(false);
  };

  const handleFileUploadSingle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewVector(prev => ({
        ...prev,
        audioUrl: ev.target.result,
        soundName: prev.soundName || file.name.replace(/\.[^/.]+$/, "")
      }));
      setToast({ type: 'success', message: `Audio file "${file.name}" loaded!` });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateMapping = (id, field, value) => {
    const item = mappings.find(m => m.id === id);
    if (!item) return;

    let updateData = { [field]: value };

    if (field === 'contextId') {
      const selectedCtx = contexts.find(c => c.id === value);
      if (selectedCtx) {
        updateData.contextName = selectedCtx.name;
        updateData.icon = selectedCtx.icon;
        if (!item.designDna) {
          updateData.designDna = selectedCtx.designDna;
        }
      }
    }

    saveVectorMapping(id, updateData);
    setMappings(getVectorMappings());
    setToast({ type: 'success', message: 'Audio & Context mapping saved!' });
  };

  const handleCreateNewVector = async (e) => {
    e.preventDefault();
    if (!newVector.soundName) {
      setToast({ type: 'error', message: 'Sound Name is required.' });
      return;
    }

    const selectedCtx = contexts.find(c => c.id === newVector.contextId) || contexts[0];

    const createdSound = await createSound({
      name: newVector.soundName,
      audioUrl: newVector.audioUrl,
      description: `Custom mapped vector sound: ${newVector.soundName}`,
      designDna: newVector.designDna
    });

    createVectorMapping({
      soundName: createdSound.name,
      soundId: createdSound.id,
      contextName: selectedCtx ? selectedCtx.name : 'Café App',
      contextId: selectedCtx ? selectedCtx.id : '',
      designDna: newVector.designDna || selectedCtx?.designDna || 'Texture',
      icon: selectedCtx ? selectedCtx.icon : '🎯',
      audioUrl: newVector.audioUrl
    });

    syncSoundsAndMappings();
    setShowAddForm(false);
    setNewVector({ soundName: '', audioUrl: '', contextId: contexts[0]?.id || '', designDna: 'Texture' });
    setToast({ type: 'success', message: `Created new vector pair for "${createdSound.name}"!` });
  };

  const handleDelete = async (id, soundId) => {
    if (window.confirm('Delete this Audio Track and its Vector Mapping?')) {
      deleteVectorMapping(id);
      if (soundId) {
        await deleteSound(soundId);
      }
      syncSoundsAndMappings();
      setToast({ type: 'success', message: 'Vector pair deleted' });
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('⚠️ ARE YOU SURE? This will DELETE ALL uploaded audio tracks and clear all mappings at once. This action cannot be undone.')) {
      await deleteAllSounds();
      resetVectorMappingsToDefault();
      setSounds([]);
      setMappings([]);
      setToast({ type: 'success', message: 'All uploaded audios and mappings deleted permanently.' });
    }
  };

  const toggleSound = (soundOrMapping) => {
    const playKey = soundOrMapping.soundId || soundOrMapping.id;
    if (playingId === playKey) {
      stopSynthSound();
      setPlayingId(null);
    } else {
      stopSynthSound();
      const soundObj = sounds.find(s => s.id === soundOrMapping.soundId || s.name === soundOrMapping.soundName) || {
        name: soundOrMapping.soundName,
        audioUrl: soundOrMapping.audioUrl
      };
      playSynthSound(soundObj, 0.8);
      setPlayingId(playKey);
    }
  };

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-cyber-purple" />
              <h2 className="font-outfit font-black text-2xl text-white">
                Custom Audio & Context Vector Studio ({mappings.length})
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Every uploaded audio track is listed below. Map each audio file with a Selectable Target Context and Selectable Design DNA.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {mappings.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-outfit font-bold text-xs flex items-center gap-1.5 hover:bg-rose-500/20 transition-all"
                title="Delete All Uploaded Audios at once"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                Delete All Audios
              </button>
            )}

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              {showAddForm ? 'Cancel New Audio' : '+ Upload Single Audio'}
            </button>
          </div>
        </div>

        {/* BULK UPLOAD DROPZONE */}
        <div className="bg-dark-950 border border-cyber-purple/40 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyber-purple" />
              <h3 className="font-outfit font-bold text-base text-white">Upload Audio Files (Bulk Upload)</h3>
            </div>
            {mappings.length > 0 && (
              <span className="text-xs font-mono text-slate-400">
                Uploaded Audio Tracks: <strong className="text-cyber-cyan">{mappings.length}</strong>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Select multiple <code>.mp3</code> or <code>.wav</code> files from your device. Every uploaded audio track will be added below with selectable Context and Design DNA dropdowns!
          </p>

          <div className="border-2 border-dashed border-cyber-purple/40 rounded-xl p-6 text-center bg-dark-900/50 hover:bg-cyber-purple/10 transition-all">
            <input
              type="file"
              accept="audio/*"
              multiple
              onChange={handleBulkUpload}
              disabled={isProcessingBulk}
              className="hidden"
              id="standalone-bulk-input"
            />
            <label htmlFor="standalone-bulk-input" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyber-purple/20 border border-cyber-purple/40 flex items-center justify-center text-cyber-purple">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-sm font-outfit font-bold text-white">
                {isProcessingBulk ? `Uploading Audio Files (${bulkProgress}%)...` : 'Click to Select Audio Files (Bulk)'}
              </span>
              <span className="text-[11px] font-mono text-slate-500">Select MP3 / WAV files to upload</span>
            </label>
          </div>
        </div>
      </div>

      {/* SINGLE AUDIO UPLOAD FORM */}
      {showAddForm && (
        <form onSubmit={handleCreateNewVector} className="bg-dark-900 border border-cyber-cyan/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="font-outfit font-bold text-lg text-white">Upload Audio Track & Map to Context</h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">Audio File *</label>
              <label className="px-3.5 py-2.5 rounded-xl bg-dark-950 border border-cyber-cyan/40 text-cyber-cyan text-xs flex items-center justify-between cursor-pointer hover:bg-cyber-cyan/10">
                <span className="truncate">{newVector.audioUrl ? 'Audio file loaded' : 'Select MP3/WAV...'}</span>
                <Upload className="w-4 h-4 shrink-0" />
                <input type="file" accept="audio/*" onChange={handleFileUploadSingle} className="hidden" />
              </label>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">Audio Title *</label>
              <input
                type="text"
                placeholder="Track Title (e.g. Ambient Rain)"
                value={newVector.soundName}
                onChange={(e) => setNewVector({ ...newVector, soundName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white focus:border-cyber-cyan outline-none"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">Target Context</label>
              <select
                value={newVector.contextId}
                onChange={(e) => setNewVector({ ...newVector, contextId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white font-mono focus:border-cyber-pink outline-none"
              >
                {contexts.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-cyber-purple font-bold mb-1 block">Design DNA</label>
              <select
                value={newVector.designDna}
                onChange={(e) => setNewVector({ ...newVector, designDna: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-cyber-purple/50 text-xs text-cyber-purple font-mono font-bold focus:border-cyber-purple outline-none"
              >
                {DESIGN_DNA_OPTIONS.map(dna => (
                  <option key={dna} value={dna}>{dna}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Save Uploaded Audio Vector
            </button>
          </div>
        </form>
      )}

      {/* MAPPING MATRIX TABLE */}
      <div className="bg-dark-900 border border-dark-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-dark-800 flex items-center justify-between">
          <h3 className="font-outfit font-bold text-lg text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyber-cyan" />
            Uploaded Audio Mappings ({mappings.length})
          </h3>
          {mappings.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-rose-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All Audios
            </button>
          )}
        </div>

        {mappings.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Headphones className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="font-outfit font-bold text-white text-lg">No Audios Uploaded Yet</h4>
            <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
              Use the bulk upload box above to select your audio files (.mp3, .wav). Once uploaded, ALL your audio tracks will appear here with selectable Context and Design DNA dropdowns!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-dark-950 border-b border-dark-800 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">🎧 Uploaded Audio Track</th>
                  <th className="px-6 py-4">🎯 Selectable Context</th>
                  <th className="px-6 py-4">🧬 Selectable Design DNA</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800 text-slate-300">
                {mappings.map((item, idx) => {
                  const playKey = item.soundId || item.id;

                  return (
                    <tr key={item.id} className="hover:bg-dark-850/60 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-500 font-bold">
                        {(idx + 1).toString().padStart(2, '0')}
                      </td>

                      {/* AUDIO TRACK COLUMN */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleSound(item)}
                            className={`p-2 rounded-xl border transition-all ${
                              playingId === playKey
                                ? 'bg-cyber-cyan text-dark-950 font-bold border-cyber-cyan shadow-lg animate-pulse'
                                : 'bg-dark-950 text-cyber-cyan border-cyber-cyan/30 hover:bg-cyber-cyan/10'
                            }`}
                          >
                            {playingId === playKey ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <div>
                            <strong className="font-outfit font-bold text-white text-sm block">{item.soundName}</strong>
                            <span className="text-[10px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/30 inline-flex items-center gap-1 mt-0.5">
                              <Sparkles className="w-3 h-3" /> Uploaded Audio Track
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SELECTABLE TARGET CONTEXT DROPDOWN */}
                      <td className="px-6 py-4">
                        <select
                          value={item.contextId || ''}
                          onChange={(e) => handleUpdateMapping(item.id, 'contextId', e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl bg-dark-950 border border-cyber-pink/40 text-xs text-white font-mono font-bold focus:border-cyber-pink outline-none cursor-pointer hover:border-cyber-pink"
                        >
                          {contexts.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.icon} {c.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* SELECTABLE DESIGN DNA DROPDOWN + CUSTOM INPUT */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={DESIGN_DNA_OPTIONS.includes(item.designDna) ? item.designDna : 'CUSTOM'}
                            onChange={(e) => {
                              if (e.target.value !== 'CUSTOM') {
                                handleUpdateMapping(item.id, 'designDna', e.target.value);
                              }
                            }}
                            className="px-3 py-2 rounded-xl bg-dark-950 border border-cyber-purple/40 text-cyber-purple font-mono text-xs font-bold uppercase focus:border-cyber-purple outline-none cursor-pointer"
                          >
                            {DESIGN_DNA_OPTIONS.map(dna => (
                              <option key={dna} value={dna}>{dna}</option>
                            ))}
                            {!DESIGN_DNA_OPTIONS.includes(item.designDna) && (
                              <option value="CUSTOM">Custom: {item.designDna}</option>
                            )}
                          </select>

                          <input
                            type="text"
                            value={item.designDna || ''}
                            onChange={(e) => handleUpdateMapping(item.id, 'designDna', e.target.value)}
                            placeholder="Custom DNA..."
                            className="w-32 px-3 py-2 rounded-xl bg-dark-950 border border-cyber-purple/40 text-cyber-purple font-mono text-xs font-bold uppercase focus:border-cyber-purple outline-none"
                            title="Edit or type custom Design DNA"
                          />
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id, item.soundId)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete Vector Mapping & Audio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
