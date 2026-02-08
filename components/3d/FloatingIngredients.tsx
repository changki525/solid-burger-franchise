'use client';

const INGREDIENTS = [
  { src: '/images/brand/tomato.svg', size: 80, x: 10, y: 20, duration: 6, rotate: 15 },
  { src: '/images/brand/lettuce.svg', size: 90, x: 80, y: 15, duration: 8, rotate: -20 },
  { src: '/images/brand/patty.svg', size: 75, x: 25, y: 70, duration: 7, rotate: 10 },
  { src: '/images/brand/tomato.svg', size: 60, x: 70, y: 65, duration: 5, rotate: -12 },
  { src: '/images/brand/lettuce.svg', size: 55, x: 50, y: 40, duration: 9, rotate: 25 },
  { src: '/images/brand/patty.svg', size: 50, x: 90, y: 45, duration: 7, rotate: -8 },
];

export default function FloatingIngredients() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {INGREDIENTS.map((item, i) => (
        <div
          key={i}
          className="absolute opacity-20"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animation: `floatIngredient ${item.duration}s ease-in-out ${i * 0.5}s infinite`,
            transform: `rotate(${item.rotate}deg)`,
          }}
        >
          <img src={item.src} alt="" className="w-full h-full object-contain" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
