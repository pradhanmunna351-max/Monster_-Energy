import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  Gift, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    clearCart, 
    addPoints 
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'monster'>('apple');
  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@monsterenergy.com',
    address: '742 Beverly Hills Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90026',
    cardNumber: '•••• •••• •••• 4242'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const earnedPoints = Math.round(cartTotal * 10); // 10 points per dollar

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      const randomTrack = 'MNSTR-' + Math.floor(100000 + Math.random() * 900000);
      setTrackingNumber(randomTrack);
      addPoints(earnedPoints, `Order #${randomTrack}`);
      clearCart();
    }, 1500);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl my-8 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={closeCheckout}
          className="absolute top-4 right-4 p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <h3 className="text-2xl font-black uppercase italic text-white">
                EXPRESS <span className="text-green-400">CHECKOUT</span>
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Encrypted 256-bit secure checkout. Fast mobile order processing.
            </p>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-2">
                  PAYMENT METHOD:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'apple', label: 'APPLE PAY', icon: '🍎' },
                    { id: 'card', label: 'CREDIT CARD', icon: '💳' },
                    { id: 'monster', label: 'MONSTER PAY', icon: '⚡' },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl text-xs font-extrabold uppercase border flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === m.id
                          ? 'bg-green-500/20 border-green-400 text-white shadow-[0_0_12px_rgba(0,255,0,0.3)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span>{m.icon}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-400 font-bold uppercase block">
                  SHIPPING ADDRESS:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-green-500"
                  required
                />

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-green-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Earn Points Highlight Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 to-green-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="font-extrabold text-white block">Vault Points Reward</span>
                    <span className="text-[11px] text-zinc-300">You will earn +{earnedPoints} Monster Vault points on this order!</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">+{earnedPoints} PTS</span>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-zinc-400 block">TOTAL DUE:</span>
                  <span className="text-2xl font-black font-mono text-green-400">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(0,255,0,0.5)] transition-all transform active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>PROCESSING BEAST ORDER...</span>
                  ) : (
                    <>
                      <span>COMPLETE ORDER</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Order Celebration Screen */
          <div className="text-center py-8 space-y-6 animate-scale-up">
            <div className="w-20 h-20 bg-green-500/20 border-2 border-green-400 rounded-full flex items-center justify-center mx-auto text-green-400 shadow-[0_0_30px_rgba(0,255,0,0.6)] animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-widest">
                ORDER CONFIRMED & DISPATCHED!
              </span>
              <h3 className="text-3xl font-black uppercase italic text-white mt-1">
                UNLEASH THE BEAST!
              </h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto mt-2">
                Thank you for your order. Your energy crate is being cold-packed and dispatched via express courier.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-xs font-mono space-y-2 max-w-sm mx-auto text-left">
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">TRACKING NUMBER:</span>
                <span className="text-green-400 font-bold">{trackingNumber}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">ESTIMATED DELIVERY:</span>
                <span className="text-white">Tomorrow by 10:00 AM</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold pt-1">
                <span>POINTS EARNED:</span>
                <span>+{earnedPoints} PTS</span>
              </div>
            </div>

            <button
              onClick={closeCheckout}
              className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider"
            >
              RETURN TO HOMEPAGE
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
