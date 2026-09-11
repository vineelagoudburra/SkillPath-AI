'use client';

import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-[#070b14]/90 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="h-full w-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
                  <Compass className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                SKILLPATH<span className="text-indigo-400"> AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              &quot;Know where you stand. Know what to learn next.&quot;
              An evidence-based career readiness engine comparing student resumes and projects against real job requirements to produce personalized learning paths.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Prototype Disclaimers
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Evidence Confidence Metrics</li>
              <li>• Prototype Scoring Model (35/25/40)</li>
              <li>• Non-Accusatory Mismatch Signals</li>
              <li>• Planned Upgrades vs Completed Work</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Hackathon Edition
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Engineered with Next.js, TypeScript, React, and Tailwind CSS. Runs 100% deterministically with built-in demo mode.
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <ShieldCheck className="h-3 w-3" />
              Demo Verified
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <span>&copy; {new Date().getFullYear()} SkillPath AI. Built for demo presentation.</span>
          <span>Never represents total knowledge or hiring decisions.</span>
        </div>
      </div>
    </footer>
  );
}
