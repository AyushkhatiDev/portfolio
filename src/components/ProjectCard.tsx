import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

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
  image: string;
  index: number;
}

const ProjectCard = ({
  title, subtitle, description, metrics, tech, liveLink, paperLink, image, index
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // 3D tilt via motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const gloss = useSpring(useTransform(mouseX, [-0.5, 0.5], ["rgba(255,255,255,0)", "rgba(255,255,255,0.04)"]), { stiffness: 200, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
        viewport={{ once: true }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => setIsExpanded(true)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
          cursor: "pointer",
        }}
        className="group relative border border-foreground/10 bg-card p-6 lg:p-8 border-glow transition-colors duration-500 overflow-hidden"
      >
        {/* Gloss overlay */}
        <motion.div
          style={{ background: gloss }}
          className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
        />

        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(142 71% 45% / 0.06) 0%, transparent 70%)',
          }}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-8 lg:mb-12 relative z-10">
          <div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">
              PROJECT_{String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-none group-hover:text-gradient-primary transition-all duration-500">
              {title}
            </h3>
            <p className="font-mono text-xs text-primary mt-2 uppercase group-hover:tracking-[0.2em] transition-all duration-500">
              {subtitle}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {paperLink && (
              <a
                href={paperLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 px-2 py-1 shrink-0 transition-colors uppercase tracking-widest"
              >
                READ PAPER
              </a>
            )}
            <div className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-1 shrink-0">
              LIVE_PRODUCTION
            </div>
          </div>
        </div>

        {/* Image with 3D depth */}
        <div className="mb-8 overflow-hidden border border-foreground/5 relative z-10" style={{ transform: "translateZ(20px)" }}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 lg:h-64 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
          />
          {/* Scanline on image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 0% 0% / 0.04) 3px, hsl(0 0% 0% / 0.04) 4px)' }}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 relative z-10">
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
                  <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest">{m.label}</div>
                  <div className="text-xl lg:text-2xl font-mono text-foreground mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expand hint */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-20 flex items-center gap-2">
          <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            CLICK TO EXPAND
          </span>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-accent group-hover:rotate-45 transition-all duration-300"
          >
            <ArrowUpRight size={28} strokeWidth={1} />
          </a>
        </div>
      </motion.div>

      {/* Fullscreen Expand Modal */}
      {isExpanded && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12"
          onClick={() => setIsExpanded(false)}
          style={{ background: 'hsl(240 10% 3.9% / 0.95)', backdropFilter: 'blur(20px)' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-foreground/10 bg-card p-8 lg:p-12"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 font-mono text-[10px] text-muted-foreground border border-foreground/10 px-3 py-1.5 hover:border-foreground/40 transition-colors uppercase tracking-widest"
            >
              ✕ CLOSE
            </button>

            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-3">
              PROJECT_{String(index + 1).padStart(2, "0")} — EXPANDED
            </span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-2">{title}</h2>
            <p className="font-mono text-sm text-primary uppercase mb-8">{subtitle}</p>

            <img src={image} alt={title} className="w-full h-64 lg:h-80 object-cover mb-8 border border-foreground/5" />

            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 border-t border-foreground/10 pt-8">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{m.label}</div>
                  <div className="text-2xl font-mono text-foreground">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {tech.map((t) => (
                <span key={t} className="font-mono text-[10px] border border-foreground/20 px-2 py-1 uppercase tracking-widest text-muted-foreground">{t}</span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs border border-accent/30 bg-accent/10 text-accent px-4 py-2 hover:bg-accent/20 transition-colors uppercase tracking-widest"
              >
                <ArrowUpRight size={14} />
                View Live
              </a>
              {paperLink && (
                <a
                  href={paperLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs border border-foreground/20 px-4 py-2 hover:border-foreground/60 transition-colors uppercase tracking-widest"
                >
                  Read Paper
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProjectCard;
