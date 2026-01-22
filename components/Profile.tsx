import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Link as LinkIcon, Users, Play, Heart, Share2, MessageSquare, Instagram, Twitter, Disc, LayoutDashboard } from 'lucide-react';
import { Beat } from '../types';
import { BeatRow } from './BeatRow';
import { MOCK_BEATS } from '../constants';

interface ProfileProps {
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onOpenLicenseModal: (beat: Beat) => void;
  likedBeatIds: string[];
  onToggleLike: (id: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
    currentBeat, 
    isPlaying, 
    onPlay, 
    onOpenLicenseModal,
    likedBeatIds,
    onToggleLike
}) => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Logic to determine if this is a producer or an artist (Simulated)
  const isProducer = username?.toLowerCase().includes('producer') || username?.toLowerCase() === 'metro_boomin' || username?.toLowerCase() === 'cybersound';
  
  // Default active tab: 'tracks' for producers, 'favorites' for artists
  const [activeTab, setActiveTab] = useState<'tracks' | 'favorites' | 'about'>(isProducer ? 'tracks' : 'favorites');

  const displayName = username ? username.charAt(0).toUpperCase() + username.slice(1).replace('_', ' ') : 'Unknown User';

  // Mock data for the profile
  const profileData = {
    avatar: `https://picsum.photos/seed/${username}/200/200`,
    cover: `https://picsum.photos/seed/${username}_cover/1200/400`,
    bio: isProducer 
      ? "Sound Architect. Creating sonic landscapes for the next generation of artists. Credits: Drake, Travis Scott, Future." 
      : "Vocalist & Songwriter exploring the depths of synthwave and trap soul.",
    location: "Los Angeles, CA",
    role: isProducer ? "Producer" : "Artist",
    followers: "12.5k",
    following: "342"
  };

  // Filter beats for this producer
  const userTracks = isProducer ? MOCK_BEATS : [];
  
  // For artist profile, show their "Liked" tracks (simulated for viewing another profile)
  // Since we don't have a backend, we'll just show a subset of mock beats as "their favorites"
  const artistFavorites = !isProducer ? MOCK_BEATS.slice(0, 4) : [];

  return (
    <div className="w-full min-h-screen pb-32">
        {/* Cover Image */}
        <div className="h-48 md:h-72 w-full relative group overflow-hidden">
            <img 
                src={profileData.cover} 
                alt="Cover" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row items-end md:items-start gap-6">
                
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0A0A0B] overflow-hidden bg-surface shadow-2xl">
                        <img src={profileData.avatar} alt={displayName} className="w-full h-full object-cover" />
                    </div>
                    {/* Status Indicator */}
                    <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 border-4 border-[#0A0A0B] rounded-full" title="Online"></div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 flex flex-col gap-2 pt-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                                {displayName}
                                {isProducer && <CheckCircle2 className="w-6 h-6 text-neon fill-current bg-white rounded-full p-[1px]" />}
                            </h1>
                            <p className={`${isProducer ? 'text-neon' : 'text-pink-500'} font-mono text-sm uppercase tracking-widest mt-1`}>{profileData.role}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsFollowing(!isFollowing)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${
                                    isFollowing 
                                    ? 'bg-transparent border border-white/20 text-white hover:border-red-500 hover:text-red-500' 
                                    : 'bg-white text-black hover:bg-neon hover:text-white'
                                }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                            <button 
                                onClick={() => navigate(isProducer ? '/dash/messages' : '/artist/messages')}
                                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4"
                            >
                                <MessageSquare className="w-5 h-5" />
                                <span className="hidden md:inline text-xs font-bold">Message</span>
                            </button>
                            <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400 mt-2">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {profileData.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <LinkIcon className="w-3.5 h-3.5" />
                            <a href="#" className="hover:text-neon transition-colors">beatwave.com/{username}</a>
                        </div>
                        <div className="flex items-center gap-1">
                             <Users className="w-3.5 h-3.5" />
                             <span className="text-white font-bold">{profileData.followers}</span> Followers
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm max-w-2xl mt-3 leading-relaxed">
                        {profileData.bio}
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 mt-10 border-b border-white/10 overflow-x-auto no-scrollbar">
                {isProducer && (
                    <button 
                        onClick={() => setActiveTab('tracks')}
                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                            activeTab === 'tracks' ? 'text-neon' : 'text-gray-500 hover:text-white'
                        }`}
                    >
                        Latest Releases
                        {activeTab === 'tracks' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_rgba(118,100,221,0.5)]"></div>}
                    </button>
                )}
                
                <button 
                    onClick={() => setActiveTab('favorites')}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                        activeTab === 'favorites' ? (isProducer ? 'text-neon' : 'text-pink-500') : 'text-gray-500 hover:text-white'
                    }`}
                >
                    Favorites
                    {activeTab === 'favorites' && <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isProducer ? 'bg-neon shadow-[0_0_10px_rgba(118,100,221,0.5)]' : 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]'}`}></div>}
                </button>
                
                <button 
                    onClick={() => setActiveTab('about')}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                        activeTab === 'about' ? 'text-white' : 'text-gray-500 hover:text-white'
                    }`}
                >
                    About
                    {activeTab === 'about' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>}
                </button>
            </div>

            {/* Content Area */}
            <div className="mt-8">
                {activeTab === 'tracks' && isProducer && (
                    <div className="flex flex-col gap-0">
                        {userTracks.map((beat, index) => (
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
                )}

                {activeTab === 'favorites' && (
                    <div className="flex flex-col gap-0">
                        {(isProducer ? [] : artistFavorites).length > 0 ? (
                            (isProducer ? [] : artistFavorites).map((beat, index) => (
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
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-xl">
                                <Heart className="w-10 h-10 mb-4 opacity-20" />
                                <p className="font-mono text-sm">No public favorites.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-white mb-4">Biography</h3>
                                <p className="text-gray-400 text-sm leading-7">
                                    {profileData.bio} Born in the analog era, raised in the digital age. 
                                    Obsessed with the perfect kick drum and the space between notes. 
                                    Always looking for new collaborations with artists who want to push boundaries.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white/5 border border-white/5 p-6 rounded-xl">
                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-neon">Connect</h3>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                        <Instagram className="w-5 h-5" /> Instagram
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                        <Twitter className="w-5 h-5" /> Twitter
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                        <Disc className="w-5 h-5" /> Discord
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};