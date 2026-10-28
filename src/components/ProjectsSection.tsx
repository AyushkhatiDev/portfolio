import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import matchlensImg from "@/assets/matchlens-project.jpg";
import pinnImg from "@/assets/pinn-project.jpg";
import opdImg from "@/assets/opd-project.jpg";
import hamroImg from "@/assets/hamrobazaar-project.jpg";
import pharmacyImg from "@/assets/pharmacy-project.jpg";
import dataExtractorImg from "@/assets/data-extractor-project.png";
import llmEvalImg from "@/assets/llm-eval-dashboard.jpeg";

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

const selectedWork = [
    {
        title: "LLM EVAL",
        subtitle: "Open-source model evaluation framework",
        description: "A self-hostable framework for catching model regressions across factuality, safety, hallucination, adversarial prompts, and reasoning.",
        metrics: [
            { label: "Evaluation suite", value: "27 tests" },
            { label: "Hallucination accuracy", value: "86%" },
            { label: "Baseline lift", value: "+36 pts" },
            { label: "Judge chain", value: "3 tiers" },
        ],
        tech: ["Flask", "PostgreSQL", "Groq", "Next.js", "Neon"],
        liveLink: "https://llm-eval-silk.vercel.app/",
        githubLink: "https://github.com/AyushkhatiDev/llm-eval",
        researchLink: "https://lnkd.in/gGEPiHsS",
        image: llmEvalImg,
    },
    {
        title: "DATA EXTRACTOR",
        subtitle: "Resilient multi-source extraction platform",
        description: "A queue-backed multi-source extraction pipeline with validation, cross-source deduplication, and local-first AI enrichment.",
        metrics: [
            { label: "Sources", value: "9+" },
            { label: "Enrichment", value: "Local-first" },
            { label: "Provider strategy", value: "4-tier fallback" },
            { label: "Exports", value: "CSV · Excel · JSON" },
        ],
        tech: ["Flask", "MySQL", "Redis", "Playwright", "Ollama", "LangExtract"],
        liveLink: "https://data-extractor-1-laq7.onrender.com/",
        paperLink: "https://github.com/AyushkhatiDev/data-extractor/blob/main/paper/DataExtractor%20copy.pdf",
        image: dataExtractorImg,
    },
    {
        title: "PINN PDE SOLVER",
        subtitle: "Physics-informed neural networks",
        description: "A deep-learning framework that embeds physical laws into neural-network training to solve Heat, Wave, and Burgers equations.",
        metrics: [
            { label: "R-squared", value: "0.9995" },
            { label: "L2 error", value: "≈1e-3" },
            { label: "Energy change", value: "<2%" },
            { label: "Test coverage", value: "49 tests" },
        ],
        tech: ["PyTorch", "Streamlit", "NumPy", "SciPy", "pytest"],
        liveLink: "https://ayushkhatidev-physics-informed-neural-n-appstreamlit-app-dcw1oi.streamlit.app/",
        image: pinnImg,
    },
    {
        title: "OPD SOFTWARE",
        subtitle: "Multi-tenant healthcare and OPD platform",
        description: "A healthcare platform with geo-restricted checkout, multi-layer bot protection, real-time queue updates, and six-tier access control.",
        metrics: [
            { label: "Out-of-zone checkout", value: "0 failures" },
            { label: "Bot abuse", value: "0%" },
            { label: "Queue updates", value: "Real time" },
            { label: "Access control", value: "6-tier RBAC" },
        ],
        tech: ["Flask", "MySQL", "WebSockets", "RBAC", "CSRF"],
        liveLink: "https://opdsoftware.ayurvedicchikitsalaya.in/",
        image: opdImg,
    },
    {
        title: "MEDICAL E-COMMERCE",
        subtitle: "Production pharmacy platform",
        description: "End-to-end medical commerce with a hybrid cart, dynamic GST and coupon calculation, prescription uploads, and server-validated payments.",
        metrics: [
            { label: "Payments", value: "Razorpay" },
            { label: "Cart", value: "Hybrid" },
            { label: "Security", value: "AES + RBAC" },
            { label: "Query health", value: "N+1 fixed" },
        ],
        tech: ["Flask", "SQLAlchemy", "Razorpay", "Alembic", "AES"],
        liveLink: "https://store.ayurvedicchikitsalaya.in/",
        image: pharmacyImg,
    },
];

const ProjectsSection = () => (
    <section className="border-b border-foreground/10 py-20 sm:py-24 lg:py-32" id="projects">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 grid gap-5 md:grid-cols-12 md:items-end lg:mb-16">
                <div className="md:col-span-8">
                    <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">04 / Selected systems</span>
                    <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">Engineering work with evidence attached.</h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-4 md:justify-self-end">Four systems that show the range: deterministic streams, real-time video, security tooling, and production commerce.</p>
            </motion.div>
            <div className="space-y-6 sm:space-y-8">
                {flagshipProjects.map((project, i) => <ProjectCard key={project.title} {...project} index={i} />)}
            </div>

            <div className="mt-24 border-t border-foreground/15 pt-10 sm:mt-32 sm:pt-12">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Archive / Selected work</p>
                        <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">More systems, quieter on purpose.</h3>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Additional experiments and production platforms for readers who want a fuller view of the work.</p>
                </div>
                <div className="space-y-6 opacity-80 sm:space-y-8">
                    {selectedWork.map((project, i) => <ProjectCard key={project.title} {...project} index={i + flagshipProjects.length} />)}
                </div>
            </div>
        </div>
    </section>
);

export default ProjectsSection;
