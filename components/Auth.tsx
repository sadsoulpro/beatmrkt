import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Music, Mic2, Headphones, Facebook, ChevronLeft, Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [role, setRole] = useState<'artist' | 'producer'>('artist');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic
    const emailInput = (e.target as HTMLFormElement).querySelector('input[type="email"]');
    const email = (emailInput as HTMLInputElement)?.value || '';

    // Check if user is artist or producer based on email content for demo
    if (email.includes('artist')) {
        navigate('/artist');
    } else {
        navigate('/dash');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      // Route based on the selected role in the registration form
      if (role === 'producer') {
          navigate('/dash');
      } else {
          navigate('/artist');
      }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Back Button (Absolute) */}
        <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors"
        >
            <ChevronLeft className="w-4 h-4" /> Back to Store
        </button>

        {/* --- LEFT SIDE: LOGIN --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative border-b md:border-b-0 md:border-r border-white/5">
          <div className="mb-10 mt-8 md:mt-0">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">System Access</h2>
            <p className="text-gray-400 text-sm font-mono">Enter credentials to unlock your workspace.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon transition-colors" />
                <input 
                  type="email" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-sm focus:outline-none focus:border-neon focus:shadow-[0_0_20px_rgba(118,100,221,0.15)] transition-all placeholder-gray-700"
                  placeholder="user@beatwave.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Password</label>
                 <button 
                    type="button" 
                    onClick={() => navigate('/forgot-password')}
                    className="text-[10px] text-gray-500 hover:text-white transition-colors"
                 >
                    Forgot?
                 </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon transition-colors" />
                <input 
                  type="password" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-sm focus:outline-none focus:border-neon focus:shadow-[0_0_20px_rgba(118,100,221,0.15)] transition-all placeholder-gray-700"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-neon text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(118,100,221,0.4)] hover:shadow-[0_0_35px_rgba(118,100,221,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                 INITIALIZE SESSION <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:animate-shine" />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-6">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                 <span className="relative bg-[#0d0d10] px-4 text-[10px] text-gray-500 font-mono uppercase tracking-widest">Or connect via</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button className="w-full bg-black/40 border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center gap-3 group">
                <svg className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm">Continue with Google</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: REGISTER --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/[0.02] relative overflow-hidden">
          {/* Subtle spinning record in background */}
          <Disc className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 animate-[spin_10s_linear_infinite] pointer-events-none" />
          
          <div className="mb-10 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              Join the Frequency
            </h2>
            <p className="text-gray-400 text-sm font-mono">Create your profile to start trading audio.</p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleRegister}>
            
            {/* Role Switcher */}
            <div className="space-y-2">
               <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Select Role</label>
               <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex relative">
                  {/* Sliding Background */}
                  <div 
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-lg transition-all duration-300 ease-out border border-white/10 ${role === 'artist' ? 'left-1' : 'left-[calc(50%+4px)]'}`}
                  ></div>

                  <button
                    type="button"
                    onClick={() => setRole('artist')}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold font-mono transition-all duration-300 z-10 ${
                        role === 'artist' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                     <Mic2 className={`w-4 h-4 ${role === 'artist' ? 'text-neon' : ''}`} />
                     ARTIST
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('producer')}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold font-mono transition-all duration-300 z-10 ${
                        role === 'producer' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                     <Headphones className={`w-4 h-4 ${role === 'producer' ? 'text-neon' : ''}`} />
                     PRODUCER
                  </button>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon transition-colors" />
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-sm focus:outline-none focus:border-neon focus:shadow-[0_0_20px_rgba(118,100,221,0.15)] transition-all placeholder-gray-700"
                  placeholder="metro_boomin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Stage Name</label>
              <div className="relative group">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon transition-colors" />
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-sm focus:outline-none focus:border-neon focus:shadow-[0_0_20px_rgba(118,100,221,0.15)] transition-all placeholder-gray-700"
                  placeholder={role === 'artist' ? "Lil Sky" : "Metro Boomin"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Access Code (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon transition-colors" />
                <input 
                  type="password" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-sm focus:outline-none focus:border-neon focus:shadow-[0_0_20px_rgba(118,100,221,0.15)] transition-all placeholder-gray-700"
                  placeholder="Create password"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              REGISTER ACCOUNT
            </button>
          </form>

           <div className="mt-8 text-center md:text-left relative z-10">
             <p className="text-[10px] text-gray-600 leading-relaxed font-mono">
                By initializing, you accept the 
                <button onClick={() => navigate('/legal/protocols')} className="text-gray-400 hover:text-white underline decoration-dashed mx-1">Protocols</button> 
                and 
                <button onClick={() => navigate('/legal/encryption')} className="text-gray-400 hover:text-white underline decoration-dashed mx-1">Data Encryption Policy</button>.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};