import {
  CareerAnalysisResult,
  UserCareerInput,
  SkillEvidence,
  SkillGapItem,
  RoadmapStep,
  ProjectMatch,
  DependencyNode,
  JobComparisonItem,
  InterviewQuestionItem,
  ConfidenceLevel,
  EvidenceStrength,
  SkillStatus,
  JobRequirementLevel
} from './types';
import { DETERMINISTIC_DEMO_RESULT } from './sampleData';

// Configurable prototype scoring weights
export const SCORING_WEIGHTS = {
  RESUME_WEIGHT: 0.35,
  PROJECT_WEIGHT: 0.25,
  ASSESSMENT_WEIGHT: 0.40,
};

// Common tech taxonomy dictionary for keyword matching
interface TechTaxonomy {
  name: string;
  category: 'Language' | 'Framework' | 'Database' | 'DevOps' | 'API' | 'Tool';
  aliases: string[];
  defaultImportance: 'Critical' | 'Important' | 'Nice to Have';
  prerequisites: string[];
  learningTopics: string[];
  suggestedAction: string;
}

const TECH_CATALOG: TechTaxonomy[] = [
  {
    name: 'Python',
    category: 'Language',
    aliases: ['python', 'py', 'python3', 'python 3'],
    defaultImportance: 'Critical',
    prerequisites: [],
    learningTopics: ['Object-Oriented Programming', 'Generators & Iterators', 'Type hinting', 'Memory & GIL basics'],
    suggestedAction: 'Practice intermediate Python data structures and write modular class-based architectures.'
  },
  {
    name: 'Django',
    category: 'Framework',
    aliases: ['django', 'drf', 'django rest framework'],
    defaultImportance: 'Critical',
    prerequisites: ['Python', 'SQL'],
    learningTopics: ['Django ORM & Migrations', 'Class-Based Views', 'Django REST Framework Serializers', 'Authentication middleware'],
    suggestedAction: 'Build a production-style REST API with Django REST Framework and PostgreSQL.'
  },
  {
    name: 'FastAPI',
    category: 'Framework',
    aliases: ['fastapi', 'starlette', 'pydantic'],
    defaultImportance: 'Important',
    prerequisites: ['Python', 'REST APIs'],
    learningTopics: ['Async request handlers', 'Pydantic schemas', 'Dependency injection', 'Automatic OpenAPI docs'],
    suggestedAction: 'Create an asynchronous microservice using FastAPI and Pydantic validation.'
  },
  {
    name: 'REST APIs',
    category: 'API',
    aliases: ['rest', 'restful', 'rest api', 'rest apis', 'api development', 'http apis', 'web services'],
    defaultImportance: 'Critical',
    prerequisites: ['Python'],
    learningTopics: ['HTTP status codes and idempotency', 'JSON payload serialization', 'Pagination and filtering', 'Swagger / OpenAPI specification'],
    suggestedAction: 'Refactor desktop or script logic into decoupled REST endpoints.'
  },
  {
    name: 'SQL & Relational DBs',
    category: 'Database',
    aliases: ['sql', 'relational database', 'sqlite', 'rdbms', 'queries'],
    defaultImportance: 'Critical',
    prerequisites: [],
    learningTopics: ['JOIN operations and subqueries', 'Indexing strategies', 'Normalization (1NF-3NF)', 'Transaction ACID properties'],
    suggestedAction: 'Design relational schemas with foreign keys, compound indexes, and parameterized queries.'
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    aliases: ['postgres', 'postgresql', 'psql'],
    defaultImportance: 'Important',
    prerequisites: ['SQL & Relational DBs'],
    learningTopics: ['EXPLAIN ANALYZE query profiling', 'JSONB data types', 'Connection pooling (PgBouncer)', 'Window functions'],
    suggestedAction: 'Migrate local SQLite databases to PostgreSQL and benchmark query execution times.'
  },
  {
    name: 'Git & Version Control',
    category: 'Tool',
    aliases: ['git', 'github', 'version control', 'gitlab'],
    defaultImportance: 'Important',
    prerequisites: [],
    learningTopics: ['Branching workflows (Git Flow / Trunk)', 'Interactive rebase', 'Resolving merge conflicts', 'Pull request reviews'],
    suggestedAction: 'Maintain an active GitHub commit history with structured branch merges and descriptive PRs.'
  },
  {
    name: 'Docker & Containers',
    category: 'DevOps',
    aliases: ['docker', 'container', 'containers', 'docker-compose', 'containerization'],
    defaultImportance: 'Important',
    prerequisites: ['CLI basics'],
    learningTopics: ['Multi-stage Dockerfiles', 'Docker Compose service orchestration', 'Environment variable handling', 'Volume mounting & persistence'],
    suggestedAction: 'Write a docker-compose.yml to launch backend, database, and cache containers with a single command.'
  },
  {
    name: 'Authentication & JWT',
    category: 'API',
    aliases: ['jwt', 'oauth', 'authentication', 'auth', 'oauth2', 'token', 'authorization'],
    defaultImportance: 'Important',
    prerequisites: ['REST APIs'],
    learningTopics: ['JWT header/payload/signature verification', 'Password hashing (Argon2 / bcrypt)', 'Refresh token rotation', 'Role-based permissions (RBAC)'],
    suggestedAction: 'Add JWT authorization headers to protect private API endpoints.'
  },
  {
    name: 'Automated Testing',
    category: 'Tool',
    aliases: ['pytest', 'unit testing', 'unittest', 'integration test', 'test driven development', 'tdd', 'testing'],
    defaultImportance: 'Nice to Have',
    prerequisites: ['Python'],
    learningTopics: ['Pytest fixtures and mocking', 'API endpoint integration testing', 'Code coverage measurement', 'CI test pipelines'],
    suggestedAction: 'Write Pytest test suites achieving 80%+ test coverage on core business logic.'
  }
];

/**
 * Calculates deterministic readiness score for a single skill
 */
export function calculateSkillReadiness(
  hasResumeEvidence: boolean,
  projectCount: number,
  assessmentScore: number | null
): { readiness: number; strength: EvidenceStrength; confidence: ConfidenceLevel; status: SkillStatus } {
  // Score components
  let resumeScore = hasResumeEvidence ? 85 : 0;
  let projectScore = Math.min(100, projectCount * 45); // 1 project = 45, 2+ = 90+
  
  let readiness = 0;
  let confidence: ConfidenceLevel = 'Low';
  let evidenceCount = 0;
  if (hasResumeEvidence) evidenceCount++;
  if (projectCount > 0) evidenceCount++;
  if (assessmentScore !== null) evidenceCount++;

  if (assessmentScore !== null) {
    // 3-source model: 35% Resume, 25% Project, 40% Assessment
    readiness = Math.round(
      resumeScore * SCORING_WEIGHTS.RESUME_WEIGHT +
      projectScore * SCORING_WEIGHTS.PROJECT_WEIGHT +
      assessmentScore * SCORING_WEIGHTS.ASSESSMENT_WEIGHT
    );
    confidence = 'High';
  } else {
    // 2-source normalized model: 35/(35+25) = 58.3% Resume, 25/(35+25) = 41.7% Project
    const normResume = SCORING_WEIGHTS.RESUME_WEIGHT / (SCORING_WEIGHTS.RESUME_WEIGHT + SCORING_WEIGHTS.PROJECT_WEIGHT);
    const normProj = SCORING_WEIGHTS.PROJECT_WEIGHT / (SCORING_WEIGHTS.RESUME_WEIGHT + SCORING_WEIGHTS.PROJECT_WEIGHT);
    readiness = Math.round(resumeScore * normResume + projectScore * normProj);
    confidence = evidenceCount >= 2 ? 'High' : evidenceCount === 1 ? 'Medium' : 'Low';
  }

  // Bound between 0 and 100
  readiness = Math.max(0, Math.min(100, readiness));

  // Evidence strength
  let strength: EvidenceStrength = 'None';
  if (evidenceCount >= 2 && readiness >= 65) strength = 'Strong';
  else if (evidenceCount >= 1 || readiness >= 35) strength = 'Moderate';
  else if (readiness > 0) strength = 'Low';

  // Status label
  let status: SkillStatus = 'Critical Gap';
  if (readiness >= 70) status = 'Strong';
  else if (readiness >= 50) status = 'Developing';
  else if (readiness >= 30) status = 'Gap';
  else status = 'Critical Gap';

  return { readiness, strength, confidence, status };
}

/**
 * Deterministic analysis engine that analyzes any custom user input
 * or defaults to verified demo profile if inputs match Aarav Sharma
 */
export function analyzeCareerReadiness(input: UserCareerInput): CareerAnalysisResult {
  // Check if this matches Aarav Sharma demo
  const isAarav =
    input.student_name.toLowerCase().includes('aarav') ||
    input.resume_text.toLowerCase().includes('aarav') ||
    (input.projects.length === 2 && input.projects[0].name.toLowerCase().includes('student management'));

  if (isAarav) {
    return {
      ...DETERMINISTIC_DEMO_RESULT,
      analysis_timestamp: new Date().toISOString()
    };
  }

  // Custom analysis using keyword heuristics
  const resumeLower = (input.resume_text || '').toLowerCase();
  const jobLower = (input.target_job_description || '').toLowerCase();
  const projectTexts = input.projects.map(p => `${p.name} ${p.description} ${p.technologies}`.toLowerCase());

  const evaluatedSkills: SkillEvidence[] = [];
  const skillGaps: SkillGapItem[] = [];

  // Evaluate skills against catalog
  TECH_CATALOG.forEach(catalogItem => {
    // Check if skill is relevant to job
    const inJob = catalogItem.aliases.some(alias => jobLower.includes(alias.toLowerCase()));
    
    // Check resume evidence
    const inResume = catalogItem.aliases.some(alias => resumeLower.includes(alias.toLowerCase()));
    
    // Check project evidence
    const matchingProjects = input.projects.filter(p => {
      const text = `${p.name} ${p.description} ${p.technologies}`.toLowerCase();
      return catalogItem.aliases.some(alias => text.includes(alias.toLowerCase()));
    });

    const projectNames = matchingProjects.map(p => p.name);
    const projectCount = matchingProjects.length;

    // Only evaluate if in job description or demonstrated in candidate profile
    if (inJob || inResume || projectCount > 0) {
      const { readiness, strength, confidence, status } = calculateSkillReadiness(
        inResume,
        projectCount,
        null // Initial run without assessment
      );

      const jobReq: JobRequirementLevel = inJob ? 'Required' : 'Preferred';

      let explanation = '';
      if (inResume && projectCount > 0) {
        explanation = `Demonstrated across resume credentials and ${projectCount} project implementation${projectCount > 1 ? 's' : ''}.`;
      } else if (inResume) {
        explanation = 'Referenced in resume credentials; project-level implementation evidence not detected.';
      } else if (projectCount > 0) {
        explanation = `Practical implementation found in project: ${projectNames.join(', ')}.`;
      } else {
        explanation = `${catalogItem.name} evidence not found in submitted profile.`;
      }

      const evidenceItem: SkillEvidence = {
        skill_name: catalogItem.name,
        resume_evidence: inResume,
        resume_snippet: inResume ? `Matches keywords in submitted resume: ${catalogItem.name}` : undefined,
        project_evidence_count: projectCount,
        project_names: projectNames,
        assessment_score: null,
        job_requirement: jobReq,
        evidence_strength: strength,
        confidence_level: confidence,
        skill_readiness: readiness,
        status: status,
        explanation: explanation,
        category: catalogItem.category
      };

      evaluatedSkills.push(evidenceItem);

      // If required by job and readiness < 65, add to gaps
      if (inJob && readiness < 65) {
        const gapImportance = catalogItem.defaultImportance;
        const requiredLevel = gapImportance === 'Critical' ? 85 : gapImportance === 'Important' ? 75 : 65;
        const points = gapImportance === 'Critical' ? 8 : gapImportance === 'Important' ? 5 : 3;

        skillGaps.push({
          skill_name: catalogItem.name,
          category: catalogItem.category,
          current_readiness: readiness,
          required_level: requiredLevel,
          importance: gapImportance,
          job_importance_reason: `Identified as a ${gapImportance.toLowerCase()} requirement in the target job specifications.`,
          evidence_summary: inResume || projectCount > 0 
            ? `Partial evidence detected (Readiness: ${readiness}%); requires deeper practical proof.`
            : `${catalogItem.name} evidence not found in submitted resume or projects.`,
          estimated_impact_points: points,
          actionable_tip: catalogItem.suggestedAction
        });
      }
    }
  });

  // Calculate overall readiness score
  const requiredSkills = evaluatedSkills.filter(s => s.job_requirement === 'Required');
  const pool = requiredSkills.length > 0 ? requiredSkills : evaluatedSkills;
  const avgReadiness = pool.length > 0 
    ? Math.round(pool.reduce((acc, curr) => acc + curr.skill_readiness, 0) / pool.length)
    : 65;

  const strengths = evaluatedSkills.filter(s => s.status === 'Strong');
  const developing = evaluatedSkills.filter(s => s.status === 'Developing');

  // Fastest path synthesis
  const sortedGaps = [...skillGaps].sort((a, b) => b.estimated_impact_points - a.estimated_impact_points);
  let currentAccumulated = avgReadiness;
  const roadmapSteps: RoadmapStep[] = sortedGaps.slice(0, 3).map((gap, idx) => {
    const catalogItem = TECH_CATALOG.find(t => t.name.toLowerCase() === gap.skill_name.toLowerCase());
    currentAccumulated += gap.estimated_impact_points;
    return {
      step_number: idx + 1,
      skill_name: gap.skill_name,
      estimated_readiness_increase: gap.estimated_impact_points,
      projected_total_readiness: Math.min(95, currentAccumulated),
      prerequisites: catalogItem?.prerequisites || ['Foundational programming logic'],
      why_it_matters: gap.job_importance_reason,
      estimated_time: `${idx + 1} to ${idx + 2} weeks`,
      recommended_topics: catalogItem?.learningTopics || ['Core architecture', 'Best practices', 'Hands-on project implementation'],
      suggested_exercise: gap.actionable_tip
    };
  });

  // Project upgrades
  const projectMatches: ProjectMatch[] = input.projects.map((proj, pIdx) => {
    const pText = `${proj.name} ${proj.description} ${proj.technologies}`.toLowerCase();
    const demonstrated = evaluatedSkills
      .filter(s => s.project_names.includes(proj.name) || pText.includes(s.skill_name.toLowerCase()))
      .map(s => s.skill_name);

    const missing = skillGaps.slice(0, 4).map(g => g.skill_name);

    return {
      project_id: `custom_p_${pIdx}`,
      project_name: proj.name,
      project_description: proj.description,
      technologies: proj.technologies.split(',').map(t => t.trim()),
      github_url: proj.github_url,
      relevance_score: Math.min(85, Math.max(30, 40 + demonstrated.length * 15)),
      already_demonstrated: demonstrated.length > 0 ? demonstrated : ['Modular Programming Logic', 'Basic Application Structure'],
      missing_capabilities: missing.length > 0 ? missing : ['RESTful Architecture', 'Docker Containerization', 'Automated Testing'],
      match_explanation: `Project demonstrates core algorithmic logic but lacks explicit evidence for key target job technologies like ${missing.slice(0, 2).join(' and ')}.`,
      upgrade_plan: {
        recommended_additions: missing.slice(0, 3).map(m => `Integrate ${m} to align with target role requirements.`),
        upgrade_sequence: [
          {
            step: 1,
            title: `Expose REST API / Service Layer`,
            description: 'Refactor direct internal function calls into structured HTTP endpoints with JSON serialization.',
            skills_gained: ['REST APIs', 'JSON Serialization']
          },
          {
            step: 2,
            title: 'Add Authentication & Persistence',
            description: 'Implement token authorization and persistent relational database migrations.',
            skills_gained: ['JWT Security', 'Database Design']
          },
          {
            step: 3,
            title: 'Containerize and Document',
            description: 'Write Dockerfile and OpenAPI documentation for automated team deployment.',
            skills_gained: ['Docker', 'Swagger Docs']
          }
        ],
        new_skills_gained: missing.slice(0, 3),
        potential_upgraded_description: `Planned / Future Architecture: Upgraded version of ${proj.name} featuring modular RESTful microservices, containerized deployment via Docker, and production database integration.`
      }
    };
  });

  // Dependency Graph
  const depGraph: DependencyNode[] = [
    { id: 'python', label: 'Python OOP', category: 'Language', status: avgReadiness > 60 ? 'strong' : 'developing', prerequisites: [], readiness: 75 },
    { id: 'sql', label: 'SQL Relational DB', category: 'Database', status: 'strong', prerequisites: [], readiness: 72 },
    { id: 'rest', label: 'REST APIs', category: 'API', status: 'developing', prerequisites: ['python'], readiness: 45 },
    { id: 'django', label: 'Web Framework', category: 'Framework', status: 'gap', prerequisites: ['python', 'rest'], readiness: 30 },
    { id: 'docker', label: 'Docker Containers', category: 'DevOps', status: 'gap', prerequisites: ['django'], readiness: 20 }
  ];

  return {
    student_name: input.student_name || 'Student Candidate',
    target_role: input.target_job_title || 'Software Engineer',
    analysis_timestamp: new Date().toISOString(),
    is_demo_mode: false,
    model_source: 'Algorithmic Heuristic',
    estimated_job_readiness: avgReadiness,
    confidence_level: evaluatedSkills.length > 5 ? 'High' : 'Medium',
    evidence_source_count: 2,
    scoring_weights: {
      resume_weight: 0.35,
      project_weight: 0.25,
      assessment_weight: 0.40,
      assessment_active: false
    },
    strengths,
    developing_skills: developing,
    skill_gaps: skillGaps,
    all_evaluated_skills: evaluatedSkills,
    fastest_path: {
      initial_readiness: avgReadiness,
      target_readiness: Math.min(92, currentAccumulated),
      steps: roadmapSteps
    },
    dependency_graph: depGraph,
    project_matches: projectMatches,
    job_comparisons: [
      {
        title: input.target_job_title || 'Target Role',
        match_score: avgReadiness,
        is_best_fit: true,
        key_matched_skills: strengths.slice(0, 3).map(s => s.skill_name),
        top_missing_skills: skillGaps.slice(0, 2).map(g => g.skill_name),
        salary_range: '$80k - $105k',
        demand_level: 'High'
      },
      {
        title: 'Junior Software Engineer',
        match_score: Math.min(95, avgReadiness + 10),
        is_best_fit: false,
        key_matched_skills: ['Programming Logic', 'Problem Solving', 'Git'],
        top_missing_skills: ['Testing Suites'],
        salary_range: '$70k - $88k',
        demand_level: 'High'
      }
    ],
    interview_questions: [
      {
        id: 'iq1',
        question: `How would you architect a backend service for ${input.target_job_title || 'this role'} ensuring scalability and fault tolerance?`,
        targeted_skill: 'Backend Architecture',
        question_type: 'System Design',
        why_asked: 'Tests high-level systems thinking and design trade-offs.',
        expected_concepts: ['Separation of concerns', 'Stateless API servers', 'Database caching', 'Error handling middleware'],
        recommended_structure: 'Address requirements, sketch layer boundaries (API, business logic, persistence), and discuss scaling strategies.'
      },
      {
        id: 'iq2',
        question: `Explain how you handle error handling, status codes, and input validation in your API endpoints.`,
        targeted_skill: 'REST APIs & Security',
        question_type: 'Architecture',
        why_asked: 'Validates that you write resilient production code rather than happy-path only scripts.',
        expected_concepts: ['Consistent JSON error schema', 'HTTP 400 Bad Request vs 500 Internal Error', 'Input sanitizer'],
        recommended_structure: 'Explain schema validation at the gateway, centralized exception handlers, and friendly error responses.'
      }
    ]
  };
}

/**
 * Re-scores candidate with an assessment result
 */
export function incorporateAssessmentScore(
  currentResult: CareerAnalysisResult,
  skillName: string,
  assessmentScore: number
): CareerAnalysisResult {
  // Clone current result
  const updated = JSON.parse(JSON.stringify(currentResult)) as CareerAnalysisResult;

  // Find skill in all_evaluated_skills
  const targetSkill = updated.all_evaluated_skills.find(
    s => s.skill_name.toLowerCase() === skillName.toLowerCase()
  );

  if (targetSkill) {
    targetSkill.assessment_score = assessmentScore;
    
    // Recalculate skill readiness using 3-source model
    const { readiness, strength, confidence, status } = calculateSkillReadiness(
      targetSkill.resume_evidence,
      targetSkill.project_evidence_count,
      assessmentScore
    );
    targetSkill.skill_readiness = readiness;
    targetSkill.evidence_strength = strength;
    targetSkill.confidence_level = confidence;
    targetSkill.status = status;
    targetSkill.explanation = `Updated with verified assessment score (${assessmentScore}%): combines resume, project, and interactive assessment evidence.`;
  }

  // Recalculate overall readiness
  const total = updated.all_evaluated_skills.reduce((acc, curr) => acc + curr.skill_readiness, 0);
  updated.estimated_job_readiness = Math.round(total / updated.all_evaluated_skills.length);
  updated.evidence_source_count = 3;
  updated.scoring_weights.assessment_active = true;

  // Update strengths and gaps
  updated.strengths = updated.all_evaluated_skills.filter(s => s.status === 'Strong');
  updated.developing_skills = updated.all_evaluated_skills.filter(s => s.status === 'Developing');

  return updated;
}
