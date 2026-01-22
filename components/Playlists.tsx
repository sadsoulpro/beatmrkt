import React, { useState } from 'react';
import { ArrowLeft, Play, Disc } from 'lucide-react';
import { Playlist, Beat } from '../types';
import { BeatRow } from './BeatRow';

interface PlaylistsProps {
  playlists: Playlist[];
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onOpenLicenseModal: (beat: Beat) => void;
  likedBeatIds?: string[];
  onToggleLike?: (id: string) => void;
}

export const Playlists: React.FC<PlaylistsProps> = ({ 
  playlists, 
  currentBeat, 
  isPlaying, 
  onPlay, 
  onOpenLicenseModal,
  likedBeatIds = [],
  onToggleLike
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [filter, setFilter] = useState<'All' | 'Best' | 'Exclusive'>('All');

  const filteredPlaylists = playlists.filter(p => {
    if (filter === 'All') return true;
    return p.tags.includes(filter);
  });

  if (selectedPlaylist) {
    return (
      <div className="w-full max-w-6xl mx-auto px-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedPlaylist(null)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Playlists
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
                <img 
                    src={selectedPlaylist.cover} 
                    alt={selectedPlaylist.title} 
                    className="w-40 h-40 md:w-60 md:h-60 rounded-xl shadow-[0_0_40px_rgba(118,100,221,0.2)] border border-white/10"
                />
            </div>
            <div className="flex flex-col justify-end items-start">
                <span className="text-neon text-xs font-mono uppercase tracking-widest mb-2">Curated Playlist</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{selectedPlaylist.title}</h2>
                <p className="text-gray-400 mb-6">Curated by <span className="text-white font-medium">{selectedPlaylist.author}</span> • {selectedPlaylist.beats.length} Tracks</p>
                <button 
                    onClick={() => onPlay(selectedPlaylist.beats[0])}
                    className="bg-neon text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors shadow-lg shadow-neon/20"
                >
                    <Play className="w-5 h-5 fill-current" /> Play All
                </button>
            </div>
        </div>

        <div className="flex flex-col gap-0">
          {selectedPlaylist.beats.map((beat, index) => (
            <BeatRow 
              key={beat.id} 
              beat={beat} 
              index={index + 1}
              isPlaying={isPlaying}
              isActive={currentBeat?.id === beat.id}
              onPlay={onPlay}
              onOpenLicenseModal={onOpenLicenseModal}
              isLiked={likedBeatIds.includes(beat.id)}
              onToggleLike={onToggleLike}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <Disc className="text-neon" /> Playlists
        </h2>
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {(['All', 'Best', 'Exclusive'] as const).map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition-all whitespace-nowrap ${
                        filter === f 
                        ? 'bg-neon/10 border-neon text-neon shadow-[0_0_15px_rgba(118,100,221,0.15)]' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                >
                    {f === 'Best' ? '🔥 Popular' : f === 'Exclusive' ? '💎 Exclusive' : 'All'}
                </button>
            ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlaylists.map((playlist) => (
          <div 
            key={playlist.id}
            onClick={() => setSelectedPlaylist(playlist)}
            className="group cursor-pointer bg-[#0A0A0B] border border-white/5 rounded-xl overflow-hidden hover:border-neon/50 hover:shadow-[0_0_30px_rgba(118,100,221,0.15)] transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
                <img 
                    src={playlist.cover} 
                    alt={playlist.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-neon text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                </div>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-white truncate group-hover:text-neon transition-colors">{playlist.title}</h3>
                    {playlist.tags.includes('Exclusive') && <span className="text-[9px] border border-yellow-500/50 text-yellow-500 px-1.5 rounded bg-yellow-500/10">EXCLUSIVE</span>}
                </div>
                <p className="text-xs text-gray-500 font-mono mt-1">By {playlist.author}</p>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-gray-400">
                        {playlist.beats.length} Beats
                    </span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};