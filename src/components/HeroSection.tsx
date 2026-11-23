import portrait from '@/assets/ayush-photo.jpeg';
import preview from '@/assets/cguard-project.png';
import './portfolio.css';

export default function HeroSection() {
  return <section id="hero" className="intro">
    <div className="intro-grid">
      <div><div className="identity"><img src={portrait} alt="" /><span>Ayush Khati<br/><small>Siliguri, India</small></span></div>
      <h1>Backend<br/><em>engineer.</em></h1>
      <p>I build Python backends and developer tools at Udeck Services and in open source. My work spans concurrency analysis, real-time platforms, and machine learning.</p>
      <div className="intro-links"><a href="#projects">Explore my work ↓</a><a href="/ayush-khati-resume.pdf">Résumé ↗</a><a href="#contact">Contact</a></div></div>
      <a className="feature" href="https://concurrencyguard.dev"><div className="feature-screen"><img src={preview} width="2940" height="1912" alt="ConcurrencyGuard interface with a branching concurrency trace" /></div>
      <small>Featured open source</small><h2>ConcurrencyGuard ↗</h2><p>A Python tool that finds race conditions and suggests source-preserving fixes, entirely offline.</p></a>
    </div>
  </section>;
}
