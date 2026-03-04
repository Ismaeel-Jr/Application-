import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface CallToActionProps {
    id?: string;
}

export const CallToAction: React.FC<CallToActionProps> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Reveal animation
    gsap.fromTo(textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id={id} ref={containerRef} className="py-48 px-6 flex justify-center items-center bg-zinc-950 border-t border-white/5 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/20 pointer-events-none" />
      
      <div className="text-center max-w-4xl relative z-10">
        <h2 ref={textRef} className="text-5xl md:text-8xl font-bold tracking-tighter mb-10">
          Ready to disrupt?
        </h2>
        <button className="px-10 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-zinc-200 hover:scale-105 transition-all duration-300">
          Get in Touch
        </button>
      </div>
    </section>
  );
};