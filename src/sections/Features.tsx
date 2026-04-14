import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuresConfig } from '../config';
import { Minimize2, Shield, Zap, Image, Layers, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  compress: Minimize2,
  shield: Shield,
  zap: Zap,
  image: Image,
  layers: Layers,
  code: Code,
};

// Type-safe icon getter
const getIcon = (iconName: string): React.ElementType => {
  return iconMap[iconName] || Minimize2;
};

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="features"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 xl:px-12"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0f 50%, #050505 100%)',
      }}
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            {featuresConfig.sectionLabel}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {featuresConfig.sectionTitle}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuresConfig.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon) as React.ComponentType<{ className?: string }>;
            return (
              <div
                key={feature.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group relative"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm
                    transition-all duration-500 ease-out
                    hover:border-cyan-400/50 hover:bg-white/[0.05]
                    hover:shadow-[0_0_40px_rgba(0,240,255,0.15)]
                    hover:-translate-y-2"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 via-purple-500/0 to-cyan-400/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform duration-500">
                      <IconComponent className="w-7 h-7 text-cyan-400" />
                    </div>
                    {/* Animated ring */}
                    <div className="absolute inset-0 w-14 h-14 rounded-xl border border-cyan-400/30 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
