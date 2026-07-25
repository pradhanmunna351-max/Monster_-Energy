import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, CategoryType } from '../types';
import { 
  Zap, 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  Flame, 
  Filter, 
  Check, 
  Star,
  Info,
  SlidersHorizontal,
  ThumbsUp
} from 'lucide-react';

const CATEGORY_TABS: { id: CategoryType; label: string; count?: number }[] = [
  { id: 'all', label: 'ALL DRINKS' },
  { id: 'original', label: 'ORIGINAL MONSTER' },
  { id: 'ultra', label: 'ULTRA ZERO SUGAR' },
  { id: 'juice', label: 'JUICE MONSTER' },
  { id: 'rehab', label: 'REHAB TEA' },
  { id: 'java', label: 'JAVA COFFEE' },
  { id: 'hydro', label: 'HYDRO SPORT' },
];

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSelectedProduct, 
    addToCart,
    userPrefs,
    toggleZeroSugarPreference,
    trackProductView
  } = useApp();

  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'caffeine'>('popular');

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category match
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Zero Sugar filter
      if (userPrefs.prefersZeroSugar && !product.isZeroSugar) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchFlavor = product.flavorProfile.toLowerCase().includes(q);
        const matchTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchSubtitle && !matchFlavor && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'caffeine') return b.nutrition.caffeine - a.nutrition.caffeine;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [products, activeCategory, userPrefs.prefersZeroSugar, searchQuery, sortBy]);

  const handleCardClick = (product: Product) => {
    trackProductView(product.id);
    setSelectedProduct(product);
  };

  return (
    <section id="catalog" className="py-16 bg-zinc-950 text-white relative">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono uppercase tracking-widest font-bold mb-3">
              <Zap className="w-3.5 h-3.5" /> COMPLETE MONSTER LINEUP
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase italic">
              PRODUCT <span className="text-green-400">CATALOG</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Explore our full range of high-performance energy drinks, zero-sugar ultras, juice blends, and brewed java coffees.
            </p>
          </div>

          {/* Quick Filters / Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Zero Sugar Toggle */}
            <button
              onClick={toggleZeroSugarPreference}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border flex items-center gap-2 ${
                userPrefs.prefersZeroSugar 
                  ? 'bg-sky-500 text-black border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>ZERO SUGAR ONLY</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-400 hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-zinc-900 text-white">Most Popular</option>
                <option value="caffeine" className="bg-zinc-900 text-white">Highest Caffeine</option>
                <option value="price-low" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-high" className="bg-zinc-900 text-white">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs tracking-wider uppercase whitespace-nowrap transition-all border ${
                activeCategory === tab.id
                  ? 'bg-green-500 text-black border-green-400 shadow-[0_0_15px_rgba(0,255,0,0.4)] scale-105'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center my-12">
            <Info className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white uppercase italic">No Beast Match Found</h3>
            <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
              We couldn't find any drinks matching your search or zero sugar criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                if (userPrefs.prefersZeroSugar) toggleZeroSugarPreference();
              }}
              className="mt-6 bg-green-500 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-zinc-900/80 border border-zinc-800/80 hover:border-green-500/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,0,0.15)] relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                  style={{ backgroundColor: product.accentColor }}
                />

                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 z-10 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {product.isZeroSugar && (
                      <span className="bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        ZERO SUGAR
                      </span>
                    )}
                    {product.isFlashSale && (
                      <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse">
                        <Flame className="w-3 h-3 fill-red-400" /> {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  
                  <span className="text-xs font-mono text-zinc-400 font-bold flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {product.rating}
                  </span>
                </div>

                {/* Product Image & Can Display */}
                <div 
                  onClick={() => handleCardClick(product)}
                  className="cursor-pointer my-4 relative h-52 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] rounded-xl"
                  />
                  
                  {/* Energy Meter Overlay */}
                  <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur border border-zinc-800 px-3 py-1 rounded-lg text-[11px] font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-green-400" />
                    <span>{product.nutrition.caffeine}mg CAFFEINE</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2 mt-2">
                  <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold">
                    {product.subtitle}
                  </span>
                  <h3 
                    onClick={() => handleCardClick(product)}
                    className="text-xl font-black text-white uppercase italic group-hover:text-green-400 transition-colors cursor-pointer leading-tight"
                  >
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    <span className="font-semibold text-zinc-300">Flavor:</span> {product.flavorProfile}
                  </p>
                </div>

                {/* Energy & Sweetness Indicator */}
                <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-zinc-800/80 text-[11px]">
                  <div>
                    <span className="text-zinc-500 font-mono block">ENERGY:</span>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <div
                          key={lvl}
                          className={`h-1.5 flex-1 rounded-full ${
                            lvl <= product.energyLevel ? 'bg-green-400' : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-500 font-mono block">SWEETNESS:</span>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <div
                          key={lvl}
                          className={`h-1.5 flex-1 rounded-full ${
                            lvl <= product.sweetnessLevel ? 'bg-amber-400' : 'bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-extrabold font-mono text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-mono text-zinc-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 block">Single 16oz Can</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCardClick(product)}
                      className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl border border-zinc-700 transition-colors"
                      title="Quick Flavor Breakdown"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-500 hover:bg-green-400 text-black px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,0,0.3)] hover:shadow-[0_0_18px_rgba(0,255,0,0.5)] transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
