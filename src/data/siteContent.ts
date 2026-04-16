/**
 * Central content — Ali Nawab (from Ali-Resume.pdf). Update dates/links as your career evolves.
 */
export const siteContent = {
  name: "Ali Nawab",
  role: "Computer Science · UT Dallas · Software Engineer",
  tagline: "Systems. Scale. Ship.",
  heroSubline:
    "Internships at Palantir and Meta, Bloomberg Tech Insights, and MLH — building async pipelines, production ML infra, and products people rely on when the stakes are real.",

  about: {
    title: "Profile",
    headline: "Build under load",
    body: `I'm a B.S. Computer Science student at the University of Texas at Dallas (graduation December 2027, GPA 3.7) focused on software engineering, machine learning, and distributed systems. I've shipped work in Palantir Foundry/AIP, Meta-scale ML inferencing with Docker and Kubernetes, and voice-first healthcare backends on AWS. I also teach CS weekly at Valley Ranch Community Center — curriculum design, hackathons, and measurable outcomes (e.g. lifting average project scores from 70% to 92% in one term). I like problems where correctness, latency, and operator trust all have to land together.`,
  },

  whyBoring: {
    title: "Mission alignment",
    headline: "Infrastructure is the product",
    body: `I'm drawn to teams that treat engineering like civil work: load paths, redundancy, and execution under constraints you don't get to negotiate. Tunneling and underground systems are the physical version of that — long horizons, tight integration with the real world, and zero tolerance for hand-wavy interfaces between "software" and "what actually happens." I want to work where ambitious scope meets disciplined systems thinking — shipping tangible capability, not deck theater.`,
  },

  experience: {
    title: "Field record",
    intro:
      "Industry programs, internships, and teaching — where constraints, ownership, and outcomes were non-negotiable.",
    sections: [
      {
        id: "work",
        label: "Industry & programs",
        items: [
          {
            org: "Bloomberg",
            title: "Tech Insights Program",
            dates: "June 2025 – August 2025",
            bullets: [
              "Immersive program with direct exposure to Bloomberg Engineering culture and how they approach technical interviews.",
              "Weekly coaching led by Bloomberg engineers — coding technique, problem-solving, and clear communication in technical contexts.",
              "Structured interview preparation through consistent practice and feedback, raising readiness for high-bar engineering loops.",
            ],
          },
          {
            org: "Palantir",
            title: "Software Engineer Intern",
            dates: "February 2025 – March 2025",
            bullets: [
              "Launch program: built a Sentimental Gmail Organizer in AIP (Foundry) — async pipeline ingesting Gmail, LLM sentiment scoring, auto-labeling and routing for critical mail.",
              "Integrated AIP ontology and security primitives; deployed to an internal pilot across five teams with ~95% precision on positive/negative classification and fewer missed high-priority messages.",
              "Partnered with product and infra to templatize the workflow for replication to other channels (Slack, Teams), demonstrating extensibility to leadership.",
            ],
          },
          {
            org: "Meta",
            title: "Software Engineer Intern · MLH Fellow",
            dates: "June 2024 – September 2024",
            bullets: [
              "Selected as one of 50 students from a 5,000+ applicant pool to work with Meta engineers on scalable AI inferencing pipelines.",
              "Containerized ML workloads with Docker and Kubernetes; tuned GPU scheduling and microservices, contributing to ~5% reduction in system downtime.",
              "Automated 600+ pull request checks with Jenkins pipelines, strengthening CI/CD and deployment confidence.",
            ],
          },
        ],
      },
      {
        id: "leadership",
        label: "Leadership",
        items: [
          {
            org: "Valley Ranch Community Center",
            title: "Computer Science Tutor",
            dates: "June 2023 – Present",
            bullets: [
              "Designed and delivered a weekly CS curriculum (Python, web development, intro ML) for 25+ high school students — average project-assessment scores rose from 70% to 92% in one term.",
              "Hosted quarterly hackathons and outreach workshops; teams earned three regional competition wins and secured ~$4k in grants for new lab hardware.",
            ],
          },
        ],
      },
    ],
  },

  projects: [
    {
      id: "lotus",
      name: "Lotus AI",
      description:
        "Co-built an agentic virtual nurse: multimodal triage (voice + video), structured reasoning, intelligent search and context tracking, location-based hospital search, and backend flows for clinical summarization and appointment automation.",
      stack: ["Python", "LLMs", "Speech", "Vision", "Agent workflows"],
      href: "https://github.com/AnSingh1/nurseai",
      label: "GitHub",
    },
    {
      id: "meddy",
      name: "Meddy",
      description:
        "Led backend architecture for an AI healthcare assistant: voice-based medical insights, treatment reminders, and real-time Q&A. Microservices on AWS EC2, Lambda, DynamoDB; Gemini for LLM responses; Firebase for auth and sync.",
      stack: ["AWS", "Lambda", "DynamoDB", "Gemini API", "Firebase", "Node.js"],
      href: "https://meddy-kqfo.vercel.app/",
      label: "Live app",
    },
    {
      id: "palantir-gmail",
      name: "Sentimental Gmail Organizer",
      description:
        "Palantir Launch: built inside AIP (Foundry) — fully asynchronous pipeline ingesting Gmail, LLM sentiment scoring, auto-label and routing for critical mail. Ontology and security primitives; internal pilot across five teams; ~95% precision on positive/negative classification.",
      stack: ["Palantir AIP", "Gmail API", "LLMs", "Foundry", "Async pipelines"],
      href: "https://github.com/yaboiali",
      label: "GitHub",
    },
    {
      id: "cs-genome",
      name: "CS Genome · LLM integration",
      description:
        "Research on LLaMA 2 for NLP quality and prompt engineering; trained and integrated an LLM on the CS Genome site for Q&A on processor descriptions and HPC topics — ~5–15s responses with 85%+ accuracy.",
      stack: ["LLaMA 2", "llama.cpp", "NLP", "Python", "Research"],
      href: "https://github.com/yaboiali",
      label: "GitHub",
    },
  ] as const,

  skills: {
    title: "Capabilities",
    groups: [
      {
        label: "Languages",
        items: [
          "Python (intermediate)",
          "Java (intermediate)",
          "JavaScript (intermediate)",
          "C++ (beginner)",
          "C# (beginner)",
        ],
      },
      {
        label: "Frameworks & platforms",
        items: [
          "React.js",
          "Node.js",
          "Express",
          "GraphQL",
          "Flask",
          "Spring Boot",
          "ASP.NET",
          "Flutter",
          "Firebase",
        ],
      },
      {
        label: "Systems & ops",
        items: [
          "Docker",
          "Kubernetes",
          "Jenkins (CI/CD)",
          "Apache Spark",
          "AWS EC2 / Lambda / DynamoDB",
          "Distributed systems coursework",
        ],
      },
    ],
  },

  resume: {
    headline: "Terminal bay",
    subline:
      "UT Dallas · B.S. Computer Science (Dec 2027) · GPA 3.7. View my existing portfolio site, download the PDF resume, or reach out directly.",
    viewUrl: "https://bit.ly/Alis-Portfolio",
    downloadUrl: "/Ali-Resume.pdf",
    contactEmail: "mxn210071@utdallas.edu",
    phoneDisplay: "214-597-1122",
    phoneTel: "tel:+12145971122",
  },

  links: {
    email: "mailto:mxn210071@utdallas.edu",
    github: "https://github.com/yaboiali",
    linkedin: "https://www.linkedin.com/in/alinawb",
    portfolio: "https://bit.ly/Alis-Portfolio",
  },
} as const;
