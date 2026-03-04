import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SectionWrapper } from './SectionWrapper';

interface VisualSectionProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  alignment: 'left' | 'right';
}

export const VisualSection: React.FC<VisualSectionProps> = ({ id, title, description, image, alignment }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || !containerRef.current) return;

    // Parallax effect on image
    gsap.fromTo(imgRef.current, 
      { scale: 1.1 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <section id={id} ref={containerRef} className="py-24 md:py-48 px-6 md:px-12 overflow-hidden scroll-mt-20">
      <div className={`max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center ${alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
        
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay z-10" />
            <img 
              ref={imgRef}
              src={image} 
              alt={title} 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <SectionWrapper>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-md">
              {description}
            </p>
            <div className="mt-10">
              <button className="group flex items-center gap-2 text-white border-b border-white pb-1 hover:text-indigo-300 hover:border-indigo-300 transition-all duration-300">
                Learn More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </SectionWrapper>
        </div>

      </div>
    </section>
  );
};