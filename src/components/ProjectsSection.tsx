import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import pinnImg from "@/assets/pinn-project.jpg";
import opdImg from "@/assets/opd-project.jpg";
import hamroImg from "@/assets/hamrobazaar-project.jpg";
import pharmacyImg from "@/assets/pharmacy-project.jpg";
import dataExtractorImg from "@/assets/data-extractor-project.png";
import llmEvalImg from "@/assets/llm-eval-dashboard.jpeg";

const projects = [
    {
        title: "LLM EVAL",
        subtitle: "Open-Source LLM Evaluation Framework",
        description:
            "Built a self-hostable evaluation framework for AI teams to catch model regressions before users do. It runs a 27-test suite across factual accuracy, safety refusals, hallucination resistance, adversarial prompts, and reasoning, with a 3-tier judge chain combining semantic similarity, LLM judging, and regex fallback. Every run persists to PostgreSQL and feeds a live dashboard for pass rates, latency percentiles, failure taxonomy, and per-test inspection.",
        metrics: [
            { label: "Eval Suite", value: "27 Tests" },
            { label: "Hallucination Accuracy", value: "86%" },
            { label: "Baseline Lift", value: "+36 pts" },
            { label: "Judge Chain", value: "3 Tiers" },
        ],
        tech: ["Flask", "PostgreSQL", "Groq", "Next.js", "Vercel", "Render", "Neon"],
        liveLink: "https://llm-eval-silk.vercel.app/",
        githubLink: "https://github.com/AyushkhatiDev/llm-eval",
        researchLink: "https://lnkd.in/gGEPiHsS",
        image: llmEvalImg,
    },
    {
        title: "DATA EXTRACTOR",
        subtitle: "Multi-Source Extraction Platform",
        description:
            "Engineered a multi-source data extraction pipeline leveraging Playwright and BeautifulSoup, augmented by a local-first AI enrichment stack (Ollama, LangExtract). Implemented robust validation, cross-source deduplication, and a 4-tier provider fallback chain. Backed by a Flask/MySQL architecture and Redis message queues to ensure resilient, high-throughput scalable scraping.",
        metrics: [
            { label: "AI Stack", value: "Local-First" },
            { label: "Data Quality", value: "Deduplication" },
            { label: "Extraction", value: "9+ Sources" },
            { label: "Export Formats", value: "CSV, Excel, JSON" },
        ],
        tech: ["Flask", "MySQL", "Redis", "Playwright", "Ollama", "LangExtract"],
        liveLink: "https://data-extractor-1-laq7.onrender.com/",
        paperLink: "https://github.com/AyushkhatiDev/data-extractor/blob/main/paper/DataExtractor%20copy.pdf",
        image: dataExtractorImg,
    },
    {
        title: "PINN PDE SOLVER",
        subtitle: "Physics-Informed Neural Networks",
        description:
            "Built a deep learning framework embedding physical laws (PDEs) into neural network training via automatic differentiation – solving Heat, Wave, and Burgers equations without labelled data. Engineered a modular 8-component architecture with composite loss penalizing PDE residual, IC, and BC violations at 10,000+ collocation points per run.",
        metrics: [
            { label: "R-Squared", value: "0.9995" },
            { label: "L2 Error", value: "≈1e-3" },
            { label: "Energy Conservation", value: "<2% Δ" },
            { label: "Test Coverage", value: "49 Tests" },
        ],
        tech: ["PyTorch", "Streamlit", "NumPy", "SciPy", "pytest", "Auto-Diff"],
        liveLink: "https://ayushkhatidev-physics-informed-neural-n-appstreamlit-app-dcw1oi.streamlit.app/",
        image: pinnImg,
    },
    {
        title: "OPD SOFTWARE",
        subtitle: "Healthcare E-Commerce & OPD Platform",
        description:
            "Eliminated 100% of out-of-zone checkout failures via geo-restriction engine. Reduced bot abuse to zero with multi-layer security stack. Reduced hospital queue visibility latency to near-zero with real-time WebSocket broadcasting in a multi-tenant system with 6-tier RBAC.",
        metrics: [
            { label: "Bot Abuse Rate", value: "0%" },
            { label: "Geo-Restriction", value: "100%" },
            { label: "Daily Time Saved", value: "3+ hrs" },
            { label: "Over-dispensing", value: "0 Incidents" },
        ],
        tech: ["Flask", "MySQL", "WebSockets", "RBAC", "reCAPTCHA", "CSRF", "Jinja2"],
        liveLink: "https://opdsoftware.ayurvedicchikitsalaya.in/",
        image: opdImg,
    },
    {
        title: "HAMROBAZAAR",
        subtitle: "B2B E-Commerce Platform",
        description:
            "Sustained 99.8% production uptime serving 2,500+ businesses across 10,000+ SKUs. Reduced p99 API latency by 40% via B-tree indexing and query optimization. Eliminated external OTP API costs entirely with idempotent delivery and leaky-bucket rate limiting.",
        metrics: [
            { label: "Uptime", value: "99.8%" },
            { label: "p99 Latency", value: "200ms" },
            { label: "Businesses Served", value: "2,500+" },
            { label: "Transaction Failures", value: "<0.2%" },
        ],
        tech: ["Flask", "MySQL", "Redis", "Nginx", "Docker", "ACID", "B-tree"],
        liveLink: "https://hamrobazaar.in/",
        image: hamroImg,
    },
    {
        title: "MEDICAL E-COMMERCE",
        subtitle: "Production-Grade Pharmacy Platform",
        description:
            "Architected end-to-end medical e-commerce with hybrid cart engine, dynamic GST & coupon computation, geo-serviceability enforcement, prescription upload pipeline, and secure Razorpay payment flow with backend validation against tampered payloads.",
        metrics: [
            { label: "Architecture", value: "Modular BP" },
            { label: "Payment", value: "Razorpay" },
            { label: "Security", value: "AES + RBAC" },
            { label: "Query Perf", value: "N+1 Fixed" },
        ],
        tech: ["Flask", "SQLAlchemy", "Razorpay", "Alembic", "Bootstrap", "AJAX", "AES"],
        liveLink: "https://store.ayurvedicchikitsalaya.in/",
        image: pharmacyImg,
    },
];

const ProjectsSection = () => {
    return (
        <section className="py-24 lg:py-32" id="projects">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-24 flex items-end justify-between"
                >
                    <div>
                        <span className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block">
                            [ PORTFOLIO ]
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
                            MY WORK
                        </h2>
                    </div>
                </motion.div>

                <div className="space-y-8">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} {...project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
