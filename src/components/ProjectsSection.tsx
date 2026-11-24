import ConcurrencyGuard from "./ConcurrencyGuard";
import AtlasDrawing from "./AtlasDrawing";

const archive = [
    { name: "VibeSec", description: "Static security scanner · Open source", links: [["Source", "https://github.com/AyushkhatiDev/vibesec"], ["PyPI stats", "https://pypistats.org/packages/vibesec"]] },
    { name: "LLM Eval", description: "Open-source model evaluation framework", links: [["Website", "https://llm-eval-silk.vercel.app/"], ["Source", "https://github.com/AyushkhatiDev/llm-eval"], ["Research", "https://lnkd.in/gGEPiHsS"]] },
    { name: "Data Extractor", description: "Resilient multi-source extraction platform", links: [["Source", "https://github.com/AyushkhatiDev/data-extractor"], ["Website", "https://data-extractor-1-laq7.onrender.com/"], ["Paper", "https://raw.githubusercontent.com/AyushkhatiDev/data-extractor/main/paper/DataExtractor_Paper.pdf"]] },
    { name: "PINN PDE Solver", description: "Physics-informed neural networks", links: [["Website", "https://ayushkhatidev-physics-informed-neural-n-appstreamlit-app-dcw1oi.streamlit.app/"]] },
    { name: "OPD Software", description: "Multi-tenant healthcare and OPD platform", links: [["Website", "https://opdsoftware.ayurvedicchikitsalaya.in/"]] },
    { name: "Medical E-Commerce", description: "Production pharmacy platform", links: [["Website", "https://store.ayurvedicchikitsalaya.in/"]] },
];

export function ProjectArchive() {
    return <details className="archive"><summary>More projects <span>({archive.length})</span></summary>
        {archive.map(project => <article key={project.name}><div><h3>{project.name}</h3><p>{project.description}</p></div>
            <div className="text-links">{project.links.map(([label,url])=><a key={label} href={url} target="_blank" rel="noreferrer" aria-label={project.name+" "+label}>{label}</a>)}</div>
        </article>)}
    </details>;
}

const matchSite = "https://matchlens-web.ashystone-436ed578.koreacentral.azurecontainerapps.io";

export default function ProjectsSection() {
    return <section className="wrap chapter" id="projects"><h2>Here’s what I shipped<span>.</span></h2>
        <ConcurrencyGuard/>
        <div className="pair">
            <article className="diagram-card"><p className="eyebrow">Event streaming / Football analytics</p><h3>MatchLens</h3>
                <AtlasDrawing kind="match"/><p><strong>1,728 of 1,728 events reconciled.</strong> MatchLens turns a football event stream into tactical views for four audiences.</p>
                <div className="text-links"><a href="https://vimeo.com/1238417597?share=copy&fl=sv&fe=ci">Watch demo</a><a href="https://github.com/AyushkhatiDev/MATCHLENS">Source</a><a href={matchSite+"/demo"}>Live demo</a><a href={matchSite+"/stream"}>Stream</a></div>
            </article>
            <article className="diagram-card"><p className="eyebrow">Real-time video / Gujarat Police Challenge</p><h3>Sentinel</h3>
                <AtlasDrawing kind="feeds"/><p><strong>15 isolated camera feeds.</strong> Each RTSP stream has its own worker and bounded queue, so a dropped camera leaves the rest running.</p>
                <div className="text-links"><a href="https://lnkd.in/p/ddm2a926">Read the case study</a></div>
            </article>
        </div>
    </section>;
}
