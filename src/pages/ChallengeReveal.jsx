import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAssignmentByTeamId, markAssignmentRevealed } from '../services/assignments';
import { Headphones, Target, Sparkles, Radio, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import AudioWaveformCanvas from '../components/AudioWaveformCanvas';
import { playSynthSound, stopSynthSound } from '../audio/soundSynth';

export default function ChallengeReveal() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const teamId = currentUser?.team?.id || 'EF-001';
  const assignment = getAssignmentByTeamId(teamId);

  // Flow step: 1 = Initial Waiting, 2 = Countdown (3..2..1), 3 = Sound Reveal, 4 = Context Reveal, 5 = Final Combined
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(3);

  const soundName = assignment?.sound?.name || 'Rain + Traffic';
  const soundDesc = assignment?.sound?.description || 'Heavy rain with distant traffic';
  const contextName = assignment?.context?.name || 'Café';
  const contextIcon = assignment?.context?.icon || '☕';

  // Trigger step progression
  const handleStartReveal = () => {
    setStep(2);
    setCountdown(3);
  };

  useEffect(() => {
    let timer;
    if (step === 2) {
      if (countdown > 1) {
        timer = setTimeout(() => setCountdown(c => c - 1), 900);
      } else {
        // move to Sound Reveal
        timer = setTimeout(() => {
          setStep(3);
          playSynthSound(assignment?.sound?.synthType || soundName, 0.6);
        }, 900);
      }
    }
    return () => clearTimeout(timer);
  }, [step, countdown, assignment, soundName]);

  const handleNextStep = () => {
    if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
      markAssignmentRevealed(teamId);
      stopSynthSound();
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Animated Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyber-cyan/20 via-cyber-purple/20 to-cyber-pink/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-3xl relative z-10">
        
        {/* STEP 1: INITIAL WAITING */}
        {step === 1 && (
          <div className="bg-dark-900/90 border border-cyber-cyan/30 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl backdrop-blur-xl animate-float">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan font-mono text-xs tracking-widest uppercase">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              TEAM {teamId} • ECHOFORM 2026
            </div>

            <div className="space-y-4">
              <h1 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-wide">
                YOUR CHALLENGE IS WAITING...
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto font-mono">
                Click below to initiate the interactive challenge reveal sequence.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleStartReveal}
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink text-dark-950 font-outfit font-black text-xl tracking-wider shadow-2xl shadow-cyber-cyan/30 hover:scale-110 transition-transform duration-300"
              >
                [ REVEAL CHALLENGE ]
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: COUNTDOWN ANIMATION (3.. 2.. 1) */}
        {step === 2 && (
          <div className="text-center py-20 space-y-6">
            <span className="text-xs font-mono text-cyber-cyan tracking-widest uppercase block animate-pulse">
              SYNCHRONIZING AUDIO & CONTEXT MATRIX
            </span>
            
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-dark-900 border-2 border-cyber-cyan flex items-center justify-center mx-auto shadow-2xl shadow-cyber-cyan/30 animate-ping">
              <span className="font-outfit font-black text-6xl sm:text-8xl text-cyber-cyan">
                {countdown}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">Preparing Challenge Vectors...</p>
          </div>
        )}

        {/* STEP 3: SOUND REVEAL */}
        {step === 3 && (
          <div className="bg-dark-900/90 border border-cyber-cyan rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-float text-center">
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyber-cyan tracking-widest uppercase font-bold">
                STEP 1 OF 2 — AUDIO REVEAL 🎧
              </span>
              <h2 className="font-outfit font-black text-3xl sm:text-5xl text-white">
                YOUR ASSIGNED SOUND
              </h2>
            </div>

            <div className="bg-dark-950 border border-cyber-cyan/40 rounded-2xl p-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center mx-auto text-cyber-cyan">
                <Headphones className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-outfit font-black text-3xl text-cyber-cyan">
                Mystery Audio Track 🎧
              </h3>
              <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                (Sound title is intentionally hidden — listen closely to the active audio waveform to interpret your audio vector)
              </p>
              
              <AudioWaveformCanvas isPlaying={true} height={90} />
            </div>

            <button
              onClick={handleNextStep}
              className="px-8 py-4 rounded-xl bg-cyber-cyan text-dark-950 font-outfit font-extrabold text-base flex items-center justify-center gap-2 mx-auto shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
            >
              Next: Reveal Design Context
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        )}

        {/* STEP 4: CONTEXT REVEAL */}
        {step === 4 && (
          <div className="bg-dark-900/90 border border-cyber-pink rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-float text-center">
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyber-pink tracking-widest uppercase font-bold">
                STEP 2 OF 2 — CONTEXT REVEAL 🎯
              </span>
              <h2 className="font-outfit font-black text-3xl sm:text-5xl text-white">
                AND YOUR CONTEXT IS...
              </h2>
            </div>

            <div className="bg-dark-950 border border-cyber-pink/40 rounded-2xl p-8 space-y-4">
              <div className="text-6xl animate-pulse">
                {contextIcon}
              </div>
              <h3 className="font-outfit font-black text-4xl text-cyber-pink">
                {contextName}
              </h3>
              <p className="text-xs font-mono text-slate-400 max-w-md mx-auto">
                {assignment?.context?.description || 'Design direction framework'}
              </p>
            </div>

            <button
              onClick={handleNextStep}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-outfit font-extrabold text-base flex items-center justify-center gap-2 mx-auto shadow-lg shadow-cyber-pink/20 hover:scale-105 transition-transform"
            >
              Combine & Lock Challenge
              <Sparkles className="w-5 h-5" />
            </button>

          </div>
        )}

        {/* STEP 5: FINAL COMBINED ECHOFORM */}
        {step === 5 && (
          <div className="bg-dark-900/95 border-2 border-cyber-cyan rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center space-y-8 animate-float">
            
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4" />
              CHALLENGE OFFICIALLY UNLOCKED
            </div>

            <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white">
              YOUR ECHOFORM
            </h2>

            {/* Combined Sound + Context Box */}
            <div className="bg-dark-950 border border-dark-800 rounded-2xl p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-cyber-cyan uppercase block">Assigned Sound</span>
                    <strong className="font-outfit font-bold text-lg text-white">Mystery Audio Track</strong>
                    <span className="text-[10px] font-mono text-slate-400 block">(Audio Only)</span>
                  </div>
                </div>

                <span className="font-outfit font-black text-2xl text-cyber-purple">+</span>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyber-pink/10 border border-cyber-pink/40 flex items-center justify-center text-2xl">
                    {contextIcon}
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-cyber-pink uppercase block">Context</span>
                    <strong className="font-outfit font-bold text-xl text-white">{contextName}</strong>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-dark-800">
                <p className="font-outfit font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink">
                  NOW DESIGN WHAT YOU HEARD FOR {contextName.toUpperCase()}.
                </p>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/challenge')}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-black text-lg flex items-center justify-center gap-2 mx-auto shadow-xl shadow-cyber-cyan/30 hover:scale-105 transition-transform"
              >
                Enter Challenge Room & Play Audio
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
