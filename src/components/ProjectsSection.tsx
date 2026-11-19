import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { useAnimationSystem } from '@/contexts/AnimationContext';
import { useIsMobile } from '@/hooks/use-mobile';
import pinnImg from '@/assets/pinn-project.jpg';
import opdImg from '@/assets/opd-project.jpg';
import hamroImg from '@/assets/hamrobazaar-project.jpg';
import pharmacyImg from '@/assets/pharmacy-project.jpg';
import dataExtractorImg from '@/assets/data-extractor-project.png';
import llmEvalImg from '@/assets/llm-eval-dashboard.jpeg';
import cguardImg from '@/assets/cguard-project.png';

const projects = [
  {
    title: 'CONCURRENCYGUARD',
    subtitle: 'Python Concurrency Security Analyzer',
    description:
      'Built a deterministic, offline semantic SAST for Python that finds race conditions across modern frameworks, proves unsafe interleavings, and delivers source-preserving LibCST repairs. It brings static analysis, empirical verification, and CI-ready remediation into one developer workflow.',
    metrics: [
      { label: 'Semantic Rules', value: '21 Rules' },
      { label: 'External APIs', value: '0 Required' },
      { label: 'Current Release', value: 'v3.4.0' },
    ],
    tech: ['Python', 'AST', 'LibCST', 'LSP', 'GitHub Actions'],
    liveLink: 'https://concurrencyguard.dev',
    githubLink: 'https://github.com/AyushkhatiDev/concurrency-guard',
    image: cguardImg,
    accent: 'hsl(12 93% 55%)',
    accentRGB: '248,86,44',
  },
  {
    title: 'LLM EVAL',
    subtitle: 'Open-Source LLM Evaluation Framework',
    description:
      'Built a self-hostable evaluation system for tracking LLM regressions across factual accuracy, safety refusals, hallucination resistance, adversarial prompts, and reasoning. The framework runs a 27-test suite, uses a 3-tier judge chain, auto-generates prompt injections, and persists every run to PostgreSQL with a live inspection dashboard.',
    metrics: [
      { label: 'Test Suite', value: '27 Checks' },
      { label: 'Accuracy', value: '86%' },
      { label: 'Judge Chain', value: '3 Tiers' },
    ],
    tech: ['Flask', 'PostgreSQL', 'Groq', 'Next.js', 'Vercel'],
    liveLink: 'https://lnkd.in/g9kkTh7q',
    githubLink: 'https://lnkd.in/gp_RxvCw',
    paperLink: 'https://lnkd.in/gGEPiHsS',
    image: llmEvalImg,
    accent: 'hsl(173 80% 40%)',
    accentRGB: '20,184,166',
  },
  {
    title: 'DATA EXTRACTOR',
    subtitle: 'Multi-Source Extraction Platform',
    description:
      'Engineered a multi-source data extraction pipeline leveraging Playwright and BeautifulSoup, augmented by a local-first AI enrichment stack (Ollama, LangExtract). Implemented robust validation, cross-source deduplication, and a 4-tier provider fallback chain.',
    metrics: [
      { label: 'AI Stack', value: 'Local-First' },
      { label: 'Extraction', value: '9+ Sources' },
      { label: 'Export', value: 'CSV/Excel/JSON' },
    ],
    tech: ['Flask', 'MySQL', 'Redis', 'Playwright', 'Ollama'],
    liveLink: 'https://data-extractor-1-laq7.onrender.com/',
    githubLink: undefined,
    paperLink:
      'https://github.com/AyushkhatiDev/data-extractor/blob/main/paper/DataExtractor%20copy.pdf',
    image: dataExtractorImg,
    accent: 'hsl(142 71% 45%)',
    accentRGB: '34,197,94',
  },
  {
    title: 'PINN PDE SOLVER',
    subtitle: 'Physics-Informed Neural Networks',
    description:
      'Built a deep learning framework embedding physical laws into neural network training via automatic differentiation, solving Heat, Wave, and Burgers equations without labelled data.',
    metrics: [
      { label: 'R-Squared', value: '0.9995' },
      { label: 'L2 Error', value: '≈1e-3' },
      { label: 'Tests', value: '49 Passing' },
    ],
    tech: ['PyTorch', 'Streamlit', 'NumPy', 'SciPy', 'Auto-Diff'],
    liveLink:
      'https://ayushkhatidev-physics-informed-neural-n-appstreamlit-app-dcw1oi.streamlit.app/',
    githubLink: undefined,
    image: pinnImg,
    accent: 'hsl(217 91% 60%)',
    accentRGB: '96,165,250',
  },
  {
    title: 'OPD SOFTWARE',
    subtitle: 'Healthcare & OPD Platform',
    description:
      'Eliminated 100% of out-of-zone checkout failures via geo-restriction engine. Reduced bot abuse to zero with a multi-layer security stack and real-time WebSocket broadcasting in a multi-tenant system with 6-tier RBAC.',
    metrics: [
      { label: 'Bot Abuse', value: '0%' },
      { label: 'Time Saved', value: '3+ hrs/day' },
      { label: 'RBAC Tiers', value: '6' },
    ],
    tech: ['Flask', 'MySQL', 'WebSockets', 'RBAC', 'reCAPTCHA'],
    liveLink: 'https://opdsoftware.ayurvedicchikitsalaya.in/',
    githubLink: undefined,
    image: opdImg,
    accent: 'hsl(280 70% 60%)',
    accentRGB: '167,139,250',
  },
  {
    title: 'HAMROBAZAAR',
    subtitle: 'B2B E-Commerce Platform',
    description:
      'Sustained 99.8% production uptime serving 2,500+ businesses across 10,000+ SKUs. Reduced p99 API latency by 40% via B-tree indexing and query optimization.',
    metrics: [
      { label: 'Uptime', value: '99.8%' },
      { label: 'p99 Latency', value: '200ms' },
      { label: 'Businesses', value: '2,500+' },
    ],
    tech: ['Flask', 'MySQL', 'Redis', 'Nginx', 'Docker'],
    liveLink: 'https://hamrobazaar.in/',
    githubLink: undefined,
    image: hamroImg,
    accent: 'hsl(38 92% 50%)',
    accentRGB: '251,191,36',
  },
  {
    title: 'MEDICAL E-COMMERCE',
    subtitle: 'Production-Grade Pharmacy',
    description:
      'Architected end-to-end medical e-commerce with hybrid cart engine, dynamic GST and coupon computation, geo-serviceability enforcement, and secure Razorpay payment flow.',
    metrics: [
      { label: 'Payment', value: 'Razorpay' },
      { label: 'Security', value: 'AES + RBAC' },
      { label: 'Query Perf', value: 'N+1 Fixed' },
    ],
    tech: ['Flask', 'SQLAlchemy', 'Razorpay', 'Alembic', 'AES'],
    liveLink: 'https://store.ayurvedicchikitsalaya.in/',
    githubLink: undefined,
    image: pharmacyImg,
    accent: 'hsl(0 84% 60%)',
    accentRGB: '248,113,113',
  },
] as const;

type Project = (typeof projects)[number];

type SceneRefState = {
  progress: number;
  camera: number;
  activeIndex: number;
  activeBlend: number;
  focusX: number;
  focusY: number;
};

type PointerState = {
  x: number;
  y: number;
};

type ParticleSeed = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
  drift: number;
};

const STAGE_SCREENS = projects.length + 1.45;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

const buildSeeds = (count: number) =>
  Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: Math.random() * 1.7 + 0.5,
    speed: Math.random() * 0.15 + 0.08,
    phase: Math.random() * Math.PI * 2,
    drift: Math.random() * Math.PI * 2,
  })) satisfies ParticleSeed[];

const LayeredParticleField = ({
  sceneRef,
  pointerRef,
  accentRef,
  isMobile,
}: {
  sceneRef: React.MutableRefObject<SceneRefState>;
  pointerRef: React.MutableRefObject<PointerState>;
  accentRef: React.MutableRefObject<string>;
  isMobile: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layers = useMemo(
    () => ({
      far: buildSeeds(isMobile ? 0 : 12),
      mid: buildSeeds(isMobile ? 0 : 18),
      near: buildSeeds(isMobile ? 0 : 12),
    }),
    [isMobile]
  );

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let tick = 0;
    let lastTime = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawParticles = (
      particles: ParticleSeed[],
      {
        speed,
        blur,
        opacity,
        pull,
        parallax,
      }: { speed: number; blur: number; opacity: number; pull: number; parallax: number }
    ) => {
      const scene = sceneRef.current;
      const pointer = pointerRef.current;
      const accent = accentRef.current;
      const focusX = scene.focusX * window.innerWidth;
      const focusY = scene.focusY * window.innerHeight;

      ctx.save();
      ctx.filter = blur > 0 ? `blur(${blur}px)` : 'none';

      particles.forEach((particle, index) => {
        const t = tick * particle.speed * 0.014 + particle.phase;
        let x = particle.x * window.innerWidth;
        let y = particle.y * window.innerHeight;

        x += Math.sin(t + particle.drift) * 18 * speed;
        y += Math.cos(t * 0.9 + particle.drift) * 22 * speed;
        y -= scene.progress * 220 * speed;

        x += (pointer.x - 0.5) * parallax;
        y += (pointer.y - 0.5) * parallax * 0.7;

        x += (focusX - x) * pull * (0.7 + scene.activeBlend * 0.4);
        y += (focusY - y) * pull * (0.7 + scene.activeBlend * 0.5);

        x = ((x % window.innerWidth) + window.innerWidth) % window.innerWidth;
        y = ((y % window.innerHeight) + window.innerHeight) % window.innerHeight;

        const pulse = 0.72 + (Math.sin(t * 1.7 + index) * 0.5 + 0.5) * 0.55;
        const radius = particle.radius * pulse;
        const glow = radius * (blur > 0 ? 7 : 9);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glow);
        gradient.addColorStop(0, `rgba(${accent}, ${opacity})`);
        gradient.addColorStop(0.35, `rgba(255,255,255, ${opacity * 0.42})`);
        gradient.addColorStop(1, `rgba(${accent}, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, glow, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const render = (time: number) => {
      if (time - lastTime < 33) {
        rafId = requestAnimationFrame(render);
        return;
      }
      lastTime = time;
      tick += 1;
      const accent = accentRef.current;
      const scene = sceneRef.current;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const ambient = ctx.createRadialGradient(
        scene.focusX * window.innerWidth,
        scene.focusY * window.innerHeight,
        0,
        scene.focusX * window.innerWidth,
        scene.focusY * window.innerHeight,
        Math.max(window.innerWidth, window.innerHeight) * 0.55
      );
      ambient.addColorStop(0, `rgba(${accent}, ${0.09 + scene.activeBlend * 0.09})`);
      ambient.addColorStop(0.45, `rgba(${accent}, 0.03)`);
      ambient.addColorStop(1, 'rgba(5, 8, 18, 0)');
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      drawParticles(layers.far, { speed: 0.16, blur: 10, opacity: 0.08, pull: 0.00045, parallax: 26 });
      drawParticles(layers.mid, { speed: 0.24, blur: 4, opacity: 0.12, pull: 0.0008, parallax: 42 });
      drawParticles(layers.near, { speed: 0.34, blur: 0, opacity: 0.16, pull: 0.0011, parallax: 64 });

      rafId = requestAnimationFrame(render);
    };

    resize();
    rafId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [accentRef, isMobile, layers, pointerRef, sceneRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" />;
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-12"
      onClick={onClose}
      style={{ background: 'rgba(2, 6, 16, 0.82)', backdropFilter: 'blur(18px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10"
        style={{
          background:
            'linear-gradient(180deg, rgba(8, 14, 28, 0.98) 0%, rgba(4, 8, 18, 0.98) 100%)',
          boxShadow: `0 36px 120px rgba(0,0,0,0.55), 0 0 80px rgba(${project.accentRGB}, 0.14)`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full border border-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-white/60 transition-colors hover:border-white/35 hover:text-white"
        >
          Close
        </button>

        <div className="relative h-56 overflow-hidden lg:h-72">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover opacity-72" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
          <div
            className="absolute -bottom-12 left-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: `rgba(${project.accentRGB}, 0.32)` }}
          />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
            <h3 className="text-3xl font-black uppercase tracking-[-0.08em] text-white lg:text-5xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="space-y-8 p-8 lg:p-10">
          <p className="max-w-3xl text-sm leading-7 text-white/68 lg:text-base">{project.description}</p>

          <div className="grid gap-4 border-t border-white/8 pt-8 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{metric.label}</p>
                <p className="mt-2 font-mono text-2xl text-white">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/60"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-transform hover:scale-[1.03]"
              style={{
                color: project.accent,
                background: `rgba(${project.accentRGB}, 0.14)`,
                border: `1px solid rgba(${project.accentRGB}, 0.35)`,
                boxShadow: `0 0 26px rgba(${project.accentRGB}, 0.18)`,
              }}
            >
              <ArrowUpRight size={14} />
              View Live Project
            </a>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-transform hover:scale-[1.03]"
                style={{
                  color: project.accent,
                  background: `rgba(${project.accentRGB}, 0.12)`,
                  border: `1px solid rgba(${project.accentRGB}, 0.34)`,
                  boxShadow: `0 0 22px rgba(${project.accentRGB}, 0.14)`,
                }}
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {project.paperLink && (
              <a
                href={project.paperLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-[0.24em] transition-transform hover:scale-[1.03]"
                style={{
                  color: project.accent,
                  background: `rgba(${project.accentRGB}, 0.12)`,
                  border: `1px solid rgba(${project.accentRGB}, 0.34)`,
                  boxShadow: `0 0 22px rgba(${project.accentRGB}, 0.14)`,
                }}
              >
                Read Research Paper
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardGlowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLArticleElement | null>>([]);
  const { mouseRef } = useAnimationSystem();
  const isMobile = useIsMobile();

  const sceneRef = useRef<SceneRefState>({
    progress: 0,
    camera: 0,
    activeIndex: 0,
    activeBlend: 1,
    focusX: isMobile ? 0.5 : 0.38,
    focusY: 0.54,
  });
  const pointerRef = useRef<PointerState>({ x: 0.5, y: 0.5 });
  const accentRef = useRef(projects[0].accentRGB);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: '200px 0px 200px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastTime = 0;
    let camera = 0;
    let focusX = isMobile ? 0.5 : 0.38;
    let focusY = 0.54;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let lastActive = 0;

    const animate = (time: number) => {
      if (!sectionVisible) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (time - lastTime < 16) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const section = sectionRef.current;
      const stage = stageRef.current;
      if (section && stage) {
        const rect = section.getBoundingClientRect();
        const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = clamp(-rect.top / distance, 0, 1);
        const pointerSourceX = mouseRef.current.x || window.innerWidth * 0.5;
        const pointerSourceY = mouseRef.current.y || window.innerHeight * 0.5;
        pointerX = lerp(pointerX, clamp(pointerSourceX / window.innerWidth, 0, 1), 0.1);
        pointerY = lerp(pointerY, clamp(pointerSourceY / window.innerHeight, 0, 1), 0.1);
        pointerRef.current = { x: pointerX, y: pointerY };

        const targetCamera = progress * (projects.length - 1);
        camera = lerp(camera, targetCamera, 0.09);
        const nextActive = clamp(Math.round(camera), 0, projects.length - 1);
        const activeBlend = 1 - Math.min(1, Math.abs(nextActive - camera));
        const targetFocusX = isMobile ? 0.5 : nextActive % 2 === 0 ? 0.36 : 0.64;
        focusX = lerp(focusX, targetFocusX + (pointerX - 0.5) * (isMobile ? 0.015 : 0.03), 0.08);
        focusY = lerp(focusY, 0.54 + (pointerY - 0.5) * 0.03, 0.08);

        sceneRef.current = {
          progress,
          camera,
          activeIndex: nextActive,
          activeBlend,
          focusX,
          focusY,
        };

        if (nextActive !== lastActive) {
          lastActive = nextActive;
          accentRef.current = projects[nextActive].accentRGB;
          setActiveIndex(nextActive);
        }

        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(540px circle at ${pointerX * 100}% ${pointerY * 100}%, rgba(255,255,255,0.08), transparent 58%)`;
        }

        if (cardGlowRef.current) {
          cardGlowRef.current.style.background = `radial-gradient(520px circle at ${focusX * 100}% ${focusY * 100}%, rgba(${accentRef.current}, 0.13), transparent 62%)`;
        }

        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const depthIndex = index - camera;
          const absDepth = Math.abs(depthIndex);
          const visible = absDepth < 1.45;
          card.style.display = visible ? 'block' : 'none';
          if (!visible) return;

          const intensity = clamp(1 - absDepth / 1.35, 0, 1);
          const z = depthIndex >= 0 ? -depthIndex * 240 : absDepth * 140;
          const xBase = isMobile ? 0 : index % 2 === 0 ? -14 : 14;
          const slideX = isMobile ? depthIndex * 4 : depthIndex * 8 + xBase + (pointerX - 0.5) * 10;
          const slideY = depthIndex * (isMobile ? 18 : 14) + (pointerY - 0.5) * 5;
          const scale = lerp(depthIndex > 0 ? 0.88 : 0.92, 1, intensity);
          const opacity = lerp(depthIndex > 0 ? 0.62 : 0.42, 1, intensity);
          const rotateY = lerp(depthIndex > 0 ? 10 : -7, 0, intensity);

          card.style.opacity = `${opacity}`;
          card.style.filter = `saturate(${0.9 + intensity * 0.18}) brightness(${0.9 + intensity * 0.12})`;
          card.style.transform = `translate3d(${slideX}px, ${slideY}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
          card.style.zIndex = `${Math.round((2 - absDepth) * 80)}`;
          card.style.pointerEvents = opacity > 0.2 ? 'auto' : 'none';
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, mouseRef, sectionVisible]);

  const activeProject = projects[activeIndex];

  return (
    <>
      <section ref={sectionRef} id="projects" className="relative" style={{ height: `${STAGE_SCREENS * 100}vh` }}>
        <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[#040814]" />
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(30, 58, 138, 0.18), transparent 30%), radial-gradient(circle at 85% 15%, rgba(8, 145, 178, 0.14), transparent 28%), linear-gradient(180deg, rgba(4, 8, 20, 0.96) 0%, rgba(3, 6, 16, 0.98) 100%)',
            }}
          />

          {sectionVisible && (
            <LayeredParticleField
              sceneRef={sceneRef}
              pointerRef={pointerRef}
              accentRef={accentRef}
              isMobile={isMobile}
            />
          )}

          <div ref={spotlightRef} className="absolute inset-0 z-[1] pointer-events-none" />
          <div ref={cardGlowRef} className="absolute inset-0 z-[1] pointer-events-none" />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-8 lg:px-12 lg:pt-10">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.34em] text-white/38">[ Projects ]</p>
              <h2 className="max-w-md text-4xl font-black uppercase tracking-[-0.08em] text-white lg:text-6xl">
                Floating case studies in a shared field
              </h2>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">Camera</p>
              <p className="mt-1 font-mono text-3xl text-white/88">{String(activeIndex + 1).padStart(2, '0')}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">
                / {String(projects.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 z-10"
            style={{
              perspective: isMobile ? '900px' : '1200px',
              perspectiveOrigin: isMobile ? '50% 50%' : activeIndex % 2 === 0 ? '38% 50%' : '62% 50%',
              transformStyle: 'preserve-3d',
            }}
          >
            {projects.map((project, index) => {
              const alignRight = !isMobile && index % 2 !== 0;

              return (
                <div
                  key={project.title}
                  className="absolute inset-0 flex items-center"
                  style={{
                    justifyContent: isMobile ? 'center' : alignRight ? 'flex-end' : 'flex-start',
                    paddingLeft: isMobile ? '1rem' : '4rem',
                    paddingRight: isMobile ? '1rem' : '4rem',
                  }}
                >
                  <article
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    onMouseMove={(event) => {
                      if (isMobile) return;
                      const rect = event.currentTarget.getBoundingClientRect();
                      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                      event.currentTarget.style.setProperty('--tilt-x', `${-y * 4}deg`);
                      event.currentTarget.style.setProperty('--tilt-y', `${x * 6}deg`);
                      event.currentTarget.style.setProperty('--hover-z', '96px');
                      event.currentTarget.style.setProperty('--hover-glow', '1');
                      event.currentTarget.style.setProperty('--shine-x', `${(x * 0.5 + 0.5) * 100}%`);
                      event.currentTarget.style.setProperty('--shine-y', `${(y * 0.5 + 0.5) * 100}%`);
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.setProperty('--tilt-x', '0deg');
                      event.currentTarget.style.setProperty('--tilt-y', '0deg');
                      event.currentTarget.style.setProperty('--hover-z', '0px');
                      event.currentTarget.style.setProperty('--hover-glow', '0');
                    }}
                    onClick={() => setOpenProject(project)}
                    className="group relative cursor-pointer"
                    style={{
                      width: isMobile ? '100%' : 'min(56rem, 56vw)',
                      maxWidth: '100%',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity, filter',
                      transition:
                        'transform 360ms cubic-bezier(0.16, 1, 0.3, 1), opacity 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms cubic-bezier(0.16, 1, 0.3, 1)',
                      transform:
                        'translate3d(0, 0, 0) rotateX(var(--tilt-x, 0deg)) rotateY(calc(var(--tilt-y, 0deg))) translateZ(var(--hover-z, 0px))',
                      opacity: 0,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -inset-[16%] rounded-[3rem]"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(${project.accentRGB}, 0.24) 0%, rgba(${project.accentRGB}, 0.08) 32%, transparent 68%)`,
                        filter: 'blur(42px)',
                        opacity: 'calc(0.55 + (var(--hover-glow, 0) * 0.35))',
                        transition: 'opacity 240ms ease',
                      }}
                    />
                    <div
                      className="relative overflow-hidden rounded-[2rem] border border-white/10"
                      style={{
                        background:
                          'linear-gradient(160deg, rgba(10,16,30,0.92) 0%, rgba(5,9,20,0.96) 48%, rgba(4,6,16,0.98) 100%)',
                        boxShadow: `0 24px 80px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.05), 0 0 28px rgba(${project.accentRGB}, 0.18)`,
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-90"
                        style={{
                          background: `linear-gradient(135deg, rgba(${project.accentRGB}, 0.08), transparent 28%, transparent 72%, rgba(${project.accentRGB}, 0.08))`,
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[var(--hover-glow,0)] transition-opacity duration-200"
                        style={{
                          background:
                            'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.12), transparent 46%)',
                        }}
                      />

                      <div className="grid min-h-[27rem] gap-0 lg:grid-cols-[1.02fr_1.18fr]">
                        <div className="relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            style={{ opacity: 0.82 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050816]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                          <div
                            className="absolute -bottom-6 left-8 h-24 w-24 rounded-full blur-3xl"
                            style={{ background: `rgba(${project.accentRGB}, 0.3)` }}
                          />
                          <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                            <div className="rounded-full border border-white/12 bg-black/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 backdrop-blur-md">
                              Project {String(index + 1).padStart(2, '0')}
                            </div>
                            {project.paperLink && (
                              <a
                                href={project.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] backdrop-blur-md transition-colors"
                                style={{
                                  color: project.accent,
                                  background: `rgba(${project.accentRGB}, 0.18)`,
                                  borderColor: `rgba(${project.accentRGB}, 0.42)`,
                                  boxShadow: `0 0 18px rgba(${project.accentRGB}, 0.18)`,
                                }}
                              >
                                Research paper
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="relative flex flex-col justify-between p-6 lg:p-8">
                          <div>
                            <p
                              className="mb-3 font-mono text-[10px] uppercase tracking-[0.34em]"
                              style={{ color: project.accent }}
                            >
                              {project.subtitle}
                            </p>
                            <h3 className="max-w-[14ch] text-3xl font-black uppercase tracking-[-0.09em] text-white lg:text-5xl">
                              {project.title}
                            </h3>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/64 lg:text-base">
                              {project.description}
                            </p>
                          </div>

                          <div className="mt-8 space-y-6">
                            <div className="grid gap-4 border-t border-white/8 pt-5 md:grid-cols-3">
                              {project.metrics.map((metric) => (
                                <div key={metric.label}>
                                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">
                                    {metric.label}
                                  </p>
                                  <p className="mt-2 font-mono text-lg text-white">{metric.value}</p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/58 transition-colors duration-300 group-hover:border-white/18 group-hover:text-white/80"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.26em] transition-all duration-300"
                                style={{
                                  color: project.accent,
                                  background: `rgba(${project.accentRGB}, 0.14)`,
                                  border: `1px solid rgba(${project.accentRGB}, 0.34)`,
                                  boxShadow: `0 0 18px rgba(${project.accentRGB}, 0.12)`,
                                }}
                              >
                                <ExternalLink size={14} />
                                Launch
                              </a>
                              {project.githubLink && (
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300"
                                  style={{
                                    color: project.accent,
                                    background: `rgba(${project.accentRGB}, 0.12)`,
                                    border: `1px solid rgba(${project.accentRGB}, 0.34)`,
                                    boxShadow: `0 0 16px rgba(${project.accentRGB}, 0.12)`,
                                  }}
                                >
                                  <Github size={14} />
                                  GitHub
                                </a>
                              )}
                              {project.paperLink && (
                                <a
                                  href={project.paperLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300"
                                  style={{
                                    color: project.accent,
                                    background: `rgba(${project.accentRGB}, 0.12)`,
                                    border: `1px solid rgba(${project.accentRGB}, 0.34)`,
                                    boxShadow: `0 0 16px rgba(${project.accentRGB}, 0.12)`,
                                  }}
                                >
                                  Research paper
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
              style={{ opacity: Math.max(0, 1 - sceneRef.current.progress * 5) }}
            >
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/32 to-transparent" />
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/34">Scroll to move through</p>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#030612] to-transparent" />
          <div className="absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#030612]/90 to-transparent" />
        </div>
      </section>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  );
};

export default ProjectsSection;
