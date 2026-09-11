'use client';

import React from 'react';
import { TrendingUp, ArrowDown, Clock, BookOpen, CheckCircle2, ChevronRight, Zap, Target } from 'lucide-react';
import { RoadmapStep } from '@/lib/types';

interface FastestPathProps {
  initialReadiness: number;
  targetReadiness: number;
  steps: RoadmapStep[];
}

export default function FastestPath({ initialReadiness, targetReadiness, steps }: FastestPathProps) {
  const netGain = targetReadiness - initialReadiness;

  return (
    <div className="space-y-8">
      {/* Header & Impact Summary */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
        <div className="ambient-glow bg-cyan-500/20 -top-20 -right-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Algorithmic Optimization</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Fastest Path to Job Ready
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Sequences learning by addressing foundational dependencies and high-weight job responsibilities first for maximum efficiency.
            </p>
            <p className="text-xs text-slate-400 mt-1 italic">
              Notice: Uses estimated impact based on profile evidence; not a guaranteed hiring outcome.
            </p>
          </div>

          {/* Score Jump Gauge */}
          <div className="flex items-center gap-4 bg-[#090d16] p-4 rounded-xl border border-white/10 flex-shrink-0">
            <div className="text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Current</span>
              <span className="text-2xl font-display font-extrabold text-slate-200">
                {initialReadiness}%
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                <Zap className="h-3 w-3 fill-emerald-400" />
                +{netGain} pts
              </span>
              <div className="w-16 h-1 bg-gradient-to-r from-slate-600 via-cyan-400 to-emerald-400 rounded-full my-1" />
              <span className="text-[10px] text-slate-500">Estimated</span>
            </div>

            <div className="text-center">
              <span className="text-xs text-cyan-300 uppercase font-semibold block">Target</span>
              <span className="text-2xl font-display font-extrabold text-emerald-400">
                {targetReadiness}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Roadmap Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-400 before:to-emerald-400">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            {/* Step Number Dot */}
            <div className="absolute -left-[31px] sm:-left-[35px] top-1.5 h-8 w-8 rounded-full bg-[#090d16] border-2 border-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-glow-cyan z-10">
              {step.step_number}
            </div>

            {/* Step Card */}
            <div className="glass-panel-interactive rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Step {step.step_number} Priority Focus
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {step.estimated_time}
                    </span>
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mt-1">
                    {step.skill_name}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 fill-emerald-400/20" />
                    +{step.estimated_readiness_increase} pts estimated impact
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
                    Projected: {step.projected_total_readiness}%
                  </div>
                </div>
              </div>

              {/* Why it matters */}
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Strategic Value:</strong> {step.why_it_matters}
              </p>

              {/* Prerequisites */}
              {step.prerequisites.length > 0 && (
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-300">Prerequisites required:</span>
                  {step.prerequisites.map((req, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              )}

              {/* Recommended Topics */}
              <div className="bg-[#090d16] rounded-xl p-4 border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Curated Learning Topics:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {step.recommended_topics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Exercise */}
              <div className="text-xs text-emerald-300 bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-2">
                <Target className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-200">Suggested Action Exercise: </span>
                  {step.suggested_exercise}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
