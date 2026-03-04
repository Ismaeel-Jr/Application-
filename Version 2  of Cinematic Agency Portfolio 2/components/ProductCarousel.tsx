import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ProductCarouselProps {
    id?: string;
}

const products = [
  {
    id: 1,
    category: "Hardware",
    title: "Neuro-Core V1",
    description: "The world's first biological processing unit designed for consumer-grade synthesis. Experience zero-latency computing.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Interface",
    title: "Haptic Suit Pro",
    description: "Full-body sensory immersion. Feel the digital wind, the weight of data, and the texture of code in real-time.",
    image: "https://images.unsplash.com/photo-1535378437327-b71280637040?q=80&w=2076&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Robotics",
    title: "Sentinel Drone",
    description: "Silent, efficient, and omnipresent. The ultimate tool for aerial data acquisition and environmental monitoring.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop"
  }
];

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs for animation targets
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Initial setup: Ensure only first slide is visible and set Z-indices
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, { 
          autoAlpha: index === 0 ? 1 : 0,
          zIndex: index === 0 ? 10 : 0,
          clipPath: 'none' // Reset any clips
        });
      }
    });
  }, []);

  const goToSlide = (index: number, direction: 'next' | 'prev' = 'next') => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);

    const nextIndex = (index + products.length) % products.length;
    
    const currentSlide = slideRefs.current[currentIndex];
    const nextSlide = slideRefs.current[nextIndex];
    
    const currentText = textRefs.current[currentIndex];
    const nextText = textRefs.current[nextIndex];

    const currentImage = imageRefs.current[currentIndex];
    const nextImage = imageRefs.current[nextIndex];

    if (!currentSlide || !nextSlide || !currentText || !nextText || !currentImage || !nextImage) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
        // Clean up outgoing slide
        gsap.set(currentSlide, { autoAlpha: 0, zIndex: 0, clipPath: 'none' });
      }
    });

    // 1. Setup Z-Index to ensure next slide is on top
    gsap.set(nextSlide, { autoAlpha: 1, zIndex: 20 });
    gsap.set(currentSlide, { zIndex: 10 });

    // 2. Define Clip Path Wipes (Cinematic Curtain Effect)
    // Next: Wipe from Right to Left | Prev: Wipe from Left to Right
    const clipRight = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
    const clipLeft = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
    const clipFull = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    const initialClip = direction === 'next' ? clipRight : clipLeft;
    
    gsap.set(nextSlide, { clipPath: initialClip });

    // 3. Animate Outgoing Slide (Text Fade Out + Image Parallax)
    const currentElements = Array.from(currentText.children);
    tl.to(currentElements, { 
      y: -30, 
      opacity: 0, 
      stagger: 0.05, 
      duration: 0.5, 
      ease: "power2.in" 
    }, 0);
    
    tl.to(currentImage, { 
        scale: 1.1, 
        filter: "brightness(0.4)", // Dim it down as it leaves
        duration: 1.2, 
        ease: "power2.out" 
    }, 0);

    // 4. Animate Incoming Slide (Wipe In + Image Scale Down)
    tl.to(nextSlide, {
        clipPath: clipFull,
        duration: 1.2,
        ease: "power4.inOut" // Smooth, dramatic easing
    }, 0);

    // Image scales down from 1.3 to 1 for a subtle "zoom out" feel
    gsap.set(nextImage, { scale: 1.3, filter: "brightness(1)" });
    tl.to(nextImage, {
        scale: 1,
        duration: 1.6,
        ease: "power2.out"
    }, 0);

    // 5. Animate Incoming Text (Stagger In from bottom)
    const nextElements = Array.from(nextText.children);
    gsap.set(nextElements, { y: 60, opacity: 0 }); // Reset positions
    
    tl.to(nextElements, { 
      y: 0, 
      opacity: 1, 
      stagger: 0.1, 
      duration: 1, 
      ease: "power3.out" 
    }, 0.5); // Start halfway through the wipe
  };

  const next = () => goToSlide(currentIndex + 1, 'next');
  const prev = () => goToSlide(currentIndex - 1, 'prev');
  
  const goToIndex = (idx: number) => {
    if (idx === currentIndex) return;
    const direction = idx > currentIndex ? 'next' : 'prev';
    goToSlide(idx, direction);
  };

  return (
    <section id={id} className="relative h-[90vh] w-full overflow-hidden bg-zinc-950 border-y border-white/5 scroll-mt-20">
        {products.map((product, index) => (
            <div 
                key={product.id}
                ref={el => { slideRefs.current[index] = el; }}
                className="absolute inset-0 w-full h-full"
            >
                {/* Image Background */}
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img 
                    ref={el => { imageRefs.current[index] = el; }}
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center px-6 md:px-24">
                   <div ref={el => { textRefs.current[index] = el; }} className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-[1px] w-12 bg-indigo-500"></span>
                            <span className="text-indigo-400 font-medium tracking-widest uppercase text-sm">{product.category}</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
                            {product.title}
                        </h2>
                        <p className="text-xl text-zinc-300 max-w-lg mb-10 leading-relaxed font-light">
                            {product.description}
                        </p>
                        <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all duration-300">
                            View Specs
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                        </button>
                   </div>
                </div>
            </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute bottom-12 right-6 md:right-24 z-30 flex gap-4">
            <button 
                onClick={prev} 
                className="p-4 rounded-full border border-white/10 bg-black/40 hover:bg-white hover:text-black transition-all duration-300 text-white backdrop-blur-md group"
            >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
                onClick={next} 
                className="p-4 rounded-full border border-white/10 bg-black/40 hover:bg-white hover:text-black transition-all duration-300 text-white backdrop-blur-md group"
            >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-12 left-6 md:left-24 z-30 flex gap-3">
            {products.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => goToIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-16 bg-white' : 'w-4 bg-white/20 hover:bg-white/50'}`}
                />
            ))}
        </div>
    </section>
  )
};