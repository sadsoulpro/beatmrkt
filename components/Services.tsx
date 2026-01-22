import React from 'react';
import { Play, Pause, Mic2, ArrowRight } from 'lucide-react';
import { Service, Beat } from '../types';

interface ServicesProps {
  services: Service[];
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
}

export const Services: React.FC<ServicesProps> = ({ services, currentBeat, isPlaying, onPlay }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-32">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Mic2 className="text-neon" /> Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
             const isServicePlaying = currentBeat?.id === service.exampleTrack.id && isPlaying;

             return (
                <div 
                    key={service.id}
                    className="relative bg-gradient-to-br from-[#0A0A0B] to-[#151515] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all p-1"
                >
                    <div className="flex h-full flex-col md:flex-row">
                        {/* Cover / Preview Area */}
                        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                             <img 
                                src={service.cover} 
                                alt={service.title} 
                                className="w-full h-full object-cover rounded-xl md:rounded-l-xl md:rounded-r-none"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <button 
                                    onClick={() => onPlay(service.exampleTrack)}
                                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-neon hover:border-neon transition-all"
                                >
                                     {isServicePlaying ? (
                                        <Pause className="w-5 h-5 fill-current" />
                                    ) : (
                                        <Play className="w-5 h-5 fill-current ml-1" />
                                    )}
                                </button>
                            </div>
                             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/80 bg-black/50 px-2 py-0.5 rounded">
                                LISTEN EXAMPLE
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col justify-center flex-grow">
                             <div className="flex justify-between items-start mb-2">
                                <span className="text-neon text-[10px] font-mono border border-neon/20 px-1.5 py-0.5 rounded bg-neon/5">
                                    {service.provider}
                                </span>
                                <span className="text-sm text-gray-400">From ${service.priceFrom}</span>
                             </div>

                             <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                             <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {service.description}
                             </p>

                             <button className="w-full bg-white text-black py-2.5 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                Book Now <ArrowRight className="w-4 h-4" />
                             </button>
                        </div>
                    </div>
                </div>
             );
        })}
      </div>
    </div>
  );
};