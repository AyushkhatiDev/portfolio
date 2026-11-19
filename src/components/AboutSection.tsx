import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Typing Animation Hook ────────────────────────────────────────────────────
const useTypingAnimation = (text: string, isActive: boolean, speed = 30) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const tick = () => {
      if (i > text.length) { setDone(true); return; }
      setDisplayed(text.slice(0, i));
      i++;
      const delay = speed + (Math.random() > 0.9 ? 80 : 0); // occasional realistic pause
      setTimeout(tick, delay);
    };
    const initialDelay = setTimeout(tick, 400);
    return () => clearTimeout(initialDelay);
  }, [text, isActive, speed]);

  return { displayed, done };
};

// ─── Terminal Line ────────────────────────────────────────────────────────────
const TerminalLine = ({
  text,
  isActive,
  onDone,
  isCommand = false,
  delay = 0,
}: {
  text: string;
  isActive: boolean;
  onDone?: () => void;
  isCommand?: boolean;
  delay?: number;
}) => {
  const [started, setStarted] = useState(false);
  const { displayed, done } = useTypingAnimation(text, started, isCommand ? 60 : 18);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [isActive, delay]);

  useEffect(() => {
    if (done && onDone) onDone();
  }, [done, onDone]);

  return (
    <p className={`leading-relaxed ${isCommand ? 'text-accent font-mono text-sm' : 'text-muted-foreground'}`}>
      {isCommand && (
        <span className="text-muted-foreground mr-2">$</span>
      )}
      {displayed}
      {!done && started && (
        <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-[1px] align-middle animate-blink" />
      )}
    </p>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
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
  "Data Structure and Algorithms",
  "Physics-Informed Neural Networks",
  "System Design",
  "Open Source",
  "Backend Architecture",
];

const bioLines = [
  "I am a Full Stack and Backend Engineer specializing in the design and development of scalable distributed systems and high-performance API-driven platforms.",
  "My work spans machine learning and scientific computing — Physics-Informed Neural Networks (PINNs) with PyTorch to model and solve complex PDEs. I have published research on Data Extraction Systems.",
  "Currently building production-grade software at Udeck Services, powering multi-tenant healthcare and e-commerce platforms.",
];

// ─── AboutSection ─────────────────────────────────────────────────────────────
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [lineIndex, setLineIndex] = useState(-1); // -1 = command, 0..n = bio lines

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Command sim starts first
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setLineIndex(0), 1200); // after command types
      return () => clearTimeout(t);
    }
  }, [inView]);

  const advanceLine = useCallback(() => {
    setLineIndex((prev) => prev + 1);
  }, []);

  // Skill tag proximity glow
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tagsContainerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const tags = container.querySelectorAll<HTMLElement>('[data-tag]');
      tags.forEach((tag) => {
        const rect = tag.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        const maxDist = 120;
        const intensity = Math.max(0, 1 - dist / maxDist);
        tag.style.boxShadow = intensity > 0
          ? `0 0 ${intensity * 20}px hsl(142 71% 45% / ${intensity * 0.4})`
          : '';
        tag.style.borderColor = intensity > 0.4
          ? `hsl(142 71% 45% / ${intensity * 0.8})`
          : '';
        tag.style.color = intensity > 0.4
          ? `hsl(142 71% 45%)` : '';
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 border-t border-foreground/5 relative"
      id="about"
    >
      {/* Ambient scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, hsl(142 71% 45% / 0.08), transparent)',
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          className="mb-16 md:mb-24"
        >
          <motion.span
            variants={{ hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 }, visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } }}
            className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block"
          >
            [ ABOUT ]
          </motion.span>
          <motion.h2
            variants={{ hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 }, visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter"
          >
            WHO I AM
          </motion.h2>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left Column - Immersive Terminal */}
          <div className="col-span-12 lg:col-span-7">
            {/* Terminal Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-xl border border-foreground/10 bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-md p-6 lg:p-8 mb-6 group hover:border-accent/30 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              <div className="relative z-10">
                {/* Terminal Header */}
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

                {/* Typing area */}
                <div className="space-y-4 min-h-[200px]">
                  {/* Command simulation */}
                  <TerminalLine
                    text="cat about.txt"
                    isActive={inView}
                    isCommand
                    onDone={() => setLineIndex(0)}
                    delay={300}
                  />

                  {/* Bio lines — revealed sequentially */}
                  {bioLines.map((line, i) => (
                    lineIndex >= i && (
                      <TerminalLine
                        key={i}
                        text={line}
                        isActive={lineIndex >= i}
                        onDone={i < bioLines.length - 1 ? advanceLine : undefined}
                        delay={200}
                      />
                    )
                  ))}

                  {/* Final blinking cursor */}
                  {lineIndex >= bioLines.length && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-accent font-mono text-sm"
                    >
                      <span className="inline-block w-[2px] h-[1.1em] bg-accent align-middle animate-blink" />
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-foreground/10 bg-gradient-to-tr from-background/50 to-muted/10 backdrop-blur-sm p-6 lg:p-8 group hover:border-foreground/20 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-md bg-accent/10 border border-accent/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
                </div>
                <h3 className="font-mono text-xs text-foreground uppercase tracking-widest font-semibold">
                  Interests &amp; Focus Areas
                </h3>
              </div>
              <div ref={tagsContainerRef} className="flex flex-wrap gap-2.5">
                {interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    data-tag="true"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-[11px] text-muted-foreground border border-foreground/10 bg-background/50 rounded-md px-3.5 py-2 cursor-pointer transition-all duration-200 shadow-sm"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Experience */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Stats Grid */}
            <motion.div
              variants={{ hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 }, visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, borderColor: "hsl(var(--accent) / 0.4)", backgroundColor: "hsl(var(--accent) / 0.02)" }}
                  className="rounded-xl border border-foreground/10 bg-background/40 backdrop-blur-sm p-6 text-center group cursor-default transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-accent/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="text-3xl lg:text-4xl font-black tracking-tighter text-foreground"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
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
              variants={{ hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 }, visible: { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } }}
              className="rounded-xl border border-foreground/10 bg-gradient-to-b from-muted/5 to-background backdrop-blur-sm p-6 lg:p-8 group hover:border-foreground/20 transition-all duration-500 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-md bg-accent/10 border border-accent/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <h3 className="font-mono text-xs text-foreground uppercase tracking-widest font-semibold">Experience</h3>
              </div>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-5 border-l-2 border-accent/30"
                  >
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent animate-pulse" />
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-accent uppercase tracking-widest">{exp.period}</span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
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
                        <li key={h} className="font-mono text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-accent/60 mt-0.5">→</span>
                          <span>{h}</span>
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
              className="mt-6 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 to-transparent p-5 flex items-center gap-4 cursor-pointer hover:border-accent/40 shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_25px_-5px_hsl(142_71%_45%_/_0.15)] transition-all duration-300"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
              </span>
              <div>
                <span className="font-mono text-xs text-foreground uppercase tracking-widest block">STATUS: AVAILABLE</span>
                <span className="font-mono text-[10px] text-muted-foreground">Open to freelance &amp; collaboration</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
