
import React, { useState } from 'react';
import { ShoppingCart, LayoutDashboard, Menu, X, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beats', path: '/beats' },
    { label: 'Playlists', path: '/playlists' },
    { label: 'Sound Kits', path: '/soundkits' },
    { label: 'Services', path: '/services' },
  ];

  const isActive = (path: string) => {
    if (path === '/beats' && location.pathname === '/') return false;
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 z-40 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-6 md:px-12 shadow-lg">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 text-neon cursor-pointer group z-50"
          onClick={() => navigate('/')}
        >
          <span className="font-bold text-xl tracking-tighter text-white drop-shadow-md">BEAT<span className="text-neon">WAVE</span></span>
        </div>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`px-5 py-1.5 text-xs font-medium font-mono rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(118,100,221,0.2)] ${
                  isActive(item.path)
                  ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(118,100,221,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-6 z-50">
          
          {/* Admin Link (Hidden/Subtle for Demo) */}
          <Link to="/admin" className="hidden lg:flex p-2 text-gray-600 hover:text-red-500 transition-colors" title="Admin Panel">
             <Shield className="w-4 h-4" />
          </Link>

          {/* Dashboard Link */}
          <Link 
             to="/dash"
             className={`hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium font-mono rounded-full border transition-all duration-300 ${
                location.pathname === '/dash'
                ? 'bg-neon/10 text-neon border-neon/30'
                : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
             }`}
             title="Producer Dashboard"
          >
             <LayoutDashboard className="w-4 h-4" />
             <span className="hidden lg:inline">Dashboard</span>
          </Link>

          {/* Enter Button (Hidden on mobile to save space, moved to menu) */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
            <Link 
               to="/login"
               className={`px-5 py-1.5 text-xs font-medium font-mono rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(118,100,221,0.2)] ${
                  location.pathname === '/login'
                  ? 'bg-neon/20 text-white shadow-[0_0_10px_rgba(118,100,221,0.2)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
               }`}
            >
               ENTER
            </Link>
          </div>

          <button 
            onClick={onOpenCart}
            className="relative group p-2 hover:bg-white/5 rounded-full transition-all"
          >
            <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-neon transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-neon text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(118,100,221,0.5)] animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Burger Menu Button */}
          <button 
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Moved outside header for proper z-indexing and full height */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-[#0A0A0B]/95 backdrop-blur-2xl z-[100] md:hidden flex flex-col p-6 animate-in slide-in-from-right duration-300 border-t border-white/10 overflow-y-auto">
            <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-bold p-4 rounded-xl border border-white/5 transition-all flex justify-between items-center group ${
                            isActive(item.path) 
                            ? 'bg-neon/10 text-neon border-neon/30' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/10'
                        }`}
                    >
                        {item.label}
                        {isActive(item.path) && <div className="w-2 h-2 bg-neon rounded-full shadow-[0_0_5px_rgba(118,100,221,0.8)]"></div>}
                    </Link>
                ))}
                
                <div className="h-px bg-white/10 my-2"></div>

                <Link
                    to="/dash"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold p-4 rounded-xl border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3"
                >
                    <LayoutDashboard className="w-5 h-5 text-gray-500" /> 
                    Dashboard
                </Link>

                <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold p-4 rounded-xl border border-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center gap-3"
                >
                    <Shield className="w-5 h-5 text-gray-500" /> 
                    Admin
                </Link>

                <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold p-4 rounded-xl bg-white text-black hover:bg-neon hover:text-white transition-all text-center mt-2 shadow-lg"
                >
                    ENTER STUDIO
                </Link>
            </nav>
        </div>
      )}
    </>
  );
};
