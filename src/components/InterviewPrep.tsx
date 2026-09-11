'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Award,
  Sparkles,
  TrendingUp,
  Compass
} from 'lucide-react';
import { InterviewQuestionItem, JobComparisonItem } from '@/lib/types';

interface InterviewPrepProps {
  questions: InterviewQuestionItem[];
  jobComparisons: JobComparisonItem[];
}

export default function InterviewPrep({ questions, jobComparisons }: InterviewPrepProps) {
  const [activeTab, setActiveTab] = useState<'interview' | 'jobs'>('interview');
  const [expandedQId, setExpandedQId] = useState<string | null>(questions[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedQId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header with Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
        <div>
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-400" />
            Interview Preparation &amp; Multi-Job Fit
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Targeted interview questions generated from your identified skill gaps and job description requirements.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-[#090d16] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'interview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interview Questions ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'jobs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Role Comparison ({jobComparisons.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Interview Questions */}
      {activeTab === 'interview' && (
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const isExpanded = expandedQId === q.id;

            return (
              <div
                key={q.id}
                className="glass-panel-interactive rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-5 cursor-pointer flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                        {q.question_type}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">Targeting: {q.targeted_skill}</span>
                    </div>
                    <h4 className="text-base font-display font-semibold text-white leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400 flex-shrink-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                {/* Expanded Answer Helper */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/[0.06] space-y-4 text-xs bg-[#090d16]/60">
                    {/* Why Asked */}
                    <div>
                      <span className="text-slate-400 font-semibold block mb-0.5">Why Interviewers Ask This:</span>
                      <p className="text-slate-300 leading-relaxed">{q.why_asked}</p>
                    </div>

                    {/* Expected Concepts */}
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1.5">Expected Key Concepts to Mention:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.expected_concepts.map((concept, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2 text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                            <span>{concept}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Answer Structure */}
                    <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-200">
                      <strong className="text-indigo-300 font-semibold">Recommended Answer Framework: </strong>
                      {q.recommended_structure}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Job Comparison */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#090d16] border border-white/5 text-xs text-slate-300">
            Compare how your currently evidenced skillset translates across related roles in the software ecosystem.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobComparisons.map((job, idx) => (
              <div
                key={idx}
                className={`glass-panel-interactive rounded-2xl p-6 border flex flex-col justify-between relative overflow-hidden ${
                  job.is_best_fit
                    ? 'border-indigo-500/50 shadow-glow'
                    : 'border-white/10'
                }`}
              >
                <div>
                  {job.is_best_fit && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
                      <Sparkles className="h-3 w-3" />
                      Best Current Fit
                    </div>
                  )}

                  <h4 className="text-lg font-display font-bold text-white mb-2">
                    {job.title}
                  </h4>

                  {/* Match Meter */}
                  <div className="bg-[#090d16] p-3 rounded-xl border border-white/5 mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Match Readiness</span>
                      <span className="font-extrabold text-white text-base">{job.match_score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          job.match_score >= 80 ? 'bg-emerald-400' : job.match_score >= 70 ? 'bg-indigo-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${job.match_score}%` }}
                      />
                    </div>
                  </div>

                  {/* Matched skills */}
                  <div className="space-y-2 text-xs mb-4">
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">Strong Match:</span>
                      <div className="flex flex-wrap gap-1">
                        {job.key_matched_skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">Primary Gaps:</span>
                      <div className="flex flex-wrap gap-1">
                        {job.top_missing_skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]"
                          >
                            ✕ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span>Market Demand: <strong className="text-slate-200">{job.demand_level}</strong></span>
                  {job.salary_range && <span>{job.salary_range}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
