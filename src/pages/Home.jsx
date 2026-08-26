import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Target, Sparkles, ArrowRight, Play, Pause, Radio, DoorOpen, CheckCircle2 } from 'lucide-react';
import AudioWaveformCanvas from '../components/AudioWaveformCanvas';
import Countdown from '../components/Countdown';
import { playSynthSound, stopSynthSound } from '../audio/soundSynth';
import { INITIAL_SOUNDS } from '../utils/constants';

export default function Home() {
  const [playingSoundId, setPlayingSoundId] = useState(null);

  const toggleSoundPreview = (sound) => {
    if (playingSoundId === sound.id) {
      stopSynthSound();
      setPlayingSoundId(null);
    } else {
      stopSynthSound();
      playSynthSound(sound.synthType || sound.name, 0.7);
      setPlayingSoundId(sound.id);
    }
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        
        {/* Glowing Background FX */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyber-cyan/15 via-cyber-purple/20 to-cyber-pink/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Top Club Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900/90 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-widest uppercase shadow-lg shadow-cyber-cyan/10 animate-float">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Digital Design Club Presents</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-outfit font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
              ECHOFORM
            </h1>
            <p className="font-outfit font-bold text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink tracking-wide">
              HEAR IT. INTERPRET IT. DESIGN IT.
            </p>
          </div>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Audio Soundscape 🎧 + Design Context 🎯 = Pure Creative Direction.
            <br />
            Transform mystery audio inspiration into high-impact digital experiences.
          </p>

          {/* Audio Visualizer Hero Wave */}
          <div className="max-w-3xl mx-auto my-8">
            <AudioWaveformCanvas isPlaying={true} height={100} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink text-dark-950 font-outfit font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-cyber-cyan/25 hover:scale-105 transition-all duration-300"
            >
              <DoorOpen className="w-6 h-6" />
              JOIN GAMEROOM / LOGIN
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-12">
            <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="block font-outfit font-black text-2xl text-cyber-cyan">Gamerooms</span>
              <span className="text-xs text-slate-400 font-mono">Admin Managed</span>
            </div>
            <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="block font-outfit font-black text-2xl text-cyber-pink">30+ Audio</span>
              <span className="text-xs text-slate-400 font-mono">Procedural Soundscapes</span>
            </div>
            <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="block font-outfit font-black text-2xl text-cyber-purple">12 Contexts</span>
              <span className="text-xs text-slate-400 font-mono">Design Directions</span>
            </div>
            <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="block font-outfit font-black text-2xl text-cyber-emerald">Audio-First</span>
              <span className="text-xs text-slate-400 font-mono">No Text Words Reveal</span>
            </div>
          </div>

        </div>

      </section>

      {/* EVENT COUNTDOWN BANNER */}
      <section className="max-w-4xl mx-auto px-4">
        <Countdown />
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyber-cyan uppercase font-bold">
            THE COMPETITION ARCHITECTURE
          </span>
          <h2 className="font-outfit font-black text-3xl sm:text-5xl text-white">
            How ECHOFORM Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            ECHOFORM eliminates registration friction. Admins create Gamerooms; teams log in directly with their Team Name & Gameroom ID.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="bg-dark-900/80 border border-dark-800 rounded-2xl p-6 relative group hover:border-cyber-cyan/50 transition-all">
            <span className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono font-bold flex items-center justify-center text-sm mb-4">
              01
            </span>
            <h3 className="font-outfit font-bold text-lg text-white mb-2">Join Gameroom</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Teams enter their Team Name and Gameroom ID (e.g. ROOM-101) to enter the active challenge portal instantly.
            </p>
          </div>

          <div className="bg-dark-900/80 border border-dark-800 rounded-2xl p-6 relative group hover:border-cyber-purple/50 transition-all">
            <span className="w-8 h-8 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple font-mono font-bold flex items-center justify-center text-sm mb-4">
              02
            </span>
            <h3 className="font-outfit font-bold text-lg text-white mb-2">Audio-First Reveal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Assigned audio plays directly without text labels. Listen to interpret the sound, followed by your text context reveal.
            </p>
          </div>

          <div className="bg-dark-900/80 border border-dark-800 rounded-2xl p-6 relative group hover:border-cyber-pink/50 transition-all">
            <span className="w-8 h-8 rounded-lg bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink font-mono font-bold flex items-center justify-center text-sm mb-4">
              03
            </span>
            <h3 className="font-outfit font-bold text-lg text-white mb-2">Design & Interpret</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Translate what you hear into a digital user experience, web prototype, UI dashboard, or interactive product design.
            </p>
          </div>

          <div className="bg-dark-900/80 border border-dark-800 rounded-2xl p-6 relative group hover:border-cyber-emerald/50 transition-all">
            <span className="w-8 h-8 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono font-bold flex items-center justify-center text-sm mb-4">
              04
            </span>
            <h3 className="font-outfit font-bold text-lg text-white mb-2">Submit Work</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit your Figma, prototype, or GitHub link along with your audio rationale before the event timer expires.
            </p>
          </div>

        </div>
      </section>

      {/* SAMPLE SOUND & CONTEXT PAIRS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-dark-800 pb-6">
          <div>
            <span className="text-xs font-mono text-cyber-pink uppercase font-bold tracking-wider">
              AUDIO PREVIEW LIBRARY
            </span>
            <h2 className="font-outfit font-black text-3xl text-white mt-1">
              Sample Procedural Soundscapes
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md font-mono">
            Click any sound below to test the browser procedural synth engine live!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_SOUNDS.slice(0, 6).map((sound) => (
            <div
              key={sound.id}
              onClick={() => toggleSoundPreview(sound)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                playingSoundId === sound.id
                  ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-lg shadow-cyber-cyan/20'
                  : 'bg-dark-900/60 border-dark-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  playingSoundId === sound.id ? 'bg-cyber-cyan text-dark-950 font-bold' : 'bg-dark-950 text-cyber-cyan border border-cyber-cyan/30'
                }`}>
                  {playingSoundId === sound.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-white">{sound.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">{sound.description}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-dark-950 border border-dark-800 text-slate-400">
                {playingSoundId === sound.id ? 'PLAYING' : 'PREVIEW'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DESIGN FREEDOM SECTION */}
      <section id="rules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border border-dark-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-mono text-cyber-purple tracking-widest uppercase font-bold">
              UNLIMITED CREATIVE OUTPUT
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl text-white leading-tight">
              Design Freedom: You Decide What To Build.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              ECHOFORM does not fix your output format. If your assignment pairs an audio soundscape with <strong className="text-cyber-pink font-bold">Café</strong>, you could build:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0" />
                <span>Café Web App</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-cyber-purple shrink-0" />
                <span>Ordering Interface</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-cyber-pink shrink-0" />
                <span>Loyalty Experience</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-cyber-emerald shrink-0" />
                <span>Sound Dashboard</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-cyber-amber shrink-0" />
                <span>Interactive Prototype</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0" />
                <span>Brand Experience</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
