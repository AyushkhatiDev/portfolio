import screenshot from "@/assets/concurrencyguard.webp";
import AtlasDrawing from "./AtlasDrawing";

export default function ConcurrencyGuard() {
    return <article className="feature">
        <div className="feature-info"><p className="eyebrow">Python / Developer tools</p>
            <h3>Concurrency<wbr/>Guard</h3>
            <p>An offline Python analyzer that finds race conditions and suggests fixes.</p>
            <AtlasDrawing kind="race"/>
            <a className="btn primary" href="https://concurrencyguard.dev/" target="_blank" rel="noreferrer">Visit ConcurrencyGuard</a>
        </div>
        <div className="feature-shot"><img src={screenshot} alt="ConcurrencyGuard’s race inspector showing two code paths converging on a shared lock" width="1720" height="1079" loading="lazy"/></div>
    </article>;
}
