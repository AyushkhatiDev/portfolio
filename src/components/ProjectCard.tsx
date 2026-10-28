import { ArrowUpRight, ExternalLink, Play, Radio } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface Metric {
    label: string;
    value: string;
}

interface ProjectCardProps {
    title: string;
    subtitle: string;
    description: string;
    metrics: Metric[];
    tech: string[];
    liveLink?: string;
    primaryLinkLabel?: string;
    paperLink?: string;
    githubLink?: string;
    statsLink?: string;
    researchLink?: string;
    demoVideoLink?: string;
    streamLink?: string;
    image?: string;
    index: number;
    featured?: boolean;
}

const ProjectCard = ({
    title,
    subtitle,
    description,
    metrics,
    tech,
    liveLink,
    primaryLinkLabel = "Live",
    paperLink,
    githubLink,
    statsLink,
    researchLink,
    demoVideoLink,
    streamLink,
    image,
    index,
    featured,
}: ProjectCardProps) => {
    const reduceMotion = useReducedMotion();

    return (
    <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`group grid overflow-hidden border border-foreground/15 transition-[border-color,box-shadow] hover:border-accent/45 hover:shadow-[0_24px_60px_hsl(var(--background)/0.38)] ${featured ? "bg-card" : "bg-background"} lg:grid-cols-12`}
    >
        <div className={`relative min-h-56 overflow-hidden border-b border-foreground/10 lg:col-span-5 lg:min-h-[400px] lg:border-b-0 lg:border-r ${image ? "bg-card" : "bg-secondary/40"}`}>
            {image ? (
                <img src={image} alt={`${title} project interface`} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[30%] transition duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.58] group-hover:grayscale-0 group-focus-within:scale-[1.04] group-focus-within:brightness-[0.58] group-focus-within:grayscale-0" />
            ) : (
                <div className="absolute inset-0 flex flex-col justify-between px-6 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{title === "SENTINEL" ? "LIVE INGESTION / WORKER POOL" : "STATIC ANALYSIS / AST ENGINE"}</span>
                    <div aria-hidden="true" className="grid grid-cols-5 gap-2 sm:gap-3">
                        {(title === "SENTINEL" ? Array.from({ length: 15 }, (_, i) => `CAM_${String(i + 1).padStart(2, "0")}`) : ["PY", "AST", "CFG", "TAINT", "AUTH", "SQL", "XSS", "CMD", "PATH", "DEP", "JWT", "SSRF", "XXE", "DESER", "EVAL"]).map((cell) => (
                            <span key={cell} className="flex aspect-square items-center justify-center border border-foreground/10 bg-background/60 font-mono text-[8px] text-muted-foreground sm:text-[9px]">{cell}</span>
                        ))}
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{title === "SENTINEL" ? "15 isolated feeds · bounded queues" : "24 vulnerability patterns · 179 tests"}</p>
                </div>
            )}
            <div aria-hidden="true" className="project-brief pointer-events-none absolute inset-0 flex translate-y-2 flex-col justify-end bg-gradient-to-t from-background via-background/95 to-background/35 p-6 opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">System brief</p>
                <h4 className="mt-2 text-xl font-medium tracking-[-0.04em] text-foreground sm:text-2xl">{title}</h4>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-foreground/80 sm:text-sm">{description}</p>
                <span className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/70">Explore system details ↗</span>
            </div>
            <span className="absolute left-4 top-4 border border-foreground/15 bg-background/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">CASE {String(index + 1).padStart(2, "0")}</span>
            {featured && <span className="absolute right-4 top-4 bg-accent px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent-foreground">Featured system</span>}
        </div>

        <div className="flex flex-col p-5 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">{subtitle}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {liveLink && <a href={liveLink} target="_blank" rel="noopener noreferrer" className="interactive-link inline-flex items-center gap-1.5 border border-accent/35 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-accent hover:bg-accent hover:text-accent-foreground"><ExternalLink size={11} /> {primaryLinkLabel}</a>}
                    {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="border border-foreground/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">Source</a>}
                    {statsLink && <a href={statsLink} target="_blank" rel="noopener noreferrer" className="border border-foreground/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">PyPI stats</a>}
                    {demoVideoLink && <a href={demoVideoLink} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${title} demo`} className="border border-foreground/15 p-1.5 transition-colors hover:border-accent hover:text-accent"><Play size={13} /></a>}
                    {streamLink && <a href={streamLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} stream`} className="border border-foreground/15 p-1.5 transition-colors hover:border-accent hover:text-accent"><Radio size={13} /></a>}
                    {paperLink && <a href={paperLink} target="_blank" rel="noopener noreferrer" className="border border-foreground/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">Paper</a>}
                    {researchLink && <a href={researchLink} target="_blank" rel="noopener noreferrer" className="border border-foreground/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">Research</a>}
                </div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-7 grid grid-cols-2 border-l border-t border-foreground/10 sm:grid-cols-4">
                {metrics.map((metric) => <div key={metric.label} className="border-b border-r border-foreground/10 px-3 py-3 sm:px-4"><strong className="block font-mono text-sm tracking-tight text-foreground sm:text-base">{metric.value}</strong><span className="mt-1 block font-mono text-[8px] uppercase leading-snug tracking-wider text-muted-foreground sm:text-[9px]">{metric.label}</span></div>)}
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-6">
                {tech.map((item, i) => <span key={item} className="font-mono text-[9px] text-muted-foreground">{item}{i < tech.length - 1 && <span className="ml-2 text-accent/50">/</span>}</span>)}
            </div>
            {liveLink && <a href={liveLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent">Explore {primaryLinkLabel.toLowerCase()} <ArrowUpRight size={12} /></a>}
        </div>
    </motion.article>
    );
};

export default ProjectCard;
