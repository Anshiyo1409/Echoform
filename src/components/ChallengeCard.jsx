import React from 'react';
import { Headphones, Target, Sparkles, ArrowRight } from 'lucide-react';

export default function ChallengeCard({ sound, context, team, interactive = false, isAdmin = false, onAction }) {
  const soundName = isAdmin ? (sound?.name || 'Rain + Traffic') : 'Mystery Audio Track 🎧';
  const soundDesc = isAdmin ? (sound?.description || 'Heavy rain with distant traffic ambient noise') : 'Audio title is intentionally hidden — play and listen to the audio track to interpret the soundscape.';
  const contextName = context?.name || 'Café';
  const contextIcon = context?.icon || '☕';
  const contextDesc = context?.description || 'Artisanal coffee house or ordering app experience';

  return (
    <div className="w-full bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-dark-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
      
      {/* Subtle Background Glow Spheres */}
      <div className="absolute -top-20 -left-20 w-56 h-56 bg-cyber-cyan/10 rounded-full blur-3xl group-hover:bg-cyber-cyan/20 transition-all duration-500"></div>
      <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-cyber-purple/10 rounded-full blur-3xl group-hover:bg-cyber-purple/20 transition-all duration-500"></div>

      <div className="relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-dark-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping"></span>
            <span className="text-xs font-mono tracking-widest text-cyber-cyan uppercase font-bold">
              ASSIGNED ECHOFORM
            </span>
          </div>
          {team && (
            <span className="text-xs font-mono text-slate-400 bg-dark-950 px-3 py-1 rounded-full border border-dark-800">
              Team: <strong className="text-white">{team.id}</strong> ({team.teamName})
            </span>
          )}
        </div>

        {/* Pair Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6">
          
          {/* Sound Card */}
          <div className="bg-dark-950/80 border border-cyber-cyan/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden hover:border-cyber-cyan/60 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-wider text-cyber-cyan/80 uppercase">
                  VARIABLE 1 — SOUND 🎧
                </span>
                <h4 className="font-outfit font-black text-xl text-white mt-1">
                  {soundName}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-mono">
                  {soundDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Context Card */}
          <div className="bg-dark-950/80 border border-cyber-pink/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden hover:border-cyber-pink/60 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyber-pink/10 border border-cyber-pink/40 flex items-center justify-center text-2xl shrink-0">
                {contextIcon}
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-wider text-cyber-pink/80 uppercase">
                  VARIABLE 2 — CONTEXT 🎯
                </span>
                <h4 className="font-outfit font-black text-xl text-white mt-1">
                  {contextName}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-mono">
                  {contextDesc}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Combined Brief Banner */}
        <div className="bg-gradient-to-r from-cyber-cyan/10 via-cyber-purple/10 to-cyber-pink/10 border border-cyber-purple/30 rounded-2xl p-5 text-center">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
            THE CREATIVE DIRECTIVE
          </p>
          <p className="font-outfit font-bold text-base sm:text-lg text-white">
            "Design an experience for <span className="text-cyber-pink">{contextName}</span> inspired by what you hear in your assigned audio player."
          </p>
        </div>

        {interactive && onAction && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onAction}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
            >
              Start Challenge Experience
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
