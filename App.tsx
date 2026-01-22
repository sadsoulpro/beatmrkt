
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BeatList } from './components/BeatList';
import { TopCharts } from './components/TopCharts';
import { Playlists } from './components/Playlists';
import { SoundKits } from './components/SoundKits';
import { Services } from './components/Services';
import { Auth } from './components/Auth';
import { ForgotPassword } from './components/ForgotPassword';
import { Protocols } from './components/Protocols';
import { EncryptionPolicy } from './components/EncryptionPolicy';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ArtistDashboard } from './components/ArtistDashboard';
import { Profile } from './components/Profile';
import { Player } from './components/Player';
import { LicenseModal } from './components/LicenseModal';
import { CartDrawer } from './components/CartDrawer';
import { CookieBanner } from './components/CookieBanner';
import { MOCK_BEATS, MOCK_PLAYLISTS, MOCK_KITS, MOCK_SERVICES } from './constants';
import { Beat, License, CartItem } from './types';

// Layout component to conditionally render Header and Player
const Layout: React.FC<{
  children: React.ReactNode;
  cartCount: number;
  onOpenCart: () => void;
  currentBeat: Beat | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}> = ({ children, cartCount, onOpenCart, currentBeat, isPlaying, onTogglePlay }) => {
  const location = useLocation();
  const hideHeaderAndPlayer = ['/login', '/forgot-password', '/legal/protocols', '/legal/encryption', '/dash', '/artist', '/admin'].some(path => location.pathname === path || location.pathname.startsWith('/dash') || location.pathname.startsWith('/artist') || location.pathname.startsWith('/admin'));
  const showHero = location.pathname === '/';

  return (
    <div className="min-h-screen font-sans text-white bg-transparent selection:bg-neon selection:text-black">
      {!hideHeaderAndPlayer && (
        <Header 
          cartCount={cartCount} 
          onOpenCart={onOpenCart}
        />
      )}
      
      <main>
        {showHero && <Hero />}
        <div className={!hideHeaderAndPlayer && !showHero ? 'pt-24' : ''}>
           {children}
        </div>
      </main>

      {!hideHeaderAndPlayer && (
        <Player 
            currentBeat={currentBeat} 
            isPlaying={isPlaying} 
            onTogglePlay={onTogglePlay}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Likes State
  const [likedBeatIds, setLikedBeatIds] = useState<string[]>([]);

  // Verification & Notification State
  const [verifiedProducers, setVerifiedProducers] = useState<string[]>(['Metro Boomin']); // Initial mock verified
  const [producerNotifications, setProducerNotifications] = useState<string[]>([]);
  const [artistNotifications, setArtistNotifications] = useState<string[]>([]);

  // License Modal State
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [selectedBeatForLicense, setSelectedBeatForLicense] = useState<Beat | null>(null);

  const handlePlayBeat = (beat: Beat) => {
    if (currentBeat?.id === beat.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentBeat(beat);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (currentBeat) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleLike = (beatId: string) => {
    setLikedBeatIds(prev => 
      prev.includes(beatId) 
        ? prev.filter(id => id !== beatId) 
        : [...prev, beatId]
    );
  };

  const openLicenseModal = (beat: Beat) => {
    setSelectedBeatForLicense(beat);
    setIsLicenseModalOpen(true);
  };

  const closeLicenseModal = () => {
    setIsLicenseModalOpen(false);
    setSelectedBeatForLicense(null);
  };

  const addToCart = (beat: Beat, license: License) => {
    const newItem: CartItem = {
      id: `${beat.id}-${license.type}`,
      beat,
      license
    };
    
    if (!cart.some(item => item.id === newItem.id)) {
        setCart([...cart, newItem]);
    }
    
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Admin Actions
  const handleApproveVerification = (producerName: string) => {
      setVerifiedProducers(prev => [...prev, producerName]);
      setProducerNotifications(prev => [`Congratulations! Your profile "${producerName}" has been verified.`, ...prev]);
  };

  const handleSendNotification = (target: 'producers' | 'artists', message: string) => {
      if (target === 'producers') {
          setProducerNotifications(prev => [message, ...prev]);
      } else {
          setArtistNotifications(prev => [message, ...prev]);
      }
  };

  return (
    <HashRouter>
      <Layout 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)}
        currentBeat={currentBeat}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      >
        <Routes>
          <Route path="/" element={
            <>
                <TopCharts 
                    beats={MOCK_BEATS}
                    currentBeat={currentBeat}
                    isPlaying={isPlaying}
                    onPlay={handlePlayBeat}
                    onOpenLicenseModal={openLicenseModal}
                    likedBeatIds={likedBeatIds}
                    onToggleLike={handleToggleLike}
                    verifiedProducers={verifiedProducers}
                />
                <BeatList 
                    beats={MOCK_BEATS} 
                    currentBeat={currentBeat}
                    isPlaying={isPlaying}
                    onPlay={handlePlayBeat}
                    onOpenLicenseModal={openLicenseModal}
                    likedBeatIds={likedBeatIds}
                    onToggleLike={handleToggleLike}
                    verifiedProducers={verifiedProducers}
                />
            </>
          } />
          <Route path="/beats" element={
            <BeatList 
              beats={MOCK_BEATS} 
              currentBeat={currentBeat}
              isPlaying={isPlaying}
              onPlay={handlePlayBeat}
              onOpenLicenseModal={openLicenseModal}
              likedBeatIds={likedBeatIds}
              onToggleLike={handleToggleLike}
              verifiedProducers={verifiedProducers}
            />
          } />
          <Route path="/playlists" element={
            <Playlists 
              playlists={MOCK_PLAYLISTS}
              currentBeat={currentBeat}
              isPlaying={isPlaying}
              onPlay={handlePlayBeat}
              onOpenLicenseModal={openLicenseModal}
              likedBeatIds={likedBeatIds}
              onToggleLike={handleToggleLike}
            />
          } />
          <Route path="/soundkits" element={
            <SoundKits 
               kits={MOCK_KITS}
               currentBeat={currentBeat}
               isPlaying={isPlaying}
               onPlay={handlePlayBeat}
               onAddToCart={addToCart}
            />
          } />
          <Route path="/services" element={
            <Services 
              services={MOCK_SERVICES}
              currentBeat={currentBeat}
              isPlaying={isPlaying}
              onPlay={handlePlayBeat}
            />
          } />
          <Route path="/login" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/legal/protocols" element={<Protocols />} />
          <Route path="/legal/encryption" element={<EncryptionPolicy />} />
          
          <Route path="/dash/*" element={<Dashboard notifications={producerNotifications} />} />
          <Route path="/admin" element={
              <AdminDashboard 
                 onApproveVerification={handleApproveVerification}
                 onSendNotification={handleSendNotification}
              />
          } />
          
          <Route path="/artist/*" element={
            <ArtistDashboard 
                likedBeatIds={likedBeatIds}
                onToggleLike={handleToggleLike}
                currentBeat={currentBeat}
                isPlaying={isPlaying}
                onPlay={handlePlayBeat}
                onOpenLicenseModal={openLicenseModal}
            />
          } />
          
          {/* Dynamic Profile Route */}
          <Route path="/@:username" element={
            <Profile 
              currentBeat={currentBeat}
              isPlaying={isPlaying}
              onPlay={handlePlayBeat}
              onOpenLicenseModal={openLicenseModal}
              likedBeatIds={likedBeatIds}
              onToggleLike={handleToggleLike}
            />
          } />
        </Routes>
      </Layout>

      {/* Global Modals */}
      <LicenseModal 
        isOpen={isLicenseModalOpen}
        onClose={closeLicenseModal}
        beat={selectedBeatForLicense}
        onAddToCart={addToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={removeFromCart}
      />

      <CookieBanner />
    </HashRouter>
  );
};

export default App;
