
export interface Beat {
  id: string;
  title: string;
  producer: string;
  cover: string;
  bpm: number;
  key: string;
  price: number;
  tags: string[];
  duration: string;
  waveformData: number[]; // Array of heights for the visualizer
  plays: number;
  likes: number;
  purchases: number;
}

export interface PlayerState {
  currentBeat: Beat | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
}

export type LicenseType = 'MP3' | 'WAV' | 'UNLIMITED' | 'EXCLUSIVE';

export interface License {
  type: LicenseType;
  name: string;
  price: number | 'Make an Offer';
  features: string[];
}

export interface CartItem {
  id: string; // unique cart item id (beatId + license)
  beat: Beat;
  license: License;
}

export type ViewType = 'beats' | 'playlists' | 'soundkits' | 'services' | 'enter' | 'forgot-password' | 'protocols' | 'encryption-policy' | 'dashboard' | 'admin';

export interface Playlist {
  id: string;
  title: string;
  author: string;
  cover: string;
  beats: Beat[];
  tags: string[]; // Added for filtering (e.g., 'Best', 'Exclusive')
}

export type SoundKitType = 'Drum Kit' | 'Loop Kit' | 'Samples' | 'Midi Kit' | 'Presets' | 'One Shots';

export interface SoundKit {
  id: string;
  title: string;
  producer: string;
  cover: string;
  price: number;
  description: string;
  previewTrack: Beat; // The track that plays when previewed
  type: SoundKitType; // Added for filtering
}

export interface Service {
  id: string;
  title: string;
  provider: string;
  cover: string;
  priceFrom: number;
  description: string;
  exampleTrack: Beat; // The track that plays as an example
}

export interface VerificationRequest {
  id: string;
  producerName: string;
  email: string;
  socialLink: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}
