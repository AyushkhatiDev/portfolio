import { ExternalLink } from "lucide-react";
import screenshot from "@/assets/concurrencyguard.webp";

const projectUrl = "https://concurrencyguard.dev/";

const ConcurrencyGuard = () => (
    <article className="guard-feature">
        <div className="guard-copy">
            <p className="portfolio-label">Featured project · Developer tools</p>
            <h3>Concurrency<wbr />Guard</h3>
            <p>A Python static analyzer that finds race conditions before deployment. It traces hazards across frameworks like FastAPI and Django, checks which invariants can break, and suggests fixes that preserve the surrounding code.</p>
            <ul aria-label="Project capabilities">{["Python", "Static analysis", "Runs offline"].map(tag => <li key={tag}>{tag}</li>)}</ul>
            <a className="profile-action" href={projectUrl} target="_blank" rel="noopener noreferrer">Visit ConcurrencyGuard <ExternalLink size={15} /></a>
        </div>
        <a className="guard-preview" href={projectUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the ConcurrencyGuard project website">
            <img src={screenshot} width="1720" height="1079" loading="lazy" alt="ConcurrencyGuard landing page showing a branching call graph in its invariant trace panel" />
        </a>
    </article>
);

export default ConcurrencyGuard;
