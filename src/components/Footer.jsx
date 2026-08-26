import React from 'react';
import { Radio, Headphones, Target, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-dark-800/80 bg-dark-950 text-slate-400 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
                <Radio className="w-4 h-4 text-cyber-cyan" />
              </div>
              <span className="font-outfit font-black text-xl text-white tracking-wider">
                ECHOFORM
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              An interactive sound & design context competition created for the Digital Design Club. Transform audio inspiration into high-impact digital experiences.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-cyber-cyan" />
                1 Sound
              </span>
              <span>+</span>
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-cyber-pink" />
                1 Context
              </span>
              <span>=</span>
              <span className="text-cyber-purple font-semibold">Infinite Design</span>
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-semibold text-white text-sm tracking-wider uppercase mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/#about" className="hover:text-cyber-cyan transition-colors">About ECHOFORM</a></li>
              <li><a href="/#workflow" className="hover:text-cyber-cyan transition-colors">Event Workflow</a></li>
              <li><a href="/#rules" className="hover:text-cyber-cyan transition-colors">Design Freedom Rules</a></li>
              <li><a href="/login" className="hover:text-cyber-cyan transition-colors">Gameroom Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-semibold text-white text-sm tracking-wider uppercase mb-3">
              Organizers
            </h4>
            <p className="text-xs text-slate-400 mb-2">
              Hosted by <strong className="text-slate-200">Digital Design Club</strong>.
            </p>
            <p className="text-xs text-slate-500">
              For event inquiries or judge access, contact the admin desk.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-dark-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 ECHOFORM. Digital Design Club. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Sparkles className="w-3 h-3 text-cyber-cyan" /> for designers & creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
