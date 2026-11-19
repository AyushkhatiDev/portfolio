import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export interface ScrollState {
  progress: number; // 0 → 1 over full page
  velocity: number;
  direction: 1 | -1;
  scrollY: number;
}

const useScrollProgress = () => {
  const scrollRef = useRef<ScrollState>({
    progress: 0,
    velocity: 0,
    direction: 1,
    scrollY: 0,
  });
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ({ progress, velocity, direction, scroll }: {
      progress: number;
      velocity: number;
      direction: number;
      scroll: number;
    }) => {
      scrollRef.current = {
        progress: Math.max(0, Math.min(1, progress)),
        velocity,
        direction: direction as 1 | -1,
        scrollY: scroll,
      };
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return { scrollRef, lenisRef };
};

export default useScrollProgress;
