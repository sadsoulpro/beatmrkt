import React, { useState } from 'react';
import { Play, Pause, Package, ShoppingCart } from 'lucide-react';
import { SoundKit, Beat, SoundKitType } from '../types';

interface SoundKitsProps {
  kits: SoundKit[];
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onAddToCart: (beat: Beat, license: any) => void;
}

const KIT_FILTERS: (SoundKitType | 'All')[] = ['All', 'Drum Kit', 'Loop Kit', 'Samples', 'Midi Kit', 'Presets', 'One Shots'];

export const SoundKits: React.FC<SoundKitsProps> = ({ kits, currentBeat, isPlaying, onPlay, onAddToCart }) => {
  const [filter, setFilter] = useState<SoundKitType | 'All'>('All');

  const filteredKits = kits.filter(kit => {
    if (filter === 'All') return true;
    return kit.type === filter;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="text-neon" /> Sound Kits
          </h2>
          
           {/* Filters */}
           <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {KIT_FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition-all whitespace-nowrap ${
                            filter === f 
                            ? 'bg-neon/10 border-neon text-neon shadow-[0_0_15px_rgba(118,100,221,0.15)]' 
                            : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredKits.map((kit) => {
            const isKitPlaying = currentBeat?.id === kit.previewTrack.id && isPlaying;

            return (
                <div 
                    key={kit.id}
                    className="bg-[#0A0A0B] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all group flex flex-col"
                >
                    <div className="relative aspect-square overflow-hidden bg-gray-900">
                         <img 
                            src={kit.cover} 
                            alt={kit.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        />
                         
                         {/* Centered Play Button */}
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                             <button 
                                onClick={() => onPlay(kit.previewTrack)}
                                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-neon hover:text-white transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] transform scale-90 group-hover:scale-100 z-10"
                             >
                                {isKitPlaying ? (
                                    <Pause className="w-7 h-7 fill-current" />
                                ) : (
                                    <Play className="w-7 h-7 fill-current ml-1" />
                                )}
                            </button>
                         </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-xl text-white leading-tight">{kit.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-xs text-neon font-mono">{kit.producer}</p>
                                    <span className="text-[9px] text-gray-500 border border-gray-800 px-1.5 rounded">{kit.type}</span>
                                </div>
                            </div>
                            <span className="font-mono font-bold text-lg">${kit.price}</span>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">{kit.description}</p>

                        <button 
                            // Creating a fake license object for the cart logic to keep it simple
                            onClick={() => onAddToCart(kit.previewTrack, { type: 'UNLIMITED', name: 'Sound Kit License', price: kit.price, features: ['Royalty Free Samples'] })}
                            className="w-full py-3 rounded-lg border border-neon/50 text-neon font-bold text-sm hover:bg-neon hover:text-black transition-all flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                    </div>
                </div>
            );
        })}
        {filteredKits.length === 0 && (
             <div className="col-span-full h-40 flex items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-xl">
                 <p>No sound kits found in this category.</p>
             </div>
        )}
      </div>
    </div>
  );
};