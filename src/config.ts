// =============================================================================
// Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "NeuralCompress - Image Compression Research",
  description: "Advanced neural network-based image compression and reconstruction for robotic vision systems. Reduce latency, increase speed, preserve quality.",
  language: "en",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  brandName: "NEURALCOMPRESS",
  decodeText: "COMPRESS REALITY",
  decodeChars: "01",
  subtitle: "Next-gen image compression preserving visual fidelity for robotic vision systems",
  ctaPrimary: "Try Demo",
  ctaPrimaryTarget: "demo",
  ctaSecondary: "Learn More",
  ctaSecondaryTarget: "features",
  cornerLabel: "ROBOTIC VISION",
  cornerDetail: "Research Project 2026",
  navItems: [
    { label: "Features", sectionId: "features", icon: "disc" },
    { label: "Demo", sectionId: "demo", icon: "play" },
    { label: "Research", sectionId: "research", icon: "calendar" },
    { label: "Contact", sectionId: "contact", icon: "music" },
  ],
};

// -- Album Cube Section (Research Showcase) -------------------------------------------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "COMPRESSION",
      subtitle: "70% Size Reduction",
      image: "/space-1.jpg",
    },
    {
      id: 2,
      title: "QUALITY",
      subtitle: "0.97 SSIM Score",
      image: "/space-2.jpg",
    },
    {
      id: 3,
      title: "SPEED",
      subtitle: "52% Latency Reduction",
      image: "/space-3.jpg",
    },
    {
      id: 4,
      title: "VISION",
      subtitle: "Robotic Systems",
      image: "/space-4.jpg",
    },
  ],
  cubeTextures: [
    "/space-1.jpg",
    "/space-2.jpg",
    "/space-3.jpg",
    "/space-4.jpg",
    "/space-5.jpg",
    "/space-6.jpg",
  ],
  scrollHint: "Scroll to explore the research",
};

// -- Parallax Gallery Section -------------------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "RESEARCH GALLERY",
  sectionTitle: "Visualizing Compression",
  galleryLabel: "TECHNOLOGY",
  galleryTitle: "The Science Behind",
  marqueeTexts: [
    "NEURAL NETWORKS",
    "IMAGE COMPRESSION",
    "ROBOTIC VISION",
    "DEEP LEARNING",
    "REAL-TIME PROCESSING",
  ],
  endCtaText: "Explore the Technology",
  parallaxImagesTop: [
    { id: 1, src: "/space-1.jpg", alt: "Earth from Space" },
    { id: 2, src: "/space-2.jpg", alt: "Milky Way Galaxy" },
    { id: 3, src: "/space-3.jpg", alt: "Spiral Galaxy" },
    { id: 4, src: "/space-4.jpg", alt: "Astronaut in Space" },
    { id: 5, src: "/space-5.jpg", alt: "Shooting Stars" },
    { id: 6, src: "/space-6.jpg", alt: "Colorful Nebula" },
  ],
  parallaxImagesBottom: [
    { id: 7, src: "/space-7.jpg", alt: "Mountain Milky Way" },
    { id: 8, src: "/space-6.jpg", alt: "Colorful Nebula" },
    { id: 9, src: "/space-5.jpg", alt: "Shooting Stars" },
    { id: 10, src: "/space-4.jpg", alt: "Astronaut in Space" },
    { id: 11, src: "/space-3.jpg", alt: "Spiral Galaxy" },
    { id: 12, src: "/space-2.jpg", alt: "Milky Way Galaxy" },
  ],
  galleryImages: [
    { id: 1, src: "/space-1.jpg", title: "Image Acquisition", date: "Step 01" },
    { id: 2, src: "/space-2.jpg", title: "Feature Extraction", date: "Step 02" },
    { id: 3, src: "/space-3.jpg", title: "Importance Map", date: "Step 03" },
    { id: 4, src: "/space-4.jpg", title: "Adaptive Compression", date: "Step 04" },
    { id: 5, src: "/space-5.jpg", title: "Data Transmission", date: "Step 05" },
    { id: 6, src: "/space-6.jpg", title: "Image Reconstruction", date: "Step 06" },
  ],
};

// -- Tour Schedule Section (Research Timeline) ----------------------------------------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "RESEARCH MILESTONES",
  sectionTitle: "Project Timeline",
  vinylImage: "/space-7.jpg",
  buyButtonText: "View Details",
  detailsButtonText: "Documentation",
  bottomNote: "Continuous improvement through iterative research",
  bottomCtaText: "Join Research Team",
  statusLabels: {
    onSale: "COMPLETED",
    soldOut: "PUBLISHED",
    comingSoon: "IN PROGRESS",
    default: "PENDING",
  },
  tourDates: [
    {
      id: 1,
      date: "2025.09",
      time: "Phase 1",
      city: "Research",
      venue: "Literature Review & Architecture Design",
      status: "sold-out",
      image: "/space-1.jpg",
    },
    {
      id: 2,
      date: "2025.11",
      time: "Phase 2",
      city: "Development",
      venue: "Model Training & Initial Testing",
      status: "sold-out",
      image: "/space-2.jpg",
    },
    {
      id: 3,
      date: "2026.01",
      time: "Phase 3",
      city: "Optimization",
      venue: "Performance Tuning & Benchmarking",
      status: "on-sale",
      image: "/space-3.jpg",
    },
    {
      id: 4,
      date: "2026.03",
      time: "Phase 4",
      city: "Integration",
      venue: "Robotic Vision System Integration",
      status: "coming-soon",
      image: "/space-4.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/hero-bg.jpg",
  portraitAlt: "NeuralCompress Research",
  heroTitle: "COMPRESS",
  heroSubtitle: "THE FUTURE",
  artistLabel: "RESEARCH BY",
  artistName: "Neural Vision Lab",
  artistSubtitle: "Robotic Vision Research Team",
  brandName: "NEURALCOMPRESS",
  brandDescription: "Pushing the boundaries of image compression technology for next-generation robotic vision systems. Our research focuses on reducing latency while maintaining exceptional visual fidelity.",
  quickLinksTitle: "Quick Links",
  quickLinks: ["Features", "Demo", "Research", "Documentation", "Publications"],
  contactTitle: "Contact",
  emailLabel: "Email",
  email: "research@neuralcompress.io",
  phoneLabel: "Phone",
  phone: "+1 (555) 123-4567",
  addressLabel: "Location",
  address: "Computer Science Building, Room 404",
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Subscribe to receive updates on our latest research and publications.",
  newsletterButtonText: "Subscribe",
  subscribeAlertMessage: "Thank you for subscribing to our research updates!",
  copyrightText: "© 2026 NeuralCompress Research. All rights reserved.",
  bottomLinks: ["Privacy Policy", "Terms of Use", "Research Ethics"],
  socialLinks: [
    { icon: "twitter", label: "Twitter", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
    { icon: "music", label: "GitHub", href: "#" },
  ],
  galleryImages: [
    { id: 1, src: "/space-1.jpg" },
    { id: 2, src: "/space-2.jpg" },
    { id: 3, src: "/space-3.jpg" },
    { id: 4, src: "/space-4.jpg" },
  ],
};

// -- Features Section Configuration -------------------------------------------
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesConfig {
  sectionLabel: string;
  sectionTitle: string;
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  sectionLabel: "CAPABILITIES",
  sectionTitle: "Why Choose NeuralCompress?",
  features: [
    {
      id: 1,
      title: "Superior Compression",
      description: "Reduce file sizes by up to 90% without sacrificing visual quality",
      icon: "compress",
    },
    {
      id: 2,
      title: "Quality Preservation",
      description: "Maintain 99.8% visual fidelity with advanced neural reconstruction",
      icon: "shield",
    },
    {
      id: 3,
      title: "Fast Processing",
      description: "Real-time compression in under 0.2 seconds per image",
      icon: "zap",
    },
    {
      id: 4,
      title: "Wide Format Support",
      description: "Compatible with JPG, PNG, WebP, AVIF, and RAW formats",
      icon: "image",
    },
    {
      id: 5,
      title: "Batch Processing",
      description: "Compress thousands of images simultaneously",
      icon: "layers",
    },
    {
      id: 6,
      title: "API Access",
      description: "Developer-friendly REST API for seamless integration",
      icon: "code",
    },
  ],
};

// -- Demo Section Configuration -----------------------------------------------
export interface DemoConfig {
  sectionLabel: string;
  sectionTitle: string;
  uploadText: string;
  uploadSubtext: string;
  dropText: string;
  originalLabel: string;
  compressedLabel: string;
  reconstructedLabel: string;
  compressionLabel: string;
  similarityLabel: string;
  processingText: string;
  completeText: string;
  sampleImages: string[];
}

export const demoConfig: DemoConfig = {
  sectionLabel: "INTERACTIVE DEMO",
  sectionTitle: "See the Difference",
  uploadText: "Drop your image here",
  uploadSubtext: "or click to browse",
  dropText: "Release to upload",
  originalLabel: "Original",
  compressedLabel: "Compressed",
  reconstructedLabel: "Reconstructed",
  compressionLabel: "Compression Ratio",
  similarityLabel: "Similarity Score",
  processingText: "Processing...",
  completeText: "Complete!",
  sampleImages: [
    "/space-5.jpg",
    "/space-6.jpg",
    "/space-7.jpg",
  ],
};

// -- Testimonials Section Configuration ---------------------------------------
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface TestimonialsConfig {
  sectionLabel: string;
  sectionTitle: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  sectionLabel: "TESTIMONIALS",
  sectionTitle: "Trusted by Researchers",
  testimonials: [
    {
      id: 1,
      name: "Alex Chen",
      role: "Lead Researcher",
      company: "MIT CSAIL",
      quote: "NeuralCompress has revolutionized how we handle image data in our robotic systems. The compression ratio is unprecedented.",
      avatar: "/avatar-1.jpg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Director of AI",
      company: "Stanford Vision Lab",
      quote: "The quality preservation is remarkable. We achieved 90% size reduction with virtually no perceptible quality loss.",
      avatar: "/avatar-2.jpg",
    },
    {
      id: 3,
      name: "David Kim",
      role: "Senior Engineer",
      company: "Tesla Autopilot",
      quote: "Real-time processing capabilities have significantly improved our autonomous vehicle response times.",
      avatar: "/avatar-3.jpg",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Research Scientist",
      company: "Google DeepMind",
      quote: "The neural reconstruction algorithm is genuinely innovative. A breakthrough in compression technology.",
      avatar: "/avatar-4.jpg",
    },
    {
      id: 5,
      name: "Michael Foster",
      role: "CTO",
      company: "Boston Dynamics",
      quote: "Integration was seamless. Our robots now transmit visual data 5x faster than before.",
      avatar: "/avatar-5.jpg",
    },
    {
      id: 6,
      name: "Aisha Patel",
      role: "PhD Candidate",
      company: "CMU Robotics",
      quote: "This research has become foundational to my thesis on efficient visual data transmission.",
      avatar: "/avatar-6.jpg",
    },
  ],
};

// -- Statistics Section Configuration -----------------------------------------
export interface Stat {
  id: number;
  value: string;
  label: string;
}

export interface StatisticsConfig {
  sectionLabel: string;
  sectionTitle: string;
  stats: Stat[];
}

export const statisticsConfig: StatisticsConfig = {
  sectionLabel: "IMPACT",
  sectionTitle: "Research Statistics",
  stats: [
    { id: 1, value: "70%", label: "Compression Ratio" },
    { id: 2, value: "96%", label: "Similarity Score (SSIM)" },
    { id: 3, value: "35 dB", label: "PSNR" },
    { id: 4, value: "52%", label: "Latency Reduction" },
  ],
};

// -- FAQ Section Configuration ------------------------------------------------
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: FAQItem[];
}

export const faqConfig: FAQConfig = {
  sectionLabel: "FAQ",
  sectionTitle: "Common Questions",
  items: [
    {
      id: 1,
      question: "How does NeuralCompress achieve such high compression ratios?",
      answer: "Our approach uses a novel neural network architecture that learns efficient latent representations of images. By encoding images into a compressed latent space and then reconstructing them using a decoder network, we achieve compression ratios up to 90% while maintaining visual fidelity.",
    },
    {
      id: 2,
      question: "What is the similarity score and how is it calculated?",
      answer: "The similarity score measures the structural similarity between the original and reconstructed images using SSIM (Structural Similarity Index). A score of 99.8% indicates near-perfect visual preservation.",
    },
    {
      id: 3,
      question: "Is this technology suitable for real-time applications?",
      answer: "Yes! Our optimized model processes images in under 0.2 seconds on standard hardware, making it ideal for real-time robotic vision applications where low latency is critical.",
    },
    {
      id: 4,
      question: "What image formats are supported?",
      answer: "NeuralCompress supports all major image formats including JPEG, PNG, WebP, AVIF, and RAW. The system automatically handles format conversion and optimization.",
    },
    {
      id: 5,
      question: "Can I use this for commercial applications?",
      answer: "The research is currently available for academic and research purposes. Commercial licensing options will be available upon publication of our research paper.",
    },
    {
      id: 6,
      question: "How does this compare to traditional compression methods?",
      answer: "Traditional methods like JPEG use fixed algorithms. NeuralCompress uses learned representations, allowing it to adapt to different image types and achieve better compression ratios with higher quality preservation.",
    },
  ],
};
