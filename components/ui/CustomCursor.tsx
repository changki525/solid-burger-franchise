'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isVisible = useRef(true);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    if (!isVisible.current) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    smoothPos.current.x = lerp(smoothPos.current.x, pos.current.x, 0.12);
    smoothPos.current.y = lerp(smoothPos.current.y, pos.current.y, 0.12);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${smoothPos.current.x}px, ${smoothPos.current.y}px, 0) translate(-50%, -50%)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleVisibility = () => {
      isVisible.current = document.visibilityState === 'visible';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibility);
    rafId.current = requestAnimationFrame(animate);

    // Use event delegation instead of MutationObserver
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], .tilt-card')) {
        cursorRef.current?.classList.add('hovering');
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], .tilt-card')) {
        cursorRef.current?.classList.remove('hovering');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <>
      {/* Outer ring - follows with delay */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-10 h-10 rounded-full border-[1.5px] border-brand-gold/60 transition-all duration-300 ease-out
                     [.hovering_&]:w-16 [.hovering_&]:h-16 [.hovering_&]:border-brand-gold [.hovering_&]:bg-brand-gold/10"
          style={{ margin: '-20px 0 0 -20px' }}
        />
      </div>
      {/* Inner dot - instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
      </div>
    </>
  );
}
