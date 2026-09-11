'use client';

import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  onComplete?: () => void;
}

const STAGES = [
  { label: 'Extracting candidate skills from resume & projects', duration: 400 },
  { label: 'Analyzing evidence confidence & practical usage signals', duration: 450 },
  { label: 'Comparing competencies against target job requirements', duration: 450 },
  { label: 'Identifying critical & developing skill gaps', duration: 400 },
  { label: 'Synthesizing Fastest Path career acceleration roadmap', duration: 400 }
];

export default function LoadingState() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < STAGES.length - 1) return prev + 1;
        return prev;
      });
    }, 420);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStage + 1) / STAGES.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14]/90 backdrop-blur-xl px-4">
      <div className="max-w-md w-full glass-panel-glow rounded-3xl p-8 text-center relative overflow-hidden border border-indigo-500/30">
        
        {/* Glow orb */}
        <div className="ambient-glow bg-indigo-500/30 -top-20 -left-20" />

        {/* Compass Animation */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px] shadow-glow">
            <div className="h-full w-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
              <Compass className="h-8 w-8 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-1">
          Analyzing Your Career Profile...
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Calculating evidence-based readiness from multi-source signals
        </p>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 rounded-full h-2.5 mb-6 overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Animated Stages */}
        <div className="space-y-3 text-left">
          {STAGES.map((stage, idx) => {
            const isDone = idx < currentStage;
            const isCurrent = idx === currentStage;
            const isPending = idx > currentStage;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-200'
                    : isDone
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span className="text-xs font-medium">{stage.label}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 mt-6 flex items-center justify-center gap-1.5">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          Deterministic evidence model active
        </p>
      </div>
    </div>
  );
}
