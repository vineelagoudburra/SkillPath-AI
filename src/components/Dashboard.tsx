'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Code2,
  Network,
  MessageSquare,
  RefreshCw,
  Share2,
  Info,
  Download,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { CareerAnalysisResult } from '@/lib/types';
import SkillCard from './SkillCard';
import SkillGapSection from './SkillGapSection';
import FastestPath from './FastestPath';
import DependencyGraph from './DependencyGraph';
import ProjectUpgrader from './ProjectUpgrader';
import SkillAssessment from './SkillAssessment';
import InterviewPrep from './InterviewPrep';

interface DashboardProps {
  analysis: CareerAnalysisResult;
  onReset: () => void;
  onAssessmentScoreUpdate: (skillName: string, score: number) => void;
}

export default function Dashboard({
  analysis,
  onReset,
  onAssessmentScoreUpdate
}: DashboardProps) {
  // Active Tab state
  const [activeTab, setActiveTab] = useState<
    'skills' | 'gaps' | 'fastest_path' | 'dependency' | 'projects' | 'assessment' | 'interview'
  >('skills');

  // Selected skill to test in assessment
  const [assessmentSkillToTest, setAssessmentSkillToTest] = useState<string>('Python');

  // Trigger assessment from a card
  const handleValidateSkill = (skillName: string) => {
    setAssessmentSkillToTest(skillName);
    setActiveTab('assessment');
  };

  // Readiness circular stroke calculation
  const score = analysis.estimated_job_readiness;
  const circumference = 2 * Math.PI * 52; // r = 52
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (sc: number) => {
    if (sc >= 75) return '#10b981'; // emerald
    if (sc >= 60) return '#6366f1'; // indigo
    if (sc >= 45) return '#0ea5e9'; // sky
    return '#f59e0b'; // amber
  };

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Breadcrumb & Progress Stepper */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="text-white flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Profile Evidenced
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
          <span className="text-white flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Job Requirements Matched
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
          <span className="text-white flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Gaps Diagnosed
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
          <span className="text-cyan-300 font-bold flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            Roadmap Synthesized
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Analyze Another Role
          </button>
        </div>
      </div>

      {/* Hero Overview Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="ambient-glow bg-indigo-500/20 -top-20 -right-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left: Candidate & Role context */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {analysis.model_source} Active
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                {analysis.confidence_level} Confidence ({analysis.evidence_source_count} Sources)
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                {analysis.student_name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-slate-400 text-sm">Target Role:</span>
                <span className="text-lg font-bold text-indigo-400">
                  {analysis.target_role}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Analysis based on submitted resume credentials, {analysis.project_matches.length} portfolio project{analysis.project_matches.length !== 1 ? 's' : ''}, and real-world backend job requirements.
            </p>

            {/* Scoring Disclosure Tooltip Banner */}
            <div className="p-3.5 rounded-xl bg-[#090d16]/80 border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Prototype scoring model: </strong>
                Resume Evidence (35%), Project Evidence (25%), Assessment (40% when verified).
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  &quot;This score estimates job readiness from submitted evidence. It is not a measurement of total knowledge or a hiring decision.&quot;
                </span>
              </div>
            </div>
          </div>

          {/* Right: Circular Score Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090d16]/80 border border-white/5">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="score-circle-bg"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke={getScoreColor(score)}
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="score-circle-fill"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-display font-black text-white">
                  {score}<span className="text-slate-400 text-lg">/100</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">
                  Readiness
                </span>
              </div>
            </div>

            <div className="text-center mt-3">
              <h4 className="font-semibold text-sm text-white">Estimated Job Readiness</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Evidence Confidence: <strong className="text-slate-200">{analysis.confidence_level}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stat Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel-interactive rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-xs text-slate-400 font-semibold block">Skills Evaluated</span>
          <span className="text-2xl font-display font-bold text-white mt-1 block">
            {analysis.all_evaluated_skills.length}
          </span>
          <span className="text-[11px] text-slate-500">Across catalog</span>
        </div>

        <div className="glass-panel-interactive rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-xs text-slate-400 font-semibold block">Demonstrated Strengths</span>
          <span className="text-2xl font-display font-bold text-emerald-400 mt-1 block">
            {analysis.strengths.length}
          </span>
          <span className="text-[11px] text-emerald-500/80">Strong practical proof</span>
        </div>

        <div className="glass-panel-interactive rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-xs text-slate-400 font-semibold block">Critical / Important Gaps</span>
          <span className="text-2xl font-display font-bold text-rose-400 mt-1 block">
            {analysis.skill_gaps.length}
          </span>
          <span className="text-[11px] text-rose-500/80">Actionable bottlenecks</span>
        </div>

        <div className="glass-panel-interactive rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-xs text-slate-400 font-semibold block">Roadmap Target</span>
          <span className="text-2xl font-display font-bold text-cyan-400 mt-1 block">
            {analysis.fastest_path.target_readiness}%
          </span>
          <span className="text-[11px] text-cyan-500/80">Fastest Path potential</span>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] text-xs sm:text-sm font-semibold scrollbar-none">
        <button
          id="tab-skills"
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'skills'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Skill Cards ({analysis.all_evaluated_skills.length})</span>
        </button>

        <button
          id="tab-gaps"
          type="button"
          onClick={() => setActiveTab('gaps')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'gaps'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>Skill Gaps ({analysis.skill_gaps.length})</span>
        </button>

        <button
          id="tab-fastest-path"
          type="button"
          onClick={() => setActiveTab('fastest_path')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'fastest_path'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Fastest Path Roadmap</span>
        </button>

        <button
          id="tab-dependency"
          type="button"
          onClick={() => setActiveTab('dependency')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'dependency'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Network className="h-4 w-4" />
          <span>Dependency Graph</span>
        </button>

        <button
          id="tab-projects"
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'projects'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Project Upgrader ({analysis.project_matches.length})</span>
        </button>

        <button
          id="tab-assessment"
          type="button"
          onClick={() => setActiveTab('assessment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'assessment'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Skill Assessment</span>
        </button>

        <button
          id="tab-interview"
          type="button"
          onClick={() => setActiveTab('interview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'interview'
              ? 'bg-indigo-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Interview Prep &amp; Fit</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-2">
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Skill Cards &amp; Evidence Audit
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Audited across resume citations, project codebases, and interactive validations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysis.all_evaluated_skills.map((skill, idx) => (
                <SkillCard
                  key={idx}
                  skill={skill}
                  onValidateClick={handleValidateSkill}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gaps' && (
          <SkillGapSection gaps={analysis.skill_gaps} />
        )}

        {activeTab === 'fastest_path' && (
          <FastestPath
            initialReadiness={analysis.fastest_path.initial_readiness}
            targetReadiness={analysis.fastest_path.target_readiness}
            steps={analysis.fastest_path.steps}
          />
        )}

        {activeTab === 'dependency' && (
          <DependencyGraph nodes={analysis.dependency_graph} />
        )}

        {activeTab === 'projects' && (
          <ProjectUpgrader projectMatches={analysis.project_matches} />
        )}

        {activeTab === 'assessment' && (
          <SkillAssessment
            initialSkill={assessmentSkillToTest}
            onAssessmentCompleted={onAssessmentScoreUpdate}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewPrep
            questions={analysis.interview_questions}
            jobComparisons={analysis.job_comparisons}
          />
        )}
      </div>

    </div>
  );
}
