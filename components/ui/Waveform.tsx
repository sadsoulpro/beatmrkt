import React from 'react';

interface WaveformProps {
  data: number[];
  isPlaying: boolean;
  active: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ data, isPlaying, active }) => {
  return (
    <div className="flex flex-col justify-center h-9 w-32 md:w-48 group">
      {/* Top Channel (Left) */}
      <div className="flex items-end justify-between gap-[1px] h-1/2 w-full">
        {data.map((height, i) => (
          <div
            key={`top-${i}`}
            className={`flex-1 rounded-t-[1px] transition-all duration-300 ${
              active ? 'bg-neon shadow-[0_-1px_4px_rgba(118,100,221,0.5)]' : 'bg-gray-600'
            }`}
            style={{
              height: `${Math.max(10, height * 100)}%`,
              opacity: active && isPlaying ? 0.8 + Math.random() * 0.2 : 0.8,
            }}
          />
        ))}
      </div>
      
      {/* Spacer / Center Line */}
      <div className="h-[1px] w-full bg-transparent"></div>

      {/* Bottom Channel (Right) - Mirrored */}
      <div className="flex items-start justify-between gap-[1px] h-1/2 w-full">
        {data.map((height, i) => (
          <div
            key={`bottom-${i}`}
            className={`flex-1 rounded-b-[1px] transition-all duration-300 ${
              active ? 'bg-neon/60' : 'bg-gray-700'
            }`}
            style={{
              height: `${Math.max(10, height * 75)}%`, // Slight asymmetry for realism
              opacity: active && isPlaying ? 0.8 + Math.random() * 0.2 : 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
};