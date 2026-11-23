import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
    children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reduceMotion.matches) return;

        const lenis = new Lenis({
            duration: 1.05,
            smoothWheel: true,
            touchMultiplier: 1.2,
            anchors: { offset: -80, duration: 1.1 },
        });

        let frameId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };

        frameId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
