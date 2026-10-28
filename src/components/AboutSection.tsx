import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const pillars = [
    {
        number: "01",
        label: "Reliable event flow",
        title: "Work moves once, even when workers fail.",
        description: "Event pipelines are designed for retries, recovery, and observability instead of happy-path throughput.",
        proof: [["1.2M", "events / day"], ["0", "lost or duplicate events"], ["45 → 3 min", "MTTD"]],
    },
    {
        number: "02",
        label: "Correct under concurrency",
        title: "Financial writes stay safe at production pressure.",
        description: "Idempotency, unique constraints, row-level locks, and double-entry accounting protect the state that matters.",
        proof: [["500", "concurrent requests"], ["0", "ledger drift"], ["38M", "rows migrated"]],
    },
    {
        number: "03",
        label: "Fast data & live signals",
        title: "The hot path gets the engineering attention.",
        description: "Query plans, indexes, caching, and isolated workers make both reads and real-time ingestion predictable.",
        proof: [["133 → 6", "queries / request"], ["240ms", "hot-read p99"], ["15", "isolated RTSP feeds"]],
    },
];

const career = [
    {
        period: "OCT 2025 — PRESENT",
        role: "Software Engineer (Backend)",
        company: "Udeck Services",
        href: "https://www.udeckservices.com/",
        description: "Own backend systems for Evan Merchantile: distributor hierarchies, a double-entry ledger, Argon2/JWT security, observability, and zero-downtime database migrations.",
        proof: "198 endpoints · 38M-row migration · 1.2M events/day",
    },
    {
        period: "APR 2025 — OCT 2025",
        role: "Software Engineer Intern (Backend)",
        company: "Udeck Services",
        href: "https://www.udeckservices.com/",
        description: "Built B2B checkout and tiered pricing for HamroBazaar, including GST slabs and production query-preload optimization.",
        proof: "133 → 6 database queries · 3.96s → 1.15s",
    },
    {
        period: "FOUNDATIONS",
        role: "BCA · CGPA 8.1 / 10",
        company: "Siliguri Institute of Technology",
        description: "Practical engineering foundations shaped through open source, campus leadership, and hands-on software projects.",
        proof: "Fedora contributor · TechFrenzy / NSS technical lead · 5+ hackathons",
    },
];

const ProofPillar = ({ pillar, active, onActiveChange }: { pillar: typeof pillars[number]; active: boolean; onActiveChange: (active: boolean) => void }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            tabIndex={0}
            onHoverStart={() => onActiveChange(true)}
            onHoverEnd={() => onActiveChange(false)}
            onFocus={() => onActiveChange(true)}
            onBlur={() => onActiveChange(false)}
            animate={reduceMotion ? undefined : { y: active ? -6 : 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className={`proof-pillar relative flex min-h-[380px] flex-col overflow-hidden border-b border-r border-foreground/10 p-6 transition-[background-color,border-color,opacity,box-shadow] duration-300 sm:p-8 ${active ? "is-active" : ""}`}
        >
            <div aria-hidden="true" className="proof-signal absolute inset-0 overflow-hidden">
                <svg className="h-full w-full" viewBox="0 0 400 430" preserveAspectRatio="none" fill="none">
                    <path className="proof-signal-path" d="M-10 322C60 322 64 166 144 166S226 284 282 284s58-122 128-122" />
                    <circle className="proof-signal-node" cx="144" cy="166" r="3" />
                    <circle className="proof-signal-node" cx="282" cy="284" r="3" />
                    {!reduceMotion && active && <motion.circle className="proof-signal-pulse" r="5" initial={{ offsetDistance: "0%", opacity: 0 }} animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.8, ease: "linear", repeat: Infinity }} style={{ offsetPath: "path('M-10 322C60 322 64 166 144 166S226 284 282 284s58-122 128-122')" }} />}
                </svg>
            </div>
            <div className="relative z-10 flex items-start justify-between gap-6">
                <span className="font-mono text-[10px] text-accent">{pillar.number} /</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{pillar.label}</span>
            </div>
            <h3 className="relative z-10 mt-12 max-w-sm text-2xl font-medium leading-tight tracking-[-0.04em]">{pillar.title}</h3>
            <p className="relative z-10 mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
            <div className="relative z-10 mt-auto">
                <AnimatePresence>
                    {active && <motion.p initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }} className="mb-2 font-mono text-[8px] uppercase tracking-[0.18em] text-accent">Verified outcome</motion.p>}
                </AnimatePresence>
                <div className="grid grid-cols-3 border-l border-t border-foreground/10">
                    {pillar.proof.map(([value, label]) => (
                        <div key={label} className="border-b border-r border-foreground/10 px-3 py-4">
                            <motion.strong animate={reduceMotion ? undefined : { scale: active ? 1.06 : 1 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }} className="block origin-left font-mono text-sm text-accent">{value}</motion.strong>
                            <span className="mt-1 block font-mono text-[8px] uppercase leading-snug tracking-wider text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const CareerEntry = ({ item, active, onActiveChange }: { item: typeof career[number]; active: boolean; onActiveChange: (active: boolean) => void }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.article
            tabIndex={0}
            onHoverStart={() => onActiveChange(true)}
            onHoverEnd={() => onActiveChange(false)}
            onFocus={() => onActiveChange(true)}
            onBlur={() => onActiveChange(false)}
            animate={reduceMotion ? undefined : { y: active ? -4 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`career-entry relative grid gap-3 border-t border-foreground/15 py-7 pl-8 outline-none transition-[background-color,border-color,box-shadow] duration-300 first:border-t-0 sm:grid-cols-[155px_1fr] sm:gap-8 sm:py-9 ${active ? "is-active" : ""}`}
        >
            <span aria-hidden="true" className="career-node absolute left-0 top-8 -translate-x-1/2 sm:top-10" />
            {active && <motion.span aria-hidden="true" initial={reduceMotion ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-y-0 left-0 w-px origin-top bg-accent" />}
            <AnimatePresence>
                {active && !reduceMotion && (
                    <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="career-trace absolute inset-0 overflow-hidden">
                        <svg className="h-full w-full" viewBox="0 0 800 180" preserveAspectRatio="none" fill="none">
                            <path d="M0 122C125 122 158 34 300 66S488 144 620 86s105-28 180-56" />
                            <motion.circle r="3" initial={{ cx: 0, cy: 122, opacity: 0 }} animate={{ cx: [0, 180, 380, 620, 790], cy: [122, 42, 118, 86, 30], opacity: [0, 1, 1, 1, 0] }} transition={{ duration: 1.8, ease: "linear", repeat: Infinity }} />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="relative z-10 font-mono text-[10px] uppercase tracking-wider text-accent">{item.period}</p>
            <div className="relative z-10">
                <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">{item.role}</h3>
                {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-accent">{item.company} <ArrowUpRight size={12} /></a>
                ) : <p className="mt-1 font-mono text-xs text-muted-foreground">{item.company}</p>}
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <AnimatePresence>
                    {active && <motion.p initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }} className="mt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-accent">Impact signal</motion.p>}
                </AnimatePresence>
                <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-wide text-foreground/75">{item.proof}</p>
            </div>
        </motion.article>
    );
};

const AboutSection = () => {
    const [activePillar, setActivePillar] = useState<string | null>(null);
    const [activeCareer, setActiveCareer] = useState<string | null>(null);

    return (
    <>
        <section id="impact" className="border-b border-foreground/10 py-20 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <Reveal className="mb-12 grid gap-5 md:grid-cols-12 md:items-end lg:mb-16">
                    <div className="md:col-span-8">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">02 / Production proof</p>
                        <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">Three ways I make complex systems dependable.</h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-4 md:justify-self-end">The work is different; the standard stays constant: measured outcomes, understandable failure modes, and operational confidence.</p>
                </Reveal>
                <div className={`proof-grid grid border-l border-t border-foreground/10 lg:grid-cols-3 ${activePillar ? "has-active" : ""}`}>
                    {pillars.map((pillar) => (
                        <Reveal key={pillar.number} className={activePillar && activePillar !== pillar.number ? "proof-grid-sibling" : ""}>
                            <ProofPillar pillar={pillar} active={activePillar === pillar.number} onActiveChange={(active) => setActivePillar(active ? pillar.number : null)} />
                        </Reveal>
                    ))}
                </div>
                <p className="mt-4 font-mono text-[9px] leading-relaxed text-muted-foreground/70">All metrics are drawn from production work or project-reported verification in the supplied résumé.</p>
            </div>
        </section>

        <section id="experience" className="border-b border-foreground/10 py-20 sm:py-24 lg:py-32">
            <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
                <Reveal className="lg:col-span-4">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">03 / The journey</p>
                    <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl">Built through the work.</h2>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">From open-source beginnings to owning production backend systems and shipping real-time platforms.</p>
                </Reveal>
                <div className="career-list relative border-l border-foreground/15 lg:col-span-8">
                    {career.map((item) => (
                        <Reveal key={item.period} className={activeCareer && activeCareer !== item.period ? "career-entry-sibling" : ""}>
                            <CareerEntry item={item} active={activeCareer === item.period} onActiveChange={(active) => setActiveCareer(active ? item.period : null)} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    </>
    );
};

export default AboutSection;
