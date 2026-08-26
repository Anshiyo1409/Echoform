import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Headphones, Radio, AlertCircle } from 'lucide-react';
import AudioWaveformCanvas from './AudioWaveformCanvas';
import { playSynthSound, stopSynthSound, isAudioPlaying } from '../audio/soundSynth';

export default function AudioPlayer({ sound, isAdmin = false }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 180; // Default 3 minute demo loop duration
  const timerRef = useRef(null);

  const soundName = isAdmin ? (sound?.name || 'Rain + Traffic') : 'Mystery Audio Track 🎧';
  const soundDesc = isAdmin ? (sound?.description || 'Heavy rain with distant traffic ambient noise') : 'Audio title is hidden. Play & listen to the procedural soundscape to interpret your vector.';
  const synthType = sound?.synthType || sound?.name || 'Rain + Traffic';

  const togglePlay = () => {
    if (playing) {
      stopSynthSound();
      setPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      playSynthSound(synthType, muted ? 0 : volume);
      setPlaying(true);
      
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => (prev >= duration ? 0 : prev + 1));
      }, 1000);
    }
  };

  const handleReplay = () => {
    setCurrentTime(0);
    if (!playing) {
      togglePlay();
    } else {
      stopSynthSound();
      playSynthSound(synthType, muted ? 0 : volume);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setMuted(true);
    else setMuted(false);

    if (playing) {
      playSynthSound(synthType, val);
    }
  };

  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    if (playing) {
      playSynthSound(synthType, nextMute ? 0 : volume);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthSound();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-dark-900/90 border border-dark-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
      
      {/* Top Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
            <Headphones className={`w-5 h-5 ${playing ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-outfit font-bold text-lg text-white tracking-wide">
                {soundName}
              </h3>
              {playing && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30 animate-pulse">
                  PLAYING
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {soundDesc}
            </p>
          </div>
        </div>

        <button
          onClick={handleReplay}
          className="p-2 rounded-lg text-slate-400 hover:text-cyber-cyan hover:bg-dark-800 transition-colors"
          title="Replay from start"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas Waveform Visualizer */}
      <div className="mb-5">
        <AudioWaveformCanvas isPlaying={playing} height={90} />
      </div>

      {/* Player Controls & Scrubber */}
      <div className="space-y-3">
        
        {/* Progress Bar & Counter */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1 h-2 bg-dark-950 rounded-full overflow-hidden border border-dark-800 relative cursor-pointer">
            <div 
              className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink transition-all duration-300 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Play/Pause & Volume */}
        <div className="flex items-center justify-between pt-2">
          
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                playing
                  ? 'bg-cyber-pink text-white shadow-lg shadow-cyber-pink/30 hover:scale-105'
                  : 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 shadow-lg shadow-cyber-cyan/20 hover:scale-105'
              }`}
            >
              {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
              {playing ? 'Procedural Audio Active' : 'Click Play to Hear Soundscape'}
            </span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-dark-950 border border-dark-800 px-3 py-1.5 rounded-xl">
            <button onClick={toggleMute} className="text-slate-400 hover:text-cyber-cyan">
              {muted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 accent-cyber-cyan cursor-pointer h-1.5 bg-dark-800 rounded-lg"
            />
          </div>

        </div>

      </div>

      <div className="mt-4 pt-3 border-t border-dark-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <Radio className="w-3 h-3 text-cyber-cyan" />
          Interactive Sound Engine
        </span>
        <span className="text-slate-500">
          Unlimited Replays Allowed
        </span>
      </div>

    </div>
  );
}
