import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Zap, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Plus, 
  Minus,
  Sparkles,
  MapPin,
  Heart
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsStoreLocatorOpen } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>('16 oz Can');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  if (!selectedProduct) return null;

  // Price adjustment based on size selection
  let sizePrice = selectedProduct.price;
  if (selectedSize.includes('24 oz Mega')) sizePrice = selectedProduct.price * 1.4;
  if (selectedSize.includes('12-Pack')) sizePrice = selectedProduct.price * 10.5;
  if (selectedSize.includes('24-Pack') || selectedSize.includes('Crate')) sizePrice = selectedProduct.price * 19.5;

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 text-white shadow-2xl my-8 overflow-hidden"
        style={{ boxShadow: `0 0 50px ${selectedProduct.accentColor}25` }}
      >
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Image & Can Showcase */}
          <div className="relative flex flex-col items-center justify-center bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 min-h-[340px]">
            {/* Background Glow */}
            <div 
              className="absolute w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: selectedProduct.accentColor }}
            />

            {/* Product Image */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="h-72 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] z-10 hover:scale-105 transition-transform"
            />

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 z-10">
              {selectedProduct.isZeroSugar && (
                <span className="bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold px-3 py-1 rounded-full">
                  ZERO SUGAR
                </span>
              )}
              <span className="bg-green-500/20 text-green-400 border border-green-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> {selectedProduct.nutrition.caffeine}mg CAFFEINE
              </span>
            </div>
          </div>

          {/* Right Column: Flavor Profile & Details */}
          <div className="space-y-5">
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-widest">
                  {selectedProduct.subtitle}
                </span>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-1.5 rounded-full border transition-colors ${
                    isFavorite ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase italic text-white mt-1">
                {selectedProduct.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-zinc-300">
                  {selectedProduct.rating} ({selectedProduct.reviewsCount} Fan Reviews)
                </span>
              </div>
            </div>

            {/* Flavor Tasting Notes */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block font-bold mb-1">
                TASTING PROFILE:
              </span>
              <p className="text-sm font-semibold text-green-300">
                {selectedProduct.flavorProfile}
              </p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedProduct.longDescription}
            </p>

            {/* Nutrition Facts Quick Table */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 font-bold">
                <span className="text-zinc-400">NUTRITION SUMMARY</span>
                <span className="text-green-400">PER CAN</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                <div className="bg-black/50 p-2 rounded-lg">
                  <span className="text-zinc-500 text-[10px] block">CALORIES</span>
                  <span className="font-extrabold text-white">{selectedProduct.nutrition.calories}</span>
                </div>
                <div className="bg-black/50 p-2 rounded-lg">
                  <span className="text-zinc-500 text-[10px] block">SUGARS</span>
                  <span className="font-extrabold text-white">{selectedProduct.nutrition.sugars}g</span>
                </div>
                <div className="bg-black/50 p-2 rounded-lg">
                  <span className="text-zinc-500 text-[10px] block">TAURINE</span>
                  <span className="font-extrabold text-green-400">YES</span>
                </div>
              </div>
              <div className="text-[10px] text-zinc-400 pt-1 flex items-center justify-between">
                <span>B-Vitamins: {selectedProduct.nutrition.bVitamins.join(', ')}</span>
                <span>Sodium: {selectedProduct.nutrition.sodium}mg</span>
              </div>
            </div>

            {/* Size Options Selector */}
            <div>
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-2">
                SELECT PACK SIZE:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                      selectedSize === sz
                        ? 'bg-green-500 text-black border-green-400 shadow-[0_0_12px_rgba(0,255,0,0.4)]'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart Row */}
            <div className="flex items-center gap-4 pt-2 border-t border-zinc-800">
              
              {/* Quantity Counter */}
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-mono font-extrabold text-sm text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total Price & Add Button */}
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 block">TOTAL</span>
                  <span className="text-xl font-black font-mono text-white">
                    ${(sizePrice * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>

            </div>

            {/* Store Locator Link */}
            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setIsStoreLocatorOpen(true);
                }}
                className="text-xs font-mono text-zinc-400 hover:text-green-400 underline transition-colors inline-flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Check inventory at nearby gas stations & supermarkets
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
