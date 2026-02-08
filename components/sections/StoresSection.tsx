'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const SUCCESS_STORIES = [
  {
    name: '김OO 점주',
    store: '솔리드버거 강남점',
    period: '오픈 2년차',
    quote: '외식업 경험 없이 시작했지만, 체계적인 교육과 본사 지원 덕분에 월 매출 1억을 달성했습니다.',
    revenue: '월 1.2억',
    image: 'K',
  },
  {
    name: '박OO 점주',
    store: '솔리드버거 판교점',
    period: '오픈 3년차',
    quote: '투자금 회수까지 12개월, 안정적인 수익 구조가 가장 큰 장점입니다. 2호점도 준비 중이에요.',
    revenue: '월 9,500만',
    image: 'P',
  },
  {
    name: '이OO 점주',
    store: '솔리드버거 해운대점',
    period: '오픈 1년차',
    quote: '슈퍼바이저님의 밀착 관리와 마케팅 지원이 정말 큰 도움이 됩니다. 시작하길 잘했어요.',
    revenue: '월 8,200만',
    image: 'L',
  },
];

export default function StoresSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="stores"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0704 0%, #1a0e08 100%)' }}
    >
      {/* Subtle background image */}
      <Image
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=60&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.06]"
        sizes="100vw"
        loading="lazy"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-xs font-bold text-brand-gold tracking-[0.3em] uppercase"
          >
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-brand-cream mt-4"
          >
            점주님의 <span className="text-gradient-gold">성공 이야기</span>
          </motion.h2>
        </div>

        {/* Stories carousel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {SUCCESS_STORIES.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className={`relative p-8 rounded-2xl transition-all duration-500 tilt-card ${
                activeIndex === i
                  ? 'glass border border-brand-gold/20 shadow-[0_0_40px_rgba(200,150,62,0.1)]'
                  : 'glass-light hover:bg-white/[0.06]'
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              data-cursor-hover
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center
                              text-brand-gold font-bold text-lg">
                  {story.image}
                </div>
                <div>
                  <div className="font-bold text-brand-cream">{story.name}</div>
                  <div className="text-xs text-brand-cream-dark/50">{story.store} · {story.period}</div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-brand-cream-dark/70 leading-relaxed mb-6 min-h-[80px]">
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Revenue badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                <span className="text-xs text-brand-cream-dark/60">매출</span>
                <span className="text-sm font-bold text-brand-gold">{story.revenue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
