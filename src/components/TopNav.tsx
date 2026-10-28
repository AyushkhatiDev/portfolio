import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Menu, X } from "lucide-react";

const resumeUrl = "/ayush-khati-resume.pdf";

const links = [
    { label: "Overview", id: "hero" },
    { label: "Impact", id: "impact" },
    { label: "Experience", id: "experience" },
    { label: "Systems", id: "projects" },
    { label: "Stack", id: "skills" },
    { label: "Contact", id: "contact" },
];

const TopNav = () => {
    const [activeId, setActiveId] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);
    const reduceMotion = useReducedMotion();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sections = links.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setActiveId(visible.target.id);
        }, { rootMargin: "-18% 0px -58% 0px", threshold: [0.08, 0.24, 0.48] });
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus());

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setMenuOpen(false);
                triggerRef.current?.focus();
                return;
            }
            if (event.key !== "Tab") return;
            const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)");
        const closeOnDesktop = () => {
            if (media.matches) setMenuOpen(false);
        };
        closeOnDesktop();
        media.addEventListener("change", closeOnDesktop);
        return () => media.removeEventListener("change", closeOnDesktop);
    }, []);

    const closeDrawer = () => {
        setMenuOpen(false);
        triggerRef.current?.focus();
    };

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/85 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
                    <a href="#hero" className="shrink-0 font-mono text-xs font-semibold tracking-[0.16em] text-foreground">AK<span className="text-accent">.</span></a>

                    <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
                        {links.map(({ label, id }) => (
                            <a key={id} href={`#${id}`} aria-current={activeId === id ? "page" : undefined} className={`group relative px-3 py-2 text-sm transition-colors ${activeId === id ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}>
                                <span className="relative z-10">{label}</span>
                                <span aria-hidden="true" className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                                {activeId === id && <motion.span layoutId="desktop-nav-indicator" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-x-3 bottom-1 h-px bg-accent" />}
                            </a>
                        ))}
                    </nav>

                    <a href={resumeUrl} download className="hidden shrink-0 items-center gap-2 border border-foreground/20 px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors hover:border-accent hover:text-accent lg:flex"><Download size={13} /> Resume PDF <span className="text-foreground/40">⌘K</span></a>

                    <button ref={triggerRef} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="inline-flex min-h-11 items-center gap-2 border border-foreground/20 px-3 font-mono text-[10px] uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden">
                        {menuOpen ? <X size={16} /> : <Menu size={16} />} {menuOpen ? "Close" : "Menu"}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.22 }} className="fixed inset-0 z-50 lg:hidden">
                        <button type="button" aria-label="Close navigation menu" onClick={closeDrawer} className="absolute inset-0 bg-background/75 backdrop-blur-sm" />
                        <motion.div ref={drawerRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Site navigation" initial={reduceMotion ? false : { x: "100%" }} animate={{ x: 0 }} exit={reduceMotion ? undefined : { x: "100%" }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-foreground/15 bg-background px-6 py-6 sm:px-8">
                            <div className="flex items-center justify-between border-b border-foreground/10 pb-5">
                                <span className="font-mono text-xs font-semibold tracking-[0.16em]">AK<span className="text-accent">.</span></span>
                                <button type="button" onClick={closeDrawer} className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"><X size={17} /> Close</button>
                            </div>
                            <nav aria-label="Mobile navigation" className="mt-8 flex flex-col">
                                {links.map(({ label, id }, index) => (
                                    <motion.a key={id} href={`#${id}`} onClick={closeDrawer} initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : 0.06 + index * 0.045, duration: 0.34, ease: [0.16, 1, 0.3, 1] }} className={`group flex min-h-14 items-center justify-between border-b border-foreground/10 py-3 text-2xl tracking-[-0.04em] transition-colors ${activeId === id ? "text-foreground" : "text-foreground/55 hover:text-foreground"}`}>
                                        <span>{label}</span><span className={`font-mono text-[10px] tracking-wider ${activeId === id ? "text-accent" : "text-muted-foreground"}`}>{activeId === id ? "ACTIVE" : `0${index + 1}`}</span>
                                    </motion.a>
                                ))}
                            </nav>
                            <div className="mt-auto border-t border-foreground/10 pt-6">
                                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground"><i className="h-2 w-2 rounded-full bg-emerald-400 not-italic" /> Available for backend roles · Remote</p>
                                <a href={resumeUrl} download onClick={closeDrawer} className="mt-5 inline-flex min-h-11 items-center gap-2 bg-accent px-4 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-foreground"><Download size={14} /> Download résumé</a>
                                <div className="mt-5 flex items-center gap-4">
                                    <a aria-label="GitHub" href="https://github.com/AyushkhatiDev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-accent"><Github size={18} /></a>
                                    <a aria-label="LinkedIn" href="https://www.linkedin.com/in/ayush-khati-8a342821b/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-accent"><Linkedin size={18} /></a>
                                    <a aria-label="Email Ayush" href="mailto:ayushiskhati305@gmail.com" className="text-muted-foreground transition-colors hover:text-accent"><Mail size={18} /></a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TopNav;
