import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { Music, Heart, Download, Clock, Search, ChevronRight, Settings, MessageSquare, LogOut, LayoutDashboard, Wallet, CreditCard, Menu, X } from 'lucide-react';
import { Beat } from '../types';
import { MOCK_BEATS } from '../constants';
import { BeatRow } from './BeatRow';
import { Messages } from './Messages';

interface ArtistDashboardProps {
  likedBeatIds: string[];
  onToggleLike: (id: string) => void;
  currentBeat: Beat | null;
  isPlaying: boolean;
  onPlay: (beat: Beat) => void;
  onOpenLicenseModal: (beat: Beat) => void;
}

export const ArtistDashboard: React.FC<ArtistDashboardProps> = ({ 
  likedBeatIds, 
  onToggleLike,
  currentBeat,
  isPlaying,
  onPlay,
  onOpenLicenseModal
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'purchased' | 'messages' | 'settings'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter beats for favorites
  const favoriteBeats = MOCK_BEATS.filter(beat => likedBeatIds.includes(beat.id));
  
  // Mock purchased beats (random subset)
  const purchasedBeats = MOCK_BEATS.slice(0, 3);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
             {/* Stats */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div onClick={() => setActiveTab('purchased')} className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 hover:border-neon/50 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Download className="w-32 h-32" /></div>
                    <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center text-neon mb-4 group-hover:bg-neon group-hover:text-black transition-colors relative z-10">
                        <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1 relative z-10">Purchased Beats</h3>
                    <p className="text-gray-500 text-xs font-mono relative z-10">{purchasedBeats.length} Tracks available</p>
                </div>

                <div onClick={() => setActiveTab('favorites')} className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 hover:border-pink-500/50 transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Heart className="w-32 h-32" /></div>
                    <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-500 mb-4 group-hover:bg-pink-500 group-hover:text-black transition-colors relative z-10">
                        <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1 relative z-10">Favorites</h3>
                    <p className="text-gray-500 text-xs font-mono relative z-10">{favoriteBeats.length} Beats saved</p>
                </div>
                 
                <div onClick={() => setActiveTab('messages')} className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-colors group cursor-pointer relative overflow-hidden">
                     <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><MessageSquare className="w-32 h-32" /></div>
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-black transition-colors relative z-10">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1 relative z-10">Messages</h3>
                    <p className="text-gray-500 text-xs font-mono relative z-10">2 Unread conversations</p>
                </div>
             </div>

             {/* Recent Activity */}
             <div className="bg-[#0F0F11] border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon" /> Recent Activity
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-3 items-start border-b border-white/5 pb-3">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs">🎹</div>
                        <div>
                            <p className="text-sm text-gray-300">Metro Boomin uploaded 3 new beats.</p>
                            <span className="text-[10px] text-gray-600 font-mono">2 hours ago</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start border-b border-white/5 pb-3">
                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs">💸</div>
                        <div>
                            <p className="text-sm text-gray-300">Purchase successful: "Neon Nights"</p>
                            <span className="text-[10px] text-gray-600 font-mono">Yesterday</span>
                        </div>
                    </div>
                </div>
             </div>
             
             {/* Recommended Section */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
                    <button onClick={() => navigate('/beats')} className="text-xs text-neon font-mono hover:text-white transition-colors flex items-center gap-1">
                        View All <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_BEATS.slice(0, 4).map((beat) => (
                        <div key={beat.id} onClick={() => onPlay(beat)} className="bg-[#0F0F11] border border-white/5 rounded-xl p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                            <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                                <img src={beat.cover} alt={beat.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Music className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h4 className="font-bold text-white truncate">{beat.title}</h4>
                            <p className="text-xs text-gray-500">{beat.producer}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
        
      case 'purchased':
        return (
           <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Download className="text-neon" /> My Library</h2>
              <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-400">
                    <tr>
                      <th className="px-6 py-4">Cover</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">License</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                    {purchasedBeats.map((beat) => (
                      <tr key={beat.id} className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4">
                            <div className="relative w-10 h-10 group cursor-pointer" onClick={() => onPlay(beat)}>
                                <img src={beat.cover} alt={beat.title} className="w-full h-full rounded object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                                     <Music className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-white">{beat.title}</td>
                        <td className="px-6 py-4"><span className="text-xs bg-neon/10 text-neon px-2 py-1 rounded border border-neon/20 font-mono">Unlimited</span></td>
                        <td className="px-6 py-4 text-xs font-mono text-gray-500">Oct 24, 2023</td>
                        <td className="px-6 py-4 text-right">
                            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ml-auto">
                                <Download className="w-3 h-3" /> Files
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        );

      case 'favorites':
        return (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Heart className="text-pink-500" /> Liked Tracks</h2>
            <div className="flex flex-col gap-0">
               {favoriteBeats.length > 0 ? (
                  favoriteBeats.map((beat, index) => (
                    <BeatRow 
                        key={beat.id} 
                        beat={beat} 
                        index={index + 1}
                        isPlaying={isPlaying}
                        isActive={currentBeat?.id === beat.id}
                        onPlay={onPlay}
                        onOpenLicenseModal={onOpenLicenseModal}
                        isLiked={true}
                        onToggleLike={onToggleLike}
                    />
                  ))
               ) : (
                  <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
                      <Heart className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 font-mono">No liked tracks yet.</p>
                      <button onClick={() => navigate('/beats')} className="text-neon text-sm hover:underline mt-2">Browse Catalog</button>
                  </div>
               )}
            </div>
          </div>
        );
        
      case 'messages':
        return (
           <div className="animate-in fade-in duration-300">
               <Messages />
           </div>
        );

      case 'settings':
         return (
             <div className="animate-in fade-in duration-300 max-w-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                <div className="space-y-6">
                    <div className="bg-[#0F0F11] border border-white/5 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-4">Profile</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-mono text-gray-500 uppercase">Stage Name</label>
                                <input type="text" defaultValue="Lil Sky" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-neon outline-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-mono text-gray-500 uppercase">Email</label>
                                <input type="email" defaultValue="artist@gmail.com" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-neon outline-none" />
                            </div>
                        </div>
                    </div>
                     <div className="bg-[#0F0F11] border border-white/5 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-4">Payment Methods</h3>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                           <CreditCard className="w-6 h-6 text-gray-400" />
                           <div className="flex-grow">
                              <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                              <p className="text-xs text-gray-500">Expires 12/25</p>
                           </div>
                           <button className="text-xs text-red-400 hover:text-white">Remove</button>
                        </div>
                    </div>
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-neon transition-colors">Save Changes</button>
                </div>
             </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] flex pt-16">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl md:hidden flex flex-col p-6 animate-in slide-in-from-left duration-300">
                <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[1px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="https://picsum.photos/seed/artist_avatar/100/100" alt="Profile" className="w-full h-full object-cover opacity-80" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Lil Sky</h3>
                            <p className="text-pink-500 text-[10px] font-mono uppercase tracking-wider">Artist Account</p>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="space-y-2">
                    <button onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <LayoutDashboard size={18} /> <span className="font-medium text-sm">Overview</span>
                    </button>
                     <button onClick={() => { setActiveTab('purchased'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'purchased' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Download size={18} /> <span className="font-medium text-sm">My Library</span>
                    </button>
                     <button onClick={() => { setActiveTab('favorites'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'favorites' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Heart size={18} /> <span className="font-medium text-sm">Favorites</span>
                    </button>
                    <button onClick={() => { setActiveTab('messages'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'messages' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <MessageSquare size={18} /> <span className="font-medium text-sm">Messages</span>
                    </button>
                     <button onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Settings size={18} /> <span className="font-medium text-sm">Settings</span>
                    </button>
                    
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all mt-6">
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Log Out</span>
                    </button>
                </nav>
            </div>
        )}

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#0A0A0B] fixed h-[calc(100vh-64px)] overflow-y-auto z-20">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors" onClick={() => navigate('/@lil_sky')}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-[1px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                        <img src="https://picsum.photos/seed/artist_avatar/100/100" alt="Profile" className="w-full h-full object-cover opacity-80" />
                    </div>
                    </div>
                    <div>
                    <h3 className="text-white font-bold text-sm">Lil Sky</h3>
                    <p className="text-pink-500 text-[10px] font-mono uppercase tracking-wider">Artist Account</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <LayoutDashboard size={18} /> <span className="font-medium text-sm">Overview</span>
                    </button>
                     <button onClick={() => setActiveTab('purchased')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'purchased' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Download size={18} /> <span className="font-medium text-sm">My Library</span>
                    </button>
                     <button onClick={() => setActiveTab('favorites')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'favorites' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Heart size={18} /> <span className="font-medium text-sm">Favorites</span>
                    </button>
                    <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'messages' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <MessageSquare size={18} /> <span className="font-medium text-sm">Messages</span>
                    </button>
                     <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Settings size={18} /> <span className="font-medium text-sm">Settings</span>
                    </button>
                    
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all mt-6">
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Log Out</span>
                    </button>
                </nav>
            </div>
        </aside>

        {/* Content */}
         <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-x-hidden min-h-[calc(100vh-64px)] pb-24 md:pb-10">
             {/* Mobile Header for Artist Dashboard */}
             <div className="md:hidden flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1>
             </div>
             {renderContent()}
         </main>
    </div>
  );
};