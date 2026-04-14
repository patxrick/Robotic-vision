import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ticket, ArrowRight, Image, Cpu, Map, Zap, Radio, RefreshCw } from 'lucide-react';
import { parallaxGalleryConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Technology cards data
const technologyCards = [
  {
    id: 1,
    title: "Image Acquisition",
    description: "The system begins by receiving a high-resolution input image that needs to be transmitted efficiently while maintaining visual quality.",
    icon: Image,
  },
  {
    id: 2,
    title: "Neural Feature Encoder",
    description: "A deep neural encoder analyzes the image and extracts compact latent features representing the important visual structures and patterns.",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Importance Map Generation",
    description: "The model generates an importance map that identifies critical regions of the image, ensuring important details receive higher priority during compression.",
    icon: Map,
  },
  {
    id: 4,
    title: "Importance-Guided Compression",
    description: "The compression algorithm allocates more bits to important regions and fewer bits to less relevant areas, reducing data size while preserving key visual information.",
    icon: Zap,
  },
  {
    id: 5,
    title: "Low-Latency Data Transmission",
    description: "The compressed image representation significantly reduces bandwidth requirements, enabling faster data transfer and lower transmission latency.",
    icon: Radio,
  },
  {
    id: 6,
    title: "Neural Image Reconstruction",
    description: "A neural decoder reconstructs the compressed representation into a high-quality image that closely matches the original visual appearance.",
    icon: RefreshCw,
  },
];

const ParallaxGallery = () => {
  // Null check: if config is empty, do not render
  if (
    parallaxGalleryConfig.parallaxImagesTop.length === 0 &&
    parallaxGalleryConfig.galleryImages.length === 0 &&
    !parallaxGalleryConfig.sectionTitle
  ) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax strips animation
      if (topRowRef.current && bottomRowRef.current) {
        const st1 = ScrollTrigger.create({
          trigger: parallaxContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (topRowRef.current) {
              gsap.set(topRowRef.current, {
                x: -progress * 300,
              });
            }
            if (bottomRowRef.current) {
              gsap.set(bottomRowRef.current, {
                x: progress * 300 - 150,
              });
            }
          },
        });
        scrollTriggerRefs.current.push(st1);
      }

      // Horizontal gallery scroll
      if (galleryRef.current && galleryTrackRef.current) {
        const trackWidth = galleryTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;

        const st2 = ScrollTrigger.create({
          trigger: galleryRef.current,
          start: 'top top',
          end: () => `+=${trackWidth - viewportWidth}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (galleryTrackRef.current) {
              const x = -self.progress * (trackWidth - viewportWidth);
              gsap.set(galleryTrackRef.current, { x });
            }
          },
        });
        scrollTriggerRefs.current.push(st2);
      }

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.tech-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
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
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRefs.current.forEach(st => st.kill());
      scrollTriggerRefs.current = [];
    };
  }, []);

  const scrollToTour = () => {
    const tourSection = document.getElementById('tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-void-black"
    >
      {/* Parallax Strips Section */}
      <div
        ref={parallaxContainerRef}
        className="relative py-20 overflow-hidden"
      >
        {/* Section header */}
        <div className="px-12 mb-12">
          <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
            {parallaxGalleryConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            {parallaxGalleryConfig.sectionTitle}
          </h2>
        </div>

        {/* Top row - moves left */}
        <div
          ref={topRowRef}
          className="flex gap-4 mb-4 will-change-transform"
        >
          {parallaxGalleryConfig.parallaxImagesTop.map((image) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Bottom row - moves right */}
        <div
          ref={bottomRowRef}
          className="flex gap-4 will-change-transform"
          style={{ transform: 'translateX(-150px)' }}
        >
          {parallaxGalleryConfig.parallaxImagesBottom.map((image) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative py-8 bg-void-dark overflow-hidden border-y border-white/5">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-8 mx-8 text-2xl font-display text-white/20"
            >
              {parallaxGalleryConfig.marqueeTexts.map((text, j) => (
                <span key={j}>{text}</span>
              ))}
              <Ticket className="w-6 h-6" />
              <ArrowRight className="w-6 h-6" />
            </span>
          ))}
        </div>
      </div>

      {/* Technology Cards Section */}
      <div ref={cardsRef} className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            {parallaxGalleryConfig.galleryLabel}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {parallaxGalleryConfig.galleryTitle}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {technologyCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="tech-card group relative"
              >
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm h-full transition-all duration-500 ease-out hover:border-cyan-400/50 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:-translate-y-2">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 via-purple-500/0 to-cyan-400/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  {/* Card number */}
                  <div className="absolute top-4 right-4 font-mono text-5xl font-bold text-white/5 group-hover:text-cyan-400/10 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

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
                    {card.title}
                  </h3>
                  <p className="relative text-gray-400 text-sm leading-relaxed">
                    {card.description}
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

      {/* Horizontal Gallery Section - Image Strip */}
      <div
        ref={galleryRef}
        className="relative h-screen overflow-hidden"
      >
        {/* Gallery header */}
        <div className="absolute top-12 left-12 z-20">
          <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
            PROCESS FLOW
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Visual Journey
          </h2>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={galleryTrackRef}
          className="flex items-center gap-8 h-full px-12 pt-24 will-change-transform"
        >
          {parallaxGalleryConfig.galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 group cursor-pointer"
              style={{ marginTop: index % 2 === 0 ? '0' : '60px' }}
            >
              <div className="relative w-[450px] h-[300px] overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent" />

                {/* Image info */}
                <div className="absolute bottom-6 left-6">
                  <p className="font-mono-custom text-xs text-neon-soft/80 mb-1">
                    {image.date}
                  </p>
                  <h3 className="font-display text-2xl text-white">
                    {image.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 transition-colors duration-300" />
              </div>

              {/* Index number */}
              <div className="absolute -top-8 -left-4 font-mono-custom text-7xl text-white/5 font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}

          {/* End CTA */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-[300px] h-[300px]">
            <button
              onClick={scrollToTour}
              className="group flex flex-col items-center gap-4 text-white hover:text-neon-cyan transition-colors"
            >
              <div className="w-20 h-20 rounded-full border border-white/20 group-hover:border-neon-cyan flex items-center justify-center transition-colors">
                <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-display text-lg uppercase tracking-wider">
                {parallaxGalleryConfig.endCtaText}
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-12 left-12 right-12 h-px bg-white/10">
          <div className="h-full bg-neon-cyan/50 w-0" id="gallery-progress" />
        </div>
      </div>
    </section>
  );
};

export default ParallaxGallery;
