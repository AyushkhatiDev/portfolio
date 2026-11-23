import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "My Work" },
  { href: "#skills", label: "Arsenal" },
  { href: "#contact", label: "Contact" },
];

// Magnetic link hook (inline)
const MagneticLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 80;

      if (dist < radius) {
        const factor = (1 - dist / radius) * 0.35;
        el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      } else {
        el.style.transform = '';
      }
    };
    const onLeave = () => { el.style.transform = ''; };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{ willChange: 'transform', transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1), color 0.2s' }}
    >
      {children}
    </a>
  );
};

const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b border-foreground/10"
      style={{
        backdropFilter: `blur(${scrolled ? '24px' : '8px'})`,
        background: scrolled
          ? 'hsl(240 10% 3.9% / 0.92)'
          : 'hsl(240 10% 3.9% / 0.75)',
        transition: 'backdrop-filter 0.4s ease, background 0.4s ease',
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 lg:px-6 py-3 gap-3 sm:gap-0">
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest shrink-0">
          AK_SYSTEMS
        </div>

        <nav className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 lg:gap-6">
          {navLinks.map(({ href, label }) => {
            const sectionId = href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <MagneticLink
                key={href}
                href={href}
                className={`relative font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {/* Active underline */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent transition-all duration-300"
                  style={{
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </MagneticLink>
            );
          })}

          <MagneticLink
            href="/ayush-khati-resume.pdf"
            className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
          >
            <Terminal size={12} strokeWidth={1} />
            Resume
          </MagneticLink>
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
