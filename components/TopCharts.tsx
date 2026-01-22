
import React from 'react';
import { Trophy, TrendingUp, Music } from 'lucide-react';
import { Beat } from '../types';
import { BeatRow } from './BeatRow';

interface TopChartsProps {
  beats: Beat[];
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onOpenLicenseModal: (beat: Beat) => void;
  likedBeatIds: string[];
  onToggleLike: (id: string) => void;
  verifiedProducers: string[];
}

export const TopCharts: React.FC<TopChartsProps> = ({
  beats,
  currentBeat,
  isPlaying,
  onPlay,
  onOpenLicenseModal,
  likedBeatIds,
  onToggleLike,
  verifiedProducers
}) => {
  // Logic: Charts distributed by Purchases (50%), Plays (30%), Likes (20%)
  const sortedBeats = [...beats].sort((a, b) => {
    const scoreA = (a.purchases * 10) + (a.plays * 0.5) + (a.likes * 2);
    const scoreB = (b.purchases * 10) + (b.plays * 0.5) + (b.likes * 2);
    return scoreB - scoreA;
  }).slice(0, 5);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
             <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Top Charts</h2>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Most Active Tracks This Week</p>
        </div>
      </div>

      <div className="flex flex-col gap-0 border border-white/5 rounded-2xl overflow-hidden bg-[#0F0F11]/50 backdrop-blur-sm">
        {sortedBeats.map((beat, index) => (
          <div key={beat.id} className="relative group border-b border-white/5 last:border-0">
             {/* Chart Rank Indicator */}
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-transparent to-transparent group-hover:via-neon transition-all duration-500"></div>
             
             <BeatRow 
                beat={beat} 
                index={index + 1}
                isPlaying={isPlaying}
                isActive={currentBeat?.id === beat.id}
                onPlay={onPlay}
                onOpenLicenseModal={onOpenLicenseModal}
                isLiked={likedBeatIds.includes(beat.id)}
                onToggleLike={onToggleLike}
                showRank={true}
                verifiedProducers={verifiedProducers}
              />
              
              {/* Stats overlay for Top Charts only (Desktop) */}
              <div className="hidden lg:flex absolute right-40 top-1/2 -translate-y-1/2 items-center gap-6 text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1.5" title="Plays">
                      <Music className="w-3 h-3" /> {(beat.plays / 1000).toFixed(1)}k
                  </div>
                  <div className="flex items-center gap-1.5 text-green-500/80" title="Purchases">
                      <TrendingUp className="w-3 h-3" /> {beat.purchases}
                  </div>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
};
