const stack = [
    ["API development", "Python, FastAPI, Flask, SQLAlchemy"],
    ["Distributed systems", "Celery, Redis, Azure Event Hubs, WebSockets"],
    ["Data & consistency", "PostgreSQL, MySQL, PostGIS, row-level locks"],
    ["Delivery & observability", "Docker, Linux, AWS, Azure, GitHub Actions"],
    ["Streams & inference", "PyAV, ONNX Runtime, Microsoft Fabric, PyTorch"],
    ["Product interfaces", "TypeScript, React, Next.js, Tailwind CSS"],
];
export default function SkillsSection() {
    return <section className="wrap chapter" id="skills"><h2>Tools of the trade<span>.</span></h2>
        <dl className="stack">{stack.map(([name, tools])=><div key={name}><dt>{name}</dt><dd>{tools}</dd></div>)}</dl>
    </section>;
}
