import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
    .fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      "-=0.4"
    )
    .fromTo(
      subRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.8"
    );

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] -z-10" />

      <div ref={badgeRef} className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
        <span className="text-sm font-medium tracking-wide text-indigo-300 uppercase">Next Generation Agency</span>
      </div>

      <h1 
        ref={headingRef} 
        className="text-[12vw] md:text-[8rem] leading-[0.9] font-bold text-center tracking-tighter mix-blend-difference text-white max-w-5xl mx-auto"
      >
        ELEVATE <br /> REALITY
      </h1>

      <p 
        ref={subRef} 
        className="mt-8 text-xl md:text-2xl text-zinc-400 max-w-2xl text-center leading-relaxed font-light"
      >
        We craft digital experiences that blur the line between the virtual and the tangible. Precision engineering meets cinematic design.
      </p>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};