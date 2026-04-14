import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqConfig } from '../config';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
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

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 xl:px-12"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0f 100%)',
      }}
    >
      {/* Background gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-400/5 to-purple-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            {faqConfig.sectionLabel}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {faqConfig.sectionTitle}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqConfig.items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="group"
            >
              <div
                className={`rounded-2xl border transition-all duration-500 ${
                  openId === item.id
                    ? 'border-cyan-400/30 bg-white/[0.05]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-white pr-8">{item.question}</span>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      openId === item.id
                        ? 'border-cyan-400 bg-cyan-400/20 rotate-[135deg]'
                        : 'border-white/20 group-hover:border-cyan-400/50'
                    }`}
                  >
                    <Plus className={`w-5 h-5 transition-colors duration-300 ${
                      openId === item.id ? 'text-cyan-400' : 'text-gray-400'
                    }`} />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    openId === item.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
