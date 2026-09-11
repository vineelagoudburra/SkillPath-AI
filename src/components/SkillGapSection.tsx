'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, Info, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { SkillGapItem } from '@/lib/types';

interface SkillGapSectionProps {
  gaps: SkillGapItem[];
}

export default function SkillGapSection({ gaps }: SkillGapSectionProps) {
  const criticalGaps = gaps.filter(g => g.importance === 'Critical');
  const importantGaps = gaps.filter(g => g.importance === 'Important');
  const niceToHaveGaps = gaps.filter(g => g.importance === 'Nice to Have');

  const renderGapGroup = (
    items: SkillGapItem[],
    groupTitle: string,
    badgeColor: string,
    icon: React.ReactNode,
    description: string
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            {icon}
            <h4 className="text-base font-display font-bold text-white tracking-wide">
              {groupTitle} ({items.length})
            </h4>
          </div>
          <span className="text-xs text-slate-400">{description}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((gap, idx) => (
            <div
              key={idx}
              className="glass-panel-interactive rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {gap.category}
                    </span>
                    <h5 className="text-lg font-display font-bold text-white">
                      {gap.skill_name}
                    </h5>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
                    {gap.importance}
                  </span>
                </div>

                {/* Gap Comparison: Current vs Required */}
                <div className="bg-[#090d16] rounded-xl p-3 border border-white/5 my-3">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">
                      Current Readiness: <strong className="text-white">{gap.current_readiness}%</strong>
                    </span>
                    <span className="text-indigo-300 font-semibold">
                      Target Expectation: {gap.required_level}%
                    </span>
                  </div>

                  {/* Dual comparison bar */}
                  <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-indigo-500/30 rounded-full"
                      style={{ width: `${gap.required_level}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${gap.current_readiness}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                    <span>Submitted Evidence</span>
                    <span>Required Level</span>
                  </div>
                </div>

                {/* Why it matters */}
                <div className="space-y-1.5 text-xs text-slate-300 mb-3">
                  <p className="flex items-start gap-1.5">
                    <strong className="text-slate-200 font-semibold flex-shrink-0">Job Impact:</strong>
                    <span>{gap.job_importance_reason}</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <strong className="text-slate-200 font-semibold flex-shrink-0">Evidence Status:</strong>
                    <span className="text-slate-400">{gap.evidence_summary}</span>
                  </p>
                </div>
              </div>

              {/* Actionable Tip & Impact Points */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <Zap className="h-3.5 w-3.5 fill-emerald-400/20" />
                  <span>+{gap.estimated_impact_points} pts estimated readiness impact</span>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                  Priority Gap
                </div>
              </div>

              <div className="mt-2 text-[11px] text-indigo-300 bg-indigo-950/30 border border-indigo-500/20 p-2 rounded-lg">
                💡 <span className="font-semibold">Recommended Action:</span> {gap.actionable_tip}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-2">
        <div>
          <h3 className="text-xl font-display font-bold text-white">
            What&apos;s Standing Between You and This Job?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Prioritized by practical importance to the target job description. Focus on Critical gaps first.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
            {gaps.length} Total Gaps Detected
          </span>
        </div>
      </div>

      {renderGapGroup(
        criticalGaps,
        'Critical Gaps',
        'bg-rose-500/10 text-rose-400 border-rose-500/30',
        <AlertCircle className="h-5 w-5 text-rose-400" />,
        'Appears in core responsibilities; highest hiring friction'
      )}

      {renderGapGroup(
        importantGaps,
        'Important Gaps',
        'bg-amber-500/10 text-amber-400 border-amber-500/30',
        <AlertTriangle className="h-5 w-5 text-amber-400" />,
        'Strongly preferred; expected for mid-tier competence'
      )}

      {renderGapGroup(
        niceToHaveGaps,
        'Nice to Have',
        'bg-sky-500/10 text-sky-400 border-sky-500/30',
        <Info className="h-5 w-5 text-sky-400" />,
        'Differentiators that elevate candidate profiles'
      )}
    </div>
  );
}
