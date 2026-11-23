import { useEffect, useRef } from 'react';

export interface MouseState {
  /** Normalized device coordinates: -1 to +1 */
  ndx: number;
  ndy: number;
  /** Raw pixel coordinates */
  x: number;
  y: number;
  /** Velocity (delta per frame) */
  vx: number;
  vy: number;
}

const useMousePosition = () => {
  const mouseRef = useRef<MouseState>({
    ndx: 0,
    ndy: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const ndx = (x / window.innerWidth) * 2 - 1;
      const ndy = -((y / window.innerHeight) * 2 - 1);

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const prev = mouseRef.current;
        mouseRef.current = {
          ndx,
          ndy,
          x,
          y,
          vx: x - lastX,
          vy: y - lastY,
        };
        lastX = x;
        lastY = y;
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const x = touch.clientX;
      const y = touch.clientY;
      mouseRef.current = {
        ndx: (x / window.innerWidth) * 2 - 1,
        ndy: -((y / window.innerHeight) * 2 - 1),
        x,
        y,
        vx: 0,
        vy: 0,
      };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return mouseRef;
};

export default useMousePosition;
