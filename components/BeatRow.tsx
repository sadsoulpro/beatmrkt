
import React from 'react';
import { Play, Pause, ShoppingCart, Heart, CheckCircle2 } from 'lucide-react';
import { Beat } from '../types';
import { Badge } from './ui/Badge';
import { Waveform } from './ui/Waveform';

interface BeatRowProps {
  beat: Beat;
  index: number;
  isPlaying: boolean;
  isActive: boolean;
  onPlay: (beat: Beat) => void;
  onOpenLicenseModal: (beat: Beat) => void;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
  showRank?: boolean;
  verifiedProducers?: string[];
}

export const BeatRow: React.FC<BeatRowProps> = ({ 
  beat, 
  index, 
  isPlaying, 
  isActive, 
  onPlay, 
  onOpenLicenseModal,
  isLiked = false,
  onToggleLike,
  showRank = true,
  verifiedProducers = []
}) => {
  const isVerified = verifiedProducers.includes(beat.producer);

  return (
    <div 
      className={`group flex flex-row items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all duration-300 border backdrop-blur-md ${
        isActive 
          ? 'bg-neon/10 border-neon/40 shadow-[0_0_30px_rgba(118,100,221,0.1)]' 
          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 hover:shadow-lg'
      }`}
    >
      {/* Rank Number (Optional) */}
      {showRank && (
        <div className="flex items-center justify-center w-6 md:w-8 flex-shrink-0">
          <span className="font-mono text-sm md:text-xl font-bold text-[#7664dd] transition-colors">
              {index}
          </span>
        </div>
      )}

      {/* Cover & Play Button */}
      <div className="relative flex-shrink-0">
        <img 
          src={beat.cover} 
          alt={beat.title} 
          className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover opacity-90 group-hover:opacity-100 transition-opacity shadow-lg" 
        />
        <button 
          onClick={() => onPlay(beat)}
          className={`absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px] rounded-lg ${isActive ? 'opacity-100 bg-black/50' : ''}`}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neon flex items-center justify-center shadow-lg transform scale-90 hover:scale-100 transition-all">
            {isActive && isPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 text-white fill-current" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-current ml-0.5" />
            )}
          </div>
        </button>
      </div>

      {/* Info */}
      <div className="flex-grow flex flex-col items-start text-left min-w-0 overflow-hidden">
        <h3 className={`font-semibold text-sm md:text-lg leading-tight tracking-tight truncate w-full ${isActive ? 'text-neon drop-shadow-[0_0_8px_rgba(118,100,221,0.4)]' : 'text-white'}`}>
          {beat.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-400 truncate w-full flex items-center gap-1">
          <span className="hidden md:inline">Prod. by </span>
          <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{beat.producer}</span>
          {isVerified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14] fill-current bg-transparent rounded-full" />
          )}
        </p>
        
        {/* Mobile Metadata */}
        <div className="flex md:hidden items-center gap-2 mt-0.5">
            <span className="text-[10px] text-gray-500 font-mono flex items-center gap-0.5">
                 {beat.bpm} BPM
            </span>
             <span className="text-[10px] text-neon font-mono">
                {beat.key}
            </span>
        </div>
      </div>

      {/* Desktop Metadata Badges */}
      <div className="hidden md:flex flex-col gap-2 min-w-[80px] items-center">
         <div className="flex gap-2">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                {beat.bpm} BPM
            </span>
            <span className="text-xs text-neon font-mono border border-neon/20 bg-neon/5 px-2 py-1 rounded-full">
                {beat.key}
            </span>
         </div>
      </div>

      {/* Waveform */}
      <div className="hidden lg:block flex-grow px-4">
        <Waveform data={beat.waveformData} isPlaying={isPlaying} active={isActive} />
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {onToggleLike && (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(beat.id);
                }}
                className={`p-2 rounded-full transition-all ${
                    isLiked 
                    ? 'text-neon bg-neon/10 hover:bg-neon/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
        )}

        <button 
          onClick={() => onOpenLicenseModal(beat)}
          className="relative overflow-hidden group/btn w-[90px] h-[23px] rounded-full border border-white/10 bg-white/5 text-[#7664dd] font-mono font-bold text-xs transition-all hover:bg-white hover:text-black backdrop-blur-sm hover:border-white shadow-sm"
        >
          <span className="absolute inset-0 flex items-center justify-center translate-y-0 group-hover/btn:-translate-y-full transition-transform duration-300">
            ${beat.price}
          </span>
          <span className="absolute inset-0 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 flex gap-1">
            <ShoppingCart className="w-3 h-3" /> Add
          </span>
        </button>
      </div>
    </div>
  );
};
