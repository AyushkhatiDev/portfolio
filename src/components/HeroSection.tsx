import { Download, MapPin } from "lucide-react";
import ayushPhoto from "@/assets/ayush-photo.jpeg";

const results = [
    ["1.2M", "Events processed daily"],
    ["133 → 6", "Queries per request"],
    ["38M", "Rows migrated"],
];

const HeroSection = () => (
    <section id="hero" className="profile-section">
        <div className="profile-layout">
            <div className="profile-copy">
                <p className="portfolio-label text-accent">Backend software engineer</p>
                <h1>Ayush <em>Khati.</em></h1>
                <p className="profile-summary">I build event pipelines that recover from failure and payment systems that keep their books balanced.</p>
                <p className="profile-byline">Backend engineer at <strong>Udeck Services</strong></p>
                <div className="mt-7 flex flex-wrap gap-3">
                    <a className="profile-action primary" href="#projects">Explore my work</a>
                    <a className="profile-action" href="/ayush-khati-resume.pdf" download><Download size={16} /> Résumé</a>
                </div>
                <dl className="profile-results">
                    {results.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                </dl>
            </div>
            <figure className="profile-figure">
                <div className="portrait-mat">
                    <img src={ayushPhoto} width="605" height="701" alt="Portrait of Ayush Khati" fetchPriority="high" />
                </div>
                <figcaption><span><MapPin size={14} /> Siliguri, India</span><span className="availability">Open to remote roles</span></figcaption>
            </figure>
        </div>
    </section>
);

export default HeroSection;
