import matchlensImg from '@/assets/matchlens-project.jpg';
import pinnImg from '@/assets/pinn-project.jpg';
import opdImg from '@/assets/opd-project.jpg';
import hamroImg from '@/assets/hamrobazaar-project.jpg';
import pharmacyImg from '@/assets/pharmacy-project.jpg';
import dataExtractorImg from '@/assets/data-extractor-project.png';
import llmEvalImg from '@/assets/llm-eval-dashboard.jpeg';
import cguardImg from '@/assets/cguard-project.png';

const flagshipProjects = [
    {
        title: "MATCHLENS",
        subtitle: "Event-driven football intelligence · Microsoft × Premier League",
        description: "An event-driven football intelligence platform that transforms match events into deterministic tactical states and evidence-linked stories across four audience modes. Its streaming path is built to reconcile every event before it reaches analysis.",
        metrics: [
            { label: "Events reconciled", value: "1,728 / 1,728" },
            { label: "Processing errors", value: "0" },
            { label: "Audience modes", value: "4 views" },
            { label: "Streaming", value: "Event Hubs → Fabric" },
        ],
        tech: ["Next.js", "FastAPI", "Azure Event Hubs", "Microsoft Foundry", "Fabric", "Docker"],
        liveLink: "https://matchlens-web.ashystone-436ed578.koreacentral.azurecontainerapps.io/demo",
        githubLink: "https://github.com/AyushkhatiDev/MATCHLENS",
        demoVideoLink: "https://vimeo.com/1238417597?share=copy&fl=sv&fe=ci",
        streamLink: "https://matchlens-web.ashystone-436ed578.koreacentral.azurecontainerapps.io/stream",
        image: matchlensImg,
        featured: true,
    },
    {
        title: "SENTINEL",
        subtitle: "Real-time CCTV ingestion · Gujarat Police Challenge",
        description: "A real-time video ingestion platform designed so a failing camera cannot stall the rest. Fifteen RTSP feeds run through fault-isolated workers and bounded queues, keeping the live path predictable under failure.",
        metrics: [
            { label: "Live camera feeds", value: "15 RTSP" },
            { label: "Worker model", value: "Fault-isolated" },
            { label: "Queue policy", value: "Bounded" },
            { label: "Video path", value: "RTSP → HLS" },
        ],
        tech: ["Python", "FastAPI", "PostGIS", "PyAV", "ONNX Runtime", "React", "Docker"],
        liveLink: "https://lnkd.in/p/ddm2a926",
        primaryLinkLabel: "Case study",
        featured: true,
    },
    {
        title: "VIBESEC",
        subtitle: "Static security scanner · Open source",
        description: "A Python static-analysis scanner for AI-generated code. A deterministic AST engine catches common security defects and is backed by a published CLI and a 179-test suite.",
        metrics: [
            { label: "PyPI downloads", value: "1,200+" },
            { label: "Patterns detected", value: "24" },
            { label: "Test suite", value: "179 tests" },
            { label: "Analysis", value: "Python AST" },
        ],
        tech: ["Python", "AST", "Click", "pytest", "Static analysis"],
        githubLink: "https://github.com/AyushkhatiDev/vibesec",
        statsLink: "https://pypistats.org/packages/vibesec",
        featured: true,
    },
    {
        title: "COMMERCE CORE",
        subtitle: "Evan Merchantile + HamroBazaar · Production systems",
        description: "Commerce backend work spanning distributor trees, B2B checkout, tiered pricing, ledgers, and high-volume reads. The focus is the unglamorous production work: correct financial writes, faster queries, and migrations that do not interrupt the business.",
        metrics: [
            { label: "Backend surface", value: "198 endpoints" },
            { label: "Query path", value: "133 → 6" },
            { label: "Hot-read p99", value: "1.8s → 240ms" },
            { label: "Migration", value: "38M rows" },
        ],
        tech: ["Flask", "SQLAlchemy", "MySQL", "Redis", "Celery", "Docker"],
        liveLink: "https://hamrobazaar.in/",
        image: hamroImg,
        featured: true,
    },
];

const projects = [
  {
    title: 'ConcurrencyGuard',
    subtitle: 'Python Concurrency Security Analyzer',
    description:
      'I built an offline Python analyzer that traces race conditions across database queries, background jobs, and shared state. It checks concurrent execution paths and suggests fixes that preserve comments and formatting.',
    metrics: [
      { label: 'Semantic Rules', value: '21 Rules' },
      { label: 'External APIs', value: '0 Required' },
      { label: 'Current Release', value: 'v3.4.0' },
    ],
    tech: ['Python', 'AST', 'LibCST', 'LSP', 'GitHub Actions'],
    liveLink: 'https://concurrencyguard.dev',
    githubLink: 'https://github.com/AyushkhatiDev/concurrency-guard',
    image: cguardImg,
    accent: 'hsl(12 93% 55%)',
    accentRGB: '248,86,44',
  },
  ...flagshipProjects,
  {
    title: 'LLM EVAL',
    subtitle: 'Open-Source LLM Evaluation Framework',
    description:
      'Built a self-hostable evaluation system for tracking LLM regressions across factual accuracy, safety refusals, hallucination resistance, adversarial prompts, and reasoning. The framework runs a 27-test suite, uses a 3-tier judge chain, auto-generates prompt injections, and persists every run to PostgreSQL with a live inspection dashboard.',
    metrics: [
      { label: 'Test Suite', value: '27 Checks' },
      { label: 'Accuracy', value: '86%' },
      { label: 'Judge Chain', value: '3 Tiers' },
    ],
    tech: ['Flask', 'PostgreSQL', 'Groq', 'Next.js', 'Vercel'],
    liveLink: 'https://lnkd.in/g9kkTh7q',
    githubLink: 'https://lnkd.in/gp_RxvCw',
    paperLink: 'https://lnkd.in/gGEPiHsS',
    image: llmEvalImg,
    accent: 'hsl(173 80% 40%)',
    accentRGB: '20,184,166',
  },
  {
    title: 'DATA EXTRACTOR',
    subtitle: 'Multi-Source Extraction Platform',
    description:
      'Engineered a multi-source data extraction pipeline leveraging Playwright and BeautifulSoup, augmented by a local-first AI enrichment stack (Ollama, LangExtract). Implemented robust validation, cross-source deduplication, and a 4-tier provider fallback chain.',
    metrics: [
      { label: 'AI Stack', value: 'Local-First' },
      { label: 'Extraction', value: '9+ Sources' },
      { label: 'Export', value: 'CSV/Excel/JSON' },
    ],
    tech: ['Flask', 'MySQL', 'Redis', 'Playwright', 'Ollama'],
    liveLink: 'https://data-extractor-1-laq7.onrender.com/',
    githubLink: undefined,
    paperLink:
      'https://github.com/AyushkhatiDev/data-extractor/blob/main/paper/DataExtractor%20copy.pdf',
    image: dataExtractorImg,
    accent: 'hsl(142 71% 45%)',
    accentRGB: '34,197,94',
  },
  {
    title: 'PINN PDE SOLVER',
    subtitle: 'Physics-Informed Neural Networks',
    description:
      'Built a deep learning framework embedding physical laws into neural network training via automatic differentiation, solving Heat, Wave, and Burgers equations without labelled data.',
    metrics: [
      { label: 'R-Squared', value: '0.9995' },
      { label: 'L2 Error', value: '≈1e-3' },
      { label: 'Tests', value: '49 Passing' },
    ],
    tech: ['PyTorch', 'Streamlit', 'NumPy', 'SciPy', 'Auto-Diff'],
    liveLink:
      'https://ayushkhatidev-physics-informed-neural-n-appstreamlit-app-dcw1oi.streamlit.app/',
    githubLink: undefined,
    image: pinnImg,
    accent: 'hsl(217 91% 60%)',
    accentRGB: '96,165,250',
  },
  {
    title: 'OPD SOFTWARE',
    subtitle: 'Healthcare & OPD Platform',
    description:
      'Eliminated 100% of out-of-zone checkout failures via geo-restriction engine. Reduced bot abuse to zero with a multi-layer security stack and real-time WebSocket broadcasting in a multi-tenant system with 6-tier RBAC.',
    metrics: [
      { label: 'Bot Abuse', value: '0%' },
      { label: 'Time Saved', value: '3+ hrs/day' },
      { label: 'RBAC Tiers', value: '6' },
    ],
    tech: ['Flask', 'MySQL', 'WebSockets', 'RBAC', 'reCAPTCHA'],
    liveLink: 'https://opdsoftware.ayurvedicchikitsalaya.in/',
    githubLink: undefined,
    image: opdImg,
    accent: 'hsl(280 70% 60%)',
    accentRGB: '167,139,250',
  },
  {
    title: 'HAMROBAZAAR',
    subtitle: 'B2B E-Commerce Platform',
    description:
      'Sustained 99.8% production uptime serving 2,500+ businesses across 10,000+ SKUs. Reduced p99 API latency by 40% via B-tree indexing and query optimization.',
    metrics: [
      { label: 'Uptime', value: '99.8%' },
      { label: 'p99 Latency', value: '200ms' },
      { label: 'Businesses', value: '2,500+' },
    ],
    tech: ['Flask', 'MySQL', 'Redis', 'Nginx', 'Docker'],
    liveLink: 'https://hamrobazaar.in/',
    githubLink: undefined,
    image: hamroImg,
    accent: 'hsl(38 92% 50%)',
    accentRGB: '251,191,36',
  },
  {
    title: 'MEDICAL E-COMMERCE',
    subtitle: 'Production-Grade Pharmacy',
    description:
      'Architected end-to-end medical e-commerce with hybrid cart engine, dynamic GST and coupon computation, geo-serviceability enforcement, and secure Razorpay payment flow.',
    metrics: [
      { label: 'Payment', value: 'Razorpay' },
      { label: 'Security', value: 'AES + RBAC' },
      { label: 'Query Perf', value: 'N+1 Fixed' },
    ],
    tech: ['Flask', 'SQLAlchemy', 'Razorpay', 'Alembic', 'AES'],
    liveLink: 'https://store.ayurvedicchikitsalaya.in/',
    githubLink: undefined,
    image: pharmacyImg,
    accent: 'hsl(0 84% 60%)',
    accentRGB: '248,113,113',
  },
] as const;

export default function ProjectsSection() {
  return <section id="projects" className="work-index">
    <h2>Selected work</h2>
    {projects.map((project, index) => <article key={project.title} className="work-entry">
      {project.image && <a href={project.liveLink} aria-label={'Visit ' + project.title}><img loading="lazy" src={project.image} alt={index === 0 ? 'ConcurrencyGuard race inspector showing a live invariant trace' : project.subtitle} /></a>}
      <div><small>{project.subtitle}</small><h3>{project.title}</h3><p>{project.description}</p>
      <details><summary>Engineering details</summary><p>{project.tech.join(' · ')}</p><ul>{project.metrics.map(metric => <li key={metric.label}>{metric.label} — {metric.value}</li>)}</ul></details>
      <nav aria-label={project.title + ' links'}>{project.liveLink && <a href={project.liveLink}>Visit project ↗</a>}{project.githubLink && <a href={project.githubLink}>GitHub ↗</a>}{'demoVideoLink' in project && project.demoVideoLink && <a href={project.demoVideoLink}>Watch demo ↗</a>}{'streamLink' in project && project.streamLink && <a href={project.streamLink}>Live stream ↗</a>}{'statsLink' in project && project.statsLink && <a href={project.statsLink}>Package stats ↗</a>}{'paperLink' in project && <a href={project.paperLink}>Read paper ↗</a>}</nav></div>
    </article>)}
  </section>;
}
