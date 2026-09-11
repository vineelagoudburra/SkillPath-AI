'use client';

import React, { useState } from 'react';
import {
  Code2,
  FolderGit2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { ProjectMatch } from '@/lib/types';

interface ProjectUpgraderProps {
  projectMatches: ProjectMatch[];
}

export default function ProjectUpgrader({ projectMatches }: ProjectUpgraderProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!projectMatches || projectMatches.length === 0) {
    return (
      <div className="p-8 text-center glass-panel rounded-2xl border border-white/10">
        <FolderGit2 className="h-8 w-8 mx-auto text-slate-500 mb-2" />
        <p className="text-sm text-slate-400">No project evidence submitted to upgrade.</p>
      </div>
    );
  }

  const project = projectMatches[selectedIdx] || projectMatches[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
        <div>
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-400" />
            Project-to-Job Matching &amp; AI Upgrader
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Evaluate how your existing portfolio maps to role requirements and unlock concrete step-by-step upgrade paths.
          </p>
        </div>

        {/* Project Selector Tabs if multiple */}
        {projectMatches.length > 1 && (
          <div className="flex items-center gap-2 bg-[#090d16] p-1 rounded-xl border border-white/10">
            {projectMatches.map((p, idx) => (
              <button
                key={p.project_id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedIdx === idx
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.project_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Project Overview Card */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-emerald-400">Selected Portfolio Evidence</span>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 ml-2 underline"
                >
                  View Repository <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <h4 className="text-2xl font-display font-bold text-white mt-1">
              {project.project_name}
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {project.project_description}
            </p>
          </div>

          {/* Project Relevance Meter */}
          <div className="bg-[#090d16] px-5 py-4 rounded-xl border border-white/10 flex items-center gap-4 flex-shrink-0">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold block">Target Job Relevance</span>
              <span className="text-2xl font-display font-extrabold text-cyan-400">
                {project.relevance_score}%
              </span>
            </div>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full"
                style={{ width: `${project.relevance_score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Demonstrated vs Missing capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Demonstrated */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Already Demonstrated In Code
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.already_demonstrated.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Missing capabilities */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
              <XCircle className="h-4 w-4 text-rose-400" />
              Missing Job-Relevant Capabilities
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.missing_capabilities.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30"
                >
                  ✕ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="p-3.5 rounded-xl bg-[#090d16] border border-white/5 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Evaluation Rationale: </strong>
          {project.match_explanation}
        </div>
      </div>

      {/* Recommended 4-Step Upgrade Sequence */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h4 className="text-lg font-display font-bold text-white">
              Recommended Upgrade Sequence
            </h4>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            Actionable Roadmap
          </span>
        </div>

        {/* Sequence Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.upgrade_plan.upgrade_sequence.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#090d16] border border-white/10 flex flex-col justify-between space-y-3 hover:border-slate-500 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    Step {step.step}
                  </span>
                  <div className="flex gap-1">
                    {step.skills_gained.map((sg, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        +{sg}
                      </span>
                    ))}
                  </div>
                </div>

                <h5 className="text-sm font-bold text-white mb-1">
                  {step.title}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Future Upgraded Resume Description (Explicitly labeled planned/recommended additions) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/30 via-slate-900/50 to-cyan-950/30 border border-indigo-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>Target Portfolio Description Preview (Recommended Future Capabilities)</span>
          </div>
          <p className="text-xs text-slate-300 font-mono bg-[#090d16]/80 p-3 rounded-lg border border-white/5 leading-relaxed">
            {project.upgrade_plan.potential_upgraded_description}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-300/80 mt-1">
            <AlertCircle className="h-3 w-3" />
            <span>
              Ethical standard: These bullet points reflect planned future additions once completed, not completed history.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
