import React, { useState, useEffect } from 'react';
import { Play, Pause, Headphones, Target, Dna, ArrowRight } from 'lucide-react';
import AudioWaveformCanvas from './AudioWaveformCanvas';
import { playSynthSound, stopSynthSound } from '../audio/soundSynth';

export default function ChallengeCard({ sound, context, team, interactive = false, isAdmin = false, onAction }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Format team id cleanly (e.g., EF-007 -> TEAM 07, 07 -> TEAM 07, EF-001 -> TEAM 01)
  const rawId = team?.id || '07';
  const teamNumber = rawId.replace(/^EF-0*/, '').replace(/^EF-/, '') || rawId;
  const teamLabel = `TEAM ${teamNumber.padStart(2, '0')}`;

  const soundTitle = isAdmin ? (sound?.name || 'CLASSIFIED') : 'CLASSIFIED';
  const contextName = context?.name || 'Café';
  const contextExperience = `${contextName.toUpperCase()} EXPERIENCE`;
  const designDna = context?.designDna || sound?.designDna || 'SONIC TEXTURE';
  const synthType = sound?.synthType || sound?.name || 'Rain + Traffic';

  const toggleAudio = () => {
    if (isPlaying) {
      stopSynthSound();
      setIsPlaying(false);
    } else {
      playSynthSound(synthType, 0.8);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthSound();
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900 border-2 border-cyber-cyan/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6 backdrop-blur-xl group">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-cyber-cyan/10 via-cyber-purple/15 to-cyber-pink/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* TOP HEADER */}
      <div className="space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-dark-950 border border-cyber-cyan/50 text-cyber-cyan font-mono text-sm sm:text-base tracking-widest uppercase font-black shadow-lg shadow-cyber-cyan/10">
          <span>🔐</span>
          <span>ECHOFORM // {teamLabel}</span>
        </div>

        <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase font-bold pt-2">
          YOUR CREATIVE SIGNAL HAS BEEN RECEIVED
        </p>
      </div>

      {/* SECTION 1: AUDIO */}
      <div className="bg-dark-950/90 border border-cyber-cyan/40 rounded-2xl p-6 space-y-4 relative z-10 max-w-md mx-auto hover:border-cyber-cyan/70 transition-colors shadow-lg shadow-cyber-cyan/5">
        <div className="flex items-center justify-center gap-2 text-cyber-cyan font-mono font-bold text-sm tracking-wider uppercase">
          <Headphones className="w-4 h-4" />
          <span>🎧 AUDIO</span>
        </div>

        <div className="font-outfit font-black text-2xl sm:text-3xl tracking-widest text-white uppercase">
          {soundTitle}
        </div>

        {/* PLAY SOUND BUTTON */}
        <div className="pt-1">
          <button
            onClick={toggleAudio}
            className={`w-full py-3.5 px-6 rounded-xl font-outfit font-black text-sm sm:text-base tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl ${
              isPlaying
                ? 'bg-cyber-pink text-white shadow-cyber-pink/30 hover:scale-105'
                : 'bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink text-dark-950 shadow-cyber-cyan/30 hover:scale-105'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current animate-pulse" />
                <span>[ ⏸️ PAUSE SOUND ]</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>[ 🔊 PLAY SOUND ]</span>
              </>
            )}
          </button>
        </div>

        {isPlaying && (
          <div className="pt-2">
            <AudioWaveformCanvas isPlaying={true} height={60} />
          </div>
        )}
      </div>

      {/* DOWN ARROW 1 */}
      <div className="flex justify-center relative z-10">
        <span className="text-cyber-cyan text-3xl font-mono animate-bounce font-bold">↓</span>
      </div>

      {/* SECTION 2: CONTEXT */}
      <div className="bg-dark-950/90 border border-cyber-pink/40 rounded-2xl p-6 space-y-3 relative z-10 max-w-md mx-auto hover:border-cyber-pink/70 transition-colors shadow-lg shadow-cyber-pink/5">
        <div className="flex items-center justify-center gap-2 text-cyber-pink font-mono font-bold text-sm tracking-wider uppercase">
          <Target className="w-4 h-4" />
          <span>🎯 CONTEXT</span>
        </div>

        <div className="font-outfit font-black text-2xl sm:text-3xl tracking-wide text-white uppercase">
          {contextExperience}
        </div>
      </div>

      {/* DOWN ARROW 2 */}
      <div className="flex justify-center relative z-10">
        <span className="text-cyber-pink text-3xl font-mono animate-bounce font-bold">↓</span>
      </div>

      {/* SECTION 3: DESIGN DNA */}
      <div className="bg-dark-950/90 border border-cyber-purple/40 rounded-2xl p-6 space-y-3 relative z-10 max-w-md mx-auto hover:border-cyber-purple/70 transition-colors shadow-lg shadow-cyber-purple/5">
        <div className="flex items-center justify-center gap-2 text-cyber-purple font-mono font-bold text-sm tracking-wider uppercase">
          <Dna className="w-4 h-4" />
          <span>🧬 DESIGN DNA</span>
        </div>

        <div className="font-outfit font-black text-2xl sm:text-3xl tracking-wide text-white uppercase">
          {designDna}
        </div>
      </div>

      {/* FOOTER TAGLINE */}
      <div className="pt-4 border-t border-dark-800/80 relative z-10">
        <p className="font-outfit font-bold italic text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink tracking-wide">
          Make the invisible audible.
        </p>
      </div>

      {interactive && onAction && (
        <div className="pt-2 relative z-10 flex justify-center">
          <button
            onClick={onAction}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-black text-sm flex items-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
          >
            Enter Challenge Experience
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

