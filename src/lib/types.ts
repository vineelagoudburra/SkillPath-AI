export type EvidenceStrength = 'Strong' | 'Moderate' | 'Low' | 'None';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type SkillStatus = 'Strong' | 'Developing' | 'Gap' | 'Critical Gap';
export type JobRequirementLevel = 'Required' | 'Preferred' | 'Bonus';

export interface SkillEvidence {
  skill_name: string;
  resume_evidence: boolean;
  resume_snippet?: string;
  project_evidence_count: number;
  project_names: string[];
  assessment_score: number | null; // 0-100 or null if not taken
  job_requirement: JobRequirementLevel;
  evidence_strength: EvidenceStrength;
  confidence_level: ConfidenceLevel;
  skill_readiness: number; // 0-100
  status: SkillStatus;
  explanation: string;
  category: 'Language' | 'Framework' | 'Database' | 'DevOps' | 'API' | 'Tool';
}

export interface SkillGapItem {
  skill_name: string;
  category: string;
  current_readiness: number;
  required_level: number;
  importance: 'Critical' | 'Important' | 'Nice to Have';
  job_importance_reason: string;
  evidence_summary: string;
  estimated_impact_points: number;
  actionable_tip: string;
}

export interface RoadmapStep {
  step_number: number;
  skill_name: string;
  estimated_readiness_increase: number;
  projected_total_readiness: number;
  prerequisites: string[];
  why_it_matters: string;
  estimated_time: string;
  recommended_topics: string[];
  suggested_exercise: string;
}

export interface ProjectMatch {
  project_id: string;
  project_name: string;
  project_description: string;
  technologies: string[];
  github_url?: string;
  relevance_score: number; // 0-100
  already_demonstrated: string[];
  missing_capabilities: string[];
  match_explanation: string;
  upgrade_plan: {
    recommended_additions: string[];
    upgrade_sequence: {
      step: number;
      title: string;
      description: string;
      skills_gained: string[];
    }[];
    new_skills_gained: string[];
    potential_upgraded_description: string; // explicitly marked as planned/recommended additions
  };
}

export interface AssessmentQuestion {
  id: string;
  skill_name: string;
  type: 'conceptual' | 'code_reading' | 'debugging' | 'practical_reasoning';
  question: string;
  code_snippet?: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  category_tested: 'Concepts' | 'Coding' | 'Problem Solving' | 'Explanation';
}

export interface AssessmentResult {
  skill_name: string;
  assessment_score: number; // 0-100
  category_scores: {
    concepts: number;
    coding: number;
    problem_solving: number;
  };
  mismatch_detected: boolean;
  mismatch_message?: string;
  feedback: string;
}

export interface JobComparisonItem {
  title: string;
  match_score: number;
  is_best_fit: boolean;
  key_matched_skills: string[];
  top_missing_skills: string[];
  salary_range?: string;
  demand_level: 'Very High' | 'High' | 'Moderate';
}

export interface InterviewQuestionItem {
  id: string;
  question: string;
  targeted_skill: string;
  question_type: 'Architecture' | 'Debugging' | 'Conceptual' | 'System Design';
  why_asked: string;
  expected_concepts: string[];
  recommended_structure: string;
}

export interface DependencyNode {
  id: string;
  label: string;
  category: string;
  status: 'strong' | 'developing' | 'gap';
  prerequisites: string[];
  readiness: number;
}

export interface CareerAnalysisResult {
  student_name: string;
  target_role: string;
  analysis_timestamp: string;
  is_demo_mode: boolean;
  model_source: 'Deterministic Demo' | 'Algorithmic Heuristic' | 'Gemini AI Engine';
  
  // High-level scores
  estimated_job_readiness: number; // 0-100
  confidence_level: ConfidenceLevel;
  evidence_source_count: number;
  scoring_weights: {
    resume_weight: number;
    project_weight: number;
    assessment_weight: number;
    assessment_active: boolean;
  };
  
  // Categorized lists
  strengths: SkillEvidence[];
  developing_skills: SkillEvidence[];
  skill_gaps: SkillGapItem[];
  all_evaluated_skills: SkillEvidence[];
  
  // Features
  fastest_path: {
    initial_readiness: number;
    target_readiness: number;
    steps: RoadmapStep[];
  };
  
  dependency_graph: DependencyNode[];
  project_matches: ProjectMatch[];
  job_comparisons: JobComparisonItem[];
  interview_questions: InterviewQuestionItem[];
}

export interface UserCareerInput {
  student_name: string;
  resume_text: string;
  projects: {
    name: string;
    description: string;
    technologies: string;
    github_url?: string;
  }[];
  target_job_title: string;
  target_job_description: string;
}
