'use client';

import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Code,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentQuestion, AssessmentResult } from '@/lib/types';
import { SKILL_ASSESSMENTS } from '@/lib/assessmentQuestions';

interface SkillAssessmentProps {
  initialSkill?: string;
  onAssessmentCompleted: (skillName: string, score: number) => void;
}

export default function SkillAssessment({
  initialSkill = 'Python',
  onAssessmentCompleted
}: SkillAssessmentProps) {
  const availableSkills = Object.keys(SKILL_ASSESSMENTS);
  const [selectedSkill, setSelectedSkill] = useState<string>(initialSkill);
  const questions: AssessmentQuestion[] = SKILL_ASSESSMENTS[selectedSkill] || SKILL_ASSESSMENTS.Python;

  // Question answering state
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentQ = questions[currentQIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    // Calculate score
    let correctCount = 0;
    const categoryCounts: Record<string, { correct: number; total: number }> = {
      Concepts: { correct: 0, total: 0 },
      Coding: { correct: 0, total: 0 },
      'Problem Solving': { correct: 0, total: 0 },
      Explanation: { correct: 0, total: 0 }
    };

    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = selected === q.correct_option_index;
      if (isCorrect) correctCount++;

      const cat = q.category_tested || 'Concepts';
      if (!categoryCounts[cat]) categoryCounts[cat] = { correct: 0, total: 0 };
      categoryCounts[cat].total++;
      if (isCorrect) categoryCounts[cat].correct++;
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    // Mismatch detection: if resume claimed proficiency but assessment is < 60%
    const isMismatch = scorePercent < 60;
    const mismatchMsg = isMismatch
      ? `Your resume indicates strong ${selectedSkill} experience, while your assessment performance suggests some foundational concepts may benefit from targeted review.`
      : undefined;

    const evalResult: AssessmentResult = {
      skill_name: selectedSkill,
      assessment_score: scorePercent,
      category_scores: {
        concepts: Math.round(
          ((categoryCounts.Concepts.correct || 0) / (categoryCounts.Concepts.total || 1)) * 100
        ),
        coding: Math.round(
          ((categoryCounts.Coding.correct || 0) / (categoryCounts.Coding.total || 1)) * 100
        ),
        problem_solving: Math.round(
          ((categoryCounts['Problem Solving'].correct || 0) /
            (categoryCounts['Problem Solving'].total || 1)) *
            100
        )
      },
      mismatch_detected: isMismatch,
      mismatch_message: mismatchMsg,
      feedback:
        scorePercent >= 80
          ? `Exceptional practical mastery demonstrated in ${selectedSkill}! High readiness confidence.`
          : scorePercent >= 60
          ? `Solid understanding of core principles in ${selectedSkill}; continue practicing edge-case handling.`
          : `Good foundational start. Review recommended learning topics to strengthen practical application.`
    };

    setResult(evalResult);
    setIsSubmitted(true);

    // Trigger confetti on high score
    if (scorePercent >= 60) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore if confetti unavailable
      }
    }

    onAssessmentCompleted(selectedSkill, scorePercent);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setResult(null);
    setCurrentQIndex(0);
  };

  const handleSkillChange = (newSkill: string) => {
    setSelectedSkill(newSkill);
    setUserAnswers({});
    setIsSubmitted(false);
    setResult(null);
    setCurrentQIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
        <div>
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-400" />
            Validate This Skill: Interactive Assessment
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Take an optional 5-question practical assessment to elevate evidence confidence.
          </p>
        </div>

        {/* Skill Selector */}
        <div className="flex items-center gap-2 bg-[#090d16] p-1 rounded-xl border border-white/10">
          {availableSkills.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => handleSkillChange(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSkill === s
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {isSubmitted && result && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs uppercase font-bold text-indigo-400">Assessment Evaluation</span>
              <h4 className="text-2xl font-display font-bold text-white mt-0.5">
                {selectedSkill} Assessment Score: {result.assessment_score}%
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Notice: Labeled strictly as &quot;Assessment Score&quot; from submitted test answers, not total knowledge.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Assessment
            </button>
          </div>

          {/* Breakdown Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#090d16] border border-white/5 text-center">
              <span className="text-xs text-slate-400 font-semibold block">Core Concepts</span>
              <span className="text-2xl font-display font-extrabold text-indigo-400">
                {result.category_scores.concepts}%
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#090d16] border border-white/5 text-center">
              <span className="text-xs text-slate-400 font-semibold block">Code Reading</span>
              <span className="text-2xl font-display font-extrabold text-cyan-400">
                {result.category_scores.coding}%
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#090d16] border border-white/5 text-center">
              <span className="text-xs text-slate-400 font-semibold block">Problem Solving</span>
              <span className="text-2xl font-display font-extrabold text-emerald-400">
                {result.category_scores.problem_solving}%
              </span>
            </div>
          </div>

          {/* Mismatch Alert (Non-Accusatory) */}
          {result.mismatch_detected && result.mismatch_message && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-bold text-amber-300">
                  Evidence–Assessment Mismatch Detected
                </h5>
                <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  {result.mismatch_message}
                </p>
                <p className="text-[11px] text-amber-400/80 mt-1">
                  We use this signal to refine your personalized Fastest Path recommendations.
                </p>
              </div>
            </div>
          )}

          {/* Qualitative Feedback */}
          <div className="p-4 rounded-xl bg-[#090d16] border border-white/5 text-xs text-slate-300">
            <strong className="text-white font-semibold">Assessment Feedback: </strong>
            {result.feedback}
          </div>
        </div>
      )}

      {/* Question Form */}
      {!isSubmitted && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                Question {currentQIndex + 1} of {totalQuestions}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                Type: {currentQ.type.replace('_', ' ')}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              {Object.keys(userAnswers).length} of {totalQuestions} answered
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-display font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h4>

            {currentQ.code_snippet && (
              <pre className="p-4 rounded-xl bg-[#090d16] border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                <code>{currentQ.code_snippet}</code>
              </pre>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((optionText, optIdx) => {
              const isSelected = userAnswers[currentQIndex] === optIdx;

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium ring-1 ring-indigo-500/50'
                      : 'bg-[#090d16] border-white/10 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500 text-white'
                        : 'border-slate-700 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="leading-relaxed">{optionText}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex items-center gap-3">
              {currentQIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/10 transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitAssessment}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-glow-emerald transition-all disabled:opacity-40"
                >
                  Submit &amp; Recalculate Readiness
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
