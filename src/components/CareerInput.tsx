'use client';

import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  FolderGit2,
  Briefcase,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { UserCareerInput } from '@/lib/types';
import { SAMPLE_STUDENT_PROFILE } from '@/lib/sampleData';

interface CareerInputProps {
  onStartAnalysis: (data: UserCareerInput, isDemo: boolean) => void;
  isAnalyzing: boolean;
}

export default function CareerInput({ onStartAnalysis, isAnalyzing }: CareerInputProps) {
  // Input state
  const [studentName, setStudentName] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeTab, setResumeTab] = useState<'paste' | 'upload'>('paste');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Projects state
  const [projects, setProjects] = useState<
    { name: string; description: string; technologies: string; github_url?: string }[]
  >([
    {
      name: '',
      description: '',
      technologies: '',
      github_url: ''
    }
  ]);

  // Target Job state
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [targetJobDesc, setTargetJobDesc] = useState('');

  // Validation feedback
  const [validationError, setValidationError] = useState<string | null>(null);

  // Quick fill sample job
  const handleFillSampleJob = () => {
    setTargetJobTitle(SAMPLE_STUDENT_PROFILE.target_job_title);
    setTargetJobDesc(SAMPLE_STUDENT_PROFILE.target_job_description);
  };

  // Quick fill sample candidate
  const handleFillSampleCandidate = () => {
    setStudentName(SAMPLE_STUDENT_PROFILE.student_name);
    setResumeText(SAMPLE_STUDENT_PROFILE.resume_text);
    setProjects(SAMPLE_STUDENT_PROFILE.projects);
    setTargetJobTitle(SAMPLE_STUDENT_PROFILE.target_job_title);
    setTargetJobDesc(SAMPLE_STUDENT_PROFILE.target_job_description);
    setValidationError(null);
  };

  // Project management
  const handleAddProject = () => {
    setProjects(prev => [
      ...prev,
      { name: '', description: '', technologies: '', github_url: '' }
    ]);
  };

  const handleRemoveProject = (index: number) => {
    if (projects.length === 1) {
      setProjects([{ name: '', description: '', technologies: '', github_url: '' }]);
      return;
    }
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleProjectChange = (
    index: number,
    field: 'name' | 'description' | 'technologies' | 'github_url',
    val: string
  ) => {
    setProjects(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  // Handle PDF/Document upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract text from file.');
      }

      setUploadedFileName(data.fileName);
      setResumeText(data.extractedText);
      setUploadError(null);
    } catch (err: any) {
      setUploadError(err.message || 'File extraction failed. Please paste your resume text directly.');
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const hasResume = resumeText.trim().length > 0;
    const validProjects = projects.filter(p => p.name.trim().length > 0);
    const hasJob = targetJobDesc.trim().length > 0;

    if (!hasResume && validProjects.length === 0) {
      setValidationError('Please provide your resume text or add at least one project.');
      return;
    }

    if (!hasJob) {
      setValidationError('Please provide a target job description or click "Try Sample Job".');
      return;
    }

    const payload: UserCareerInput = {
      student_name: studentName.trim() || 'Candidate',
      resume_text: resumeText.trim(),
      projects: validProjects,
      target_job_title: targetJobTitle.trim() || 'Target Technical Role',
      target_job_description: targetJobDesc.trim()
    };

    onStartAnalysis(payload, false);
  };

  return (
    <section id="career-input" className="py-12 border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Profile & Role Inputs</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-white">
            Build Your Career Readiness Profile
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl mx-auto">
            Provide your candidate evidence and target role requirements. We will analyze the evidence gap without claiming unverified percentages.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
            <button
              type="button"
              onClick={handleFillSampleCandidate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all shadow-sm"
            >
              <RefreshCw className="h-3 w-3" />
              Fill Aarav Sharma Sample Profile
            </button>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3 animate-shake">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-400 mt-0.5" />
            <div>
              <p className="font-semibold">Incomplete Profile Information</p>
              <p className="text-xs text-rose-200 mt-0.5">{validationError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Candidate Name Input */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Candidate / Student Name (Optional)
            </label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-[#090d16] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Section A: Resume */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Section A: Resume Evidence</h3>
                  <p className="text-xs text-slate-400">Paste your text or upload a PDF document</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center bg-[#090d16] rounded-xl p-1 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setResumeTab('paste')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    resumeTab === 'paste'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Paste Text
                </button>
                <button
                  type="button"
                  onClick={() => setResumeTab('upload')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    resumeTab === 'upload'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {resumeTab === 'paste' ? (
              <div>
                <textarea
                  rows={7}
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                  placeholder="Paste your resume content, technical skills, coursework, academic accomplishments..."
                  className="w-full p-4 rounded-xl bg-[#090d16] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>Treating resume text as evidence signals.</span>
                  <span>{resumeText.trim() ? `${resumeText.trim().split(/\s+/).length} words` : '0 words'}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 hover:border-indigo-500/50 rounded-xl p-6 text-center cursor-pointer transition-all bg-[#090d16]/50 hover:bg-[#090d16]"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="h-10 w-10 mx-auto rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-200">
                    {isUploading ? 'Extracting document text...' : 'Click or drop PDF/TXT resume here'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PDF, TXT, or Markdown (Max 5MB)</p>
                </div>

                {uploadedFileName && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-emerald-400" />
                      <span>Loaded: <strong>{uploadedFileName}</strong> ({resumeText.split(/\s+/).length} words extracted)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFileName(null);
                        setResumeText('');
                      }}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-rose-400">{uploadError}</p>
                )}

                {resumeText && (
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block mb-1">Preview of extracted text:</span>
                    <div className="max-h-32 overflow-y-auto p-3 rounded-lg bg-[#090d16] border border-white/5 text-xs text-slate-300 font-mono">
                      {resumeText}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section B: Projects */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <FolderGit2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Section B: Practical Projects</h3>
                  <p className="text-xs text-slate-400">Add project evidence to validate hands-on capability</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/10 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Project
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#090d16] border border-white/10 relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Project #{idx + 1}
                    </span>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={e => handleProjectChange(idx, 'name', e.target.value)}
                        placeholder="e.g. Student Management System"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={e => handleProjectChange(idx, 'technologies', e.target.value)}
                        placeholder="e.g. Python, SQLite, Tkinter, Git"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">What did this project do / accomplish?</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={e => handleProjectChange(idx, 'description', e.target.value)}
                      placeholder="e.g. Desktop CRUD application managing student records with SQLite databases, parameterized queries, and data validation..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Optional GitHub / Demo Link</label>
                    <input
                      type="url"
                      value={proj.github_url || ''}
                      onChange={e => handleProjectChange(idx, 'github_url', e.target.value)}
                      placeholder="https://github.com/your-username/repo-name"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Target Job */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Section C: Target Job Requirements</h3>
                  <p className="text-xs text-slate-400">Paste target job description or load sample</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFillSampleJob}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Try Sample Job (Python Backend Developer)
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetJobTitle}
                  onChange={e => setTargetJobTitle(e.target.value)}
                  placeholder="e.g. Python Backend Developer"
                  className="w-full px-4 py-2 rounded-xl bg-[#090d16] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Job Description & Qualifications
                </label>
                <textarea
                  rows={6}
                  value={targetJobDesc}
                  onChange={e => setTargetJobDesc(e.target.value)}
                  placeholder="Paste job posting text, required qualifications, core responsibilities, tech stack requirements..."
                  className="w-full p-4 rounded-xl bg-[#090d16] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Submission Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              id="analyze-readiness-submit"
              type="submit"
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-glow hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 active:scale-98 disabled:opacity-50"
            >
              <span>{isAnalyzing ? 'Analyzing Profile Evidence...' : 'Analyze My Readiness'}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
