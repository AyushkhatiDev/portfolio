import { useEffect, useState } from "react";

const SystemFooter = ({ currentSection }: { currentSection: string }) => {
    const [time, setTime] = useState("");
    const [scrollPercent, setScrollPercent] = useState(0);
    const [memory, setMemory] = useState(42.1);

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toISOString().slice(11, 19) + " UTC");
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPercent(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
            setMemory(41 + Math.random() * 3);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-foreground/10 bg-background/90 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 lg:px-6 py-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-4 lg:gap-6">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        SYSTEM_OK
                    </span>
                    <span className="hidden sm:inline">{time}</span>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                    <span className="hidden md:inline">STATUS: {currentSection}</span>
                    <span className="hidden sm:inline">MEM: {memory.toFixed(1)}MB</span>
                    <div className="flex items-center gap-2">
                        <span>{scrollPercent}%</span>
                        <div className="w-16 h-1 bg-secondary overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-150"
                                style={{ width: `${scrollPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SystemFooter;
