'use client';

import React from 'react';
import { Sparkles, ArrowRight, Play, ShieldCheck, Compass } from 'lucide-react';

interface NavbarProps {
  onAnalyzeClick: () => void;
  onDemoClick: () => void;
  isAnalyzing?: boolean;
}

export default function Navbar({ onAnalyzeClick, onDemoClick, isAnalyzing }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070b14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow flex items-center justify-center">
            <div className="h-full w-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Compass className="h-5 w-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                SKILLPATH<span className="text-indigo-400"> AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                PROTOTYPE
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">
              Evidence-Based Career Readiness Engine
            </p>
          </div>
        </div>

        {/* Center / Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300 font-medium">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#scoring-model" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Evidence Model
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            id="nav-demo-btn"
            type="button"
            onClick={onDemoClick}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 hover:border-slate-500 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400/30" />
            <span>Try Demo</span>
          </button>

          <button
            id="nav-analyze-btn"
            type="button"
            onClick={onAnalyzeClick}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-glow hover:shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <span>Analyze My Career</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
