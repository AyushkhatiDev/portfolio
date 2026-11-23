import { ArrowUpRight, BookOpen, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import Reveal from "./Reveal";

const contactLinks = [
    { label: "GitHub", detail: "@AyushkhatiDev", href: "https://github.com/AyushkhatiDev", Icon: Github },
    { label: "LinkedIn", detail: "Ayush Khati", href: "https://www.linkedin.com/in/ayush-khati-8a342821b/", Icon: Linkedin },
    { label: "Medium", detail: "@ayushiskhati305", href: "https://medium.com/@ayushiskhati305", Icon: BookOpen },
    { label: "X / Twitter", detail: "@Dropclause2", href: "https://x.com/Dropclause2", Icon: Twitter },
];

const ContactSection = () => (
    <section id="contact" className="relative overflow-hidden border-b border-foreground/10 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <Reveal><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">06 / Open channel</p></Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
                <Reveal className="lg:col-span-7">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Ready?</p>
                    <h2 className="mt-4 text-5xl font-semibold leading-[0.91] tracking-[-0.075em] sm:text-7xl lg:text-8xl">Let’s build something that holds up.</h2>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">I’m open to backend engineering roles and conversations about distributed systems, data-intensive platforms, and production reliability.</p>
                    <a href="mailto:ayushiskhati305@gmail.com" className="mt-8 inline-flex items-center gap-3 border-b border-accent pb-3 text-base transition-colors hover:text-accent sm:text-lg">
                        <Mail size={18} className="text-accent" /> ayushiskhati305@gmail.com <ArrowUpRight size={16} className="text-accent" />
                    </a>
                    <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><MapPin size={13} className="text-accent" /> Siliguri, India · Remote</div>
                </Reveal>
                <Reveal delay={0.08} className="border-t border-foreground/15 lg:col-span-5">
                    {contactLinks.map(({ label, detail, href, Icon }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-foreground/15 py-4 transition-colors hover:text-accent">
                            <span className="flex items-center gap-3"><Icon size={16} className="text-accent" /><span>{label}</span></span>
                            <span className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground"><span className="hidden sm:inline">{detail}</span><ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                        </a>
                    ))}
                </Reveal>
            </div>
            <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>Ayush Khati · Backend Software Engineer</span>
                <span>Independent systems, thoughtfully built · 2026</span>
            </div>
        </div>
    </section>
);

export default ContactSection;
