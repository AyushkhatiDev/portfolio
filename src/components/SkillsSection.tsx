import { motion } from "framer-motion";

const skillCategories = [
    {
        number: "01",
        label: "LANGUAGES & APPLICATIONS",
        focus: "Build the service layer",
        items: ["Python", "SQL", "TypeScript", "JavaScript", "C++", "FastAPI", "Flask", "REST APIs"],
    },
    {
        number: "02",
        label: "DISTRIBUTED SYSTEMS",
        focus: "Move work reliably",
        items: ["Celery", "Redis", "Azure Event Hubs", "Idempotency", "Dead-letter queues", "Event-driven design", "SSE", "WebSockets"],
    },
    {
        number: "03",
        label: "DATA & CONSISTENCY",
        focus: "Keep reads fast, writes correct",
        items: ["PostgreSQL", "MySQL", "PostGIS", "SQLAlchemy", "Query optimization", "Indexing", "Closure tables", "Row-level locks", "ACID"],
    },
    {
        number: "04",
        label: "RELIABILITY & DELIVERY",
        focus: "Ship and operate safely",
        items: ["Docker", "Linux", "Nginx", "AWS", "Azure", "GitHub Actions", "CI/CD", "Observability", "Incident response"],
    },
    {
        number: "05",
        label: "REAL-TIME & INTELLIGENCE",
        focus: "Process streams and signals",
        items: ["RTSP / HLS", "PyAV", "ONNX Runtime", "Microsoft Fabric", "PyTorch", "NumPy", "pytest"],
    },
    {
        number: "06",
        label: "PRODUCT INTERFACES",
        focus: "Make the system usable",
        items: ["React", "Next.js", "Tailwind CSS", "HTML / CSS", "Streamlit"],
    },
];

const SkillsSection = () => (
    <section className="border-b border-foreground/10 py-20 sm:py-24 lg:py-32" id="skills">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-12 grid gap-5 md:grid-cols-12 md:items-end lg:mb-16">
                <div className="md:col-span-8">
                    <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">05 / Engineering toolkit</span>
                    <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">Tooling follows the system.</h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-4 md:justify-self-end">Capabilities first; the technologies are selected to make each system dependable and maintainable.</p>
            </div>
            <div className="grid border-l border-t border-foreground/10 md:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((category, i) => (
                    <motion.article key={category.number} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }} className="border-b border-r border-foreground/10 p-6 sm:p-7 lg:p-8">
                        <div className="flex items-start justify-between gap-4">
                            <span className="font-mono text-[10px] text-accent">{category.number} /</span>
                            <span className="text-right font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{category.label}</span>
                        </div>
                        <h3 className="mt-7 text-xl font-medium tracking-tight">{category.focus}</h3>
                        <div className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                            {category.items.map((item, index) => (
                                <span key={item} className="font-mono text-[10px] leading-relaxed text-muted-foreground">
                                    {item}{index < category.items.length - 1 && <span className="ml-2 text-accent/50">/</span>}
                                </span>
                            ))}
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    </section>
);

export default SkillsSection;
