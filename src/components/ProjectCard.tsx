import { motion } from "framer-motion";
import { ArrowUpRight, Play, Radio, ExternalLink } from "lucide-react";

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
    liveLink: string;
    paperLink?: string;
    githubLink?: string;
    researchLink?: string;
    demoVideoLink?: string;
    streamLink?: string;
    image: string;
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
    paperLink,
    githubLink,
    researchLink,
    demoVideoLink,
    streamLink,
    image,
    index,
    featured,
}: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, boxShadow: featured ? "0 12px 40px -10px hsl(217 91% 60% / 0.25)" : "0 8px 30px -10px hsl(217 91% 60% / 0.15)" }}
            className={`group relative border bg-card p-6 lg:p-8 transition-colors duration-500 ${
                featured
                    ? "border-primary/30 bg-gradient-to-br from-card via-card to-primary/[0.03] shadow-[0_0_60px_-15px_hsl(217_91%_60%/0.1)]"
                    : "border-foreground/10 border-glow"
            }`}
        >
            {/* Featured gradient border overlay */}
            {featured && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                    <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-accent/30" />
                    <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-transparent to-accent/30" />
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-start mb-8 lg:mb-12">
                <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
                        PROJECT_{String(index + 1).padStart(2, "0")}
                    </span>
                    <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group/title"
                    >
                        <h3 className={`text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-none transition-all duration-500 ${
                            featured ? "text-gradient-primary group-hover/title:brightness-125" : "group-hover:text-gradient-primary"
                        }`}>
                            {title}
                        </h3>
                    </a>
                    <p className="font-mono text-xs text-primary mt-2 uppercase group-hover:tracking-[0.2em] transition-all duration-500">{subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end items-center">
                    {featured && (
                        <div className="font-mono text-[10px] text-background bg-gradient-to-r from-primary to-accent px-3 py-1.5 shrink-0 uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.5)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                            HACKATHON
                        </div>
                    )}
                    {liveLink && (
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-mono text-[10px] px-2.5 py-1 shrink-0 transition-all uppercase tracking-widest flex items-center gap-1.5 font-bold ${
                                featured
                                    ? "text-background bg-accent hover:bg-accent/80 shadow-[0_0_15px_-3px_hsl(var(--accent)/0.5)]"
                                    : "text-accent bg-accent/10 border border-accent/20 hover:bg-accent/20"
                            }`}
                        >
                            <ExternalLink size={10} strokeWidth={2} />
                            LIVE DEMO
                        </a>
                    )}
                    {demoVideoLink && (
                        <a
                            href={demoVideoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 px-2 py-1 shrink-0 transition-colors uppercase tracking-widest flex items-center gap-1.5"
                        >
                            <Play size={10} fill="currentColor" />
                            WATCH DEMO
                        </a>
                    )}
                    {streamLink && (
                        <a
                            href={streamLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-accent bg-accent/10 border border-accent/20 hover:bg-accent/20 px-2 py-1 shrink-0 transition-colors uppercase tracking-widest flex items-center gap-1.5"
                        >
                            <Radio size={10} />
                            STREAM
                        </a>
                    )}
                    {paperLink && (
                        <a
                            href={paperLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 px-2 py-1 shrink-0 transition-colors uppercase tracking-widest"
                        >
                            READ PAPER
                        </a>
                    )}
                    {researchLink && (
                        <a
                            href={researchLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 px-2 py-1 shrink-0 transition-colors uppercase tracking-widest"
                        >
                            RESEARCH
                        </a>
                    )}
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-foreground bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 px-2 py-1 shrink-0 transition-colors uppercase tracking-widest"
                        >
                            GITHUB
                        </a>
                    )}
                    <div className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-1 shrink-0">
                        LIVE_PRODUCTION
                    </div>
                </div>
            </div>

            {/* Image */}
            <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block mb-8 overflow-hidden border transition-all duration-300 ${
                    featured
                        ? "border-primary/20 hover:border-accent/60 shadow-[0_0_30px_-10px_hsl(217_91%_60%/0.2)]"
                        : "border-foreground/5 hover:border-foreground/20"
                }`}
            >
                <img
                    src={image}
                    alt={title}
                    className={`w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out ${
                        featured ? "h-56 lg:h-80" : "h-48 lg:h-64"
                    }`}
                    loading="lazy"
                />
            </a>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
                <div className="col-span-12 lg:col-span-7">
                    <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-6">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tech.map((t) => (
                            <span
                                key={t}
                                className={`font-mono text-[10px] border px-2 py-1 uppercase tracking-widest transition-all duration-300 ${
                                    featured
                                        ? "border-primary/30 text-primary/80 group-hover:border-primary/50 group-hover:text-primary"
                                        : "border-foreground/20 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground"
                                }`}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 lg:border-l lg:border-foreground/5 lg:pl-8">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                        {metrics.map((m) => (
                            <div key={m.label}>
                                <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">
                                    {m.label}
                                </div>
                                <div className={`text-xl lg:text-2xl font-mono mt-1 ${
                                    featured ? "text-primary" : "text-foreground"
                                }`}>{m.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Link */}
            <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute bottom-6 right-6 lg:bottom-8 lg:right-8 transition-all duration-300 ${
                    featured
                        ? "text-primary group-hover:text-accent group-hover:rotate-45"
                        : "text-muted-foreground group-hover:text-accent group-hover:rotate-45"
                }`}
            >
                <ArrowUpRight size={28} strokeWidth={1} />
            </a>
        </motion.div>
    );
};

export default ProjectCard;
