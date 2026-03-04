import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    // Animate navbar in after a slight delay
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Use globally exposed Lenis instance if available, otherwise fallback to native
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-white/5 bg-background/80 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
          <div className="h-4 w-4 bg-black rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-tighter">AGENCY</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            onClick={(e) => handleScroll(e, link.href)}
            className="hover:text-white transition-colors duration-300"
          >
            {link.name}
          </a>
        ))}
        <button 
            onClick={(e) => {
                const contact = document.getElementById('contact');
                if(contact && (window as any).lenis) (window as any).lenis.scrollTo(contact);
            }}
            className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
        >
          Start Project
        </button>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)} 
              className="text-lg font-medium text-zinc-300 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};