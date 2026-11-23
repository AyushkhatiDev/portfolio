import { useEffect, useRef } from 'react';
import { useAnimationSystem } from '@/contexts/AnimationContext';
import { useIsMobile } from '@/hooks/use-mobile';

// SVG filter for film grain
const GrainFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
        <feComponentTransfer in="blended">
          <feFuncA type="linear" slope="0.08" />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
);

const InteractiveLayer = () => {
  const { mouseRef, scrollRef } = useAnimationSystem();
  const isMobile = useIsMobile();
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isMobile) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const orbs = [orb1Ref.current, orb2Ref.current, orb3Ref.current];
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    const animate = () => {
      const { x, y } = mouseRef.current;
      const scroll = scrollRef.current.scrollY;

      // Cursor dot follows exactly
      dotX = x;
      dotY = y;

      // Ring lags behind with lerp
      ringX += (x - ringX) * 0.12;
      ringY += (y - ringY) * 0.12;

      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      // Floating orbs — parametric positions synced to time and scroll
      const t = performance.now() * 0.001;
      orbs.forEach((orb, i) => {
        if (!orb) return;
        const baseX = [20, 70, 45][i];
        const baseY = [20, 60, 80][i];
        const amp = [4, 6, 3][i];
        const freq = [0.4, 0.3, 0.5][i];
        const scrollParallax = scroll * [0.05, 0.08, 0.03][i];
        const ox = baseX + Math.sin(t * freq + i) * amp;
        const oy = baseY + Math.cos(t * freq * 0.7 + i) * amp - scrollParallax * 0.05;
        orb.style.transform = `translate3d(${ox}vw, ${oy}vh, 0) translate(-50%, -50%)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, mouseRef, scrollRef]);

  return (
    <>
      <GrainFilter />

      {/* Custom cursor */}
      {!isMobile && (
        <>
          <div
            ref={cursorDotRef}
            className="cursor-dot"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'hsl(142 71% 45%)',
              pointerEvents: 'none',
              zIndex: 9999,
              mixBlendMode: 'exclusion',
              willChange: 'transform',
              transition: 'opacity 0.2s',
            }}
          />
          <div
            ref={cursorRingRef}
            className="cursor-ring"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid hsl(142 71% 45% / 0.5)',
              pointerEvents: 'none',
              zIndex: 9998,
              willChange: 'transform',
              transition: 'opacity 0.2s, border-color 0.2s',
            }}
          />
        </>
      )}

      {/* Floating ambient orbs (midground) */}
      {[
        { ref: orb1Ref, size: 300, blur: 120, color: 'hsl(142 71% 45% / 0.04)' },
        { ref: orb2Ref, size: 200, blur: 80, color: 'hsl(217 91% 60% / 0.04)' },
        { ref: orb3Ref, size: 250, blur: 100, color: 'hsl(280 60% 50% / 0.03)' },
      ].map(({ ref, size, blur, color }, i) => (
        <div
          key={i}
          ref={ref}
          style={{
            position: 'fixed',
            width: size,
            height: size,
            borderRadius: '50%',
            background: color,
            filter: `blur(${blur}px)`,
            pointerEvents: 'none',
            zIndex: 1,
            willChange: 'transform',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Film grain overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          opacity: isMobile ? 0.18 : 0.24,
          filter: 'url(#grain-filter)',
          mixBlendMode: 'overlay',
          background: 'transparent',
        }}
      />
    </>
  );
};

export default InteractiveLayer;
