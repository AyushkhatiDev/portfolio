import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    image: string;
    index: number;
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
    image,
    index,
}: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, boxShadow: "0 8px 30px -10px hsl(217 91% 60% / 0.15)" }}
            className="group relative border border-foreground/10 bg-card p-6 lg:p-8 border-glow transition-colors duration-500"
        >
            {/* Header */}
            <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-start mb-8 lg:mb-12">
                <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
                        PROJECT_{String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-none group-hover:text-gradient-primary transition-all duration-500">
                        {title}
                    </h3>
                    <p className="font-mono text-xs text-primary mt-2 uppercase group-hover:tracking-[0.2em] transition-all duration-500">{subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end">
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
            <div className="mb-8 overflow-hidden border border-foreground/5">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 lg:h-64 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                />
            </div>

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
                                className="font-mono text-[10px] border border-foreground/20 px-2 py-1 uppercase tracking-widest text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground transition-all duration-300"
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
                                <div className="text-xl lg:text-2xl font-mono text-foreground mt-1">{m.value}</div>
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
                className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 text-muted-foreground group-hover:text-accent group-hover:rotate-45 transition-all duration-300"
            >
                <ArrowUpRight size={28} strokeWidth={1} />
            </a>
        </motion.div>
    );
};

export default ProjectCard;
