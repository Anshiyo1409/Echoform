import React, { useState } from 'react';
import { getSounds, createSound, deleteSound } from '../../services/sounds';
import { Headphones, Plus, Play, Pause, Trash2, Volume2 } from 'lucide-react';
import { playSynthSound, stopSynthSound } from '../../audio/soundSynth';
import NotificationToast from '../../components/NotificationToast';

export default function SoundsManager() {
  const [sounds, setSounds] = useState(getSounds());
  const [playingId, setPlayingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    synthType: 'Rain + Traffic',
    audioUrl: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setToast({ type: 'error', message: 'Sound Name is required.' });
      return;
    }

    const created = createSound({
      name: formData.name,
      description: formData.description,
      synthType: formData.synthType || formData.name,
      audioUrl: formData.audioUrl
    });

    setSounds(getSounds());
    setShowForm(false);
    setFormData({ name: '', description: '', synthType: 'Rain + Traffic', audioUrl: '' });
    setToast({ type: 'success', message: `Added sound "${created.name}"` });
  };

  const toggleSound = (sound) => {
    if (playingId === sound.id) {
      stopSynthSound();
      setPlayingId(null);
    } else {
      stopSynthSound();
      playSynthSound(sound.synthType || sound.name, 0.7);
      setPlayingId(sound.id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this sound preset?')) {
      deleteSound(id);
      setSounds(getSounds());
      setToast({ type: 'success', message: 'Sound deleted' });
    }
  };

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white">
            Audio Sound Preset Library ({sounds.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Manage procedural audio presets and external uploaded MP3 audio tracks.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-cyber-purple text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyber-purple/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel Add Sound' : '+ Add Sound Preset'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-dark-900 border border-cyber-purple/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="font-outfit font-bold text-lg text-white">Add New Sound</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sound Name (e.g. Mechanical Clock) *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white"
              required
            />
            
            <select
              value={formData.synthType}
              onChange={(e) => setFormData({ ...formData, synthType: e.target.value })}
              className="px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white font-mono"
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

          <textarea
            placeholder="Sound description (e.g. Heavy downpour pounding against glass windows with distant vehicle hums)..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-xs"
            >
              Save Sound Preset
            </button>
          </div>
        </form>
      )}

      {/* Sounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className="bg-dark-900 border border-dark-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-cyber-cyan/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSound(sound)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    playingId === sound.id
                      ? 'bg-cyber-cyan text-dark-950 font-bold animate-bounce'
                      : 'bg-dark-950 text-cyber-cyan border border-cyber-cyan/30'
                  }`}
                >
                  {playingId === sound.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <h4 className="font-outfit font-bold text-white text-base">{sound.name}</h4>
                  <span className="text-[10px] font-mono text-cyber-cyan/80 bg-dark-950 px-2 py-0.5 rounded border border-dark-800">
                    Synth: {sound.synthType || sound.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(sound.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-2">
              {sound.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
