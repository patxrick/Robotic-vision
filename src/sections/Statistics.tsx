import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statisticsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate each stat number
      numbersRef.current.forEach((numEl, index) => {
        const stat = statisticsConfig.stats[index];
        const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
        const suffix = stat.value.replace(/[0-9.]/g, '');

        gsap.fromTo(
          { value: 0 },
          { value: numericValue },
          {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: numEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
              if (numEl) {
                const currentValue = Math.round(this.targets()[0].value * 10) / 10;
                numEl.textContent = currentValue + suffix;
              }
            },
          }
        );
      });

      // Stagger animation for stat cards
      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0f 50%, #050505 100%)',
      }}
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '-100%',
              right: '-100%',
              animation: `slideLine ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            {statisticsConfig.sectionLabel}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {statisticsConfig.sectionTitle}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statisticsConfig.stats.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => {
                if (el) statsRef.current[index] = el;
              }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center transition-all duration-500 hover:border-cyan-400/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-purple-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Number */}
                <div className="relative mb-4">
                  <span
                    ref={(el) => {
                      if (el) numbersRef.current[index] = el;
                    }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                  >
                    0
                  </span>
                </div>

                {/* Label */}
                <p className="relative text-gray-400 text-sm sm:text-base">{stat.label}</p>

                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
