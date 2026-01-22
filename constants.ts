
import { Beat, Playlist, SoundKit, Service } from './types';

const generateWaveform = () => Array.from({ length: 48 }, () => Math.random() * 0.8 + 0.2);

export const MOCK_BEATS: Beat[] = [
  {
    id: '1',
    title: 'Neon Nights',
    producer: 'CyberSound',
    cover: 'https://picsum.photos/seed/neon1/200/200',
    bpm: 140,
    key: 'C Min',
    price: 29.99,
    tags: ['Trap', 'Dark'],
    duration: '2:45',
    waveformData: generateWaveform(),
    plays: 12500,
    likes: 450,
    purchases: 85
  },
  {
    id: '2',
    title: 'Glitch Protocol',
    producer: 'NullPointer',
    cover: 'https://picsum.photos/seed/glitch2/200/200',
    bpm: 128,
    key: 'F# Maj',
    price: 34.99,
    tags: ['Cyberpunk', 'Electronic'],
    duration: '3:10',
    waveformData: generateWaveform(),
    plays: 8900,
    likes: 320,
    purchases: 42
  },
  {
    id: '3',
    title: 'Midnight Rain',
    producer: 'LoFi Dreamer',
    cover: 'https://picsum.photos/seed/rain3/200/200',
    bpm: 85,
    key: 'A Min',
    price: 19.99,
    tags: ['Lo-Fi', 'Chill'],
    duration: '2:15',
    waveformData: generateWaveform(),
    plays: 24000,
    likes: 1200,
    purchases: 150
  },
  {
    id: '4',
    title: 'Drill Sergeant',
    producer: 'HeavyHitter',
    cover: 'https://picsum.photos/seed/drill4/200/200',
    bpm: 142,
    key: 'G Min',
    price: 49.99,
    tags: ['Drill', 'Hard'],
    duration: '2:55',
    waveformData: generateWaveform(),
    plays: 15600,
    likes: 560,
    purchases: 90
  },
  {
    id: '5',
    title: 'Synthetic Soul',
    producer: 'RetroWave',
    cover: 'https://picsum.photos/seed/synth5/200/200',
    bpm: 105,
    key: 'E Maj',
    price: 24.99,
    tags: ['Synthwave', 'Pop'],
    duration: '3:30',
    waveformData: generateWaveform(),
    plays: 5400,
    likes: 210,
    purchases: 12
  },
  {
    id: '6',
    title: 'Concrete Jungle',
    producer: 'CityBeats',
    cover: 'https://picsum.photos/seed/city6/200/200',
    bpm: 95,
    key: 'D Min',
    price: 29.99,
    tags: ['Hip Hop', 'Old School'],
    duration: '3:05',
    waveformData: generateWaveform(),
    plays: 7800,
    likes: 340,
    purchases: 25
  },
  {
    id: '7',
    title: 'Future Bass X',
    producer: 'BassDrop',
    cover: 'https://picsum.photos/seed/bass7/200/200',
    bpm: 150,
    key: 'F Min',
    price: 39.99,
    tags: ['Future Bass', 'EDM'],
    duration: '3:15',
    waveformData: generateWaveform(),
    plays: 9200,
    likes: 410,
    purchases: 30
  }
];

export const GENRES = ['All', 'Trap', 'Drill', 'Lo-Fi', 'R&B', 'Cyberpunk', 'Synthwave'];

export const MUSICAL_KEYS = [
  'All', 
  'C Maj', 'C Min', 
  'C# Maj', 'C# Min',
  'D Maj', 'D Min', 
  'D# Maj', 'D# Min',
  'E Maj', 'E Min', 
  'F Maj', 'F Min', 
  'F# Maj', 'F# Min',
  'G Maj', 'G Min', 
  'G# Maj', 'G# Min',
  'A Maj', 'A Min', 
  'A# Maj', 'A# Min',
  'B Maj', 'B Min'
];

// --- MOCK PLAYLISTS ---
export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    title: 'RnB Beats',
    author: 'CyberSound',
    cover: 'https://picsum.photos/seed/rnb_playlist/300/300',
    beats: [MOCK_BEATS[0], MOCK_BEATS[2], MOCK_BEATS[4]],
    tags: ['Best']
  },
  {
    id: 'p2',
    title: 'Hard Hitting Drill',
    author: 'HeavyHitter',
    cover: 'https://picsum.photos/seed/drill_playlist/300/300',
    beats: [MOCK_BEATS[3], MOCK_BEATS[5]],
    tags: ['Exclusive']
  },
  {
    id: 'p3',
    title: 'Late Night Lo-Fi',
    author: 'LoFi Dreamer',
    cover: 'https://picsum.photos/seed/lofi_playlist/300/300',
    beats: [MOCK_BEATS[2], MOCK_BEATS[5], MOCK_BEATS[0]],
    tags: ['Best']
  },
  {
    id: 'p4',
    title: 'Exclusive Gems',
    author: 'NullPointer',
    cover: 'https://picsum.photos/seed/gems/300/300',
    beats: [MOCK_BEATS[1], MOCK_BEATS[6]],
    tags: ['Exclusive']
  }
];

// --- MOCK SOUND KITS ---
export const MOCK_KITS: SoundKit[] = [
  {
    id: 'k1',
    title: 'Cyber Drums Vol. 1',
    producer: 'CyberSound',
    cover: 'https://picsum.photos/seed/kit1/300/300',
    price: 19.99,
    description: '100+ Hard hitting drum samples for Trap and Cyberpunk.',
    previewTrack: { ...MOCK_BEATS[0], title: 'Cyber Drums Vol. 1 (Demo)' },
    type: 'Drum Kit'
  },
  {
    id: 'k2',
    title: 'Analog Textures',
    producer: 'NullPointer',
    cover: 'https://picsum.photos/seed/kit2/300/300',
    price: 24.99,
    description: 'Organic textures and foley sounds for ambience.',
    previewTrack: { ...MOCK_BEATS[2], title: 'Analog Textures (Preview)' },
    type: 'Presets'
  },
  {
    id: 'k3',
    title: 'Drill Loops 2024',
    producer: 'HeavyHitter',
    cover: 'https://picsum.photos/seed/kit3/300/300',
    price: 29.99,
    description: 'Dark and heavy drill melodies ready to chop.',
    previewTrack: { ...MOCK_BEATS[3], title: 'Drill Loops Demo' },
    type: 'Loop Kit'
  },
  {
    id: 'k4',
    title: 'Synth One-Shots',
    producer: 'RetroWave',
    cover: 'https://picsum.photos/seed/kit4/300/300',
    price: 14.99,
    description: 'Classic analog synth stabs and plucks.',
    previewTrack: { ...MOCK_BEATS[4], title: 'Synth Showcase' },
    type: 'One Shots'
  }
];

// --- MOCK SERVICES ---
export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Mixing & Mastering',
    provider: 'AudioLab',
    cover: 'https://picsum.photos/seed/service1/300/300',
    priceFrom: 99.99,
    description: 'Professional mixing to make your track radio ready.',
    exampleTrack: { ...MOCK_BEATS[4], title: 'Mixing Example (Before/After)' }
  },
  {
    id: 's2',
    title: 'Custom Beat Production',
    provider: 'CyberSound',
    cover: 'https://picsum.photos/seed/service2/300/300',
    priceFrom: 299.99,
    description: 'I will create a custom exclusive beat just for you.',
    exampleTrack: { ...MOCK_BEATS[1], title: 'Custom Work Showcase' }
  }
];
