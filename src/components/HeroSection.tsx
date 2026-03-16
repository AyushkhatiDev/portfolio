import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ayushPhoto from "@/assets/ayush-photo.jpeg";

const titles = [
    "SYSTEMS ARCHITECT",
    "PDE SOLVER",
    "FULL-STACK ENGINEER",
    "BACKEND SPECIALIST",
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const childVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const HeroSection = () => {
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
            }} />

            <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-12 gap-6 items-center"
                >
                    {/* Left side - Text */}
                    <div className="col-span-12 lg:col-span-8">
                        <motion.div variants={childVariants} className="mb-6">
                            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                                [ PORTFOLIO // 2026 ]
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={childVariants}
                            className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter uppercase"
                        >
                            AYUSH
                            <br />
                            KHATI
                        </motion.h1>

                        <motion.div variants={childVariants} className="mt-8 flex items-center gap-3">
                            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="font-mono text-sm text-muted-foreground">
                                {titles.map((title, i) => (
                                    <motion.span
                                        key={title}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: titleIndex === i ? 1 : 0,
                                            y: titleIndex === i ? 0 : -10,
                                        }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute"
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </motion.div>

                        <motion.div variants={childVariants} className="mt-6 flex items-center">
                            <span className="font-mono text-sm text-foreground uppercase tracking-widest">
                                Software Developer @ <a href="https://www.udeckservices.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline decoration-foreground/30 hover:decoration-accent underline-offset-4">Udeck Services</a>
                            </span>
                        </motion.div>

                        <motion.p
                            variants={childVariants}
                            className="mt-16 max-w-xl text-lg text-muted-foreground leading-relaxed"
                        >
                            Results-driven Full Stack &amp; Backend Developer building scalable distributed systems, RESTful APIs, and real-time architectures — extended into ML &amp; scientific computing via Physics-Informed Neural Networks with PyTorch.
                        </motion.p>

                        <motion.div variants={childVariants} className="mt-8 flex gap-4">
                            <a
                                href="mailto:ayushiskhati305@gmail.com"
                                className="font-mono text-xs border border-foreground/20 px-4 py-2 hover:border-foreground/60 transition-colors uppercase tracking-widest"
                            >
                                ayush --contact
                            </a>
                            <a
                                href="https://www.linkedin.com/in/ayush-khati-8a342821b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs border border-foreground/20 px-4 py-2 hover:border-foreground/60 transition-colors uppercase tracking-widest"
                            >
                                --linkedin
                            </a>
                            <a
                                href="https://github.com/AyushkhatiDev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs border border-foreground/20 px-4 py-2 hover:border-foreground/60 transition-colors uppercase tracking-widest"
                            >
                                --github
                            </a>
                            <a
                                href="https://x.com/Dropclause2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs border border-foreground/20 px-4 py-2 hover:border-foreground/60 transition-colors uppercase tracking-widest"
                            >
                                --x
                            </a>
                        </motion.div>
                    </div>

                    {/* Right side - Photo */}
                    <motion.div
                        variants={childVariants}
                        className="col-span-12 lg:col-span-4 flex justify-end"
                    >
                        <div className="relative">
                            <div className="w-64 h-80 lg:w-72 lg:h-96 overflow-hidden border border-foreground/10">
                                <img
                                    src={ayushPhoto}
                                    alt="Ayush Khati"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-3 -right-3 border border-foreground/10 bg-background px-3 py-1">
                                <span className="font-mono text-[10px] text-accent uppercase">AVAILABLE FOR WORK</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
