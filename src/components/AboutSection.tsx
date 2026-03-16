import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { value: "3+", label: "YEARS EXP" },
    { value: "10+", label: "PROJECTS" },
    { value: "5+", label: "LIVE APPS" },
    { value: "∞", label: "CURIOSITY" },
];

const experience = [
    {
        role: "Software Developer",
        company: "Udeck Services",
        link: "https://www.udeckservices.com/",
        period: "PRESENT",
        highlights: [
            "Scalable full-stack system design and development",
            "Distributed backend architecture and platform engineering",
            "High-performance, low-latency application infrastructure",
        ],
    },
];

const interests = [
    "Distributed Systems",
    "Scientific Computing",
    "Data Strucutre and Algorithms",
    "Physics-Informed Neural Networks",
    "System Design",
    "Open Source",
    "Backend Architecture",
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const AboutSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="py-24 lg:py-32 border-t border-foreground/5"
            id="about"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="mb-16 md:mb-24"
                >
                    <motion.span
                        variants={itemVariants}
                        className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block"
                    >
                        [ ABOUT ]
                    </motion.span>
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter"
                    >
                        WHO I AM
                    </motion.h2>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-10">
                    {/* Left Column - Bio */}
                    <motion.div
                        className="col-span-12 lg:col-span-7"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {/* Terminal-style bio */}
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-xl border border-foreground/10 bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-md p-6 lg:p-8 mb-6 group hover:border-accent/30 transition-colors duration-500"
                        >
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8 border-b border-foreground/10 pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <span className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                                            <span className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.4)]" />
                                            <span className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                        </div>
                                        <span className="font-mono text-[10px] text-muted-foreground ml-3 uppercase tracking-widest hidden sm:inline-block">
                                            ayush@portfolio ~ /about
                                        </span>
                                    </div>
                                    <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest px-2 py-1 border border-foreground/10 rounded-sm bg-background/50">
                                        BASH -- 80x24
                                    </div>
                                </div>
                            <div className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    I am a{" "}
                                    <span className="text-foreground font-semibold">
                                        Full Stack and Backend Engineer
                                    </span>{" "}
                                    specializing in the design and development of scalable{" "}
                                    distributed systems and high-performance API-driven platforms.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    My work also spans{" "}
                                    <span className="text-foreground font-semibold">
                                        machine learning and scientific computing
                                    </span>
                                    , where I develop Physics-Informed Neural Networks (PINNs) with{" "}
                                    PyTorch to model and solve complex partial differential equations.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Currently, I develop production-grade software at{" "}
                                    <a
                                        href="https://www.udeckservices.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground font-semibold underline decoration-foreground/30 hover:decoration-accent underline-offset-4 transition-colors"
                                    >
                                        Udeck Services
                                    </a>
                                    , building scalable multi-tenant platforms powering healthcare{" "}
                                    and e-commerce applications.
                                </p>
                                <div className="pt-2">
                                    <span className="text-accent font-mono text-sm animate-pulse">
                                        █
                                    </span>
                                </div>
                            </div>
                            </div>
                        </motion.div>

                        {/* Interests */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl border border-foreground/10 bg-gradient-to-tr from-background/50 to-muted/10 backdrop-blur-sm p-6 lg:p-8 group hover:border-foreground/20 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-accent/5"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-md bg-accent/10 border border-accent/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
                                </div>
                                <h3 className="font-mono text-xs text-foreground uppercase tracking-widest font-semibold">
                                    Interests & Focus Areas
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {interests.map((interest, i) => (
                                    <motion.span
                                        key={interest}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.3 + i * 0.05,
                                            duration: 0.4,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        whileHover={{
                                            y: -2,
                                            backgroundColor: "hsl(var(--accent) / 0.1)",
                                            borderColor: "hsl(var(--accent) / 0.5)",
                                            color: "hsl(var(--accent))",
                                        }}
                                        className="font-mono text-[11px] text-muted-foreground border border-foreground/10 bg-background/50 rounded-md px-3.5 py-2 cursor-pointer transition-all duration-300 shadow-sm"
                                    >
                                        {interest}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Stats & Experience */}
                    <motion.div
                        className="col-span-12 lg:col-span-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {/* Stats Grid */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4 mb-6"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.2 + i * 0.1,
                                        duration: 0.5,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    whileHover={{ 
                                        y: -4, 
                                        borderColor: "hsl(var(--accent) / 0.4)",
                                        backgroundColor: "hsl(var(--accent) / 0.02)"
                                    }}
                                    className="rounded-xl border border-foreground/10 bg-background/40 backdrop-blur-sm p-6 text-center group cursor-default transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-accent/10 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <motion.div
                                        className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.4 + i * 0.1,
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-2 block group-hover:text-accent transition-colors">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Experience Timeline */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl border border-foreground/10 bg-gradient-to-b from-muted/5 to-background backdrop-blur-sm p-6 lg:p-8 group hover:border-foreground/20 transition-all duration-500 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 rounded-md bg-accent/10 border border-accent/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                </div>
                                <h3 className="font-mono text-xs text-foreground uppercase tracking-widest font-semibold">
                                    Experience
                                </h3>
                            </div>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <motion.div
                                        key={exp.company}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.4 + i * 0.15,
                                            duration: 0.6,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="relative pl-5 border-l-2 border-accent/30"
                                    >
                                        <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent animate-pulse" />
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-xs text-accent uppercase tracking-widest">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-foreground">
                                            {exp.role}
                                        </h4>
                                        <a
                                            href={exp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono text-sm text-muted-foreground hover:text-accent transition-colors underline decoration-foreground/20 hover:decoration-accent underline-offset-4"
                                        >
                                            {exp.company}
                                        </a>
                                        <ul className="mt-3 space-y-1.5">
                                            {exp.highlights.map((h) => (
                                                <li
                                                    key={h}
                                                    className="font-mono text-xs text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-accent/60 mt-0.5 group-hover/item:text-accent transition-colors">→</span>
                                                    <span className="group-hover/item:text-foreground transition-colors">{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            whileHover={{ y: -2, scale: 1.01 }}
                            className="mt-6 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 to-transparent p-5 flex items-center gap-4 cursor-pointer hover:border-accent/40 shadow-[0_0_15px_rgba(var(--accent-value),0.05)] transition-all duration-300"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                            </span>
                            <div>
                                <span className="font-mono text-xs text-foreground uppercase tracking-widest block">
                                    STATUS: AVAILABLE
                                </span>
                                <span className="font-mono text-[10px] text-muted-foreground">
                                    Open to freelance & collaboration
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
