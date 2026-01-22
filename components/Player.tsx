
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1, ShoppingCart } from 'lucide-react';
import { Beat } from '../types';

interface PlayerProps {
  currentBeat: Beat | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Player: React.FC<PlayerProps> = ({ currentBeat, isPlaying, onTogglePlay }) => {
  const [progress, setProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isLooping, setIsLooping] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  // Reset progress when track changes
  useEffect(() => {
    setProgress(0);
  }, [currentBeat?.id]);

  // Smooth fake progress bar logic
  useEffect(() => {
    if (!isPlaying) return;

    let animationFrameId: number;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (lastTime === null) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setProgress((prev) => {
        // Increment speed: 1% per second (0.001 per ms)
        const next = prev + (0.001 * deltaTime);
        if (next >= 100) {
          return isLooping ? 0 : 100;
        }
        return next;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, isLooping]);

  // Close volume when clicking outside (only if not dragging)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        volumeRef.current && 
        !volumeRef.current.contains(event.target as Node) && 
        !isDraggingVolume
      ) {
        setShowVolume(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDraggingVolume]);

  // Volume Drag Logic
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingVolume || !volumeSliderRef.current) return;
      
      const rect = volumeSliderRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;
      
      // Calculate volume: bottom is 0%, top is 100%
      // Clamped between 0 and 100
      const newVolume = Math.max(0, Math.min(100, 100 - (y / height) * 100));
      setVolume(newVolume);
    };

    const handleGlobalMouseUp = () => {
      setIsDraggingVolume(false);
    };

    if (isDraggingVolume) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDraggingVolume]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setProgress(newProgress);
  };

  const startVolumeDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingVolume(true);
    
    // Set initial value on click immediately
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const newVolume = Math.max(0, Math.min(100, 100 - (y / height) * 100));
    setVolume(newVolume);
  };

  // Helper to parse duration string "mm:ss" to seconds
  const parseDuration = (duration: string) => {
    const [min, sec] = duration.split(':').map(Number);
    return min * 60 + sec;
  };

  // Helper to format seconds to "m:ss"
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentBeat) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 md:h-20 bg-black/40 border-t border-white/5 backdrop-blur-md flex items-center justify-center z-50">
        <p className="text-gray-500 font-mono text-xs md:text-sm">Select a track to start playback</p>
      </div>
    );
  }

  const totalSeconds = parseDuration(currentBeat.duration);
  const currentSeconds = Math.floor(totalSeconds * (progress / 100));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Reduced height for mobile */}
      <div className="bg-[#0A0A0B]/90 border-t border-white/10 backdrop-blur-xl h-20 md:h-24 flex flex-col justify-center shadow-[0_-5px_30px_rgba(0,0,0,0.5)] relative">
        
        {/* Seek Area (Clickable Background) */}
        <div 
          ref={progressBarRef}
          onClick={handleSeek}
          className="absolute inset-0 w-full h-full cursor-pointer z-0 pointer-events-auto group"
        >
           {/* Progress Fill */}
           <div 
             className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon/5 to-neon/20"
             style={{ width: `${progress}%` }}
           />

           {/* Top Progress Line */}
           <div 
             className="absolute top-0 left-0 h-[3px] md:h-[2px] bg-neon shadow-[0_0_15px_rgba(118,100,221,1)]"
             style={{ width: `${progress}%` }}
           />
           
           {/* Scrubber Line indicator (Visible on Hover) */}
           <div 
             className="absolute top-0 bottom-0 w-[1px] bg-white/50 group-hover:bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
             style={{ left: `${progress}%` }}
           />
        </div>

        {/* Timestamps (Hidden on mobile to save space) */}
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
             <span className="text-sm font-mono text-neon font-bold drop-shadow-md">
                {formatTime(currentSeconds)}
             </span>
        </div>
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
             <span className="text-sm font-mono text-gray-500 font-medium">
                {currentBeat.duration}
             </span>
        </div>

        {/* Controls Container */}
        <div className="relative z-10 flex items-center justify-between px-4 md:px-24 pointer-events-none h-full">
          
          {/* Left: Track Info */}
          <div className="flex items-center gap-3 md:gap-4 w-auto md:w-1/3 min-w-0 pointer-events-auto flex-shrink-1">
            <img 
              src={currentBeat.cover} 
              alt="Now Playing" 
              className="w-10 h-10 md:w-14 md:h-14 rounded-md bg-gray-800 object-cover border border-white/10 shadow-lg block" 
            />
            <div className="flex flex-col overflow-hidden justify-center h-full min-w-0">
              <h4 className="text-white font-medium text-xs md:text-base truncate drop-shadow-md shadow-black leading-tight max-w-[120px] md:max-w-none">{currentBeat.title}</h4>
              <span className="text-neon text-[10px] md:text-xs font-mono truncate drop-shadow-[0_0_5px_rgba(118,100,221,0.5)] opacity-80">{currentBeat.producer}</span>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex flex-col items-center justify-center w-auto md:w-1/3 pointer-events-auto flex-shrink-0">
            <div className="flex items-center gap-4 md:gap-6">
              {/* Skip Back - Hidden on Mobile */}
              <button className="hidden md:block text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <SkipBack className="w-5 h-5 md:w-6 md:h-6 fill-current drop-shadow-md" />
              </button>
              
              <button 
                onClick={onTogglePlay}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neon text-white flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(118,100,221,0.5)] border border-white/20 z-20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 fill-current ml-1" />
                )}
              </button>
              
              {/* Skip Forward - Hidden on Mobile */}
              <button className="hidden md:block text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <SkipForward className="w-5 h-5 md:w-6 md:h-6 fill-current drop-shadow-md" />
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 md:gap-6 w-auto md:w-1/3 min-w-0 pointer-events-auto flex-shrink-1">
             
             {/* Loop Button - Hidden on Mobile */}
             <button 
                onClick={() => setIsLooping(!isLooping)}
                className={`hidden md:flex items-center gap-1.5 transition-colors group ${isLooping ? 'text-neon drop-shadow-[0_0_8px_rgba(118,100,221,0.5)]' : 'text-gray-400 hover:text-white'}`}
             >
                {isLooping ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider transition-colors ${isLooping ? 'text-neon' : 'text-gray-400 group-hover:text-white'}`}>
                    Loop
                </span>
             </button>

             {/* Vertical Volume Control - Hidden on Mobile */}
             <div className="relative hidden md:block" ref={volumeRef}>
                {showVolume && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-8 h-32 bg-[#0A0A0B] border border-white/10 rounded-full flex items-end justify-center py-3 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md z-50 animate-in fade-in slide-in-from-bottom-2">
                        <div 
                            ref={volumeSliderRef}
                            className="relative w-1.5 h-full bg-white/10 rounded-full cursor-pointer group/slider"
                            onMouseDown={startVolumeDrag}
                        >
                             <div 
                                className={`absolute bottom-0 w-full bg-neon shadow-[0_0_10px_rgba(118,100,221,0.8)] ${isDraggingVolume ? '' : 'transition-all duration-100 ease-out'}`}
                                style={{ height: `${volume}%` }}
                             />
                             <div className="absolute inset-0 -left-2 -right-2 z-10 cursor-ns-resize"></div>
                        </div>
                    </div>
                )}
                
                <button 
                    onClick={() => setShowVolume(!showVolume)}
                    className={`text-gray-400 hover:text-white transition-colors ${showVolume ? 'text-white' : ''}`}
                >
                    {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
             </div>

             {/* Price Button */}
             <button className="group relative overflow-hidden bg-white text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold font-mono text-xs md:text-sm hover:bg-neon hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(118,100,221,0.6)] flex items-center gap-2 z-20 whitespace-nowrap">
                <span className="relative z-10">${currentBeat.price}</span>
                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 relative z-10" />
                <div className="absolute inset-0 bg-neon transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
