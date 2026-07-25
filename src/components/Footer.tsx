import React from 'react';
import { Zap, Send, ShieldAlert, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Athlete Roster Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-zinc-800 pb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl border border-green-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.4)]">
                <svg viewBox="0 0 100 100" className="w-7 h-7 text-green-400 fill-current">
                  <path d="M20 15 Q30 50 25 85 Q35 50 30 15 Z" />
                  <path d="M45 10 Q55 50 50 90 Q60 50 55 10 Z" />
                  <path d="M70 20 Q80 50 75 80 Q85 50 80 20 Z" />
                </svg>
              </div>
              <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                MONSTER<span className="text-green-400">ENERGY</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Most companies give you keychains, posters, and t-shirts. We give you full-throttle energy to power through workouts, gaming marathons, and extreme sports.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {['X-Games', 'MotoGP', 'UFC', 'NASCAR', 'Esports'].map(sponsor => (
                <span key={sponsor} className="text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md">
                  {sponsor}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-green-400 font-bold uppercase tracking-widest block">
                BEAST DROP VIP CLUB
              </span>
              <h3 className="text-xl font-black text-white uppercase italic mt-1">
                GET SECRET FLAVOR DROPS & FLASH SALE ALERTS
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Subscribe to receive SMS & email notifications when unreleased flavors hit the store.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mt-4">
              <input
                type="email"
                placeholder="Enter your email for secret drops..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,0,0.3)] shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>JOIN VIP</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer Nav Links & Disclaimers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 text-xs">
          <div>
            <h4 className="font-extrabold text-white uppercase mb-3 text-sm">PRODUCTS</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Original Monster</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Monster Ultra Zero</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Juice Monster</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Rehab Tea & Lemonade</a></li>
              <li><a href="#catalog" className="hover:text-green-400 transition-colors">Java Coffee Energy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white uppercase mb-3 text-sm">MONSTER VAULT</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#rewards-vault" className="hover:text-amber-400 transition-colors">Scan Ring-Pull Code</a></li>
              <li><a href="#rewards-vault" className="hover:text-amber-400 transition-colors">Redeem Swag & Apparel</a></li>
              <li><a href="#rewards-vault" className="hover:text-amber-400 transition-colors">Tier Status Perks</a></li>
              <li><a href="#rewards-vault" className="hover:text-amber-400 transition-colors">Daily Beast Streak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white uppercase mb-3 text-sm">ATHLETES & TEAMS</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">BMX & Skate Roster</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">MotoGP Racing Team</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Esports Pro Athletes</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Monster Girls Roster</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white uppercase mb-3 text-sm">LOCATE & SUPPORT</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">Gas Station Coolers</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Supermarket Locator</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Customer Care & FAQs</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Legal */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} Monster Energy Company. All rights reserved. UNLEASH THE BEAST®.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Use</a>
            <a href="#" className="hover:text-zinc-300">Safety & Ingredients</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
