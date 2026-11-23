import React, { createContext, useContext, useRef, useEffect } from 'react';
import type { MouseState } from '@/hooks/useMousePosition';
import type { ScrollState } from '@/hooks/useScrollProgress';
import useMousePosition from '@/hooks/useMousePosition';
import useScrollProgress from '@/hooks/useScrollProgress';
import Lenis from 'lenis';

interface AnimationContextValue {
  mouseRef: React.MutableRefObject<MouseState>;
  scrollRef: React.MutableRefObject<ScrollState>;
  lenisRef: React.MutableRefObject<Lenis | null>;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mouseRef = useMousePosition();
  const { scrollRef, lenisRef } = useScrollProgress();

  const value = {
    mouseRef,
    scrollRef,
    lenisRef,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationSystem = (): AnimationContextValue => {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error('useAnimationSystem must be used within AnimationProvider');
  return ctx;
};

export default AnimationContext;
