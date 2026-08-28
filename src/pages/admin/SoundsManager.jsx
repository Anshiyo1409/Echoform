import React, { useState } from 'react';
import { getSounds, createSound, updateSound, deleteSound } from '../../services/sounds';
import { Headphones, Plus, Play, Pause, Trash2, Upload, Link, Radio, Dna, FileAudio, Edit3, Check, X } from 'lucide-react';
import { playSynthSound, stopSynthSound } from '../../audio/soundSynth';
import NotificationToast from '../../components/NotificationToast';

export default function SoundsManager() {
  const [sounds, setSounds] = useState(getSounds());
  const [playingId, setPlayingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [audioType, setAudioType] = useState('upload'); // 'upload' | 'synth' | 'url'
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    synthType: 'Rain + Traffic',
    audioUrl: '',
    fileName: '',
    designDna: ''
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    synthType: 'Rain + Traffic',
    audioUrl: '',
    designDna: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) {
      setToast({ type: 'error', message: 'Please select a valid audio file (.mp3, .wav, .ogg, .m4a)' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        audioUrl: event.target.result,
        fileName: file.name,
        name: prev.name || file.name.replace(/\.[^/.]+$/, "")
      }));
      setToast({ type: 'success', message: `Audio file "${file.name}" loaded successfully!` });
    };
    reader.onerror = () => {
      setToast({ type: 'error', message: 'Failed to read audio file.' });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setToast({ type: 'error', message: 'Sound Name is required.' });
      return;
    }

    if (audioType === 'upload' && !formData.audioUrl) {
      setToast({ type: 'error', message: 'Please upload an audio file or switch to Procedural Synth.' });
      return;
    }

    if (audioType === 'url' && !formData.audioUrl) {
      setToast({ type: 'error', message: 'Please enter a valid Audio URL.' });
      return;
    }

    const created = createSound({
      name: formData.name,
      description: formData.description,
      synthType: audioType === 'synth' ? (formData.synthType || formData.name) : null,
      audioUrl: audioType !== 'synth' ? formData.audioUrl : '',
      designDna: formData.designDna || null
    });

    setSounds(getSounds());
    setShowForm(false);
    setFormData({ name: '', description: '', synthType: 'Rain + Traffic', audioUrl: '', fileName: '', designDna: '' });
    setToast({ type: 'success', message: `Added audio preset "${created.name}"` });
  };

  const startEdit = (sound) => {
    setEditingId(sound.id);
    setEditFormData({
      name: sound.name,
      description: sound.description || '',
      synthType: sound.synthType || 'Rain + Traffic',
      audioUrl: sound.audioUrl || '',
      designDna: sound.designDna || ''
    });
  };

  const handleSaveEdit = (id) => {
    if (!editFormData.name) {
      setToast({ type: 'error', message: 'Sound Name is required.' });
      return;
    }

    updateSound(id, {
      name: editFormData.name,
      description: editFormData.description,
      synthType: editFormData.synthType,
      audioUrl: editFormData.audioUrl,
      designDna: editFormData.designDna || null
    });

    setSounds(getSounds());
    setEditingId(null);
    setToast({ type: 'success', message: 'Sound preset updated!' });
  };

  const toggleSound = (sound) => {
    if (playingId === sound.id) {
      stopSynthSound();
      setPlayingId(null);
    } else {
      stopSynthSound();
      playSynthSound(sound, 0.8);
      setPlayingId(sound.id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this sound preset?')) {
      deleteSound(id);
      if (playingId === id) {
        stopSynthSound();
        setPlayingId(null);
      }
      setSounds(getSounds());
      setToast({ type: 'success', message: 'Sound deleted' });
    }
  };

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white flex items-center gap-2">
            <Headphones className="w-6 h-6 text-cyber-cyan" />
            Audio & Soundscape Library ({sounds.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Upload custom MP3/WAV audio files or select procedural Web Audio synthesizers for team challenges.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel Add Sound' : '+ Add Custom Audio / Sound'}
        </button>
      </div>

      {/* CREATE FORM */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-dark-900 border border-cyber-cyan/40 rounded-3xl p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-outfit font-bold text-lg text-white">Add Custom Sound / Audio Preset</h3>

            {/* AUDIO SOURCE TOGGLE */}
            <div className="flex items-center bg-dark-950 p-1 rounded-xl border border-dark-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setAudioType('upload')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  audioType === 'upload' ? 'bg-cyber-cyan text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
              <button
                type="button"
                onClick={() => setAudioType('synth')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  audioType === 'synth' ? 'bg-cyber-purple text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" /> Procedural Synth
              </button>
              <button
                type="button"
                onClick={() => setAudioType('url')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  audioType === 'url' ? 'bg-cyber-pink text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Link className="w-3.5 h-3.5" /> Audio URL
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">Sound Title *</label>
              <input
                type="text"
                placeholder="Sound Title (e.g. Neon City Traffic / Rainscape)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white focus:border-cyber-cyan outline-none"
                required
              />
            </div>
            
            {audioType === 'synth' ? (
              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Procedural Synth Preset</label>
                <select
                  value={formData.synthType}
                  onChange={(e) => setFormData({ ...formData, synthType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white font-mono focus:border-cyber-purple outline-none"
                >
                  <option value="Rain + Traffic">Rain + Traffic</option>
                  <option value="Thunderstorm">Thunderstorm</option>
                  <option value="Ocean Waves">Ocean Waves</option>
                  <option value="Coffee Shop Ambience">Coffee Shop Ambience</option>
                  <option value="Railway Station">Railway Station</option>
                  <option value="Clock Ticking">Clock Ticking</option>
                  <option value="Keyboard Typing">Keyboard Typing</option>
                  <option value="Cyberpunk Neon City">Cyberpunk Neon City</option>
                  <option value="Busy Market">Busy Market</option>
                  <option value="Forest & Birds">Forest & Birds</option>
                  <option value="Space Station Ambient">Space Station Ambient</option>
                  <option value="Heavy Rain">Heavy Rain</option>
                </select>
              </div>
            ) : audioType === 'upload' ? (
              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Upload Audio File (.mp3, .wav, .ogg)</label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 px-3.5 py-2 rounded-xl bg-dark-950 border border-cyber-cyan/40 text-xs text-cyber-cyan cursor-pointer hover:bg-cyber-cyan/10 flex items-center justify-between">
                    <span className="truncate">{formData.fileName || 'Choose MP3 / WAV file...'}</span>
                    <Upload className="w-4 h-4 shrink-0" />
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Direct Audio Track URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/audio.mp3"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white focus:border-cyber-pink outline-none"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">Sound Description</label>
              <textarea
                placeholder="Description of the sonic atmosphere..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white focus:border-cyber-cyan outline-none"
              />
            </div>
            
            <div>
              <label className="text-[11px] font-mono text-cyber-purple font-bold mb-1 block flex items-center gap-1">
                <Dna className="w-3.5 h-3.5" /> Optional Design DNA
              </label>
              <input
                type="text"
                placeholder="e.g. SONIC TEXTURE"
                value={formData.designDna}
                onChange={(e) => setFormData({ ...formData, designDna: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-cyber-purple/50 text-xs text-cyber-purple font-mono font-bold uppercase focus:border-cyber-purple outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Save Custom Audio Preset
            </button>
          </div>
        </form>
      )}

      {/* SOUNDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className="bg-dark-900 border border-dark-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-cyber-cyan/40 transition-colors shadow-lg relative"
          >
            {editingId === sound.id ? (
              /* INLINE EDIT FORM */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyber-cyan font-bold">Editing Sound</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSaveEdit(sound.id)}
                      className="p-1 rounded bg-cyber-emerald/20 text-cyber-emerald hover:bg-cyber-emerald/30"
                      title="Save Changes"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-2.5 py-1 rounded bg-dark-950 border border-dark-800 text-xs text-white font-bold"
                />

                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  rows={2}
                  className="w-full px-2.5 py-1 rounded bg-dark-950 border border-dark-800 text-[11px] text-slate-300"
                />

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-cyber-purple font-bold">Custom Audio URL / File</label>
                  <input
                    type="text"
                    value={editFormData.audioUrl}
                    onChange={(e) => setEditFormData({ ...editFormData, audioUrl: e.target.value })}
                    placeholder="Audio URL or data:audio..."
                    className="w-full px-2.5 py-1 rounded bg-dark-950 border border-dark-800 text-[10px] font-mono text-slate-300"
                  />
                </div>
              </div>
            ) : (
              /* CARD VIEW */
              <>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleSound(sound)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          playingId === sound.id
                            ? 'bg-cyber-cyan text-dark-950 font-bold animate-bounce shadow-lg shadow-cyber-cyan/30'
                            : 'bg-dark-950 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/10'
                        }`}
                        title={playingId === sound.id ? 'Pause Sound' : 'Play Sound'}
                      >
                        {playingId === sound.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>

                      <div>
                        <h4 className="font-outfit font-bold text-white text-base">{sound.name}</h4>
                        
                        {sound.audioUrl ? (
                          <span className="text-[10px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/30 inline-flex items-center gap-1">
                            <FileAudio className="w-3 h-3" /> Uploaded Audio Track
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-cyber-purple bg-cyber-purple/10 px-2 py-0.5 rounded border border-cyber-purple/30 inline-flex items-center gap-1">
                            <Radio className="w-3 h-3" /> Synth: {sound.synthType || sound.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(sound)}
                        className="text-slate-500 hover:text-cyber-cyan p-1 transition-colors"
                        title="Edit Sound"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sound.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Delete Sound"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {sound.designDna && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-dark-950 border border-cyber-purple/40 text-cyber-purple font-mono text-[10px] font-bold">
                      <Dna className="w-3 h-3" /> {sound.designDna}
                    </div>
                  )}

                  <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-2">
                    {sound.description || 'No description provided.'}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
