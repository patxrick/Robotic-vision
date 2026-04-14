import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsConfig } from '../config';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Floating animation for each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Initial entrance animation
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Continuous floating animation
        const duration = 3 + Math.random() * 2;
        const yOffset = 10 + Math.random() * 10;
        const xOffset = 5 + Math.random() * 5;
        
        gsap.to(card, {
          y: `+=${yOffset}`,
          x: `+=${xOffset}`,
          duration: duration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050505 100%)',
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            {testimonialsConfig.sectionLabel}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {testimonialsConfig.sectionTitle}
          </h2>
        </div>

        {/* Testimonials Cloud */}
        <div className="relative min-h-[600px]">
          {testimonialsConfig.testimonials.map((testimonial, index) => {
            // Calculate scattered positions
            const positions = [
              { left: '5%', top: '5%' },
              { right: '5%', top: '10%' },
              { left: '15%', top: '45%' },
              { right: '10%', top: '40%' },
              { left: '5%', top: '65%' },
              { right: '15%', top: '70%' },
            ];
            const pos = positions[index % positions.length];
            const scale = 0.9 + Math.random() * 0.2;
            
            return (
              <div
                key={testimonial.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`absolute w-full max-w-md transition-all duration-500 cursor-pointer ${
                  hoveredId === testimonial.id ? 'z-20' : 'z-10'
                }`}
                style={{
                  ...pos,
                  transform: `scale(${hoveredId === testimonial.id ? 1.05 : scale})`,
                }}
                onMouseEnter={() => setHoveredId(testimonial.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 ${
                    hoveredId === testimonial.id
                      ? 'border-cyan-400/50 bg-white/10 shadow-[0_0_40px_rgba(0,240,255,0.2)]'
                      : 'border-white/10 bg-white/[0.03]'
                  } ${hoveredId !== null && hoveredId !== testimonial.id ? 'opacity-50' : 'opacity-100'}`}
                >
                  {/* Quote icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-400/20" />

                  {/* Content */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 pr-8">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
