'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import FranchiseChart from '@/components/3d/FranchiseChart';

const STRENGTHS = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M16 2l4 8 9 1.5-6.5 6.3 1.5 9L16 22.5 7.5 27l1.5-9L2.5 11.7 11.5 10z" fill="currentColor" />
      </svg>
    ),
    title: '검증된 맛',
    desc: '10년간의 R&D로 완성한 시그니처 레시피. 전 매장 동일한 맛을 보장하는 센트럴 키친 시스템.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 12h24" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
    title: '체계적 지원',
    desc: '입지 분석부터 인테리어, 교육, 마케팅까지. 전담 슈퍼바이저의 1:1 밀착 지원.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M6 26V12l10-8 10 8v14H6z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 26v-8h8v8" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="8" r="5" fill="currentColor" opacity="0.3" />
        <path d="M22 8l2 2 3.5-3.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: '높은 수익성',
    desc: '업계 최고 수준 영업이익률 32%. 효율적 운영 시스템과 높은 재방문율이 핵심.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M16 8v8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: '빠른 투자회수',
    desc: '평균 14개월 내 초기 투자금 회수. 안정적 매출 구조로 지속 가능한 수익 창출.',
  },
];

export default function FranchiseSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="franchise"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0704 0%, #1a0e08 100%)' }}
    >
      {/* Subtle background image */}
      <Image
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=60&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.06]"
        sizes="100vw"
        loading="lazy"
      />

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, rgba(200,150,62,0.5), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-xs font-bold text-brand-gold tracking-[0.3em] uppercase"
            >
              Franchise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black text-brand-cream mt-4 leading-tight"
            >
              함께 성장하는<br />
              <span className="text-gradient-gold">파트너십</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-brand-cream-dark/60 max-w-md text-lg"
          >
            솔리드버거와 함께라면 경험이 없어도 성공적인 외식 창업이 가능합니다.
          </motion.p>
        </div>

        {/* Strength cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STRENGTHS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-7 rounded-2xl glass-light hover:bg-white/[0.06]
                         transition-all duration-500 tilt-card"
              data-cursor-hover
            >
              <div className="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center
                            text-brand-gold mb-5 group-hover:bg-brand-gold/20 group-hover:scale-110
                            transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-cream mb-2">{item.title}</h3>
              <p className="text-sm text-brand-cream-dark/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="p-8 md:p-12 rounded-3xl glass-light"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-brand-cream mb-2">가맹점 핵심 지표</h3>
            <p className="text-sm text-brand-cream-dark/50">2025년 전국 매장 평균 기준</p>
          </div>
          <FranchiseChart />
        </motion.div>
      </div>
    </section>
  );
}
