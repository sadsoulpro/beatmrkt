import React from 'react';
import { Search, Command } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-2xl">
        Your Hits <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-purple-300">Start Here</span>
      </h1>
      <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-10 max-w-2xl drop-shadow-sm">
        Premium beats for the modern creator. Curated quality. Instant delivery.
      </p>

      {/* Large Hero Search */}
      <div className="w-full max-w-xl md:max-w-2xl relative group z-10">
         {/* Animated Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon/30 to-purple-500/30 rounded-full opacity-30 group-hover:opacity-100 blur transition duration-500"></div>
        
        <div className="relative flex items-center bg-[#0A0A0B] border border-white/10 backdrop-blur-xl rounded-full px-4 py-3 md:px-6 md:py-4 shadow-2xl transition-all focus-within:border-neon/50 focus-within:bg-surface/50">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-500 mr-3 md:mr-4 group-focus-within:text-neon transition-colors" />
            <input
                type="text"
                placeholder="Search for genres, moods..."
                className="bg-transparent border-none outline-none text-sm md:text-lg text-white w-full placeholder-gray-500 font-medium"
            />
            <div className="hidden sm:flex items-center gap-2 text-gray-500">
               <span className="text-xs font-mono border border-white/10 bg-white/5 px-2 py-1 rounded-md flex items-center gap-1">
                 <Command className="w-3 h-3" /> K
               </span>
            </div>
        </div>
      </div>
    </section>
  );
};