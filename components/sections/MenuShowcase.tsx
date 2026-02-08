'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface MenuItem {
  name: string;
  nameEn: string;
  desc: string;
  price: string;
  gradient: string;
  accent: string;
  tag?: string;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: '클래식 솔리드',
    nameEn: 'Classic Solid',
    desc: '180g 수제 패티, 로메인, 토마토, 체다 치즈, 특제 솔리드 소스',
    price: '₩9,900',
    gradient: 'from-amber-900 to-amber-700',
    accent: '#E0A840',
    tag: 'BEST',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: '트러플 벨벳',
    nameEn: 'Truffle Velvet',
    desc: '더블 패티, 트러플 아이올리, 카라멜라이즈드 어니언, 그뤼에르 치즈',
    price: '₩14,900',
    gradient: 'from-stone-800 to-stone-600',
    accent: '#C4A882',
    tag: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: '스모키 칠리 팝퍼',
    nameEn: 'Smoky Chili Popper',
    desc: '스모키 BBQ 패티, 할라피뇨, 페퍼잭 치즈, 칠리 마요',
    price: '₩12,500',
    gradient: 'from-red-900 to-red-700',
    accent: '#EF4444',
    tag: 'SPICY',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: '스위트 어니언 링',
    nameEn: 'Sweet Onion Ring',
    desc: '어니언링 토핑, 허니 머스타드, 에멘탈 치즈, 아루굴라',
    price: '₩11,500',
    gradient: 'from-yellow-900 to-yellow-700',
    accent: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=75&auto=format&fit=crop',
  },
  {
    name: '머쉬룸 스위스',
    nameEn: 'Mushroom Swiss',
    desc: '소테 머쉬룸, 스위스 치즈, 트러플 버터, 로즈마리 에어',
    price: '₩13,500',
    gradient: 'from-emerald-900 to-emerald-700',
    accent: '#6DB34A',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=75&auto=format&fit=crop',
  },
];

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[320px] md:w-[380px] group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className="relative h-[460px] md:h-[520px] rounded-3xl overflow-hidden border border-white/5
                   transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-90`} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-7">
          {/* Top section */}
          <div>
            {item.tag && (
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider
                             border border-white/20 text-white/80 mb-4">
                {item.tag}
              </span>
            )}

            {/* Burger image */}
            <div className="w-full h-[220px] md:h-[260px] flex items-center justify-center mb-4 overflow-hidden rounded-2xl">
              <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 320px, 380px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div>
            <div className="text-sm font-medium text-white/40 mb-1">{item.nameEn}</div>
            <h3 className="text-2xl font-black text-white mb-2">{item.name}</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4">{item.desc}</p>
            <div className="flex items-center justify-end">
              <span className="text-xs font-semibold text-white/30 group-hover:text-white/60 transition-colors">
                자세히 보기 →
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true, margin: '-100px' });

  return (
    <section id="menu" className="relative py-28 md:py-36" style={{ background: '#0d0704' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-14">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-xs font-bold text-brand-gold tracking-[0.3em] uppercase"
        >
          Signature Menu
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-brand-cream mt-4"
        >
          시그니처 메뉴
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-brand-cream-dark/60 mt-3 text-lg"
        >
          드래그하여 메뉴를 탐색하세요
        </motion.p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-10 pb-8 snap-x snap-mandatory
                   scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
        style={{ cursor: 'grab' }}
        onMouseDown={(e) => {
          const el = e.currentTarget;
          el.style.cursor = 'grabbing';
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;
          const handleMove = (ev: MouseEvent) => {
            const x = ev.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX) * 1.5;
          };
          const handleUp = () => {
            el.style.cursor = 'grab';
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
          };
          document.addEventListener('mousemove', handleMove);
          document.addEventListener('mouseup', handleUp);
        }}
      >
        {MENU_ITEMS.map((item, i) => (
          <MenuCard key={i} item={item} index={i} />
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  );
}
