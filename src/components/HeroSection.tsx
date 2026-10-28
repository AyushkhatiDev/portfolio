import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import ayushPhoto from "@/assets/ayush-photo.jpeg";

const resumeUrl = "/ayush-khati-resume.pdf";
const ease = [0.16, 1, 0.3, 1] as const;
const proof = [["95.5%", "fewer queries"], ["1.2M", "events / day"], ["0", "ledger drift"]];

const HeroSection = () => {
    const reduceMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const pointer = useRef({ x: 108, y: 50, titleX: 140, titleY: 50, targetX: 108, targetY: 50, targetTitleX: 140, targetTitleY: 50, active: false, frame: null as number | null });
    const [pointerOverPortrait, setPointerOverPortrait] = useState(false);
    const enter = (delay: number) => ({
        initial: reduceMotion ? false : { opacity: 0, y: 22 },
        animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease },
    });

    useEffect(() => () => {
        if (pointer.current.frame) cancelAnimationFrame(pointer.current.frame);
    }, []);

    const renderSignal = () => {
        const signal = pointer.current;
        signal.x += (signal.targetX - signal.x) * 0.14;
        signal.y += (signal.targetY - signal.y) * 0.14;
        signal.titleX += (signal.targetTitleX - signal.titleX) * 0.16;
        signal.titleY += (signal.targetTitleY - signal.titleY) * 0.16;
        heroRef.current?.style.setProperty("--signal-x", `${signal.x}%`);
        heroRef.current?.style.setProperty("--signal-y", `${signal.y}%`);
        heroRef.current?.style.setProperty("--signal-active", signal.active ? "1" : "0");
        titleRef.current?.style.setProperty("--title-signal-x", `${signal.titleX}%`);
        titleRef.current?.style.setProperty("--title-signal-y", `${signal.titleY}%`);

        const unsettled = Math.abs(signal.targetX - signal.x) > 0.08 || Math.abs(signal.targetY - signal.y) > 0.08 || Math.abs(signal.targetTitleX - signal.titleX) > 0.08 || Math.abs(signal.targetTitleY - signal.titleY) > 0.08;
        signal.frame = unsettled ? requestAnimationFrame(renderSignal) : null;
    };

    const queueSignal = () => {
        if (pointer.current.frame === null) pointer.current.frame = requestAnimationFrame(renderSignal);
    };

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        const titleBounds = titleRef.current?.getBoundingClientRect();
        pointer.current.targetX = x;
        pointer.current.targetY = y;
        pointer.current.targetTitleX = titleBounds ? ((event.clientX - titleBounds.left) / titleBounds.width) * 100 : 140;
        pointer.current.targetTitleY = titleBounds ? ((event.clientY - titleBounds.top) / titleBounds.height) * 100 : 50;
        pointer.current.active = true;
        setPointerOverPortrait(x > 50);
        queueSignal();
    };

    const handlePointerLeave = () => {
        pointer.current.targetX = 108;
        pointer.current.targetY = 50;
        pointer.current.targetTitleX = 140;
        pointer.current.targetTitleY = 50;
        pointer.current.active = false;
        setPointerOverPortrait(false);
        queueSignal();
    };

    return (
        <section ref={heroRef} id="hero" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className={`hero-shell relative isolate overflow-hidden border-b border-foreground/10 ${pointerOverPortrait ? "hero-pointer-over-portrait" : ""}`}>
            <div aria-hidden="true" className="hero-grid absolute inset-0" />
            <div aria-hidden="true" className="hero-orb hero-orb-one" />
            <div aria-hidden="true" className="hero-orb hero-orb-two" />
            <div aria-hidden="true" className="hero-signal-field absolute inset-0" />
            <div aria-hidden="true" className="hero-noise absolute inset-0" />

            <div className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-16 lg:pt-24">
                <motion.div {...enter(0)} className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>AYUSH KHATI · SILIGURI, INDIA</span>
                    <span className="flex items-center gap-2 text-foreground/80"><i className="h-2 w-2 rounded-full bg-emerald-400 not-italic" /> Available for backend roles · Remote</span>
                </motion.div>

                <div className="relative pt-14 lg:min-h-[650px] lg:pt-20">
                    <motion.div {...enter(0.24)} aria-hidden="true" className="hero-portrait-field pointer-events-none absolute inset-x-0 top-[33rem] -z-10 h-[25rem] sm:top-[28rem] sm:h-[30rem] lg:inset-y-0 lg:left-auto lg:top-0 lg:h-auto lg:w-[47%]">
                        <img src={ayushPhoto} alt="" className="hero-portrait h-full w-full object-cover object-[52%_24%] grayscale" />
                        <div className="hero-portrait-wash absolute inset-0" />
                    </motion.div>

                    <div className="relative z-10 max-w-2xl lg:max-w-[56%]">
                        <motion.p {...enter(0.08)} className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">Backend engineering / distributed systems</motion.p>
                        <motion.h1 ref={titleRef} {...enter(0.16)} className="hero-title max-w-[9ch] text-[clamp(3.75rem,6.15vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em]">High-throughput systems built to endure.</motion.h1>
                        <motion.div {...enter(0.24)} className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2">
                            <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">Ayush Khati</p>
                            <p className="text-sm text-muted-foreground">Backend Software Engineer · Udeck Services</p>
                        </motion.div>
                        <motion.p {...enter(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">I build the pipelines, data models, and concurrency safeguards that keep production systems <span className="text-foreground">fast, correct, and recoverable.</span></motion.p>
                        <motion.div {...enter(0.36)} className="mt-9 flex flex-wrap items-center gap-3">
                            <a href={resumeUrl} download className="interactive-link inline-flex items-center gap-2 bg-accent px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-accent-foreground"><Download size={15} /> Download résumé <kbd className="ml-2 border border-current/30 px-1.5 py-0.5 text-[9px]">⌘ K</kbd></a>
                            <a aria-label="GitHub" href="https://github.com/AyushkhatiDev" target="_blank" rel="noopener noreferrer" className="interactive-icon"><Github size={16} /></a>
                            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/ayush-khati-8a342821b/" target="_blank" rel="noopener noreferrer" className="interactive-icon"><Linkedin size={16} /></a>
                            <a aria-label="Email Ayush" href="mailto:ayushiskhati305@gmail.com" className="interactive-icon"><Mail size={16} /></a>
                        </motion.div>
                    </div>

                    <motion.div {...enter(0.48)} aria-label="Production impact" className="hero-telemetry-rail relative z-10 mt-[22rem] grid max-w-xl grid-cols-3 gap-5 border-t border-foreground/15 pt-5 sm:mt-[27rem] sm:gap-8 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[45%] lg:max-w-none lg:border-0 lg:pt-0">
                        {proof.map(([value, label]) => <div key={label} className="hero-proof"><strong className="block font-mono text-2xl tracking-[-0.06em] text-foreground sm:text-3xl">{value}</strong><span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span></div>)}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
