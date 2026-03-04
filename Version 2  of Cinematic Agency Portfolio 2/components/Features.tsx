import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionWrapper } from './SectionWrapper';
import { Cpu, Globe, Zap, Shield } from 'lucide-react';

interface FeaturesProps {
    id?: string;
}

const featureList = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI-Driven Core",
    desc: "Our systems leverage the latest in neural processing to optimize user pathways in real-time."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global CDN",
    desc: "Content delivered from the edge, ensuring millisecond latency regardless of user location."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant State",
    desc: "Optimistic UI updates and predictive pre-fetching make the interface feel instant."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and compliance standards built into every layer of the stack."
  }
];

export const Features: React.FC<FeaturesProps> = ({ id }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    const cards = gridRef.current.children;
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id={id} className="py-32 px-6 md:px-12 bg-black/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Technical Superiority
          </h2>
          <div className="h-1 w-24 bg-indigo-500" />
        </SectionWrapper>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((f, i) => (
            <div key={i} className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 rounded-2xl">
              <div className="mb-6 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};