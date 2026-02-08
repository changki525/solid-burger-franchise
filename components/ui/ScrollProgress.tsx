'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-[72px] left-0 right-0 h-[2px] z-[999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #C8963E, #E0B060, #F0D080, #E0B060, #C8963E)',
        opacity: visible ? 1 : 0,
        boxShadow: '0 0 12px rgba(200,150,62,0.5)',
      }}
    />
  );
}
