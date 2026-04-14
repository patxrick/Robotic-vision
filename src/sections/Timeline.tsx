import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden"
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
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(5px); opacity: 0.8; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            PROJECT SCHEDULE
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Development Timeline
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A 9-week journey from research to results, building the next generation of image compression technology
          </p>
        </div>

        {/* Timeline Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Duration', value: '9 Weeks', icon: Calendar },
            { label: 'Research Phase', value: 'Week 1', icon: Clock },
            { label: 'Development', value: 'Weeks 2-8', icon: Clock },
            { label: 'Integration', value: 'Week 9', icon: Clock },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center hover:border-cyan-400/30 transition-all duration-300"
            >
              <item.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline Image */}
        <div
          ref={imageRef}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-cyan-400/5 opacity-50" />
          
          {/* Image container */}
          <div className="relative p-4 sm:p-8">
            <img
              src="/project-timeline.png"
              alt="Project Timeline Gantt Chart"
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400/30 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30 rounded-br-2xl" />
        </div>

        {/* Phase descriptions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              phase: 'Phase 1',
              title: 'Research & Planning',
              weeks: 'Weeks 1-2',
              description: 'Literature review, architecture design, and dataset preparation strategy.',
            },
            {
              phase: 'Phase 2',
              title: 'Core Development',
              weeks: 'Weeks 3-6',
              description: 'Building the compression and reconstruction modules with neural networks.',
            },
            {
              phase: 'Phase 3',
              title: 'Integration & Results',
              weeks: 'Weeks 7-9',
              description: 'End-to-end integration, testing, and results comparison analysis.',
            },
          ].map((phase, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 rounded-full">
                  {phase.phase}
                </span>
                <span className="text-xs text-gray-500">{phase.weeks}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{phase.title}</h3>
              <p className="text-sm text-gray-400">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
