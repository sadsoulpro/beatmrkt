import React from 'react';
import { Mail, ArrowRight, ChevronLeft, KeyRound, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-neon/10 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        {/* Header Section */}
        <div className="p-8 pb-0 relative">
             <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors mb-6"
            >
                <ChevronLeft className="w-4 h-4" /> Return to Login
            </button>

            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <KeyRound className="w-6 h-6 text-neon" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Access Recovery</h2>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
                Lost your credentials? Enter your verified email address to initiate the password reset protocol.
            </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-neon/80 uppercase tracking-widest font-bold">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-neon transition-colors" />
                <input 
                  type="email" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white font-mono text-sm focus:outline-none focus:border-neon focus:shadow-[0_0_20px_rgba(118,100,221,0.15)] transition-all placeholder-gray-700"
                  placeholder="producer@studio.com"
                />
              </div>
            </div>

            <button className="w-full bg-neon text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(118,100,221,0.4)] hover:shadow-[0_0_35px_rgba(118,100,221,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                 SEND RECOVERY LINK <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:animate-shine" />
            </button>
          </form>

           <div className="mt-6 flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                <ShieldAlert className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                    If you do not receive an email within 5 minutes, please check your spam folder or contact support via the terminal.
                </p>
           </div>
        </div>
      </div>
    </div>
  );
};