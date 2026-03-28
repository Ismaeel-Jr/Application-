import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-black text-zinc-500 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-2 items-center">
          <div className="h-6 w-6 bg-zinc-800 rounded-full" />
          <span className="font-semibold text-zinc-300">AGENCY</span>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>

        <div>
          &copy; {new Date().getFullYear()} Cinematic Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
};