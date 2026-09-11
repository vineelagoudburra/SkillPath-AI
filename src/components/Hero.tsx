'use client';

import React from 'react';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Cpu,
  Layers,
  FileCheck2,
  ShieldCheck,
  ChevronRight,
  Code2
} from 'lucide-react';

interface HeroProps {
  onAnalyzeClick: () => void;
  onDemoClick: () => void;
}

export default function Hero({ onAnalyzeClick, onDemoClick }: HeroProps) {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Evidence-Based Career Readiness Engine</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-300">Hackathon Edition</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Know where you stand.{' '}
            <span className="gradient-text-accent block sm:inline">
              Know what to learn next.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            Turn your resume, projects and target job into an evidence-based career readiness profile.
            Never guess what skills matter or why you fall short.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            id="hero-analyze-btn"
            type="button"
            onClick={onAnalyzeClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white shadow-glow hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 active:scale-98"
          >
            <span>Analyze My Career</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            id="hero-demo-btn"
            type="button"
            onClick={onDemoClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-98 group"
          >
            <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
            </div>
            <div className="text-left">
              <span className="block leading-none">Try Demo</span>
              <span className="text-[11px] text-slate-400 font-normal">Under 2 min walkthrough</span>
            </div>
          </button>
        </div>

        {/* Visual Preview of the Career Dashboard */}
        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-100 transition duration-1000 -z-10" />
          
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
            {/* Header Mockup */}
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Candidate Analysis Preview</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  Aarav Sharma → <span className="text-indigo-400">Python Backend Developer</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  High Confidence (3 Sources)
                </span>
              </div>
            </div>

            {/* Dashboard Body Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
              {/* Circular Readiness Score Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090d16]/70 border border-white/5">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="score-circle-bg"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#hero-gradient)"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="70.3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-display font-black text-white">72<span className="text-indigo-400 text-lg">/100</span></span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Readiness</span>
                  </div>
                </div>

                <div className="text-center mt-3">
                  <h4 className="font-semibold text-sm text-slate-200">Estimated Job Readiness</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Estimated from available resume, project and assessment evidence.
                  </p>
                </div>
              </div>

              {/* Strengths & Gaps Mockup */}
              <div className="lg:col-span-7 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">Python OOP</span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                          78% Readiness
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">✓ Mentioned in resume • ✓ 2 Projects • ✓ Assessment (76%)</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Strong</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">REST APIs & Web Services</span>
                        <span className="text-[11px] font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded">
                          41% Readiness
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Critical Gap • Required in 4 core job responsibilities</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-rose-400">Critical Gap</span>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                    <div>
                      <span className="font-semibold text-xs sm:text-sm text-indigo-200">Fastest Path: REST APIs → Django → Docker</span>
                      <p className="text-[11px] text-indigo-300/80">Projected estimated readiness jump: 67% → 86%</p>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1">
                    +19 pts <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel-interactive rounded-2xl p-6 relative overflow-hidden">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
              <FileCheck2 className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              1. Evidence-Based Analysis
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              &quot;Understand why a skill is considered strong or weak.&quot;
            </p>
            <p className="text-xs text-slate-400">
              Correlates resume claims, project implementations, and optional validation tests instead of relying on subjective claims.
            </p>
          </div>

          <div className="glass-panel-interactive rounded-2xl p-6 relative overflow-hidden">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              2. Fastest Path
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              &quot;Discover which skills to learn first for maximum job-readiness impact.&quot;
            </p>
            <p className="text-xs text-slate-400">
              Generates a sequential roadmap addressing highest-impact prerequisites first, estimating measurable readiness gains.
            </p>
          </div>

          <div className="glass-panel-interactive rounded-2xl p-6 relative overflow-hidden">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
              <Code2 className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              3. Project Upgrader
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              &quot;Turn your existing projects into stronger evidence for your target role.&quot;
            </p>
            <p className="text-xs text-slate-400">
              Identifies missing architectural capabilities in your current portfolio and maps practical 4-step upgrade sequences.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
