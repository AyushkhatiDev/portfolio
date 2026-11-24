import { Download } from "lucide-react";
import AtlasDrawing from "./AtlasDrawing";

export default function HeroSection() {
    return <section id="hero" className="wrap hero">
        <div className="intro">
            <p className="eyebrow role"><span/> Backend Software Engineer</p>
            <h1>Ayush <span>Khati.</span></h1>
            <p className="lead">I build Python systems that process <strong>1.2 million events</strong> a day.</p>
            <div className="actions"><a className="btn primary" href="#projects">See what I shipped</a><a className="btn" href="/ayush-khati-resume.pdf" download><Download size={16}/> Download résumé</a></div>
            <p className="location">Udeck Services <b>·</b> Siliguri, India <b>·</b> Open to remote roles</p>
        </div>
        <AtlasDrawing kind="pipeline"/>
    </section>;
}
