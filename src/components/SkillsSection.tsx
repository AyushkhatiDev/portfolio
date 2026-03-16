import { motion } from "framer-motion";

const skillCategories = [
    {
        label: "LANGUAGES",
        items: ["C", "C++", "JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3"],
    },
    {
        label: "FRONTEND",
        items: ["React.js", "Next.js", "Tailwind CSS", "Zustand", "DaisyUI", "Streamlit"],
    },
    {
        label: "BACKEND & APIs",
        items: ["Node.js", "Express.js", "Flask", "RESTful APIs", "GraphQL", "WebSockets (Socket.io)", "WebRTC"],
    },
    {
        label: "ML & SCIENTIFIC",
        items: ["PyTorch", "Auto-Diff", "PINNs", "NumPy", "SciPy", "Matplotlib", "Plotly", "pytest"],
    },
    {
        label: "DATABASES",
        items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Query Optimization", "Indexing", "Schema Design"],
    },
    {
        label: "DEVOPS & TOOLS",
        items: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Nginx", "Gunicorn", "Linux", "Grafana", "Git", "GitHub"],
    },
    {
        label: "COMPETENCIES",
        items: ["Distributed Systems", "System Design", "Microservices", "CI/CD", "RBAC", "JWT", "DSA", "OOP", "Agile/Scrum"],
    },
];

const SkillsSection = () => {
    return (
        <section className="py-24 lg:py-32 border-t border-foreground/5" id="skills">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            // TECHNICAL_STACK
                    </span>
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mt-2">
                        ARSENAL
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                            whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="border border-foreground/10 p-6 border-glow"
                        >
                            <h3 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4">
                                {cat.label}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map((item) => (
                                    <span
                                        key={item}
                                        className="font-mono text-xs text-muted-foreground border border-foreground/10 px-2 py-1"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
