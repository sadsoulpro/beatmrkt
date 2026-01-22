import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already accepted
    const consent = localStorage.getItem('beatwave_cookie_consent');
    
    // If not found, show banner after a short delay for better UX
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('beatwave_cookie_consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // In a real app, you might set a flag to disable non-essential cookies
    localStorage.setItem('beatwave_cookie_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-96 animate-in slide-in-from-bottom-10 fade-in duration-700">
      <div className="relative bg-[#0A0A0B]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent opacity-50"></div>
        <div className="absolute -left-10 -top-10 w-20 h-20 bg-neon/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center flex-shrink-0">
               <Cookie className="w-5 h-5 text-neon" />
            </div>
            
            <div className="flex-grow">
               <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                 Cookie Protocol
                 <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neon/10 text-neon border border-neon/20">v1.0</span>
               </h3>
               <p className="text-gray-400 text-xs leading-relaxed font-mono mb-4">
                 We use cookies to enhance your sonic experience, analyze traffic flow, and ensure secure transactions.
               </p>

               <div className="flex items-center gap-3">
                 <button 
                   onClick={handleAccept}
                   className="flex-1 bg-neon text-black font-bold text-xs py-2 rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(118,100,221,0.3)]"
                 >
                   ACCEPT
                 </button>
                 <button 
                   onClick={handleDecline}
                   className="flex-1 bg-white/5 text-gray-400 font-bold text-xs py-2 rounded-lg border border-white/5 hover:bg-white/10 hover:text-white transition-all"
                 >
                   DECLINE
                 </button>
               </div>
            </div>

            <button 
                onClick={handleDecline} 
                className="text-gray-500 hover:text-white transition-colors -mt-1 -mr-1"
            >
                <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-gray-600 font-mono">
             <ShieldCheck className="w-3 h-3" />
             <span>Encrypted & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};