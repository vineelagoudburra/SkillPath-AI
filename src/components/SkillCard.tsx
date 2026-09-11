'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Award, Check } from 'lucide-react';
import { SkillEvidence, SkillStatus } from '@/lib/types';

interface SkillCardProps {
  skill: SkillEvidence;
  onValidateClick?: (skillName: string) => void;
}

export default function SkillCard({ skill, onValidateClick }: SkillCardProps) {
  // Status style helpers
  const getStatusBadge = (status: SkillStatus) => {
    switch (status) {
      case 'Strong':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          bar: 'bg-emerald-400',
          label: 'Strong'
        };
      case 'Developing':
        return {
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          bar: 'bg-sky-400',
          label: 'Developing'
        };
      case 'Gap':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          bar: 'bg-amber-400',
          label: 'Gap'
        };
      case 'Critical Gap':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          bar: 'bg-rose-500',
          label: 'Critical Gap'
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          bar: 'bg-slate-400',
          label: status
        };
    }
  };

  const statusInfo = getStatusBadge(skill.status);

  return (
    <div className="glass-panel-interactive rounded-2xl p-5 border border-white/10 flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {skill.category}
            </span>
            <h4 className="text-lg font-display font-bold text-white mt-0.5">
              {skill.skill_name}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.bg}`}
            >
              {statusInfo.label}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
              {skill.job_requirement}
            </span>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-200">
              {skill.skill_name} Skill Readiness: <strong className="text-white">{skill.skill_readiness}%</strong>
            </span>
            <span className="text-slate-400 text-[11px]">
              Evidence: {skill.evidence_strength}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${statusInfo.bar}`}
              style={{ width: `${Math.max(5, skill.skill_readiness)}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-500 mt-1">
            Estimated from available resume, project and assessment evidence.
          </p>
        </div>

        {/* Evidence Checkmarks */}
        <div className="space-y-1.5 py-3 border-y border-white/[0.06] text-xs">
          {/* Resume */}
          <div className="flex items-center gap-2">
            {skill.resume_evidence ? (
              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
            )}
            <span className={skill.resume_evidence ? 'text-slate-200' : 'text-slate-500'}>
              {skill.resume_evidence ? 'Mentioned in resume' : 'Resume evidence not found'}
            </span>
          </div>

          {/* Projects */}
          <div className="flex items-center gap-2">
            {skill.project_evidence_count > 0 ? (
              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
            )}
            <span className={skill.project_evidence_count > 0 ? 'text-slate-200' : 'text-slate-500'}>
              {skill.project_evidence_count > 0
                ? `Used in ${skill.project_evidence_count} project${skill.project_evidence_count > 1 ? 's' : ''}`
                : 'Project evidence not found'}
            </span>
          </div>

          {/* Assessment */}
          <div className="flex items-center gap-2">
            {skill.assessment_score !== null ? (
              <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
            ) : (
              <div className="h-3.5 w-3.5 rounded-full border border-slate-700 flex-shrink-0" />
            )}
            <span className={skill.assessment_score !== null ? 'text-slate-200' : 'text-slate-500'}>
              {skill.assessment_score !== null
                ? `Assessment completed: ${skill.assessment_score}%`
                : 'Assessment optional (not taken)'}
            </span>
          </div>
        </div>

        {/* Explanation */}
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          {skill.explanation}
        </p>
      </div>

      {/* Validate button if no assessment yet */}
      {skill.assessment_score === null && onValidateClick && (
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-end">
          <button
            type="button"
            onClick={() => onValidateClick(skill.skill_name)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all"
          >
            <Award className="h-3 w-3" />
            Validate via 5-Q Test
          </button>
        </div>
      )}
    </div>
  );
}
