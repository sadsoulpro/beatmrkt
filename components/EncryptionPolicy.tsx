import React from 'react';
import { ChevronLeft, Lock, Server, EyeOff, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EncryptionPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[50%] translate-x-1/2 w-[60%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col h-[85vh]">
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Header */}
        <div className="p-8 border-b border-white/5 bg-white/5 relative z-10">
             <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors mb-4"
            >
                <ChevronLeft className="w-4 h-4" /> Return to Access Point
            </button>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neon/10 rounded-xl border border-neon/30 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-neon" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Data Encryption Policy</h2>
                    <p className="text-gray-400 text-xs font-mono mt-1">Security Level: Maximum // Protocol: AES-256</p>
                </div>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            
            <section className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-neon font-mono">01.</span> Data Transport Layer
                </h3>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-400 leading-relaxed font-mono">
                    <p>
                        All transmissions between your terminal and the BeatWave servers are secured using <strong className="text-white">TLS 1.3 (Transport Layer Security)</strong>. We utilize 256-bit encryption to ensure that packets containing payment data, login credentials, and personal identifiers cannot be intercepted by rogue nodes.
                    </p>
                </div>
            </section>

            <section className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-neon font-mono">02.</span> Payment Tokenization
                </h3>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-400 leading-relaxed font-mono flex items-start gap-4">
                    <Key className="w-6 h-6 text-neon/50 flex-shrink-0 mt-1" />
                    <div>
                        <p className="mb-2">
                            BeatWave <strong>does not store</strong> full credit card numbers on our internal databases. Payment processing is offloaded to Stripe, a certified Level 1 PCI DSS provider.
                        </p>
                        <p>
                           We retain only a tokenized reference to the transaction, ensuring that even in the event of a breach, your financial instruments remain inaccessible.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-neon font-mono">03.</span> User Identity Storage
                </h3>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-400 leading-relaxed font-mono">
                    <p className="mb-2">Passwords are hashed using <strong className="text-white">Argon2id</strong> prior to storage. We cannot retrieve your plain-text password; we can only verify the hash during the handshake protocol.</p>
                </div>
            </section>

            <section className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-neon font-mono">04.</span> Cookie & Tracker Policy
                </h3>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-400 leading-relaxed font-mono">
                    <div className="flex items-start gap-3">
                         <EyeOff className="w-5 h-5 text-gray-500 mt-1" />
                         <p>
                            We utilize strictly necessary cookies for session management (keeping you logged in) and cart persistence. Third-party analytics are anonymized. We do not sell user behavioral data to advertising syndicates.
                         </p>
                    </div>
                </div>
            </section>

             <section className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-neon font-mono">05.</span> Data Retention
                </h3>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-400 leading-relaxed font-mono">
                    <p>
                        Inactive accounts are purged from the mainframe after 24 months of dormancy. You may request a full "Right to be Forgotten" deletion by executing the account termination command in your dashboard.
                    </p>
                </div>
            </section>

            <div className="h-10"></div> {/* Spacer */}
        </div>
      </div>
    </div>
  );
};