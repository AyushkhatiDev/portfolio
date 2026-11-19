import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

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

// Proximity glow on skill tags
const SkillCategory = ({ cat, delay }: { cat: typeof skillCategories[0]; delay: number }) => {
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tagsRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const tags = container.querySelectorAll<HTMLElement>('[data-skill]');
      tags.forEach((tag) => {
        const rect = tag.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        const maxDist = 100;
        const intensity = Math.max(0, 1 - dist / maxDist);

        if (intensity > 0) {
          const dx = (e.clientX - cx) * intensity * 0.15;
          const dy = (e.clientY - cy) * intensity * 0.15;
          tag.style.transform = `translate(${dx}px, ${dy}px)`;
          tag.style.borderColor = `hsl(142 71% 45% / ${intensity * 0.7})`;
          tag.style.color = intensity > 0.5 ? `hsl(142 71% 45%)` : '';
          tag.style.boxShadow = `0 0 ${intensity * 15}px hsl(142 71% 45% / ${intensity * 0.3})`;
        } else {
          tag.style.transform = '';
          tag.style.borderColor = '';
          tag.style.color = '';
          tag.style.boxShadow = '';
        }
      });
    };

    const onLeave = () => {
      const tags = container.querySelectorAll<HTMLElement>('[data-skill]');
      tags.forEach((tag) => {
        tag.style.transform = '';
        tag.style.borderColor = '';
        tag.style.color = '';
        tag.style.boxShadow = '';
      });
    };

    window.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="border border-foreground/10 p-6 border-glow relative group overflow-hidden"
    >
      {/* Card glow top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-700" />

      <h3 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4">
        {cat.label}
      </h3>
      <div ref={tagsRef} className="flex flex-wrap gap-2">
        {cat.items.map((item, i) => (
          <motion.span
            key={item}
            data-skill="true"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-muted-foreground border border-foreground/10 px-2 py-1 cursor-default"
            style={{ willChange: 'transform', transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1), border-color 0.15s, color 0.15s, box-shadow 0.15s' }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section className="py-24 lg:py-32 border-t border-foreground/5 relative" id="skills">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/3 blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
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
            <SkillCategory key={cat.label} cat={cat} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
