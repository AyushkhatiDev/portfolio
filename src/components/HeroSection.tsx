import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ayushPhoto from '@/assets/ayush-photo.jpeg';
import { useAnimationSystem } from '@/contexts/AnimationContext';
import { useIsMobile } from '@/hooks/use-mobile';

const titles = [
  'SYSTEMS ARCHITECT',
  'PDE SOLVER',
  'FULL-STACK ENGINEER',
  'BACKEND SPECIALIST',
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

const HeroSection = () => {
  const { mouseRef } = useAnimationSystem();
  const isMobile = useIsMobile();
  const [titleIndex, setTitleIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTitleIndex((current) => (current + 1) % titles.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    const update = () => {
      const stage = stageRef.current;
      const copy = copyRef.current;
      const visual = visualRef.current;
      const tag = tagRef.current;
      const spotlight = spotlightRef.current;
      const ambient = ambientRef.current;
      const section = sectionRef.current;

      if (stage && copy && visual && tag && spotlight && ambient && section) {
        const rect = section.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(window.innerHeight, 1), 0, 1);
        const sourceX = mouseRef.current.x || window.innerWidth * 0.5;
        const sourceY = mouseRef.current.y || window.innerHeight * 0.5;

        pointerX = lerp(pointerX, clamp(sourceX / window.innerWidth, 0, 1), 0.08);
        pointerY = lerp(pointerY, clamp(sourceY / window.innerHeight, 0, 1), 0.08);

        const depthX = (pointerX - 0.5) * (isMobile ? 14 : 28);
        const depthY = (pointerY - 0.5) * (isMobile ? 10 : 24);
        const scrollLift = progress * (isMobile ? 36 : 72);

        stage.style.transform = `translate3d(0, ${-scrollLift * 0.3}px, 0)`;
        copy.style.transform = `translate3d(${depthX * -0.7}px, ${depthY * -0.55 - scrollLift}px, ${isMobile ? 0 : 28}px)`;
        visual.style.transform = `translate3d(${depthX * 1.2}px, ${depthY * 0.8 - scrollLift * 0.55}px, ${isMobile ? 0 : 90}px) rotateY(${depthX * 0.16}deg) rotateX(${depthY * -0.12}deg)`;
        tag.style.transform = `translate3d(${depthX * -0.35}px, ${depthY * -0.2 - scrollLift * 0.6}px, ${isMobile ? 0 : 16}px)`;

        spotlight.style.background = `radial-gradient(560px circle at ${pointerX * 100}% ${pointerY * 100}%, rgba(255,255,255,0.09), transparent 58%)`;
        ambient.style.background = `radial-gradient(620px circle at ${isMobile ? 50 : 68}% 48%, rgba(34,197,94,${0.16 - progress * 0.05}), transparent 60%), radial-gradient(720px circle at ${isMobile ? 50 : 32}% 54%, rgba(96,165,250,${0.12 - progress * 0.04}), transparent 62%)`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, mouseRef]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-24 lg:pt-0"
      style={{ perspective: isMobile ? '900px' : '1400px' }}
    >
      <div ref={ambientRef} className="pointer-events-none absolute inset-0 z-[1]" />
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-[2]" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: isMobile ? '64px 64px' : '92px 92px',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 82%, transparent 100%)',
        }}
      />

      <div
        ref={stageRef}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1460px] items-center px-6 pb-16 pt-10 lg:px-12"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div className="grid w-full grid-cols-12 items-center gap-8 lg:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <div
              ref={tagRef}
              className="mb-8"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/58">
                  Portfolio / 2026 / India
                </span>
              </motion.div>
            </div>

            <div
              ref={copyRef}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <motion.p
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 font-mono text-[10px] uppercase tracking-[0.36em] text-white/42"
              >
                Software developer shaping backend systems into cinematic interfaces
              </motion.p>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.8rem,11vw,8.9rem)] font-black uppercase leading-[0.86] tracking-[-0.11em] text-white"
                >
                  AYUSH
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.8rem,11vw,8.9rem)] font-black uppercase leading-[0.84] tracking-[-0.11em] text-transparent"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.45)' }}
                >
                  KHATI
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex min-h-[1.5rem] items-center gap-3"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="relative font-mono text-sm uppercase tracking-[0.24em] text-white/70">
                  {titles.map((title, index) => (
                    <motion.span
                      key={title}
                      initial={false}
                      animate={{
                        opacity: titleIndex === index ? 1 : 0,
                        y: titleIndex === index ? 0 : -10,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-0 whitespace-nowrap"
                    >
                      {title}
                    </motion.span>
                  ))}
                  <span className="opacity-0">BACKEND SPECIALIST</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 max-w-2xl text-base leading-8 text-white/62 lg:text-lg"
              >
                I build production-grade backend systems, real-time platforms, and ML-heavy tools,
                then wrap them in interfaces that feel spatial, alive, and engineered with intent.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/52">
                  Software Developer @{' '}
                </span>
                <a
                  href="https://www.udeckservices.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-white transition-colors hover:text-accent"
                >
                  Udeck Services
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {[
                  { href: 'mailto:ayushiskhati305@gmail.com', label: 'Start a conversation' },
                  { href: 'https://github.com/AyushkhatiDev', label: 'Github' },
                  { href: 'https://www.linkedin.com/in/ayush-khati-8a342821b/', label: 'LinkedIn' },
                ].map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.26em] transition-all duration-300 ${
                      index === 0
                        ? 'border border-accent/30 bg-accent/10 text-accent hover:bg-accent/16 hover:shadow-[0_0_34px_rgba(34,197,94,0.22)]'
                        : 'border border-white/12 bg-white/[0.03] text-white/72 hover:border-white/28 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:flex lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 42, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              ref={visualRef}
              className="relative mx-auto w-full max-w-[34rem]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <div
                className="pointer-events-none absolute -inset-[8%] rounded-[2.4rem]"
                style={{
                  background:
                    'radial-gradient(circle at 58% 46%, rgba(34,197,94,0.22) 0%, rgba(96,165,250,0.12) 32%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div
                className="relative overflow-hidden rounded-[2rem] border border-white/10"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(11,18,34,0.94) 0%, rgba(6,10,22,0.98) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 30px 90px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[24rem] overflow-hidden lg:min-h-[32rem]">
                    <img
                      src={ayushPhoto}
                      alt="Ayush Khati"
                      className="h-full w-full object-cover grayscale-[0.14] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_6px] opacity-[0.09]" />
                  </div>

                  <div className="flex flex-col justify-between p-6 lg:p-7">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Scene 01</p>
                      <h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.08em] text-white lg:text-3xl">
                        Building systems with depth
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-white/58">
                        Backend architecture, distributed workflows, AI tooling, and production
                        interfaces shaped as one connected world.
                      </p>
                    </div>

                    <div className="mt-8 space-y-4 border-t border-white/8 pt-5">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">
                        <span>Focus</span>
                        <span>Realtime / APIs / ML</span>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">
                        <span>Status</span>
                        <span className="text-accent">Available for work</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-4 rounded-full border border-white/10 bg-[#07101f]/90 px-4 py-2 backdrop-blur-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/62">
                  Scroll to enter the world
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
