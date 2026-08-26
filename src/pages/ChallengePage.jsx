import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAssignmentByTeamId } from '../services/assignments';
import Countdown from '../components/Countdown';
import AudioPlayer from '../components/AudioPlayer';
import ChallengeCard from '../components/ChallengeCard';
import { Radio, FileText, HelpCircle, ShieldCheck, Sparkles, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function ChallengePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const team = currentUser?.team || { id: 'EF-001', teamName: 'Neon Wave Studio' };
  const assignment = getAssignmentByTeamId(team.id);

  const [showRules, setShowRules] = useState(false);

  if (!assignment) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-cyber-amber mx-auto" />
          <h2 className="font-outfit font-black text-2xl text-white">No Challenge Assigned Yet</h2>
          <p className="text-xs text-slate-400 font-mono">
            The organizer has not generated assignments for team {team.id} yet. Check back soon.
          </p>
          <Link to="/reveal" className="inline-block px-6 py-2.5 rounded-xl bg-cyber-cyan text-dark-950 font-bold text-sm">
            Check Reveal Room
          </Link>
        </div>
      </div>
    );
  }

  const { sound, context, revealed } = assignment;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-dark-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-ping"></span>
            <span className="text-xs font-mono text-cyber-cyan uppercase font-bold tracking-widest">
              ACTIVE CHALLENGE ROOM • TEAM {team.id}
            </span>
          </div>
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white mt-1">
            {team.teamName} Challenge
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/reveal')}
            className="px-4 py-2 rounded-xl bg-dark-900 border border-dark-700 hover:border-cyber-purple text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Re-watch Reveal
          </button>
          <Link
            to="/submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-105 transition-transform"
          >
            <FileText className="w-4 h-4" />
            Submit Design Work
          </Link>
        </div>
      </div>

      {/* Main Grid: Left Challenge Info & Audio, Right Countdown & Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Challenge Card & Audio Player */}
        <div className="lg:col-span-2 space-y-8">
          
          <ChallengeCard sound={sound} context={context} team={team} />

          {/* Dedicated Audio Player */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-outfit font-bold text-xl text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyber-cyan" />
                Assigned Audio Player & Waveform Visualizer
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Unlimited Replays
              </span>
            </div>
            <AudioPlayer sound={sound} />
          </div>

        </div>

        {/* Right Col: Event Timer & Quick Rules */}
        <div className="space-y-6">
          
          {/* Countdown Card */}
          <Countdown />

          {/* Quick Rules Card */}
          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-outfit font-bold text-white text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyber-purple" />
                Challenge Guidelines
              </h4>
              <button
                onClick={() => setShowRules(!showRules)}
                className="text-xs font-mono text-cyber-cyan hover:underline"
              >
                {showRules ? 'Hide Rules' : 'View Full Rules'}
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Create any digital experience (web app, mobile prototype, UI dashboard, branding, interactive media) connecting your assigned audio soundscape and context: <strong className="text-cyber-pink">{context?.name}</strong>.
            </p>

            {showRules && (
              <div className="pt-3 border-t border-dark-800 space-y-2 text-xs text-slate-300 font-mono">
                <p>• Output format is 100% flexible (Figma, React, Code, Prototype).</p>
                <p>• Submit before the event timer expires.</p>
                <p>• Include Figma, Prototype, or GitHub link.</p>
                <p>• Listen to audio directly to interpret the soundscape into your UI layout.</p>
              </div>
            )}

            <Link
              to="/submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
            >
              Submit Project Now
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
