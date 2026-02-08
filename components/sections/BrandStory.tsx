'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import FloatingIngredients from '@/components/3d/FloatingIngredients';

const PHILOSOPHY = [
  {
    number: '01',
    title: '최상급 원재료',
    desc: '1++ 등급 한우, 유기농 채소, 천연 발효 번. 모든 재료는 산지에서 당일 직송됩니다.',
  },
  {
    number: '02',
    title: '장인의 레시피',
    desc: '10년 연구 끝에 완성한 시그니처 소스와 48시간 숙성 패티의 깊은 풍미.',
  },
  {
    number: '03',
    title: '정직한 가격',
    desc: '거품을 걷어낸 합리적 가격. 최고의 맛을 누구나 즐길 수 있도록.',
  },
];

export default function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="brand"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0e08 0%, #0d0704 50%, #1a0e08 100%)' }}
    >
      {/* Subtle background image */}
      <Image
        src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1600&q=60&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.06]"
        sizes="100vw"
        loading="lazy"
      />

      {/* Floating Ingredients background */}
      <FloatingIngredients />

      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-gold/30" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold text-brand-gold tracking-[0.3em] uppercase"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-cream mt-4 mb-6 leading-tight"
          >
            맛에 대한<br />
            <span className="text-gradient-gold">타협 없는 철학</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-[2px] bg-gradient-to-r from-brand-gold to-brand-gold-light mx-auto"
          />
        </div>

        {/* Philosophy cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {PHILOSOPHY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 rounded-2xl glass-light hover:bg-white/[0.08] transition-all duration-500"
              data-cursor-hover
            >
              {/* Number */}
              <span className="text-6xl font-black text-brand-gold/10 absolute top-4 right-6
                             group-hover:text-brand-gold/20 transition-colors duration-500">
                {item.number}
              </span>

              {/* Gold dot */}
              <div className="w-3 h-3 rounded-full bg-brand-gold mb-6 shadow-[0_0_12px_rgba(200,150,62,0.5)]
                            group-hover:scale-125 transition-transform duration-300" />

              <h3 className="text-xl font-bold text-brand-cream mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-cream-dark/70">{item.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent
                            group-hover:via-brand-gold/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
