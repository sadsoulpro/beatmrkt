import React from 'react';
import { X, Check, ShoppingCart, Info } from 'lucide-react';
import { Beat, License, LicenseType } from '../types';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  beat: Beat | null;
  onAddToCart: (beat: Beat, license: License) => void;
}

const LICENSES: License[] = [
  {
    type: 'MP3',
    name: 'Basic License',
    price: 20,
    features: ['MP3 Untagged', 'Limited Streams (50k)', '1 Music Video', 'Non-Profit Use']
  },
  {
    type: 'WAV',
    name: 'Premium License',
    price: 40,
    features: ['WAV + MP3 Untagged', 'Max Streams (500k)', '2 Music Videos', 'For Profit Live Performances']
  },
  {
    type: 'UNLIMITED',
    name: 'Unlimited License',
    price: 80,
    features: ['WAV + MP3 + Stems', 'Unlimited Streams', 'Unlimited Videos', 'Radio Broadcasting']
  },
  {
    type: 'EXCLUSIVE',
    name: 'Exclusive Rights',
    price: 'Make an Offer',
    features: ['Full Ownership', 'Removed from Store', 'Unlimited Commercial Use', 'Contract Agreement']
  }
];

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose, beat, onAddToCart }) => {
  if (!isOpen || !beat) return null;

  const handleSelect = (license: License) => {
    if (license.type === 'EXCLUSIVE') {
        alert("Please contact us at offer@beatwave.com to discuss exclusive rights.");
        return;
    }
    onAddToCart(beat, license);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#0A0A0B] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/5 p-6 flex items-start justify-between z-10">
            <div className="flex gap-4 items-center">
                <img src={beat.cover} alt={beat.title} className="w-16 h-16 rounded-lg object-cover shadow-lg border border-white/10" />
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Select a License</h2>
                    <p className="text-gray-400 font-mono text-sm">{beat.title} - {beat.producer}</p>
                </div>
            </div>
            <button 
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* License Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {LICENSES.map((license) => {
                const isFeatured = license.type === 'WAV';
                const isExclusive = license.type === 'EXCLUSIVE';

                return (
                    <div 
                        key={license.type}
                        className={`relative flex flex-col p-5 pt-7 rounded-xl border transition-all duration-300 group hover:scale-[1.02] ${
                            isFeatured 
                            ? 'bg-neon/5 border-neon/50 shadow-[0_0_20px_rgba(118,100,221,0.1)]' 
                            : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                    >
                        {isFeatured && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A0A0B] border border-neon text-neon text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg z-10">
                                Popular
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className={`font-bold text-lg mb-2 ${isFeatured ? 'text-white' : 'text-gray-300'}`}>
                                {license.name}
                            </h3>
                            <div className="font-mono text-2xl font-bold text-neon">
                                {typeof license.price === 'number' ? `$${license.price}` : 'Offer'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                                {license.type}
                            </div>
                        </div>

                        <ul className="flex-grow space-y-3 mb-6">
                            {license.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFeatured ? 'text-neon' : 'text-gray-500'}`} />
                                    <span className="leading-tight">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSelect(license)}
                            className={`w-full py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                                isExclusive
                                ? 'bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white'
                                : isFeatured
                                    ? 'bg-neon text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                    : 'bg-white text-black hover:bg-neon hover:text-white'
                            }`}
                        >
                            {isExclusive ? (
                                <>Make an Offer</>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
        
        {/* Footer info */}
        <div className="p-6 pt-0 text-center">
            <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
                <Info className="w-3 h-3" />
                Bulk deals available automatically in cart.
            </p>
        </div>
      </div>
    </div>
  );
};