import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAssignmentByTeamId } from '../services/assignments';
import { getSubmissionByTeamId } from '../services/submissions';
import ChallengeCard from '../components/ChallengeCard';
import Countdown from '../components/Countdown';
import { Sparkles, FileText, Headphones, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TeamDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const team = currentUser?.team || { id: 'EF-001', teamName: 'Neon Wave Studio' };

  const assignment = getAssignmentByTeamId(team.id);
  const submission = getSubmissionByTeamId(team.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="border-b border-dark-800 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-cyber-cyan uppercase font-bold tracking-widest">
            TEAM PARTICIPANT HUB
          </span>
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white mt-1">
            Welcome, {team.teamName} ({team.id})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/reveal"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-dark-950 font-outfit font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            Reveal Room
          </Link>
          <Link
            to="/submit"
            className="px-5 py-2.5 rounded-xl bg-dark-900 border border-dark-700 text-slate-200 text-sm font-bold flex items-center gap-2 hover:border-cyber-pink"
          >
            <FileText className="w-4 h-4 text-cyber-pink" />
            Submission Portal
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {assignment ? (
            <ChallengeCard
              sound={assignment.sound}
              context={assignment.context}
              team={team}
              interactive={true}
              onAction={() => navigate('/challenge')}
            />
          ) : (
            <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 text-center space-y-3">
              <p className="text-slate-400 font-mono text-sm">
                No assignment generated yet. Organizer is preparing challenge matrix.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Countdown />

          {submission ? (
            <div className="bg-dark-900 border border-cyber-emerald/30 rounded-3xl p-6 space-y-2">
              <span className="text-[10px] font-mono text-cyber-emerald uppercase font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SUBMITTED WORK RECORDED
              </span>
              <h4 className="font-outfit font-bold text-white text-base">{submission.projectName}</h4>
              <p className="text-xs text-slate-400 font-mono line-clamp-2">{submission.description}</p>
            </div>
          ) : (
            <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 space-y-3 text-center">
              <p className="text-xs text-slate-400 font-mono">No work submitted yet.</p>
              <Link to="/submit" className="inline-block px-4 py-2 rounded-xl bg-cyber-pink text-dark-950 font-bold text-xs">
                Submit Design Work
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
