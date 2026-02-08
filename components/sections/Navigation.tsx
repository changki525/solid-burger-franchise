'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: '브랜드', href: '#brand' },
  { label: '메뉴', href: '#menu' },
  { label: '경쟁력', href: '#franchise' },
  { label: '매장안내', href: '#stores' },
  { label: '가맹문의', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredBurger, setHoveredBurger] = useState(false);
  const burgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'glass shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-b border-brand-gold/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            data-cursor-hover
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {/* Logo Icon */}
            <div
              ref={burgerRef}
              className="relative w-10 h-10 preserve-3d transition-transform duration-500"
              style={{ transform: hoveredBurger ? 'rotateY(180deg) scale(1.1)' : 'rotateY(0)' }}
              onMouseEnter={() => setHoveredBurger(true)}
              onMouseLeave={() => setHoveredBurger(false)}
            >
              <img src="/images/logo.svg" alt="솔리드버거 로고" className="w-10 h-10" />
            </div>
            <div className="text-xl font-black tracking-tight">
              <span className="text-brand-cream">솔리드</span>
              <span className="text-gradient-gold">버거</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className="relative text-sm font-semibold text-brand-cream/70 hover:text-brand-cream
                           transition-colors duration-300 py-2 group"
                data-cursor-hover
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-gold
                               group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="px-5 py-2.5 bg-brand-gold text-brand-dark text-sm font-bold rounded-full
                         hover:bg-brand-gold-light transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,150,62,0.4)]"
              data-cursor-hover
            >
              가맹 상담
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴"
            data-cursor-hover
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-brand-cream rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-6 h-[2px] bg-brand-cream rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-brand-cream rounded-full origin-center"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-brand-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className="text-3xl font-bold text-brand-cream hover:text-brand-gold transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
