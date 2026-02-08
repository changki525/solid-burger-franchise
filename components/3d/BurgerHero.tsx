'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

// ===== Burger Layer Data =====
const BURGER_LAYERS = [
  { id: 'top-bun',  baseY: -120, spread: -180, label: '참깨 브리오슈 번' },
  { id: 'lettuce',  baseY: -60,  spread: -100, label: '유기농 로메인' },
  { id: 'cheese',   baseY: -30,  spread: -40,  label: '숙성 체다 치즈' },
  { id: 'patty',    baseY: 0,    spread: 0,    label: '180g 수제 패티' },
  { id: 'tomato',   baseY: 30,   spread: 50,   label: '완숙 토마토' },
  { id: 'onion',    baseY: 55,   spread: 90,   label: '적양파 링' },
  { id: 'bottom-bun', baseY: 85, spread: 140,  label: '하단 번' },
] as const;

// ===== Individual Ingredient Components =====
function TopBun() {
  return (
    <div className="relative w-[260px] h-[110px]">
      {/* Main bun dome */}
      <div
        className="absolute inset-0 rounded-t-[130px] rounded-b-[8px]"
        style={{
          background: 'radial-gradient(ellipse at 35% 25%, #F0B840, #D49020 45%, #C07818 75%, #A86010)',
          boxShadow: `
            inset 0 -10px 25px rgba(0,0,0,0.25),
            inset 0 10px 30px rgba(255,220,130,0.3),
            0 8px 30px rgba(0,0,0,0.4),
            0 2px 8px rgba(0,0,0,0.2)
          `,
        }}
      />
      {/* Highlight */}
      <div
        className="absolute top-3 left-1/4 w-[45%] h-[30%] rounded-full opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(255,240,200,0.8), transparent)' }}
      />
      {/* Sesame seeds */}
      {[
        { top: '22%', left: '25%', rotate: -20 },
        { top: '15%', left: '48%', rotate: 15 },
        { top: '25%', left: '65%', rotate: -10 },
        { top: '38%', left: '35%', rotate: 25 },
        { top: '35%', left: '58%', rotate: -30 },
        { top: '18%', left: '38%', rotate: 5 },
        { top: '42%', left: '50%', rotate: -15 },
      ].map((seed, i) => (
        <div
          key={i}
          className="absolute w-[10px] h-[6px] rounded-full"
          style={{
            top: seed.top,
            left: seed.left,
            transform: `rotate(${seed.rotate}deg)`,
            background: 'linear-gradient(to bottom, #F5ECD0, #E8D8B0)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        />
      ))}
    </div>
  );
}

function Lettuce() {
  return (
    <div className="relative w-[285px] h-[35px]">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #5CB338, #3D8B25)',
          clipPath: 'polygon(0% 60%, 3% 25%, 7% 70%, 11% 15%, 16% 65%, 20% 20%, 25% 75%, 30% 10%, 35% 60%, 40% 25%, 45% 80%, 50% 15%, 55% 70%, 60% 20%, 65% 75%, 70% 10%, 75% 65%, 80% 25%, 85% 80%, 89% 15%, 93% 60%, 97% 30%, 100% 65%, 100% 100%, 0% 100%)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
        }}
      />
      {/* Lighter inner */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(to bottom, #8BD660, transparent)',
          clipPath: 'polygon(0% 60%, 3% 25%, 7% 70%, 11% 15%, 16% 65%, 20% 20%, 25% 75%, 30% 10%, 35% 60%, 40% 25%, 45% 80%, 50% 15%, 55% 70%, 60% 20%, 65% 75%, 70% 10%, 75% 65%, 80% 25%, 85% 80%, 89% 15%, 93% 60%, 97% 30%, 100% 65%, 100% 100%, 0% 100%)',
        }}
      />
    </div>
  );
}

function Cheese() {
  return (
    <div className="relative w-[275px] h-[28px]">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #FFD54F, #FFC107, #F9A825)',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 55%, 97% 100%, 90% 60%, 85% 95%, 78% 55%, 70% 100%, 65% 60%, 55% 100%, 48% 55%, 40% 95%, 35% 60%, 25% 100%, 18% 55%, 10% 95%, 5% 60%, 0% 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      />
      {/* Shiny highlight */}
      <div
        className="absolute top-0 left-[20%] w-[40%] h-[40%] rounded-full opacity-40"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,220,0.8), transparent)' }}
      />
    </div>
  );
}

function Patty() {
  return (
    <div className="relative w-[255px] h-[50px]">
      <div
        className="absolute inset-0 rounded-[12px]"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 18px,
              rgba(0,0,0,0.08) 18px,
              rgba(0,0,0,0.08) 20px
            ),
            linear-gradient(to bottom, #6B3520, #4A2512 40%, #3D1E0E 70%, #5A2A15)
          `,
          boxShadow: `
            inset 0 3px 8px rgba(0,0,0,0.3),
            inset 0 -2px 6px rgba(100,60,30,0.3),
            0 6px 20px rgba(0,0,0,0.35)
          `,
        }}
      />
      {/* Grill marks */}
      <div className="absolute inset-0 rounded-[12px] opacity-20"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(0,0,0,0.3) 8px,
            rgba(0,0,0,0.3) 10px
          )`,
        }}
      />
      {/* Juice drip */}
      <div className="absolute -bottom-1 left-[30%] w-3 h-3 rounded-full bg-amber-800/40" />
      <div className="absolute -bottom-2 left-[65%] w-2 h-4 rounded-full bg-amber-900/30" />
    </div>
  );
}

function Tomato() {
  return (
    <div className="relative w-[250px] h-[20px]">
      <div
        className="absolute inset-0 rounded-[6px]"
        style={{
          background: 'linear-gradient(to bottom, #EF4444, #DC2626 50%, #B91C1C)',
          boxShadow: `
            inset 0 2px 6px rgba(255,100,100,0.3),
            inset 0 -2px 4px rgba(0,0,0,0.2),
            0 3px 10px rgba(0,0,0,0.2)
          `,
        }}
      />
      {/* Seeds pattern */}
      {[20, 35, 55, 72, 85].map((left, i) => (
        <div
          key={i}
          className="absolute top-[40%] w-[4px] h-[6px] rounded-full bg-yellow-200/40"
          style={{ left: `${left}%` }}
        />
      ))}
    </div>
  );
}

function Onion() {
  return (
    <div className="relative w-[240px] h-[16px]">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-200/60"
        style={{
          background: 'linear-gradient(to bottom, rgba(216,180,254,0.5), rgba(192,132,252,0.4))',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      />
      {/* Inner rings */}
      <div className="absolute top-[15%] left-[10%] w-[80%] h-[70%] rounded-full border border-purple-100/40" />
      <div className="absolute top-[25%] left-[20%] w-[60%] h-[50%] rounded-full border border-white/30" />
    </div>
  );
}

function BottomBun() {
  return (
    <div className="relative w-[260px] h-[55px]">
      <div
        className="absolute inset-0 rounded-t-[6px] rounded-b-[20px]"
        style={{
          background: 'linear-gradient(to bottom, #D49830, #C88820 30%, #B87818 60%, #A86810)',
          boxShadow: `
            inset 0 3px 10px rgba(255,200,100,0.2),
            inset 0 -6px 15px rgba(0,0,0,0.2),
            0 8px 25px rgba(0,0,0,0.35)
          `,
        }}
      />
      {/* Cut line */}
      <div className="absolute top-[8px] left-[5%] w-[90%] h-[1px] bg-amber-700/30" />
    </div>
  );
}

const LAYER_COMPONENTS: Record<string, () => JSX.Element> = {
  'top-bun': TopBun,
  'lettuce': Lettuce,
  'cheese': Cheese,
  'patty': Patty,
  'tomato': Tomato,
  'onion': Onion,
  'bottom-bun': BottomBun,
};

// ===== Main BurgerHero Component =====
export default function BurgerHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const isVisibleRef = useRef(true);

  // Smooth lerp function
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Animation loop
  const animate = useCallback(() => {
    if (!isVisibleRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    // Smooth mouse following
    mouseRef.current.x = lerp(mouseRef.current.x, mouseRef.current.targetX, 0.06);
    mouseRef.current.y = lerp(mouseRef.current.y, mouseRef.current.targetY, 0.06);

    const rotateY = mouseRef.current.x * 15;
    const rotateX = mouseRef.current.y * -10;
    const progress = scrollRef.current;

    // Apply 3D rotation to container
    if (containerRef.current) {
      containerRef.current.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    }

    // Animate each layer
    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      const data = BURGER_LAYERS[i];
      const targetY = lerp(data.baseY, data.spread, progress);

      // Slight per-layer mouse parallax
      const parallaxX = mouseRef.current.x * (3 + i * 1.5);
      const parallaxY = mouseRef.current.y * (2 + i);

      layer.style.transform = `
        translate3d(${parallaxX}px, ${targetY + parallaxY}px, ${(BURGER_LAYERS.length - i) * 8}px)
      `;

      // Show labels when exploded
      const label = labelRefs.current[i];
      if (label) {
        const opacity = progress > 0.3 ? Math.min((progress - 0.3) * 2, 1) : 0;
        const translateX = progress > 0.3 ? 0 : 20;
        label.style.opacity = String(opacity);
        label.style.transform = `translateX(${translateX}px)`;
      }
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Mount: setup mouse tracking + scroll tracking
  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - centerX) / centerX;
      mouseRef.current.targetY = (e.clientY - centerY) / centerY;
    };

    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6)));
      scrollRef.current = progress;
    };

    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1200">
      {/* Glow behind burger */}
      <div className="absolute w-[400px] h-[400px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(200,150,62,0.25) 0%, rgba(200,100,62,0.08) 50%, transparent 70%)',
        }}
      />

      {/* Orbit rings */}
      <div className="absolute w-[380px] h-[380px] border border-brand-gold/10 rounded-full animate-spin-slow" >
        <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-brand-gold rounded-full shadow-[0_0_12px_rgba(200,150,62,0.6)]" />
      </div>
      <div className="absolute w-[440px] h-[440px] border border-brand-gold/5 rounded-full animate-spin-reverse" >
        <div className="absolute -top-1 left-1/2 w-2 h-2 bg-brand-gold/50 rounded-full shadow-[0_0_8px_rgba(200,150,62,0.4)]" />
      </div>

      {/* 3D Burger Container */}
      <div
        ref={containerRef}
        className={`relative preserve-3d transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {BURGER_LAYERS.map((layer, i) => {
          const LayerComponent = LAYER_COMPONENTS[layer.id];
          return (
            <div
              key={layer.id}
              ref={(el) => { layerRefs.current[i] = el; }}
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
              style={{
                transform: `translate3d(0, ${layer.baseY}px, ${(BURGER_LAYERS.length - i) * 8}px)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                filter: `drop-shadow(0 ${4 + i * 2}px ${8 + i * 3}px rgba(0,0,0,0.25))`,
              }}
            >
              <LayerComponent />
              {/* Ingredient label (shown on exploded view) */}
              <div
                ref={(el) => { labelRefs.current[i] = el; }}
                className="absolute left-full ml-8 whitespace-nowrap text-sm font-medium text-brand-cream-dark/80"
                style={{ opacity: 0, transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <span className="inline-block w-8 h-[1px] bg-brand-gold/40 mr-3 align-middle" />
                {layer.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
