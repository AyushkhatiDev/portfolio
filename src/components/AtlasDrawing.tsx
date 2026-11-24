import { useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export type Drawing = "pipeline" | "race" | "match" | "feeds" | "policy" | "terrain" | "cache" | "scan";
const captions: Record<Drawing, [string, string]> = {
    policy: ["Policy decision", "A simulated payment request is checked against policy and held for approval."],
    terrain: ["Incident response", "A hillside sensor raises an incident, and a mapped route connects the response team to the incident."],
    cache: ["Semantic lookup", "A matching query returns a cached answer. A cache miss continues to the model."],
    scan: ["Static analysis", "The scanner traces a Python syntax tree and marks a finding for review."],
    pipeline: ["Event recovery", "Events enter a queue. A worker retries failed jobs before committing a write."],
    race: ["Concurrency trace", "Two requests converge on the same piece of shared state."],
    match: ["Match event sequence", "Three passes trace a sequence of events across a football pitch."],
    feeds: ["Worker isolation", "One of fifteen camera feeds drops while the other fourteen continue."],
};

function Signal({ path, duration = 3 }: { path: string; duration?: number }) {
    return <circle className="travel" r="4" style={{offsetPath: 'path("' + path + '")', "--seconds": duration + "s"} as CSSProperties} />;
}

function Plate({ y, depth, solid }: { y: number; depth: number; solid?: boolean }) {
    return <g transform={`translate(0 ${y})`} strokeLinejoin="round">
        <path fill={solid ? "#3558e8" : "#edf0fd"} d="M66 75 181 16 299 72 183 133Z" />
        <path fill={solid ? "#203eaf" : "#c5d0f6"} d={`M66 75 183 133v${depth}L66 ${75 + depth}Z`} />
        <path fill={solid ? "#152e92" : "#98adea"} d={`M183 133 299 72v${depth}l-116 61Z`} />
        {Array.from({length: 8}, (_, i) => <path key={i} stroke={solid ? "#aabafc" : "#849ada"} d={`M${78+i*12} ${76+i*6}l92 -47`} />)}
        {[0,1,2].map(i => <circle key={i} cx={278+i*6} cy={88-i*3} r="1.4" fill="#fcf8df" stroke="none" />)}
    </g>;
}

function Pipeline() {
    const route = "M182 20 L182 62 L245 93 L245 154 L298 180 L332 163 L332 120 L300 103 L271 118 L271 167 L183 214 L183 260";
    return <>
        <g className="guide"><path d="M66 66v155m117-200v255m116-211v145M28 197l159 78 145-75" /></g>
        <Plate y={126} depth={11} solid />
        <Plate y={72} depth={15} />
        <Plate y={14} depth={9} />
        <path className="wire" d="M182 13v48m117 115 33-16v-41l-32-16-29 15v29" />
        <circle cx="182" cy="15" r="6" fill="#ef8a47" />
        <g className="leader"><path d="M71 89H42L28 75H4m89 87H40l-14 10H4m258 52 50 8h42" /></g>
        <g className="labels"><text x="4" y="68">Queue</text><text x="4" y="190">Worker</text><text x="307" y="251">Store</text><text x="310" y="99">Retry</text></g>
        <Signal path={route} duration={4} />
    </>;
}

function Race() {
    return <>
        <path className="wire" d="M54 47H155Q175 47 193 70T228 85H302M54 123H155Q175 123 193 100T228 85" />
        {[47,123].map((y,i) => <g key={y}><rect x="31" y={y-15} width="39" height="30" rx="3" fill="#f6f5ee"/><text className="labels" x="43" y={y+5}>{i ? "B" : "A"}</text></g>)}
        <rect x="289" y="68" width="34" height="34" rx="3" fill="#c5d0f6"/><path d="M298 84h16m-8-8v16"/>
        <text className="labels" x="24" y="155">Requests</text><text className="labels" x="248" y="128">Shared state</text>
        <Signal path="M70 47H155Q175 47 193 70T228 85H289" /><Signal path="M70 123H155Q175 123 193 100T228 85H289" />
    </>;
}

function Match() {
    const route = "M58 103 126 58 193 105 291 56";
    return <>
        <g stroke="#7389be"><rect x="24" y="16" width="312" height="132" rx="3"/><path d="M180 16v132M24 45h41v74H24m312-74h-41v74h41"/><circle cx="180" cy="82" r="23"/></g>
        <path className="wire" strokeDasharray="4 4" d={route}/>
        {[[58,103],[126,58],[193,105],[291,56]].map(([x,y])=><circle key={x} cx={x} cy={y} r="6" fill="#304ed3"/>)}
        <Signal path={route}/>
    </>;
}

function Feeds() {
    return <>{Array.from({length:15}, (_, i) => {
        const x=22+(i%5)*65, y=19+Math.floor(i/5)*46;
        return <g key={i} className={i===7 ? "dropped" : ""} transform={`translate(${x} ${y})`}>
            <rect width="52" height="32" rx="3" fill="#e4eaff"/><path className="feed-wave" pathLength="1" d={i===7 ? "M6 17h40" : "M6 20h8l5-10 8 13 5-8h14"} />
            {i===7 && <>
                <path className="lost-mark" d="m22 7 8 8m0-8-8 8" stroke="#92360c"/>
                <path className="before-drop" d="M6 20h8l5-10 8 13 5-8h14"/>
            </>}
        </g>;
    })}</>;
}

function Policy() {
    const route = "M54 86H145L181 56H239Q250 56 258 48H304";
    return <>
        <path className="guide" d="M28 130h300M180 17v130"/>
        <path className="wire" d={route}/>
        <path strokeDasharray="4 4" d="M181 94l24 20h99"/>
        <rect x="29" y="69" width="44" height="34" rx="4" fill="#e2e8fa"/>
        <path d="M30 79h42m-34 15h12"/>
        <path fill="#d1dcff" d="m178 43 31 12v23q0 23-31 39-31-16-31-39V55Z"/>
        <path d="m165 78 9 9 17-20" strokeWidth="3"/>
        <circle cx="304" cy="48" r="10" fill="#f5cfaa"/><path d="M301 43v10m6-10v10"/>
        <circle cx="304" cy="114" r="5" fill="#edf0fd"/>
        <g className="labels"><text x="21" y="127">Request</text><text x="151" y="140">Policy</text><text x="249" y="29">Approval</text><text x="278" y="142">Allow</text></g>
        <Signal path={route}/>
    </>;
}

function Terrain() {
    const route = "M48 112Q83 86 115 102T171 98L208 74Q240 49 282 64";
    return <>
        <g stroke="#90a5be" strokeWidth="1">
            {[0,1,2,3,4,5].map(i=><path key={i} transform={`translate(${181-i*7} ${69+i*2}) scale(${1-i*.13})`} d="M-153 37C-166 6-119-37-74-38S-4-61 41-41 132-60 153-15 110 47 54 48-8 30-51 54-135 61-153 37Z"/>)}
        </g>
        <path className="wire" d={route} strokeDasharray="4 3"/>
        <rect x="40" y="104" width="16" height="16" fill="#dae2fb"/>
        <circle cx="282" cy="64" r="12" fill="#f4d8ae"/><circle cx="282" cy="64" r="3" fill="currentColor"/>
        <path d="M270 56 251 32h-33" /><g className="labels"><text x="181" y="25">Sensor alert</text><text x="24" y="149">Response team</text></g>
        <Signal path={route}/>
    </>;
}

function Cache() {
    const route = "M52 83H157Q175 83 189 65L203 47H288";
    return <>
        <path className="wire" d={route}/><path d="M157 83q18 0 32 18l14 18h85" strokeDasharray="4 4"/>
        <circle cx="52" cy="83" r="10" fill="#d4dffa"/><rect x="126" y="61" width="47" height="42" rx="6" fill="#dce4fc"/>
        <path d="M136 73h27m-27 8h27m-27 8h17"/>
        <g className="labels"><text x="21" y="116">Query</text><text x="128" y="134">Cache</text><text x="217" y="34">Hit · reply</text><text x="207" y="147">Miss · model</text></g>
        <circle cx="288" cy="47" r="7" fill="#e5af77"/><rect x="282" y="113" width="12" height="12" fill="#e6eafa"/>
        <Signal path={route}/>
    </>;
}

function Scan() {
    const route = "M55 82H111L163 55H202L255 83H291";
    return <>
        <rect x="23" y="48" width="58" height="70" rx="4" fill="#e2e8fa"/><path d="M34 63h35m-35 10h23m-23 10h31m-31 10h18"/>
        <path className="wire" d="M81 82h30l52-27h39l53 28h36"/>
        <path d="m111 82 52 28h40m-1-55 35-30h32" />
        {[[111,82],[163,55],[163,110],[202,55],[203,110],[269,25]].map(([x,y])=><circle key={x+"-"+y} cx={x} cy={y} r="5" fill="#dce4fc"/>)}
        <path d="m291 68 14 24h-28Z" fill="#f4cf9e"/><path d="M291 75v8m0 2v2"/>
        <g className="labels"><text x="19" y="144">Source</text><text x="129" y="144">Syntax tree</text><text x="258" y="122">Finding</text></g>
        <Signal path={route}/>
    </>;
}

const drawings = {pipeline: Pipeline, race: Race, match: Match, feeds: Feeds, policy: Policy, terrain: Terrain, cache: Cache, scan: Scan};

export default function AtlasDrawing({ kind }: { kind: Drawing }) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, {once:true, amount:0.23});
    const reduced = useReducedMotion();
    const [replay, setReplay] = useState(0);
    const [title, description] = captions[kind];
    const Illustration = drawings[kind];
    return <figure ref={ref} className={`drawing drawing-${kind}`}>
        <svg key={replay} className={inView && !reduced ? "playing" : ""} viewBox={kind === "pipeline" ? "0 0 360 282" : "0 0 360 166"} role="img" aria-label={description} fill="none" stroke="currentColor" strokeWidth="1.4">
            <Illustration/>
        </svg>
        <figcaption><span>{title}</span>{!reduced && <button type="button" aria-label={`Replay ${title.toLowerCase()}`} onClick={()=>setReplay(n=>n+1)}><RotateCcw size={13}/> Replay</button>}</figcaption>
    </figure>;
}
