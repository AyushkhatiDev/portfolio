import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, ExternalLink, ArrowRight } from "lucide-react";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const revealVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

const socials = [
    {
        label: "GitHub",
        handle: "@edwardkhati",
        href: "https://github.com/edwardkhati",
        Icon: Github,
    },
    {
        label: "LinkedIn",
        handle: "Ayush Khati",
        href: "https://www.linkedin.com/in/ayush-khati",
        Icon: Linkedin,
    },
    {
        label: "X / Twitter",
        handle: "@ayushkhati",
        href: "https://twitter.com/ayushkhati",
        Icon: Twitter,
    },
    {
        label: "Email",
        handle: "ayushkhati@email.com",
        href: "mailto:ayushkhati@email.com",
        Icon: Mail,
    },
];

const ContactSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const [focused, setFocused] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        // Simulate sending
        setTimeout(() => {
            setStatus("sent");
            setForm({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-24 lg:py-32 border-t border-foreground/5 relative overflow-hidden"
        >
            {/* Ambient background glows */}
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="mb-16 md:mb-24"
                >
                    <motion.span
                        variants={revealVariants}
                        className="font-mono text-xs text-accent uppercase tracking-widest mb-4 block"
                    >
                        [ CONTACT ]
                    </motion.span>
                    <motion.h2
                        variants={revealVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter"
                    >
                        GET IN TOUCH
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mt-4 text-muted-foreground font-mono text-sm max-w-lg"
                    >
                        Have a project in mind or want to collaborate? Let's build something great together.
                    </motion.p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6 lg:gap-10">
                    {/* Left — Contact Form */}
                    <motion.div
                        className="col-span-12 lg:col-span-7"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="relative overflow-hidden rounded-xl border border-foreground/10 bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-md p-6 lg:p-8 group hover:border-accent/20 transition-colors duration-500"
                        >
                            {/* Terminal header bar */}
                            <div className="flex items-center justify-between mb-8 border-b border-foreground/10 pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                        <span className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                                        <span className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                    </div>
                                    <span className="font-mono text-[10px] text-muted-foreground ml-3 uppercase tracking-widest hidden sm:inline-block">
                                        ayush@portfolio ~ /contact
                                    </span>
                                </div>
                                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest px-2 py-1 border border-foreground/10 rounded-sm bg-background/50">
                                    NEW MESSAGE
                                </div>
                            </div>

                            {status === "sent" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                        className="w-14 h-14 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center"
                                    >
                                        <Send size={22} className="text-accent" />
                                    </motion.div>
                                    <h3 className="font-black text-xl tracking-tight text-foreground">Message Sent!</h3>
                                    <p className="text-muted-foreground font-mono text-sm">I'll get back to you as soon as possible.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-2 font-mono text-xs text-accent hover:text-foreground border border-accent/30 hover:border-foreground/30 px-4 py-2 rounded-md transition-all duration-300"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name */}
                                    <div className="relative">
                                        <motion.label
                                            animate={{ color: focused === "name" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}
                                            transition={{ duration: 0.2 }}
                                            className="font-mono text-[10px] uppercase tracking-widest block mb-2"
                                        >
                                            // NAME
                                        </motion.label>
                                        <motion.div
                                            animate={{ borderColor: focused === "name" ? "hsl(var(--accent) / 0.5)" : "hsl(var(--foreground) / 0.1)" }}
                                            className="rounded-lg border bg-background/50 overflow-hidden transition-shadow duration-300"
                                            style={{ boxShadow: focused === "name" ? "0 0 0 1px hsl(var(--accent) / 0.15)" : "none" }}
                                        >
                                            <input
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("name")}
                                                onBlur={() => setFocused(null)}
                                                required
                                                placeholder="Your full name"
                                                className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 font-mono outline-none"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <motion.label
                                            animate={{ color: focused === "email" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}
                                            transition={{ duration: 0.2 }}
                                            className="font-mono text-[10px] uppercase tracking-widest block mb-2"
                                        >
                                            // EMAIL
                                        </motion.label>
                                        <motion.div
                                            animate={{ borderColor: focused === "email" ? "hsl(var(--accent) / 0.5)" : "hsl(var(--foreground) / 0.1)" }}
                                            className="rounded-lg border bg-background/50 overflow-hidden transition-shadow duration-300"
                                            style={{ boxShadow: focused === "email" ? "0 0 0 1px hsl(var(--accent) / 0.15)" : "none" }}
                                        >
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("email")}
                                                onBlur={() => setFocused(null)}
                                                required
                                                placeholder="your@email.com"
                                                className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 font-mono outline-none"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <motion.label
                                            animate={{ color: focused === "message" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}
                                            transition={{ duration: 0.2 }}
                                            className="font-mono text-[10px] uppercase tracking-widest block mb-2"
                                        >
                                            // MESSAGE
                                        </motion.label>
                                        <motion.div
                                            animate={{ borderColor: focused === "message" ? "hsl(var(--accent) / 0.5)" : "hsl(var(--foreground) / 0.1)" }}
                                            className="rounded-lg border bg-background/50 overflow-hidden transition-shadow duration-300"
                                            style={{ boxShadow: focused === "message" ? "0 0 0 1px hsl(var(--accent) / 0.15)" : "none" }}
                                        >
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocused("message")}
                                                onBlur={() => setFocused(null)}
                                                required
                                                rows={5}
                                                placeholder="Describe your project or how I can help..."
                                                className="w-full bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 font-mono outline-none resize-none"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        disabled={status === "sending"}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full relative overflow-hidden rounded-lg border border-accent/30 bg-accent/10 text-foreground font-mono text-sm uppercase tracking-widest px-6 py-3.5 flex items-center justify-center gap-2 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                        {status === "sending" ? (
                                            <>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    className="w-4 h-4 border-2 border-accent/50 border-t-accent rounded-full inline-block"
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={14} />
                                                Send Message
                                                <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Right — Details & Socials */}
                    <motion.div
                        className="col-span-12 lg:col-span-5 flex flex-col gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {/* Quick Info */}
                        <motion.div
                            variants={fadeUp}
                            className="rounded-xl border border-foreground/10 bg-gradient-to-br from-background/60 to-muted/10 backdrop-blur-sm p-6 lg:p-7"
                        >
                            <h3 className="font-mono text-xs text-foreground uppercase tracking-widest font-semibold mb-5 flex items-center gap-2">
                                <span className="text-accent">// </span> Let's Collaborate
                            </h3>
                            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    I'm open to full-time roles, freelance projects, and open-source collaborations — especially in distributed systems, backend platforms, and ML-driven applications.
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                    <MapPin size={14} className="text-accent shrink-0" />
                                    <span className="font-mono text-xs">West Bengal, Siliguri · Remote Available</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={14} className="text-accent shrink-0" />
                                    <a
                                        href="mailto:ayushkhati@email.com"
                                        className="font-mono text-xs hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/20 hover:decoration-accent"
                                    >
                                        ayushkhati@email.com
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={fadeUp}
                            className="rounded-xl border border-foreground/10 bg-gradient-to-tr from-background/60 to-muted/10 backdrop-blur-sm p-6 lg:p-7"
                        >
                            <h3 className="font-mono text-xs text-foreground uppercase tracking-widest font-semibold mb-5 flex items-center gap-2">
                                <span className="text-accent">// </span> Find Me Online
                            </h3>
                            <div className="space-y-3">
                                {socials.map((s, i) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center justify-between p-3.5 rounded-lg border border-foreground/5 bg-background/30 hover:border-accent/30 hover:bg-accent/5 group/social transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md border border-foreground/10 bg-background/50 group-hover/social:border-accent/30 group-hover/social:bg-accent/10 transition-all duration-300">
                                                <s.Icon size={14} className="text-muted-foreground group-hover/social:text-accent transition-colors duration-300" />
                                            </div>
                                            <div>
                                                <span className="font-mono text-xs text-foreground block">{s.label}</span>
                                                <span className="font-mono text-[10px] text-muted-foreground">{s.handle}</span>
                                            </div>
                                        </div>
                                        <ExternalLink size={12} className="text-muted-foreground/40 group-hover/social:text-accent transition-colors duration-300" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Badge */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -2, scale: 1.01 }}
                            className="rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 to-transparent p-5 flex items-center gap-4 hover:border-accent/40 transition-all duration-300 cursor-default"
                        >
                            <span className="relative flex h-3 w-3 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                            </span>
                            <div>
                                <span className="font-mono text-xs text-foreground uppercase tracking-widest block">
                                    STATUS: AVAILABLE
                                </span>
                                <span className="font-mono text-[10px] text-muted-foreground">
                                    Open to freelance & full-time opportunities
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
