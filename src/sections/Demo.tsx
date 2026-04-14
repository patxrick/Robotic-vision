import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { demoConfig } from '../config';
import { Upload, Image as ImageIcon, RefreshCw, Check, Download, X, Minimize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessedImage {
  original: string;
  compressed: string;
  reconstructed: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  similarityScore: number;
}

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const uploadZoneRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [activeView, setActiveView] = useState<'original' | 'compressed' | 'reconstructed'>('original');
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        uploadZoneRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: uploadZoneRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Simulate image processing
  const processImage = useCallback((file: File) => {
    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const originalImage = e.target?.result as string;
      
      // Simulate processing delay
      setTimeout(() => {
        // Create a simulated compressed version (in real app, this would call the ML model)
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          // Simulate compression by reducing dimensions
          const scale = 0.3;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
          
          // Create reconstructed version (simulated - in real app would use the neural network)
          const reconCanvas = document.createElement('canvas');
          const reconCtx = reconCanvas.getContext('2d');
          if (!reconCtx) return;
          
          reconCanvas.width = img.width;
          reconCanvas.height = img.height;
          
          // Simulate reconstruction with some quality loss
          reconCtx.drawImage(img, 0, 0, reconCanvas.width, reconCanvas.height);
          
          // Add subtle noise to simulate reconstruction artifacts
          const imageData = reconCtx.getImageData(0, 0, reconCanvas.width, reconCanvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 8;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
          }
          reconCtx.putImageData(imageData, 0, 0);
          
          const reconstructedImage = reconCanvas.toDataURL('image/jpeg', 0.95);
          
          // Calculate sizes and metrics
          const originalSize = Math.round(file.size / 1024);
          const compressedSize = Math.round(originalSize * 0.15);
          const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100);
          const similarityScore = 98.7 + Math.random() * 0.8;
          
          setProcessedImage({
            original: originalImage,
            compressed: compressedImage,
            reconstructed: reconstructedImage,
            originalSize,
            compressedSize,
            compressionRatio,
            similarityScore: Math.round(similarityScore * 10) / 10,
          });
          
          setIsProcessing(false);
          
          // Animate results
          gsap.fromTo(
            resultsRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        };
        img.src = originalImage;
      }, 2000);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const loadSampleImage = useCallback((src: string) => {
    setIsProcessing(true);
    
    fetch(src)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'sample.jpg', { type: 'image/jpeg' });
        processImage(file);
      });
  }, [processImage]);

  const clearResults = useCallback(() => {
    setProcessedImage(null);
    setActiveView('original');
  }, []);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8 xl:px-12"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0f 100%)',
      }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/demo-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 border border-cyan-400/30 rounded-full">
            {demoConfig.sectionLabel}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {demoConfig.sectionTitle}
          </h2>
        </div>

        {/* Upload Zone */}
        {!processedImage && (
          <div
            ref={uploadZoneRef}
            className={`relative max-w-2xl mx-auto mb-12 transition-all duration-300 ${
              isDragging ? 'scale-105' : ''
            }`}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer
                ${isDragging 
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_60px_rgba(0,240,255,0.3)]' 
                  : 'border-white/20 bg-white/[0.02] hover:border-cyan-400/50 hover:bg-white/[0.05]'
                }`}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
              
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isDragging 
                    ? 'bg-cyan-400/30 scale-110' 
                    : 'bg-gradient-to-br from-cyan-400/20 to-purple-500/20'
                }`}>
                  {isProcessing ? (
                    <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
                  ) : (
                    <Upload className={`w-10 h-10 transition-colors duration-300 ${
                      isDragging ? 'text-cyan-300' : 'text-cyan-400'
                    }`} />
                  )}
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {isProcessing ? demoConfig.processingText : isDragging ? demoConfig.dropText : demoConfig.uploadText}
                </h3>
                <p className="text-gray-400">{demoConfig.uploadSubtext}</p>
              </div>

              {/* Animated border */}
              <div className={`absolute inset-0 rounded-3xl transition-opacity duration-300 ${
                isDragging ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Sample Images */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm mb-4">Or try a sample image:</p>
              <div className="flex justify-center gap-4">
                {demoConfig.sampleImages.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => loadSampleImage(src)}
                    className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                  >
                    <img src={src} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {processedImage && (
          <div ref={resultsRef} className="space-y-8">
            {/* Results Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{demoConfig.completeText}</span>
                </div>
              </div>
              <button
                onClick={clearResults}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                <X className="w-4 h-4" />
                <span className="text-sm">Upload New</span>
              </button>
            </div>

            {/* Image Viewer */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Viewer */}
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                  {/* View Tabs */}
                  <div className="absolute top-4 left-4 right-4 flex justify-center gap-2 z-10">
                    {(['original', 'compressed', 'reconstructed'] as const).map((view) => (
                      <button
                        key={view}
                        onClick={() => setActiveView(view)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          activeView === view
                            ? 'bg-cyan-400 text-black'
                            : 'bg-black/50 text-white hover:bg-white/10'
                        }`}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Image Display */}
                  <div className="relative aspect-video">
                    <img
                      src={processedImage[activeView]}
                      alt={activeView}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Comparison Slider for reconstructed view */}
                    {activeView === 'reconstructed' && (
                      <div className="absolute inset-0">
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                          <img
                            src={processedImage.original}
                            alt="Original"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Slider Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize"
                          style={{ left: `${sliderPosition}%` }}
                          onMouseDown={(_e) => {
                            const handleMouseMove = (e: MouseEvent) => {
                              const rect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
                              if (!rect) return;
                              const x = e.clientX - rect.left;
                              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                              setSliderPosition(percentage);
                            };
                            const handleMouseUp = () => {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                            };
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center shadow-lg">
                            <div className="flex gap-1">
                              <div className="w-0.5 h-3 bg-black/50" />
                              <div className="w-0.5 h-3 bg-black/50" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Labels */}
                        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs">
                          Original
                        </div>
                        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-cyan-400/70 text-black text-xs font-medium">
                          Reconstructed
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics Panel */}
              <div className="space-y-4">
                {/* Compression Ratio */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                      <Minimize2 className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-gray-400 text-sm">{demoConfig.compressionLabel}</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {processedImage.compressionRatio}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {processedImage.originalSize}KB → {processedImage.compressedSize}KB
                  </div>
                </div>

                {/* Similarity Score */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-gray-400 text-sm">{demoConfig.similarityLabel}</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {processedImage.similarityScore}%
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transition-all duration-1000"
                      style={{ width: `${processedImage.similarityScore}%` }}
                    />
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = processedImage.compressed;
                      link.download = 'compressed.jpg';
                      link.click();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download Compressed
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = processedImage.reconstructed;
                      link.download = 'reconstructed.jpg';
                      link.click();
                    }}
                    className="w-full py-3 px-4 rounded-xl border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all duration-300"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Download Reconstructed
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

