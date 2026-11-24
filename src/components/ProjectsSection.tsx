import AtlasDrawing, { type Drawing } from "./AtlasDrawing";
import ConcurrencyGuard from "./ConcurrencyGuard";
import evalImage from "@/assets/eval-thumb.webp";
import extractorImage from "@/assets/extractor-thumb.webp";
import solverImage from "@/assets/solver-thumb.webp";
import clinicImage from "@/assets/clinic-thumb.webp";
import pharmacyImage from "@/assets/pharmacy-thumb.webp";

type Project = {
    name: string;
    discipline: string;
    description: string;
    visual: { drawing: Drawing } | { image: string; alt: string };
    links: [label: string, url: string][];
};

const github = "https://github.com/AyushkhatiDev/";
const matchSite = "https://matchlens-web.ashystone-436ed578.koreacentral.azurecontainerapps.io";

const featured: Project[] = [
    {
        name: "Payment Agent Gauntlet", discipline: "Payment systems / AI evaluation",
        description: "A benchmark that checks whether a payment agent followed policy by inspecting what actually changed in a mock payment backend.",
        visual: { drawing: "policy" },
        links: [["Explore benchmark", "https://ayushkhatidev.github.io/payment-agent-gauntlet/"], ["Browse source", github + "payment-agent-gauntlet"]],
    },
    {
        name: "TerraSentinel", discipline: "Disaster response / Hackathon prototype",
        description: "A Smart India Hackathon prototype that turns landslide-risk signals into mapped incidents and response routes.",
        visual: { drawing: "terrain" },
        links: [["Open prototype", "https://terra-sentinel-delta.vercel.app"], ["Browse source", github + "TerraSentinel"]],
    },
    {
        name: "MatchLens", discipline: "Event streaming / Football analytics",
        description: "Reconciled 1,728 of 1,728 match events to build tactical views for four football audiences.",
        visual: { drawing: "match" },
        links: [["Watch demo", "https://vimeo.com/1238417597?share=copy&fl=sv&fe=ci"], ["Browse source", github + "MATCHLENS"], ["Live demo", matchSite + "/demo"], ["Stream", matchSite + "/stream"]],
    },
    {
        name: "Sentinel", discipline: "Real-time video / Gujarat Police Challenge",
        description: "Each of 15 camera feeds has its own worker and bounded queue, so a dropped RTSP stream leaves the other feeds running.",
        visual: { drawing: "feeds" },
        links: [["Read case study", "https://lnkd.in/p/ddm2a926"]],
    },
];

const gallery: Project[] = [
    {
        name: "VibeSec", discipline: "Developer tools",
        description: "A Python scanner that traces AI-generated code for security defects and flags findings for review.",
        visual: { drawing: "scan" },
        links: [["Browse source", github + "vibesec"], ["PyPI stats", "https://pypistats.org/packages/vibesec"]],
    },
    {
        name: "LLM Eval", discipline: "Model evaluation",
        description: "A dashboard for comparing model runs and spotting regressions in factuality, safety, and reasoning.",
        visual: { image: evalImage, alt: "LLM Eval evaluation dashboard" },
        links: [["View dashboard", "https://llm-eval-silk.vercel.app/"], ["Browse source", github + "llm-eval"], ["Read research", "https://lnkd.in/gGEPiHsS"]],
    },
    {
        name: "Data Extractor", discipline: "Data engineering",
        description: "Collects records from multiple sources, removes duplicates, and enriches results with a local language model.",
        visual: { image: extractorImage, alt: "Data Extractor project interface" },
        links: [["Browse source", github + "data-extractor"], ["Read paper", "https://raw.githubusercontent.com/AyushkhatiDev/data-extractor/main/paper/DataExtractor_Paper.pdf"], ["Open app", "https://data-extractor-1-laq7.onrender.com/"]],
    },
    {
        name: "PINN PDE Solver", discipline: "Scientific computing",
        description: "Uses physics-informed neural networks to approximate solutions to the heat, wave, and Burgers equations.",
        visual: { image: solverImage, alt: "PINN PDE Solver project preview" },
        links: [["Browse source", github + "pinn-pde-solver"], ["Open solver", "https://ayushkhatidev-physics-informed-neural-n-appstreamlit-app-dcw1oi.streamlit.app/"]],
    },
    {
        name: "OPD Software", discipline: "Healthcare operations",
        description: "An outpatient platform that gives clinic staff real-time queue updates and role-based access across tenants.",
        visual: { image: clinicImage, alt: "OPD Software healthcare project preview" },
        links: [["Visit platform", "https://opdsoftware.ayurvedicchikitsalaya.in/"]],
    },
    {
        name: "Medical E-Commerce", discipline: "Pharmacy commerce",
        description: "A pharmacy storefront that handles prescription uploads, GST calculations, and server-validated payments.",
        visual: { image: pharmacyImage, alt: "Medical E-Commerce pharmacy project preview" },
        links: [["Visit storefront", "https://store.ayurvedicchikitsalaya.in/"]],
    },
    {
        name: "AI System Design Patterns", discipline: "Open-source architecture",
        description: "Five illustrated blueprints for retrieval, agent orchestration, semantic caching, streaming interfaces, and request routing.",
        visual: { drawing: "cache" },
        links: [["Read blueprints", github + "ai-system-design-patterns-or-modern-ai-architecture-#architecture-blueprints"]],
    },
];

function ProjectEntry({ project, compact = false }: { project: Project; compact?: boolean }) {
    const { name, discipline, description, visual, links } = project;
    return <article className={compact ? "gallery-card" : "diagram-card"}>
        <p className="eyebrow">{discipline}</p>
        <h3>{name}</h3>
        {"drawing" in visual
            ? <AtlasDrawing kind={visual.drawing}/>
            : <div className="gallery-shot"><img src={visual.image} alt={visual.alt} loading="lazy" decoding="async"/></div>}
        <p>{description}</p>
        <div className="text-links">{links.map(([label,url]) =>
            <a key={url} aria-label={name + " — " + label} href={url}>{label}</a>
        )}</div>
    </article>;
}

export default function ProjectsSection() {
    return <section className="wrap chapter" id="projects">
        <h2>Here’s what I shipped<span>.</span></h2>
        <ConcurrencyGuard/>
        <div className="pair">{featured.map(project => <ProjectEntry key={project.name} project={project}/>)}</div>
        <div className="project-gallery">{gallery.map(project => <ProjectEntry key={project.name} project={project} compact/>)}</div>
        <a className="commerce-link" href="#impact"><strong>Commerce Core</strong><span>See the production results</span></a>
    </section>;
}
