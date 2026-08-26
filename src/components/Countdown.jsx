import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { calculateTimeRemaining } from '../utils/timer';
import { getEventDetails } from '../services/event';

export default function Countdown({ compact = false }) {
  const [eventData, setEventData] = useState(getEventDetails());
  const [timer, setTimer] = useState(() => 
    calculateTimeRemaining(eventData.date, eventData.startTime, eventData.endTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const details = getEventDetails();
      setEventData(details);
      setTimer(calculateTimeRemaining(details.date, details.startTime, details.endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs shadow-lg shadow-cyber-cyan/10">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
        <span className="font-bold tracking-wider">{timer.hours}:{timer.minutes}:{timer.seconds}</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-dark-900/90 border border-dark-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden text-center">
      
      <div className="flex items-center justify-center gap-2 text-slate-400 font-mono text-xs tracking-widest uppercase mb-3">
        <Clock className="w-4 h-4 text-cyber-cyan animate-spin" style={{ animationDuration: '6s' }} />
        <span>{timer.statusText}</span>
      </div>

      {timer.isEnded ? (
        <div className="py-4 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-outfit font-black text-xl">
            <AlertTriangle className="w-6 h-6" />
            TIME'S UP! ECHOFORM HAS ENDED
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Submissions are now closed for evaluation by judges.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 sm:gap-6 py-2">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-950 border border-cyber-cyan/30 flex items-center justify-center font-mono font-black text-2xl sm:text-4xl text-cyber-cyan shadow-lg shadow-cyber-cyan/10">
              {timer.hours}
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase mt-2">Hours</span>
          </div>

          <span className="font-mono text-2xl sm:text-4xl text-cyber-cyan/50 font-bold mb-5">:</span>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-950 border border-cyber-purple/30 flex items-center justify-center font-mono font-black text-2xl sm:text-4xl text-cyber-purple shadow-lg shadow-cyber-purple/10">
              {timer.minutes}
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase mt-2">Minutes</span>
          </div>

          <span className="font-mono text-2xl sm:text-4xl text-cyber-purple/50 font-bold mb-5">:</span>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-950 border border-cyber-pink/30 flex items-center justify-center font-mono font-black text-2xl sm:text-4xl text-cyber-pink shadow-lg shadow-cyber-pink/10">
              {timer.seconds}
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase mt-2">Seconds</span>
          </div>

        </div>
      )}

      <div className="mt-4 pt-3 border-t border-dark-800/60 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-cyber-emerald" />
        <span>Server Controlled Event Window ({eventData.startTime} - {eventData.endTime})</span>
      </div>

    </div>
  );
}
