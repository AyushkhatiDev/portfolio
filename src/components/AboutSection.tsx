import portrait from "@/assets/ayush-photo.jpeg";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
    const ref = useRef<HTMLElement>(null);
    const visible = useInView(ref, {once:true, amount:.3});
    const reduced = useReducedMotion();
    return <>
        <section id="impact" className="impact"><div className="wrap chapter">
            <p className="eyebrow">Commerce Core / Production engineering</p><h2>What changed in production.</h2>
            <div className="impact-grid">
                <figure ref={ref} className={visible && !reduced ? "benchmark playing" : "benchmark"}><figcaption>HamroBazaar checkout</figcaption>
                    <p>SQL optimization cut the number of queries per request.</p>
                    {[["Before",133],["After",6]].map(([label,value])=><div key={label} className="bar-row"><span>{label}</span><i aria-hidden="true"><b style={{width: (Number(value)/133*100)+"%"}}/></i><strong>{value}</strong></div>)}
                    <a href="https://hamrobazaar.in/">Visit HamroBazaar</a>
                </figure>
                <article className="migration"><p className="eyebrow">Evan Merchantile / Database migration</p><h3>38M <span>rows</span></h3><p>Migrated production records with zero downtime while maintaining the distributor hierarchy and double-entry ledger.</p></article>
            </div>
        </div></section>
        <section id="experience" className="wrap chapter"><h2>Where I’ve worked<span>.</span></h2>
            <div className="career"><figure><img src={portrait} alt="Ayush Khati" width="605" height="701" loading="lazy"/><figcaption>Ayush Khati · Siliguri, India</figcaption></figure>
            <ol><li><small>Oct 2025 – present</small><h3>Backend Software Engineer</h3><a href="https://www.udeckservices.com/">Udeck Services</a><p>I own the Evan Merchantile backend, from idempotent ledger writes to observability across 198 endpoints.</p></li>
                <li><small>Apr – Oct 2025</small><h3>Backend Engineering Intern</h3><a href="https://www.udeckservices.com/">Udeck Services</a><p>I built B2B checkout and tiered pricing for HamroBazaar and cut request time from 3.96s to 1.15s.</p></li>
                <li><small>Education</small><h3>Bachelor of Computer Applications</h3><p>Siliguri Institute of Technology · CGPA 8.1/10. Fedora contributor and technical lead for TechFrenzy and NSS.</p></li>
            </ol></div>
        </section>
    </>;
}
