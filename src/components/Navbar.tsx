import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  ShoppingBag, 
  Bell, 
  MapPin, 
  Gift, 
  Search, 
  Sparkles, 
  X,
  ChevronRight,
  Flame
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    userPrefs, 
    notifications, 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen,
    searchQuery,
    setSearchQuery,
    activeFlashSale,
    setIsStoreLocatorOpen,
    setIsQuizOpen,
    toggleZeroSugarPreference,
    triggerSimulatedFlashSale
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 text-white shadow-2xl">
      {/* Flash Sale Top Bar Ticker */}
      {activeFlashSale && (
        <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-black px-4 py-1.5 font-extrabold text-xs tracking-wider uppercase flex items-center justify-between shadow-inner overflow-hidden">
          <div className="flex items-center gap-2 animate-pulse mx-auto sm:mx-0">
            <Flame className="w-4 h-4 fill-black text-black" />
            <span>{activeFlashSale.title} - Use Code <span className="bg-black text-lime-400 px-2 py-0.5 rounded font-mono font-bold">{activeFlashSale.code}</span></span>
          </div>
          <button 
            onClick={triggerSimulatedFlashSale}
            className="hidden sm:flex items-center gap-1 bg-black/20 hover:bg-black/40 text-black px-2 py-0.5 rounded text-[10px] transition-colors"
          >
            <Sparkles className="w-3 h-3" /> Simulate Flash Sale Drop
          </button>
        </div>
      )}

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Monster Claw */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 bg-black rounded-xl border border-green-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.3)] group-hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] group-hover:border-green-400 transition-all duration-300">
            {/* SVG Monster Claw Scratch */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-green-400 fill-current drop-shadow-[0_0_8px_#00ff00]">
              <path d="M20 15 Q30 50 25 85 Q35 50 30 15 Z" />
              <path d="M45 10 Q55 50 50 90 Q60 50 55 10 Z" />
              <path d="M70 20 Q80 50 75 80 Q85 50 80 20 Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl sm:text-2xl tracking-tighter text-white uppercase italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              MONSTER<span className="text-green-400 drop-shadow-[0_0_10px_#00ff00]">ENERGY</span>
            </span>
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono">
              UNLEASH THE BEAST®
            </span>
          </div>
        </a>

        {/* Search Bar - Responsive */}
        <div className="hidden md:flex flex-1 max-w-xs relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search Ultra, Mango Loco, Java..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Zero Sugar Preference Toggle */}
          <button
            onClick={toggleZeroSugarPreference}
            className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
              userPrefs.prefersZeroSugar 
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Toggle Zero Sugar preference"
          >
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden lg:inline">Zero Sugar</span>
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-green-950 hover:to-zinc-900 text-green-400 border border-green-500/30 hover:border-green-400 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-green-400 animate-spin-slow" />
            <span>Flavor Match</span>
          </button>

          {/* Store Locator Trigger */}
          <button
            onClick={() => setIsStoreLocatorOpen(true)}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full border border-zinc-800 transition-colors relative"
            title="Find Stores Near You"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Monster Vault Points Badge */}
          <a
            href="#rewards-vault"
            className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-all shadow-md"
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>{userPrefs.points}</span>
            <span className="text-[10px] text-zinc-500 font-normal uppercase hidden sm:inline">PTS</span>
          </a>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full border border-zinc-800 transition-colors relative"
            title="Flash Sales & Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-green-500 hover:bg-green-400 text-black px-3.5 py-2 rounded-full font-extrabold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,0,0.4)] hover:shadow-[0_0_20px_rgba(0,255,0,0.6)] transition-all transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">CART</span>
            {cartCount > 0 && (
              <span className="bg-black text-green-400 text-[10px] font-mono px-1.5 py-0.5 rounded-full font-black">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search drinks & flavors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
          />
        </div>
      </div>
    </header>
  );
};
