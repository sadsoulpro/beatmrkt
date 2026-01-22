
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, SlidersHorizontal, ChevronDown, Check, X, Music, Activity, Flame } from 'lucide-react';
import { Beat } from '../types';
import { BeatRow } from './BeatRow';
import { GENRES, MUSICAL_KEYS } from '../constants';

interface BeatListProps {
  beats: Beat[];
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onOpenLicenseModal: (beat: Beat) => void;
  likedBeatIds?: string[];
  onToggleLike?: (id: string) => void;
  verifiedProducers: string[];
}

type SortDirection = 'asc' | 'desc' | null;

export const BeatList: React.FC<BeatListProps> = ({ 
  beats, 
  currentBeat, 
  isPlaying, 
  onPlay, 
  onOpenLicenseModal,
  likedBeatIds = [],
  onToggleLike,
  verifiedProducers
}) => {
  // Filters State
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedKey, setSelectedKey] = useState<string>('All');
  
  // BPM Filter: Target BPM (Single Slider)
  const [targetBpm, setTargetBpm] = useState<number | null>(null);
  
  // Sorting State
  const [priceSort, setPriceSort] = useState<SortDirection>(null);
  const [showBestBeats, setShowBestBeats] = useState(false);

  // UI State
  const [activeDropdown, setActiveDropdown] = useState<'genre' | 'key' | 'bpm' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePriceSort = () => {
    setPriceSort(prev => {
      if (prev === null) return 'desc';
      if (prev === 'desc') return 'asc';
      return null;
    });
    // Turn off best beats if sorting by price
    if (!priceSort) setShowBestBeats(false);
  };

  const handleBestBeatsToggle = () => {
    setShowBestBeats(!showBestBeats);
    // Turn off price sort if best beats is active
    if (!showBestBeats) setPriceSort(null);
  };

  const filteredAndSortedBeats = useMemo(() => {
    let result = [...beats];

    // 1. Filter by Genre
    if (selectedGenre !== 'All') {
      result = result.filter(beat => beat.tags.includes(selectedGenre));
    }

    // 2. Filter by Key
    if (selectedKey !== 'All') {
      result = result.filter(beat => beat.key.toLowerCase() === selectedKey.toLowerCase());
    }

    // 3. Filter by BPM (Target +/- 10 for better UX)
    if (targetBpm !== null) {
      result = result.filter(beat => beat.bpm >= targetBpm - 10 && beat.bpm <= targetBpm + 10);
    }

    // 4. Sort by Best Beats (Likes + Plays)
    if (showBestBeats) {
        result.sort((a, b) => {
            const scoreA = a.likes + (a.plays / 100);
            const scoreB = b.likes + (b.plays / 100);
            return scoreB - scoreA;
        });
    }

    // 5. Sort by Price
    else if (priceSort) {
      result.sort((a, b) => {
        if (priceSort === 'asc') return a.price - b.price;
        return b.price - a.price;
      });
    }

    return result;
  }, [beats, selectedGenre, selectedKey, targetBpm, priceSort, showBestBeats]);

  const toggleDropdown = (name: 'genre' | 'key' | 'bpm') => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const resetFilters = () => {
    setSelectedGenre('All');
    setSelectedKey('All');
    setTargetBpm(null);
    setPriceSort(null);
    setShowBestBeats(false);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pb-32">
      {/* Controls Header */}
      <div className="flex flex-col gap-5 mb-6 relative" ref={dropdownRef}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
             <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 drop-shadow-md whitespace-nowrap">
                {showBestBeats ? '🔥 Best Beats' : 'All Beats'}
             </h2>

             {/* Mobile Filter Toggle Button */}
             <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
             >
                <SlidersHorizontal className="w-3 h-3" />
                Filters
                <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
             </button>
          </div>
          
          {/* Filters Container */}
          <div className={`
              ${mobileMenuOpen ? 'flex' : 'hidden'} 
              md:flex 
              flex-col md:flex-row items-stretch md:items-center 
              absolute md:static top-12 right-0 left-0 md:top-auto md:left-auto md:right-auto
              p-4 md:p-0 gap-2 
              bg-[#0A0A0B]/95 md:bg-transparent 
              backdrop-blur-xl md:backdrop-blur-none
              border border-white/10 md:border-none 
              rounded-xl md:rounded-none 
              shadow-2xl md:shadow-none 
              z-50 md:z-20
          `}>

              {/* Label (Desktop Only) */}
              <div className="hidden md:flex items-center gap-1 text-[10px] text-gray-500 mr-1 uppercase tracking-wider font-bold whitespace-nowrap">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span className="hidden sm:inline">Filter:</span>
              </div>

              {/* Best Beats Toggle */}
              <button
                onClick={handleBestBeatsToggle}
                className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-1 px-3 py-1.5 rounded-md text-[11px] font-medium font-mono transition-all border backdrop-blur-sm whitespace-nowrap ${
                  showBestBeats
                    ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <Flame className={`w-3 h-3 ${showBestBeats ? 'fill-current' : ''}`} />
                BEST BEATS
              </button>

              {/* Genre Dropdown */}
              <div className="relative">
                <button
                    onClick={() => toggleDropdown('genre')}
                    className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-1 px-3 py-1.5 rounded-md text-[11px] font-medium font-mono transition-all border backdrop-blur-sm whitespace-nowrap ${
                        selectedGenre !== 'All'
                        ? 'bg-neon/10 border-neon text-neon shadow-[0_0_15px_rgba(118,100,221,0.15)]'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    <span className="flex items-center gap-1">
                        <span className="opacity-70">Genre:</span> 
                        {selectedGenre}
                    </span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'genre' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'genre' && (
                    <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-40 bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[60] overflow-hidden ring-1 ring-white/5">
                        <div className="p-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {GENRES.map((genre) => (
                                <button
                                    key={genre}
                                    onClick={() => {
                                        setSelectedGenre(genre);
                                        setActiveDropdown(null);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 text-[11px] font-mono rounded-md transition-colors flex items-center justify-between group ${
                                        selectedGenre === genre
                                            ? 'bg-neon/10 text-neon'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {genre}
                                    {selectedGenre === genre && <Check className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
              </div>

              {/* Key Dropdown */}
              <div className="relative">
                <button
                    onClick={() => toggleDropdown('key')}
                    className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-1 px-3 py-1.5 rounded-md text-[11px] font-medium font-mono transition-all border backdrop-blur-sm whitespace-nowrap ${
                        selectedKey !== 'All'
                        ? 'bg-neon/10 border-neon text-neon shadow-[0_0_15px_rgba(118,100,221,0.15)]'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    <span className="flex items-center gap-1">
                        <Music className="w-3 h-3 opacity-70" />
                        <span className="opacity-70">Key:</span> 
                        {selectedKey}
                    </span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'key' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'key' && (
                    <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-40 bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[60] overflow-hidden ring-1 ring-white/5">
                        <div className="p-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {MUSICAL_KEYS.map((k) => (
                                <button
                                    key={k}
                                    onClick={() => {
                                        setSelectedKey(k);
                                        setActiveDropdown(null);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 text-[11px] font-mono rounded-md transition-colors flex items-center justify-between group ${
                                        selectedKey === k
                                            ? 'bg-neon/10 text-neon'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {k}
                                    {selectedKey === k && <Check className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
              </div>

              {/* BPM Dropdown (Single Slider) */}
              <div className="relative">
                <button
                    onClick={() => toggleDropdown('bpm')}
                    className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-1 px-3 py-1.5 rounded-md text-[11px] font-medium font-mono transition-all border backdrop-blur-sm whitespace-nowrap ${
                        targetBpm !== null
                        ? 'bg-neon/10 border-neon text-neon shadow-[0_0_15px_rgba(118,100,221,0.15)]'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    <span className="flex items-center gap-1">
                        <Activity className="w-3 h-3 opacity-70" />
                        <span className="opacity-70">BPM:</span> 
                        {targetBpm !== null ? `${targetBpm}` : 'All'}
                    </span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'bpm' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'bpm' && (
                    <div className="absolute top-full right-0 md:left-0 mt-2 w-full md:w-64 bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[60] p-4 ring-1 ring-white/5">
                        <div className="flex flex-col gap-4">
                           <div className="flex justify-between items-end border-b border-white/5 pb-2">
                              <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Target BPM</span>
                              <span className="text-neon font-bold text-xl font-mono">{targetBpm ?? 140}</span>
                           </div>
                           
                           <div className="py-2">
                               <input 
                                    type="range" 
                                    min="50" 
                                    max="300" 
                                    step="1"
                                    value={targetBpm ?? 140} 
                                    onChange={(e) => setTargetBpm(Number(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon hover:accent-neon/80 focus:outline-none focus:ring-2 focus:ring-neon/30"
                               />
                               <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-1 px-1">
                                    <span>50</span>
                                    <span>175</span>
                                    <span>300</span>
                               </div>
                           </div>

                           <div className="flex justify-end gap-2 pt-2">
                                <button 
                                    onClick={() => { setTargetBpm(null); setActiveDropdown(null); }}
                                    className="text-[10px] text-gray-500 hover:text-white px-3 py-1.5 transition-colors font-mono"
                                >
                                    RESET
                                </button>
                                <button 
                                    onClick={() => setActiveDropdown(null)}
                                    className="bg-neon text-black px-4 py-1.5 rounded-md text-[10px] hover:bg-neon/90 transition-colors font-bold font-mono"
                                >
                                    APPLY
                                </button>
                           </div>
                        </div>
                    </div>
                )}
              </div>

              <button
                onClick={handlePriceSort}
                className={`w-full md:w-auto flex items-center justify-between md:justify-start gap-1 px-3 py-1.5 rounded-md text-[11px] font-medium font-mono transition-all border backdrop-blur-sm whitespace-nowrap ${
                  priceSort
                    ? 'bg-neon/10 border-neon text-neon shadow-[0_0_15px_rgba(118,100,221,0.15)]'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                PRICE
                {priceSort === 'asc' ? <ArrowUp className="w-3 h-3" /> : priceSort === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUpDown className="w-3 h-3 opacity-50" />}
              </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-0 min-h-[400px]">
        {filteredAndSortedBeats.map((beat, index) => (
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
            showRank={false}
            verifiedProducers={verifiedProducers}
          />
        ))}
        {filteredAndSortedBeats.length === 0 && (
           <div className="flex flex-col items-center justify-center h-40 text-gray-500 border border-dashed border-gray-800 rounded-xl bg-white/5 backdrop-blur-sm">
              <p className="text-sm font-mono text-gray-400">No beats found.</p>
              <button 
                onClick={resetFilters}
                className="mt-3 text-neon text-xs hover:text-white transition-colors flex items-center gap-1 font-mono bg-neon/10 px-3 py-1.5 rounded border border-neon/20"
              >
                <X className="w-3 h-3" /> Clear all filters
              </button>
           </div>
        )}
      </div>
    </div>
  );
};
