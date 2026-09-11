from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Mock data for Google Cloud Technologies Conference (GCP Tech Summit 2026)
CONFERENCE_INFO = {
    "title": "GCP Cloud Horizons Summit 2026",
    "date": "October 15, 2026",
    "location": "Google Cloud Space, San Francisco, CA & Virtual",
    "description": "Join Google Cloud developers, engineers, and visionaries for a 1-day deep dive into the latest technologies shaping serverless architectures, Generative AI, global databases, stream processing, and multi-cloud security."
}

# The 1-day event has a list of 8 talks in total
# Each talk has 1 or 2 max. speakers
# Each speaker has a First Name, Last Name and LinkedIn url.
# Category contains 1 or 2 entries
TALKS = [
    {
        "id": 1,
        "title": "Architecting Serverless Applications with Cloud Run and Eventarc",
        "speakers": [
            {
                "first_name": "Sarah",
                "last_name": "Jenkins",
                "role": "Principal Cloud Architect",
                "linkedin": "https://www.linkedin.com/in/sarah-jenkins-cloud",
                "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
                "first_name": "David",
                "last_name": "Chen",
                "role": "Senior DevOps Engineer",
                "linkedin": "https://www.linkedin.com/in/david-chen-devops",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Developer", "Serverless"],
        "description": "Dive deep into building event-driven, fully managed serverless architectures on Google Cloud. Learn how to connect Cloud Run with Eventarc to process pub/sub messages, cloud storage events, and database changes in real time.",
        "time": "09:30 AM - 10:15 AM",
        "type": "talk"
    },
    {
        "id": 2,
        "title": "Unleashing Generative AI with Vertex AI and Gemini Models",
        "speakers": [
            {
                "first_name": "Elena",
                "last_name": "Rostova",
                "role": "AI Research Scientist",
                "linkedin": "https://www.linkedin.com/in/elena-rostova-ai",
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["AI & Machine Learning", "Gemini"],
        "description": "Discover the groundbreaking capabilities of Google Gemini models on Vertex AI. We will demonstrate how to build custom prompt templates, fine-tune models for specific domain workloads, and deploy production-grade LLM applications using LangChain and Vertex AI SDKs.",
        "time": "10:15 AM - 11:00 AM",
        "type": "talk"
    },
    {
        "id": 3,
        "title": "Securing Cloud Workloads: Beyond IAM and Service Accounts",
        "speakers": [
            {
                "first_name": "Marcus",
                "last_name": "Thorne",
                "role": "Security Principal",
                "linkedin": "https://www.linkedin.com/in/marcus-thorne-security",
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Security", "Infrastructure"],
        "description": "Security in the cloud is a shared responsibility. This talk covers advanced security controls in GCP, including VPC Service Controls, BeyondCorp Enterprise, and implementing zero-trust network access for microservices using Cloud Identity-Aware Proxy (IAP).",
        "time": "11:15 AM - 12:00 PM",
        "type": "talk"
    },
    {
        "id": 4,
        "title": "Next-Gen Analytics: Real-Time Stream Processing with BigQuery and Dataflow",
        "speakers": [
            {
                "first_name": "Priyancka",
                "last_name": "Sharma",
                "role": "Big Data Specialist",
                "linkedin": "https://www.linkedin.com/in/priyancka-sharma-data",
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
                "first_name": "Hiroshi",
                "last_name": "Tanaka",
                "role": "Data Solutions Architect",
                "linkedin": "https://www.linkedin.com/in/hiroshi-tanaka-solutions",
                "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Data & Analytics", "Databases"],
        "description": "Learn how to design a low-latency data pipeline that streams millions of events per second. We will cover writing Apache Beam pipelines in Python, executing them on Dataflow, and performing real-time analytics with BigQuery BI Engine and Looker Studio.",
        "time": "12:00 PM - 12:45 PM",
        "type": "talk"
    },
    {
        "id": 5,
        "title": "Mastering Kubernetes at Scale with GKE Autopilot",
        "speakers": [
            {
                "first_name": "Alex",
                "last_name": "Mercer",
                "role": "Kubernetes Architect",
                "linkedin": "https://www.linkedin.com/in/alex-mercer-k8s",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Developer", "Containers"],
        "description": "GKE Autopilot manages the underlying cluster infrastructure so you can focus purely on application workloads. This session details GKE node auto-provisioning, horizontal pod autoscaling, cost optimization strategies, and setting up multi-cluster ingress controllers.",
        "time": "01:45 PM - 02:30 PM",
        "type": "talk"
    },
    {
        "id": 6,
        "title": "Modernizing Databases: Migrating to Cloud Spanner for Global Scale",
        "speakers": [
            {
                "first_name": "Maria",
                "last_name": "Gonzalez",
                "role": "Lead Database Architect",
                "linkedin": "https://www.linkedin.com/in/maria-gonzalez-db",
                "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
                "first_name": "Thomas",
                "last_name": "Wright",
                "role": "Data Platform Director",
                "linkedin": "https://www.linkedin.com/in/thomas-wright-platform",
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Data & Analytics", "Databases"],
        "description": "Relational consistency meets horizontal scalability at a global level. Explore the migration pathways from traditional relational database engines to Cloud Spanner. Learn schema design principles, query tuning best practices, and the underlying Spanner architecture.",
        "time": "02:30 PM - 03:15 PM",
        "type": "talk"
    },
    {
        "id": 7,
        "title": "Observability at Scale: Advanced Monitoring with Cloud Operations Suite",
        "speakers": [
            {
                "first_name": "John",
                "last_name": "Doe",
                "role": "Site Reliability Engineer",
                "linkedin": "https://www.linkedin.com/in/john-doe-sre",
                "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Developer", "Infrastructure"],
        "description": "Monitoring complex microservices can be overwhelming. Learn how to design custom Service Level Indicators (SLIs), track Service Level Objectives (SLOs), and utilize Cloud Logging, Cloud Trace, and Cloud Profiler to rapidly diagnose and resolve latency bottlenecks.",
        "time": "03:30 PM - 04:15 PM",
        "type": "talk"
    },
    {
        "id": 8,
        "title": "Cost Optimization: FinOps Best Practices on Google Cloud",
        "speakers": [
            {
                "first_name": "Emily",
                "last_name": "Vance",
                "role": "FinOps Consultant",
                "linkedin": "https://www.linkedin.com/in/emily-vance-finops",
                "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
            }
        ],
        "categories": ["Infrastructure", "FinOps"],
        "description": "Learn to manage and optimize your GCP spend effectively. This session outlines concrete, actionable FinOps strategies including committed use discounts, custom billing export models, automated resource scheduling, and utilizing Recommender API insights.",
        "time": "04:15 PM - 05:00 PM",
        "type": "talk"
    }
]

# Complete daily timetable combining talks and special breaks/events
TIMETABLE = [
    {
        "time": "09:00 AM - 09:30 AM",
        "title": "Registration & Welcome Coffee",
        "type": "break",
        "description": "Pick up your event badge, grab coffee, and network before the keynote starts."
    },
    {
        "id": 1,
        "time": "09:30 AM - 10:15 AM",
        "title": "Architecting Serverless Applications with Cloud Run and Eventarc",
        "speakers": TALKS[0]["speakers"],
        "categories": TALKS[0]["categories"],
        "description": TALKS[0]["description"],
        "type": "talk"
    },
    {
        "id": 2,
        "time": "10:15 AM - 11:00 AM",
        "title": "Unleashing Generative AI with Vertex AI and Gemini Models",
        "speakers": TALKS[1]["speakers"],
        "categories": TALKS[1]["categories"],
        "description": TALKS[1]["description"],
        "type": "talk"
    },
    {
        "time": "11:00 AM - 11:15 AM",
        "title": "Morning Coffee Break",
        "type": "break",
        "description": "Stretch your legs, get some refreshments, and connect with sponsors."
    },
    {
        "id": 3,
        "time": "11:15 AM - 12:00 PM",
        "title": "Securing Cloud Workloads: Beyond IAM and Service Accounts",
        "speakers": TALKS[2]["speakers"],
        "categories": TALKS[2]["categories"],
        "description": TALKS[2]["description"],
        "type": "talk"
    },
    {
        "id": 4,
        "time": "12:00 PM - 12:45 PM",
        "title": "Next-Gen Analytics: Real-Time Stream Processing with BigQuery and Dataflow",
        "speakers": TALKS[3]["speakers"],
        "categories": TALKS[3]["categories"],
        "description": TALKS[3]["description"],
        "type": "talk"
    },
    {
        "time": "12:45 PM - 01:45 PM",
        "title": "Lunch Break",
        "type": "lunch",
        "description": "Complimentary lunch served in the main dining hall. Gluten-free and vegan options available."
    },
    {
        "id": 5,
        "time": "01:45 PM - 02:30 PM",
        "title": "Mastering Kubernetes at Scale with GKE Autopilot",
        "speakers": TALKS[4]["speakers"],
        "categories": TALKS[4]["categories"],
        "description": TALKS[4]["description"],
        "type": "talk"
    },
    {
        "id": 6,
        "time": "02:30 PM - 03:15 PM",
        "title": "Modernizing Databases: Migrating to Cloud Spanner for Global Scale",
        "speakers": TALKS[5]["speakers"],
        "categories": TALKS[5]["categories"],
        "description": TALKS[5]["description"],
        "type": "talk"
    },
    {
        "time": "03:15 PM - 03:30 PM",
        "title": "Afternoon Coffee Break",
        "type": "break",
        "description": "Re-energize with coffee, tea, and cookies before the final sessions."
    },
    {
        "id": 7,
        "time": "03:30 PM - 04:15 PM",
        "title": "Observability at Scale: Advanced Monitoring with Cloud Operations Suite",
        "speakers": TALKS[6]["speakers"],
        "categories": TALKS[6]["categories"],
        "description": TALKS[6]["description"],
        "type": "talk"
    },
    {
        "id": 8,
        "time": "04:15 PM - 05:00 PM",
        "title": "Cost Optimization: FinOps Best Practices on Google Cloud",
        "speakers": TALKS[7]["speakers"],
        "categories": TALKS[7]["categories"],
        "description": TALKS[7]["description"],
        "type": "talk"
    },
    {
        "time": "05:00 PM - 05:30 PM",
        "title": "Closing Remarks & Networking Reception",
        "type": "break",
        "description": "Wrap up the day's discussions with drinks and appetizers in the networking lounge."
    }
]

@app.route('/')
def home():
    return render_template('index.html', conference=CONFERENCE_INFO, timetable=TIMETABLE, talks=TALKS)

@app.route('/api/talks')
def get_talks():
    return jsonify({
        "conference": CONFERENCE_INFO,
        "talks": TALKS,
        "timetable": TIMETABLE
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
