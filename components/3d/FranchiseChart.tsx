'use client';

import { useEffect, useRef, useState } from 'react';

interface ChartBar {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  suffix?: string;
}

const CHART_DATA: ChartBar[] = [
  { label: '평균 월매출', value: 8500, maxValue: 10000, color: '#C8963E', suffix: '만원' },
  { label: '영업이익률', value: 32, maxValue: 50, color: '#E0B060', suffix: '%' },
  { label: '투자회수', value: 14, maxValue: 24, color: '#C8963E', suffix: '개월' },
  { label: '재계약률', value: 94, maxValue: 100, color: '#E0B060', suffix: '%' },
];

export default function FranchiseChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {CHART_DATA.map((bar, i) => {
        const height = animated ? (bar.value / bar.maxValue) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center group" data-cursor-hover>
            {/* Value */}
            <div className="text-2xl md:text-3xl font-black text-brand-gold mb-4 tabular-nums"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 0.6s ${0.2 + i * 0.15}s cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              {animated ? bar.value.toLocaleString() : 0}
              <span className="text-sm font-medium text-brand-cream-dark ml-1">{bar.suffix}</span>
            </div>

            {/* 3D Bar */}
            <div
              className="relative w-16 h-48 md:h-56"
              style={{ perspective: '400px' }}
            >
              {/* Bar face */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, ${bar.color}, ${bar.color}dd)`,
                  transition: `height 1.2s ${i * 0.15}s cubic-bezier(0.22, 1, 0.36, 1)`,
                  boxShadow: `
                    8px 0 0 rgba(0,0,0,0.15),
                    0 -4px 20px rgba(200,150,62,0.2)
                  `,
                  transform: 'rotateY(-5deg)',
                  transformOrigin: 'left bottom',
                }}
              />
              {/* Bar side (3D effect) */}
              <div
                className="absolute bottom-0 right-0 w-2 rounded-tr-lg"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, ${bar.color}88, ${bar.color}66)`,
                  transition: `height 1.2s ${i * 0.15}s cubic-bezier(0.22, 1, 0.36, 1)`,
                  transform: 'skewY(-8deg)',
                  transformOrigin: 'bottom',
                }}
              />
              {/* Bottom base */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold/20 rounded" />

              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-brown rounded-lg
                            text-xs font-bold text-brand-gold whitespace-nowrap opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 pointer-events-none">
                {bar.value.toLocaleString()}{bar.suffix}
              </div>
            </div>

            {/* Label */}
            <p className="mt-4 text-sm font-medium text-brand-cream-dark text-center">{bar.label}</p>
          </div>
        );
      })}
    </div>
  );
}
