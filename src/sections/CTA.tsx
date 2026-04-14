import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pulsing background animation
      gsap.to(pulseRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #050505 100%)',
      }}
    >
      {/* Pulsing background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={pulseRef}
          className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-3xl"
        />
      </div>

      {/* Concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-cyan-400/10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              animation: `pulseRing ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div ref={contentRef}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Ready to optimize
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              your images?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience the future of image compression. Try our interactive demo and see the difference for yourself.
          </p>

          <button
            onClick={scrollToDemo}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-semibold text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,240,255,0.4)] hover:scale-105"
          >
            {/* Liquid fill effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            <span className="relative">Get Started Free</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="mt-6 text-sm text-gray-500">
            No signup required. Try the demo instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
