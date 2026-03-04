import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VisualSection } from './components/VisualSection';
import { ProductCarousel } from './components/ProductCarousel';
import { Footer } from './components/Footer';
import { CallToAction } from './components/CallToAction';

// Register GSAP plugin globally
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Expose lenis to window for Navbar access
    (window as any).lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VisualSection 
          id="about"
          title="Engineered for Performance"
          description="We build digital experiences that are not only visually stunning but also technically flawless. Every frame is calculated, every interaction is intentional."
          alignment="left"
          image="https://picsum.photos/1920/1080?grayscale&blur=2"
        />
        <ProductCarousel id="work" />
        <Features id="services" />
        <VisualSection 
          title="Global Infrastructure"
          description="Our systems scale effortlessly across the globe. Low latency, high availability, and edge-computed rendering ensure your message reaches everyone, instantly."
          alignment="right"
          image="https://picsum.photos/1920/1080?grayscale"
        />
        <CallToAction id="contact" />
      </main>
      <Footer />
    </div>
  );
};

export default App;