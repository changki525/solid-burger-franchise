'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import MagneticButton from '@/components/ui/MagneticButton';

const STORE_PINS = [
  { city: '서울', x: 48, y: 25, stores: 42 },
  { city: '경기', x: 52, y: 30, stores: 38 },
  { city: '인천', x: 42, y: 28, stores: 12 },
  { city: '부산', x: 72, y: 75, stores: 18 },
  { city: '대구', x: 65, y: 55, stores: 14 },
  { city: '대전', x: 50, y: 48, stores: 10 },
  { city: '광주', x: 35, y: 68, stores: 8 },
  { city: '제주', x: 38, y: 92, stores: 6 },
];

export default function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  return (
    <>
      {/* Contact / Map Section */}
      <section
        id="contact"
        ref={ref}
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #1a0e08 0%, #3B2314 100%)' }}
      >
        {/* Subtle background image */}
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=60&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-[0.06]"
          sizes="100vw"
          loading="lazy"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Map with 3D pins */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-3xl glass-light p-6 overflow-hidden"
            >
              {/* Korea outline (simplified) */}
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                <path
                  d="M45 8 Q50 5, 55 10 L62 18 Q68 22, 70 30 L72 42 Q74 50, 72 58 L74 68 Q72 78, 68 82 L58 88 Q50 90, 45 85 L38 78 Q32 70, 30 62 L28 50 Q30 38, 35 28 L40 18 Z"
                  fill="none"
                  stroke="rgba(200,150,62,0.3)"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Store pins */}
              {STORE_PINS.map((pin, i) => (
                <div
                  key={i}
                  className="absolute group"
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  onMouseEnter={() => setHoveredPin(i)}
                  onMouseLeave={() => setHoveredPin(null)}
                  data-cursor-hover
                >
                  {/* Pin */}
                  <motion.div
                    className="relative"
                    animate={{
                      y: hoveredPin === i ? -8 : 0,
                      scale: hoveredPin === i ? 1.3 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_12px_rgba(200,150,62,0.6)]">
                      <div className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-30" />
                    </div>
                    {/* Shadow */}
                    <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-black/30 blur-[2px]" />
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5
                               bg-brand-dark/95 rounded-lg border border-brand-gold/20 whitespace-nowrap
                               pointer-events-none"
                    initial={false}
                    animate={{ opacity: hoveredPin === i ? 1 : 0, y: hoveredPin === i ? 0 : 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xs font-bold text-brand-cream">{pin.city}</div>
                    <div className="text-[10px] text-brand-gold">{pin.stores}개 매장</div>
                  </motion.div>
                </div>
              ))}

              <div className="absolute bottom-4 left-6 text-xs text-brand-cream-dark/40">
                전국 156+ 매장 운영중
              </div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold text-brand-gold tracking-[0.3em] uppercase">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-cream mt-4 mb-6 leading-tight">
                가맹 문의
              </h2>
              <p className="text-brand-cream-dark/60 mb-10 leading-relaxed">
                솔리드버거 가맹에 관심이 있으시다면 아래 정보를 남겨주세요.<br />
                전담 상담사가 24시간 내에 연락드리겠습니다.
              </p>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10
                           text-brand-cream placeholder-brand-cream-dark/30 text-sm
                           focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.07]
                           transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="연락처"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10
                           text-brand-cream placeholder-brand-cream-dark/30 text-sm
                           focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.07]
                           transition-all duration-300"
                />
                <select
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10
                           text-brand-cream-dark/50 text-sm appearance-none
                           focus:outline-none focus:border-brand-gold/40 transition-all duration-300"
                  defaultValue=""
                >
                  <option value="" disabled>희망 지역 선택</option>
                  <option value="seoul">서울</option>
                  <option value="gyeonggi">경기</option>
                  <option value="incheon">인천</option>
                  <option value="busan">부산</option>
                  <option value="daegu">대구</option>
                  <option value="other">기타</option>
                </select>
                <textarea
                  placeholder="문의 내용 (선택)"
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10
                           text-brand-cream placeholder-brand-cream-dark/30 text-sm resize-none
                           focus:outline-none focus:border-brand-gold/40 focus:bg-white/[0.07]
                           transition-all duration-300"
                />
              </div>

              <MagneticButton
                className="w-full px-8 py-4 bg-gradient-to-r from-brand-gold to-brand-gold-light
                         text-brand-dark font-bold text-base rounded-full
                         shadow-[0_4px_20px_rgba(200,150,62,0.4)]
                         hover:shadow-[0_8px_35px_rgba(200,150,62,0.5)] transition-shadow duration-300"
                strength={0.2}
              >
                상담 신청하기
              </MagneticButton>

              <p className="text-[11px] text-brand-cream-dark/30 mt-4 text-center">
                상담 신청 시 개인정보 수집 및 이용에 동의합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/5" style={{ background: '#0d0704' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-xl font-black mb-4">
                <span className="text-brand-cream">솔리드</span>
                <span className="text-gradient-gold">버거</span>
              </div>
              <p className="text-sm text-brand-cream-dark/40 leading-relaxed max-w-sm">
                (주)솔리드버거코리아 · 대표: 홍길동<br />
                서울특별시 강남구 테헤란로 123, 8층<br />
                사업자등록번호: 123-45-67890
              </p>
            </div>
            {/* Links */}
            <div>
              <h4 className="text-sm font-bold text-brand-cream mb-4">바로가기</h4>
              <ul className="space-y-2.5">
                {['브랜드 소개', '메뉴', '매장 찾기', '가맹 문의', '채용'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-brand-cream-dark/40 hover:text-brand-gold transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-brand-cream mb-4">고객센터</h4>
              <div className="space-y-2 text-sm text-brand-cream-dark/40">
                <p className="text-lg font-bold text-brand-gold">1588-1234</p>
                <p>hello@solidburger.kr</p>
                <p>운영 09:00 ~ 18:00 (주말 휴무)</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-brand-cream-dark/25">
              &copy; 2026 SOLID BURGER. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-brand-cream-dark/25">
              <a href="#" className="hover:text-brand-gold transition-colors">이용약관</a>
              <a href="#" className="hover:text-brand-gold transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-brand-gold transition-colors">사이트맵</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
