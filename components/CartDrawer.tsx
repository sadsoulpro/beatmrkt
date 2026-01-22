import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const [promoCode, setPromoCode] = useState('');
  
  const totalPrice = cartItems.reduce((sum, item) => {
    return typeof item.license.price === 'number' ? sum + item.license.price : sum;
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0B] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[80] transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Your Cart <span className="text-neon text-sm font-mono">({cartItems.length})</span>
            </h2>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
            {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <Trash2 className="w-8 h-8 opacity-50" />
                    </div>
                    <p>Your cart is empty.</p>
                    <button onClick={onClose} className="text-neon hover:underline text-sm">Browse Beats</button>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
                        <img src={item.beat.cover} alt={item.beat.title} className="w-16 h-16 rounded-md object-cover" />
                        
                        <div className="flex-grow min-w-0 flex flex-col justify-center">
                            <h4 className="font-bold text-white truncate">{item.beat.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-mono text-neon border border-neon/30 px-1.5 rounded bg-neon/5">
                                    {item.license.type}
                                </span>
                                <span className="text-xs text-gray-400 truncate">
                                    {item.license.name}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                            <span className="font-mono font-bold text-white">
                                ${item.license.price}
                            </span>
                            <button 
                                onClick={() => onRemoveItem(item.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
            <div className="border-t border-white/10 p-6 bg-[#0A0A0B] space-y-4">
                
                {/* Promo Code */}
                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Promo Code" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon/50 focus:bg-white/10 transition-all font-mono uppercase"
                        />
                    </div>
                    <button className="bg-white/10 text-white px-4 py-2.5 rounded-lg text-xs font-bold font-mono hover:bg-white/20 transition-colors uppercase">
                        Apply
                    </button>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl font-bold text-white font-mono tracking-tight">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-neon text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors group shadow-[0_0_20px_rgba(118,100,221,0.3)]">
                    CHECKOUT
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-center text-[10px] text-gray-600">
                    Secure checkout powered by Stripe
                </p>
            </div>
        )}
      </div>
    </>
  );
};