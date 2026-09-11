import { CareerAnalysisResult, UserCareerInput } from './types';

export const SAMPLE_STUDENT_PROFILE: UserCareerInput = {
  student_name: 'Aarav Sharma',
  resume_text: `Aarav Sharma
Email: aarav.sharma@example.edu | GitHub: github.com/aaravsharma-dev | LinkedIn: linkedin.com/in/aarav-sharma
B.Tech in Computer Science and Engineering (Expected 2026)
GPA: 3.7 / 4.0

TECHNICAL SKILLS:
- Languages: Python (Proficient), SQL, JavaScript, HTML5, CSS3
- Tools & Libraries: Git, GitHub, SQLite, Pandas, Flask basics, VS Code
- Concepts: Object-Oriented Programming (OOP), Data Structures & Algorithms, Relational Database Design, CRUD Operations

ACADEMIC & PERSONAL PROJECTS:
1. Student Management System (Python, SQLite, Tkinter)
- Developed a desktop CRUD application managing 1,000+ student academic records with relational tables.
- Implemented query optimization and parameterized queries to prevent SQL injection vulnerabilities.
- Version-controlled codebase across 45+ commits with documented Git branching.

2. Expense Tracker & Financial CLI (Python, SQLite, JSON)
- Engineered a lightweight modular CLI application for monthly budget calculations and category analytics.
- Integrated file export mechanisms into CSV/JSON formats and automated basic monthly summaries.

COURSEWORK & CERTIFICATIONS:
- Data Structures & Algorithms in Python
- Database Management Systems & SQL Fundamentals
- Introduction to Web Development (HTML/CSS/Basic JS)`,
  projects: [
    {
      name: 'Student Management System',
      description: 'A desktop application to manage student enrollment, grading records, and course assignments using relational SQLite databases with parameterized queries and data validation.',
      technologies: 'Python, SQLite, Tkinter, Git, SQL',
      github_url: 'https://github.com/aaravsharma-dev/student-management-system'
    },
    {
      name: 'Expense Tracker CLI',
      description: 'Command-line tool for tracking personal expenses, calculating tax brackets, generating category breakdowns, and exporting monthly financial reports to CSV/JSON.',
      technologies: 'Python, SQLite, JSON, CLI, Data Analysis',
      github_url: 'https://github.com/aaravsharma-dev/python-expense-tracker'
    }
  ],
  target_job_title: 'Python Backend Developer',
  target_job_description: `Role: Python Backend Developer
Location: Remote / Hybrid
Experience Level: Junior to Mid-level

About the Role:
We are seeking a Python Backend Developer to design, build, and maintain robust web services and RESTful APIs. You will work closely with frontend engineers, architect relational databases, and deploy scalable containerized microservices.

Core Responsibilities:
- Design, develop, and test RESTful APIs using Python and web frameworks (Django / Django REST framework / FastAPI).
- Architect clean schemas and perform query optimization with PostgreSQL and relational SQL databases.
- Implement secure authentication and authorization mechanisms (JWT, OAuth2, session management).
- Write automated tests and participate in CI/CD pipeline automation with Git and Docker.
- Collaborate on API documentation (Swagger/OpenAPI) and microservice architecture.

Required Qualifications & Skills:
- Python (core object-oriented programming, data structures, clean code standards).
- Django or modern Python web framework experience.
- RESTful API design and implementation.
- SQL & Relational Databases (PostgreSQL preferred).
- Git version control and collaborative branching strategies.
- Docker fundamentals and containerization concepts.
- Understanding of web security, API authentication, and testing.`
};

export const DETERMINISTIC_DEMO_RESULT: CareerAnalysisResult = {
  student_name: 'Aarav Sharma',
  target_role: 'Python Backend Developer',
  analysis_timestamp: new Date().toISOString(),
  is_demo_mode: true,
  model_source: 'Deterministic Demo',
  estimated_job_readiness: 72,
  confidence_level: 'High',
  evidence_source_count: 3,
  scoring_weights: {
    resume_weight: 0.35,
    project_weight: 0.25,
    assessment_weight: 0.40,
    assessment_active: false // dynamically normalized to 58% Resume / 42% Project until assessment is validated
  },
  strengths: [
    {
      skill_name: 'Python',
      resume_evidence: true,
      resume_snippet: 'Proficient in Python, OOP, Data Structures across 2 featured academic projects',
      project_evidence_count: 2,
      project_names: ['Student Management System', 'Expense Tracker CLI'],
      assessment_score: 76,
      job_requirement: 'Required',
      evidence_strength: 'Strong',
      confidence_level: 'High',
      skill_readiness: 78,
      status: 'Strong',
      explanation: 'Your resume and both submitted projects provide verified practical evidence of core Python syntax, OOP, and data handling.',
      category: 'Language'
    },
    {
      skill_name: 'SQL & Database Design',
      resume_evidence: true,
      resume_snippet: 'Relational Database Management Systems, parameterized queries, SQLite',
      project_evidence_count: 2,
      project_names: ['Student Management System', 'Expense Tracker CLI'],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Strong',
      confidence_level: 'High',
      skill_readiness: 74,
      status: 'Strong',
      explanation: 'Demonstrated relational schema design and query execution across multiple database projects.',
      category: 'Database'
    },
    {
      skill_name: 'Git Version Control',
      resume_evidence: true,
      resume_snippet: '45+ commits with documented Git branching and GitHub repositories',
      project_evidence_count: 1,
      project_names: ['Student Management System'],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Strong',
      confidence_level: 'High',
      skill_readiness: 70,
      status: 'Strong',
      explanation: 'Active Git commit history and version-control discipline documented in coursework and projects.',
      category: 'Tool'
    }
  ],
  developing_skills: [
    {
      skill_name: 'PostgreSQL',
      resume_evidence: false,
      resume_snippet: 'Experience with SQLite relational database; direct PostgreSQL evidence not found',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Low',
      confidence_level: 'Medium',
      skill_readiness: 52,
      status: 'Developing',
      explanation: 'Solid foundational SQL understanding exists, but direct PostgreSQL features (triggers, jsonb, indexing) are not yet evidenced.',
      category: 'Database'
    },
    {
      skill_name: 'Authentication & Security',
      resume_evidence: true,
      resume_snippet: 'SQL injection prevention noted, but JWT / OAuth token flows not yet implemented',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Low',
      confidence_level: 'Medium',
      skill_readiness: 45,
      status: 'Developing',
      explanation: 'Basic security awareness is present, but industry standard JWT/OAuth authentication evidence was not detected in projects.',
      category: 'API'
    }
  ],
  skill_gaps: [
    {
      skill_name: 'REST APIs & Web Services',
      category: 'API Architecture',
      current_readiness: 41,
      required_level: 85,
      importance: 'Critical',
      job_importance_reason: 'Appears in 4 core job responsibilities. Required for frontend-backend communication.',
      evidence_summary: 'REST API design evidence not found in submitted desktop/CLI projects.',
      estimated_impact_points: 8,
      actionable_tip: 'Expose RESTful endpoints using Django REST Framework or FastAPI on your existing Student Management codebase.'
    },
    {
      skill_name: 'Django Web Framework',
      category: 'Backend Framework',
      current_readiness: 32,
      required_level: 80,
      importance: 'Critical',
      job_importance_reason: 'Specified as primary framework requirement in the job posting.',
      evidence_summary: 'Only lightweight Flask mentioned in resume; no complete Django MVC/MTV project evidence.',
      estimated_impact_points: 7,
      actionable_tip: 'Build a full-stack Django app with ORM migrations, serializers, and generic class-based views.'
    },
    {
      skill_name: 'Docker & Containerization',
      category: 'DevOps & Deployment',
      current_readiness: 15,
      required_level: 70,
      importance: 'Important',
      job_importance_reason: 'Required for team development environments and CI/CD automated deployment.',
      evidence_summary: 'Docker evidence not found in resume or project repositories.',
      estimated_impact_points: 5,
      actionable_tip: 'Write a multi-stage Dockerfile and docker-compose.yml orchestrating your backend and PostgreSQL.'
    },
    {
      skill_name: 'Automated Unit & Integration Testing',
      category: 'Quality Assurance',
      current_readiness: 28,
      required_level: 75,
      importance: 'Nice to Have',
      job_importance_reason: 'Mentioned under collaborative testing and code reliability expectations.',
      evidence_summary: 'Testing evidence not found in project descriptions.',
      estimated_impact_points: 4,
      actionable_tip: 'Implement Pytest fixtures and API endpoint integration tests achieving 80%+ test coverage.'
    }
  ],
  all_evaluated_skills: [
    {
      skill_name: 'Python',
      resume_evidence: true,
      resume_snippet: 'Proficient in Python, OOP, Data Structures',
      project_evidence_count: 2,
      project_names: ['Student Management System', 'Expense Tracker CLI'],
      assessment_score: 76,
      job_requirement: 'Required',
      evidence_strength: 'Strong',
      confidence_level: 'High',
      skill_readiness: 78,
      status: 'Strong',
      explanation: 'Your resume and projects provide strong practical evidence of Python usage.',
      category: 'Language'
    },
    {
      skill_name: 'SQL & Database Design',
      resume_evidence: true,
      resume_snippet: 'Relational Database Management Systems, parameterized queries, SQLite',
      project_evidence_count: 2,
      project_names: ['Student Management System', 'Expense Tracker CLI'],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Strong',
      confidence_level: 'High',
      skill_readiness: 74,
      status: 'Strong',
      explanation: 'Clear relational schema design and query execution across projects.',
      category: 'Database'
    },
    {
      skill_name: 'Git Version Control',
      resume_evidence: true,
      resume_snippet: '45+ commits with documented Git branching',
      project_evidence_count: 1,
      project_names: ['Student Management System'],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Strong',
      confidence_level: 'High',
      skill_readiness: 70,
      status: 'Strong',
      explanation: 'Active Git commit history and version-control discipline.',
      category: 'Tool'
    },
    {
      skill_name: 'PostgreSQL',
      resume_evidence: false,
      resume_snippet: 'Experience with SQLite; direct PostgreSQL evidence not found',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Low',
      confidence_level: 'Medium',
      skill_readiness: 52,
      status: 'Developing',
      explanation: 'Solid foundational SQL understanding exists; direct PostgreSQL features pending verification.',
      category: 'Database'
    },
    {
      skill_name: 'Authentication & JWT',
      resume_evidence: true,
      resume_snippet: 'SQL injection prevention noted, but JWT token flows not yet implemented',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Low',
      confidence_level: 'Medium',
      skill_readiness: 45,
      status: 'Developing',
      explanation: 'Basic security awareness present; token authentication evidence not detected.',
      category: 'API'
    },
    {
      skill_name: 'REST APIs & Web Services',
      resume_evidence: false,
      resume_snippet: 'No REST API endpoints in submitted desktop/CLI projects',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'Low',
      confidence_level: 'High',
      skill_readiness: 41,
      status: 'Critical Gap',
      explanation: 'REST API design evidence not found in submitted desktop/CLI projects.',
      category: 'API'
    },
    {
      skill_name: 'Django Web Framework',
      resume_evidence: false,
      resume_snippet: 'No full Django MVC/MTV framework projects',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'None',
      confidence_level: 'High',
      skill_readiness: 32,
      status: 'Critical Gap',
      explanation: 'Primary web framework requirement in job posting not evidenced.',
      category: 'Framework'
    },
    {
      skill_name: 'Docker & Containers',
      resume_evidence: false,
      resume_snippet: 'Containerization evidence not found in resume or repositories',
      project_evidence_count: 0,
      project_names: [],
      assessment_score: null,
      job_requirement: 'Required',
      evidence_strength: 'None',
      confidence_level: 'High',
      skill_readiness: 15,
      status: 'Gap',
      explanation: 'Docker evidence not found; required for deployment pipelines.',
      category: 'DevOps'
    }
  ],
  fastest_path: {
    initial_readiness: 67,
    target_readiness: 86,
    steps: [
      {
        step_number: 1,
        skill_name: 'REST APIs & Web Services',
        estimated_readiness_increase: 8,
        projected_total_readiness: 75,
        prerequisites: ['Python OOP', 'HTTP methods (GET, POST, PUT, DELETE)'],
        why_it_matters: 'Directly unlocks 4 of the 6 core backend responsibilities required by this role.',
        estimated_time: '1 to 2 weeks',
        recommended_topics: [
          'RESTful resource naming and status codes (200, 201, 400, 404, 500)',
          'JSON request/response serialization',
          'API query parameter filtering and pagination',
          'Swagger/OpenAPI documentation generation'
        ],
        suggested_exercise: 'Expose your Student Management System logic as 5 REST endpoints using Django REST framework.'
      },
      {
        step_number: 2,
        skill_name: 'Django Web Framework & ORM',
        estimated_readiness_increase: 7,
        projected_total_readiness: 82,
        prerequisites: ['Python', 'Relational SQL', 'REST APIs'],
        why_it_matters: 'The primary tech stack framework specified in the target job description.',
        estimated_time: '2 to 3 weeks',
        recommended_topics: [
          'Django Models, Migrations, and QuerySets',
          'Django REST Framework ModelSerializer and ViewSets',
          'JWT Token authentication with PyJWT or SimpleJWT',
          'Middleware and custom permission classes'
        ],
        suggested_exercise: 'Re-implement your Student Database into a modular Django application with relational models.'
      },
      {
        step_number: 3,
        skill_name: 'Docker & Containerization',
        estimated_readiness_increase: 4,
        projected_total_readiness: 86,
        prerequisites: ['CLI basics', 'Python environment isolation'],
        why_it_matters: 'Eliminates deployment friction and demonstrates production-ready engineering standards.',
        estimated_time: '4 to 6 days',
        recommended_topics: [
          'Writing a lightweight python:3.12-slim Dockerfile',
          'Docker Compose configuration with PostgreSQL container',
          'Managing environment variables securely (.env)',
          'Container volume mounts and persistence'
        ],
        suggested_exercise: 'Create a docker-compose.yml file that launches both your Django backend and a PostgreSQL database with one command.'
      }
    ]
  },
  dependency_graph: [
    {
      id: 'python',
      label: 'Python OOP',
      category: 'Language',
      status: 'strong',
      prerequisites: [],
      readiness: 78
    },
    {
      id: 'sql',
      label: 'SQL & Database',
      category: 'Database',
      status: 'strong',
      prerequisites: [],
      readiness: 74
    },
    {
      id: 'rest',
      label: 'REST APIs',
      category: 'API',
      status: 'developing',
      prerequisites: ['python'],
      readiness: 41
    },
    {
      id: 'django',
      label: 'Django & DRF',
      category: 'Framework',
      status: 'gap',
      prerequisites: ['python', 'rest'],
      readiness: 32
    },
    {
      id: 'postgres',
      label: 'PostgreSQL',
      category: 'Database',
      status: 'developing',
      prerequisites: ['sql'],
      readiness: 52
    },
    {
      id: 'docker',
      label: 'Docker Containers',
      category: 'DevOps',
      status: 'gap',
      prerequisites: ['django', 'postgres'],
      readiness: 15
    }
  ],
  project_matches: [
    {
      project_id: 'proj_1',
      project_name: 'Student Management System',
      project_description: 'Desktop CRUD application managing student records with SQLite databases.',
      technologies: ['Python', 'SQLite', 'Tkinter', 'SQL', 'Git'],
      github_url: 'https://github.com/aaravsharma-dev/student-management-system',
      relevance_score: 64,
      already_demonstrated: ['Python Object-Oriented Logic', 'Relational Database Schema Design', 'SQL CRUD Operations', 'Data Validation'],
      missing_capabilities: ['REST API Endpoints', 'Token-Based Authentication (JWT)', 'PostgreSQL Integration', 'Docker Containerization'],
      match_explanation: 'Your project demonstrates strong backend data logic and database query handling, but does not currently demonstrate web services or modern API protocols expected for the target role.',
      upgrade_plan: {
        recommended_additions: [
          'Expose RESTful API endpoints using Django REST framework or FastAPI',
          'Implement secure JSON Web Token (JWT) user authentication and role-based permissions',
          'Migrate database storage from SQLite to PostgreSQL with automated migrations',
          'Package backend and database services into a multi-container Docker Compose setup'
        ],
        upgrade_sequence: [
          {
            step: 1,
            title: 'Decouple UI and Build REST API',
            description: 'Convert desktop button triggers into standard HTTP GET, POST, PUT, DELETE endpoints returning JSON payloads.',
            skills_gained: ['RESTful Architecture', 'JSON Serialization', 'HTTP Status Handling']
          },
          {
            step: 2,
            title: 'Add JWT Authentication',
            description: 'Implement user login, password hashing with Argon2/bcrypt, and token expiration verification.',
            skills_gained: ['API Security', 'JWT Auth', 'Role-Based Access Control']
          },
          {
            step: 3,
            title: 'Migrate to PostgreSQL',
            description: 'Switch the connection string to PostgreSQL, adding indexing on frequently filtered columns like student ID and grade.',
            skills_gained: ['PostgreSQL', 'Database Migration', 'Index Optimization']
          },
          {
            step: 4,
            title: 'Containerize with Docker Compose',
            description: 'Write a Dockerfile and docker-compose.yml to spin up the web app alongside PostgreSQL with persistent data volumes.',
            skills_gained: ['Docker', 'Docker Compose', 'Production Packaging']
          }
        ],
        new_skills_gained: ['REST APIs', 'JWT Security', 'PostgreSQL', 'Docker'],
        potential_upgraded_description: 'Planned / Future Architecture: A scalable cloud-ready Student Record REST API engineered with Django REST Framework and PostgreSQL, featuring JWT authentication and fully containerized with Docker Compose.'
      }
    },
    {
      project_id: 'proj_2',
      project_name: 'Expense Tracker CLI',
      project_description: 'CLI tool for tracking personal finances and exporting CSV/JSON summaries.',
      technologies: ['Python', 'SQLite', 'JSON', 'CLI'],
      github_url: 'https://github.com/aaravsharma-dev/python-expense-tracker',
      relevance_score: 48,
      already_demonstrated: ['Python Scripting', 'File I/O and JSON parsing', 'Mathematical aggregation'],
      missing_capabilities: ['Web Server / Asynchronous Processing', 'External API Integrations', 'Automated Testing Suite'],
      match_explanation: 'Demonstrates clean Python fundamentals and file handling, but remains isolated to a local CLI environment.',
      upgrade_plan: {
        recommended_additions: [
          'Add Pytest test coverage for budget calculation corner cases',
          'Integrate with an external currency conversion API with cached responses'
        ],
        upgrade_sequence: [
          {
            step: 1,
            title: 'Integrate Pytest Suite',
            description: 'Write automated unit tests verifying calculation logic across positive, zero, and negative expense inputs.',
            skills_gained: ['Pytest', 'Test Automation', 'Edge Case Handling']
          },
          {
            step: 2,
            title: 'External FX Rate API Integration',
            description: 'Call an external currency exchange rate API with Redis or local caching to convert expenses to EUR/USD.',
            skills_gained: ['Third-party API consumption', 'HTTP client requests', 'Caching']
          }
        ],
        new_skills_gained: ['Pytest', 'API Consumption', 'Caching Patterns'],
        potential_upgraded_description: 'Planned / Future Architecture: An automated financial analytics service with integrated Pytest test suites and live multi-currency exchange rate conversions.'
      }
    }
  ],
  job_comparisons: [
    {
      title: 'Python Developer',
      match_score: 82,
      is_best_fit: true,
      key_matched_skills: ['Python OOP', 'SQL Queries', 'Git Branching', 'Data Processing'],
      top_missing_skills: ['Unit Testing', 'CI/CD Pipelines'],
      salary_range: '$75k - $95k',
      demand_level: 'High'
    },
    {
      title: 'Backend Developer (Target)',
      match_score: 72,
      is_best_fit: false,
      key_matched_skills: ['Python', 'Relational SQL', 'Git'],
      top_missing_skills: ['Django / DRF', 'REST APIs', 'Docker'],
      salary_range: '$85k - $110k',
      demand_level: 'Very High'
    },
    {
      title: 'Data Analyst',
      match_score: 61,
      is_best_fit: false,
      key_matched_skills: ['Python', 'SQL Aggregations', 'Pandas basics'],
      top_missing_skills: ['Tableau / BI tools', 'Advanced Statistics', 'Data Warehousing'],
      salary_range: '$70k - $90k',
      demand_level: 'Moderate'
    }
  ],
  interview_questions: [
    {
      id: 'q1',
      question: 'How do RESTful API methods (GET, POST, PUT, DELETE) differ in terms of idempotency and request body expectations?',
      targeted_skill: 'REST APIs & Web Services',
      question_type: 'Architecture',
      why_asked: 'Identifies whether you understand foundational web standards or simply memorize syntax.',
      expected_concepts: [
        'Idempotence definition (multiple identical requests yield identical server state)',
        'GET and DELETE are idempotent; POST is typically non-idempotent',
        'PUT replaces the resource entirely; PATCH modifies specific attributes',
        'Proper HTTP status return codes (200 OK vs 201 Created vs 204 No Content)'
      ],
      recommended_structure: 'Define idempotency clearly, contrast POST vs PUT, and illustrate with a student record creation example.'
    },
    {
      id: 'q2',
      question: 'In Python, how does the Global Interpreter Lock (GIL) affect multithreaded backend applications, and how do frameworks like Django handle high concurrency?',
      targeted_skill: 'Python Backend Architecture',
      question_type: 'Conceptual',
      why_asked: 'Checks depth of Python runtime understanding for production server environments.',
      expected_concepts: [
        'GIL allows only one native thread to execute Python bytecode at once',
        'I/O-bound tasks (database queries, network requests) release the GIL',
        'Production concurrency achieved via multi-process WSGI/ASGI servers (Gunicorn, Uvicorn, Celery)'
      ],
      recommended_structure: 'Explain what the GIL is, distinguish CPU-bound vs I/O-bound workloads, and describe how Gunicorn workers scale Django in production.'
    },
    {
      id: 'q3',
      question: 'Suppose your database query response time slows down as your users table grows from 1,000 to 1,000,000 rows. How would you diagnose and optimize it?',
      targeted_skill: 'SQL & Database Optimization',
      question_type: 'System Design',
      why_asked: 'Evaluates practical engineering problem-solving beyond academic toy databases.',
      expected_concepts: [
        'Running EXPLAIN ANALYZE to identify sequential scans vs index scans',
        'Creating B-Tree indexes on queried foreign keys and search columns',
        'N+1 query problem in ORM and fixing it using select_related() / prefetch_related()',
        'Database connection pooling'
      ],
      recommended_structure: 'Step 1: Profile and benchmark with EXPLAIN. Step 2: Check ORM queries for N+1. Step 3: Add targeted indexes. Step 4: Implement query caching.'
    },
    {
      id: 'q4',
      question: 'What is the difference between a Docker Image and a Docker Container, and how does docker-compose benefit local backend development?',
      targeted_skill: 'Docker & Containerization',
      question_type: 'Debugging',
      why_asked: 'Ensures you can work seamlessly in modern multi-service containerized teams without "it works on my machine" issues.',
      expected_concepts: [
        'Image is an immutable blueprint/template; container is a running instance with read-write layer',
        'Docker Compose orchestrates multiple services (e.g. backend + PostgreSQL + Redis) with isolated shared networks',
        'Volume mounts for live code reloading during local development'
      ],
      recommended_structure: 'Define image vs container analogy, then explain how docker-compose coordinates environment variables, ports, and dependencies.'
    }
  ]
};
