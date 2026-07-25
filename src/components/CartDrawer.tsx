import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Zap, 
  Gift, 
  Tag, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount,
    userPrefs,
    setIsCheckoutOpen,
    activeFlashSale
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [usePointsDiscount, setUsePointsDiscount] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BEAST25' || promoCode.trim().toUpperCase() === 'SURGE30') {
      setAppliedPromo(promoCode.trim().toUpperCase());
      setPromoCode('');
    }
  };

  // Calculate discounts
  let promoDiscount = 0;
  if (appliedPromo === 'BEAST25') promoDiscount = cartTotal * 0.25;
  if (appliedPromo === 'SURGE30') promoDiscount = cartTotal * 0.30;

  let pointsDiscount = usePointsDiscount ? 5.00 : 0;
  const finalTotal = Math.max(0, cartTotal - promoDiscount - pointsDiscount);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full p-6 text-white flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-400" />
              <h3 className="font-black text-lg uppercase italic text-white">
                YOUR ENERGY CART ({cartCount})
              </h3>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-full border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h4 className="font-bold text-white uppercase italic">YOUR CART IS EMPTY</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Explore our catalog to add Monster drinks, zero sugar ultras, or java coffee.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 bg-green-500 hover:bg-green-400 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase"
              >
                EXPLORE DRINKS
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {cart.map((item) => {
                let itemMultiplier = 1;
                if (item.selectedSize.includes('12-Pack')) itemMultiplier = 10.5;
                if (item.selectedSize.includes('24-Pack') || item.selectedSize.includes('Vault')) itemMultiplier = 19.5;
                if (item.selectedSize.includes('24 oz Mega')) itemMultiplier = 1.4;

                const singlePrice = item.product.price * itemMultiplier;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-contain shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-green-400 font-bold block truncate">
                        {item.selectedSize}
                      </span>
                      <h4 className="font-extrabold text-xs text-white uppercase truncate">
                        {item.product.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-zinc-300 block mt-0.5">
                        ${(singlePrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-black/60 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 font-mono text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer / Summary / Promo / Checkout Button */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. BEAST25)..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-xl text-xs font-bold uppercase"
              >
                APPLY
              </button>
            </form>

            {/* Points Discount Toggle */}
            {userPrefs.points >= 200 && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span className="text-zinc-200 font-bold">Use 200 Vault Pts ($5 OFF)</span>
                </div>
                <input
                  type="checkbox"
                  checked={usePointsDiscount}
                  onChange={(e) => setUsePointsDiscount(e.target.checked)}
                  className="accent-amber-400 w-4 h-4 cursor-pointer"
                />
              </div>
            )}

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-mono text-zinc-400 pt-1">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-400 font-bold">
                  <span>PROMO DISCOUNT ({appliedPromo})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              {pointsDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>VAULT POINTS DISCOUNT</span>
                  <span>-${pointsDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>EXPRESS SHIPPING</span>
                <span className="text-green-400">FREE</span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                <span>TOTAL</span>
                <span className="text-green-400">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
