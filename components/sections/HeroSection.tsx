'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';

const lineVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.3 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HeroSection() {

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0d0704 0%, #1a0e08 25%, #3B2314 55%, #2a1610 100%)',
      }}
    >
      {/* Subtle background image for atmosphere */}
      <Image
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=60&auto=format&fit=crop"
        alt=""
        fill
        className="object-cover opacity-[0.08]"
        priority
        sizes="100vw"
      />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,150,62,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,150,62,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Warm glow (static, no blur filter) */}
      <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(200,120,40,0.4), transparent 60%)' }}
      />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(200,100,40,0.3), transparent 60%)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Left: Text */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-brand-gold tracking-widest uppercase">
                2024년 최고의 수제버거 선정
              </span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black leading-[1.1] tracking-tight mb-8">
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-brand-cream"
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  압도적인 두께,
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-gradient-gold-animated"
                  variants={lineVariant}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  정통 수제버거
                </motion.span>
              </span>
            </h1>

            {/* Sub copy */}
            <motion.p
              className="text-lg md:text-xl text-brand-cream-dark/80 leading-relaxed mb-10 max-w-lg"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              최상급 1++ 한우 패티, 매일 아침 공수하는 유기농 채소.<br />
              타협 없는 재료로 만드는 정직한 버거를 경험하세요.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <MagneticButton
                as="a"
                href="#menu"
                className="px-8 py-4 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-dark
                           font-bold text-base rounded-full shadow-[0_4px_20px_rgba(200,150,62,0.4)]
                           hover:shadow-[0_8px_35px_rgba(200,150,62,0.5)] transition-shadow duration-300
                           flex items-center gap-2"
              >
                메뉴 보러가기 <span className="text-lg">→</span>
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                strength={0.25}
                className="px-8 py-4 border-2 border-brand-gold/40 text-brand-gold font-bold text-base
                           rounded-full hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-300"
              >
                가맹 문의
              </MagneticButton>
            </motion.div>

            {/* Customer satisfaction row */}
            <motion.div
              className="flex items-center gap-5 mt-12"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {/* Avatar stack */}
              <div className="flex -space-x-3">
                {['#E8A840', '#D4784A', '#8B5E34', '#C4A882'].map((color, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-brand-dark flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: color, zIndex: 4 - i }}
                  >
                    {['김', '이', '박', '최'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-brand-cream-dark/70 font-medium">고객 만족도 최상</span>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex items-center gap-8 mt-10 pt-8 border-t border-white/5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              {[
                { number: '156', label: '전국 매장', suffix: '+' },
                { number: '4.8', label: '고객 만족도', suffix: '/5' },
                { number: '280', label: '누적 판매', suffix: '만+' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-brand-cream tabular-nums">
                    {stat.number}<span className="text-brand-gold text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-brand-cream-dark/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Burger Image */}
          <motion.div
            className="flex-1 w-full max-w-xl lg:max-w-none relative"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Main burger image */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80&auto=format&fit=crop"
                  alt="솔리드버거 시그니처"
                  width={1200}
                  height={800}
                  className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Dark overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-brand-gold/20" />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full border border-brand-gold/15" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold text-brand-cream-dark/40 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-brand-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
