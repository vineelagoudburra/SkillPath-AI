'use client';

import React, { useState } from 'react';
import { Network, CheckCircle2, AlertCircle, ArrowRight, Info, Layers } from 'lucide-react';
import { DependencyNode } from '@/lib/types';

interface DependencyGraphProps {
  nodes: DependencyNode[];
}

export default function DependencyGraph({ nodes }: DependencyGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'python');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          dot: 'bg-emerald-400',
          label: 'Mastered / Strong Evidence'
        };
      case 'developing':
        return {
          border: 'border-sky-500',
          bg: 'bg-sky-500/10',
          text: 'text-sky-400',
          dot: 'bg-sky-400',
          label: 'Developing / Partial Evidence'
        };
      case 'gap':
      default:
        return {
          border: 'border-rose-500',
          bg: 'bg-rose-500/10',
          text: 'text-rose-400',
          dot: 'bg-rose-400',
          label: 'Target Job Gap'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
        <div>
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Network className="h-5 w-5 text-indigo-400" />
            Backend Developer Skill Dependency Graph
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Understand how foundational competencies unlock advanced framework and DevOps capabilities.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Strong
          </span>
          <span className="flex items-center gap-1.5 text-sky-400">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            Developing
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            Gap
          </span>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        <div className="ambient-glow bg-indigo-500/15 -bottom-20 -left-20" />

        {/* SVG Flowchart on Desktop & Responsive Stack on Mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-2 relative z-10 py-6">
          {nodes.map((node, index) => {
            const isSelected = node.id === selectedNodeId;
            const style = getStatusColor(node.status);
            const isLast = index === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`cursor-pointer transition-all duration-300 rounded-2xl p-4 w-full lg:w-44 text-center border-2 ${
                    isSelected
                      ? `${style.border} ${style.bg} shadow-lg scale-105 ring-2 ring-indigo-500/40`
                      : 'border-white/10 bg-[#090d16]/80 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {node.category}
                    </span>
                  </div>

                  <h5 className="font-display font-bold text-sm text-white mb-1">
                    {node.label}
                  </h5>

                  <div className="text-xs font-semibold text-slate-300">
                    Readiness: <span className={style.text}>{node.readiness}%</span>
                  </div>
                </div>

                {/* Connector Arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center my-1 lg:my-0 lg:mx-1 text-slate-500">
                    <ArrowRight className="h-5 w-5 transform lg:rotate-0 rotate-90 text-indigo-400 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Node Details Box */}
        {selectedNode && (
          <div className="mt-6 p-4 rounded-xl bg-[#090d16] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{selectedNode.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(selectedNode.status).border} ${getStatusColor(selectedNode.status).bg} ${getStatusColor(selectedNode.status).text}`}>
                  {getStatusColor(selectedNode.status).label}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {selectedNode.prerequisites.length > 0
                  ? `Depends directly on: ${selectedNode.prerequisites.join(', ')}`
                  : 'Foundational entry point skill; no prior prerequisite competencies required.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Estimated Readiness:</span>
              <span className="text-lg font-display font-bold text-white">{selectedNode.readiness}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
