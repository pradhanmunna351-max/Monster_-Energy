import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REWARD_ITEMS } from '../data/rewards';
import { RewardItem } from '../types';
import { 
  Gift, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Flame, 
  QrCode, 
  CheckCircle2, 
  Lock, 
  Award,
  Crown,
  Send,
  Ticket
} from 'lucide-react';

export const LoyaltyRewards: React.FC = () => {
  const { userPrefs, submitCanTabCode, redeemReward, addPoints } = useApp();
  const [tabCode, setTabCode] = useState('');
  const [tabFeedback, setTabFeedback] = useState<{ success?: boolean; message?: string } | null>(null);
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleTabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tabCode.trim()) return;
    const res = submitCanTabCode(tabCode);
    setTabFeedback(res);
    if (res.success) setTabCode('');
  };

  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    addPoints(50, 'Daily Beast Streak Bonus');
    setDailyClaimed(true);
  };

  const filteredRewards = REWARD_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Calculate tier progress
  let nextTierPoints = 500;
  let currentTierName = 'Rookie Monster';
  if (userPrefs.points >= 2000) {
    currentTierName = 'Ultimate Beast (VIP)';
    nextTierPoints = 5000;
  } else if (userPrefs.points >= 500) {
    currentTierName = 'Adrenaline Junkie';
    nextTierPoints = 2000;
  }

  const progressPercent = Math.min(100, Math.round((userPrefs.points / nextTierPoints) * 100));

  return (
    <section id="rewards-vault" className="py-16 bg-zinc-950 text-white relative border-t border-zinc-800">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest font-bold mb-3">
            <Gift className="w-3.5 h-3.5" /> MONSTER VAULT REWARDS PROGRAM
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase italic">
            EARN GEAR. <span className="text-amber-400">UNLEASH REWARDS.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Collect points by purchasing Monster drinks, scanning ring-pull tab codes, or completing daily streaks to unlock exclusive merchandise and VIP passes.
          </p>
        </div>

        {/* Dashboard Grid: Status + Ring Pull Tab Scanner + Daily Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* User Status Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" /> YOUR VAULT STATUS
                </span>
                <span className="bg-amber-500/20 text-amber-300 font-mono font-bold text-xs px-3 py-1 rounded-full border border-amber-500/30">
                  {currentTierName}
                </span>
              </div>

              <div className="my-4">
                <div className="text-4xl font-black font-mono text-white flex items-baseline gap-2">
                  <span>{userPrefs.points}</span>
                  <span className="text-sm font-normal text-amber-400 uppercase">VAULT POINTS</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Earn {nextTierPoints - userPrefs.points} more points to reach next tier.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 my-4">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>PROGRESS</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-700">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Perks unlocked */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Early Secret Drops</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>2x Points Days</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>VIP Event Access</span>
              </div>
            </div>
          </div>

          {/* Ring-Pull Code Scanner Form */}
          <div className="lg:col-span-4 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-5 h-5 text-green-400" />
                <h3 className="font-black text-lg text-white uppercase italic">REDEEM RING-PULL TAB</h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Look under the black pull-tab on your Monster can for your 8-digit vault code!
              </p>

              <form onSubmit={handleTabSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. BEAST2026 or TAB889"
                    value={tabCode}
                    onChange={(e) => setTabCode(e.target.value)}
                    className="w-full bg-black border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm font-mono font-bold text-white uppercase placeholder-zinc-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT RING-PULL CODE</span>
                </button>
              </form>

              {tabFeedback && (
                <div className={`mt-3 p-3 rounded-xl text-xs font-bold ${
                  tabFeedback.success ? 'bg-green-500/20 border border-green-500/40 text-green-300' : 'bg-red-500/20 border border-red-500/40 text-red-300'
                }`}>
                  {tabFeedback.message}
                </div>
              )}
            </div>

            <div className="text-[11px] font-mono text-zinc-500 mt-4 text-center">
              Try test codes: <span className="text-amber-400">BEAST2026</span> or <span className="text-amber-400">VAULT100</span>
            </div>
          </div>

          {/* Daily Streak Check-in */}
          <div className="lg:col-span-3 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between text-center">
            <div>
              <Flame className="w-10 h-10 text-orange-500 mx-auto mb-2 animate-bounce" />
              <h3 className="font-black text-lg text-white uppercase italic">DAILY BEAST STREAK</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Check in daily to claim free bonus points and maintain your streak!
              </p>
            </div>

            <div className="my-6">
              <span className="text-3xl font-black text-amber-400 font-mono">+50 PTS</span>
              <span className="text-xs text-zinc-500 block font-mono">TODAY'S BONUS</span>
            </div>

            <button
              onClick={handleClaimDaily}
              disabled={dailyClaimed}
              className={`w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                dailyClaimed
                  ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_15px_rgba(0,255,0,0.3)]'
              }`}
            >
              {dailyClaimed ? 'CLAIMED TODAY ✓' : 'CLAIM +50 BONUS PTS'}
            </button>
          </div>

        </div>

        {/* Rewards Merch Catalog Section */}
        <div className="mt-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-4">
            <h3 className="text-2xl font-black uppercase italic text-white">
              REDEEMABLE <span className="text-amber-400">MONSTER MERCH & GEAR</span>
            </h3>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'ALL GEAR' },
                { id: 'gear', label: 'ACCESSORIES & SIGNS' },
                { id: 'apparel', label: 'APPAREL' },
                { id: 'vip', label: 'VIP PASSES' },
                { id: 'discount', label: 'CASH COUPONS' },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all whitespace-nowrap border ${
                    activeCategory === c.id
                      ? 'bg-amber-500 text-black border-amber-400'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Merch Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map(reward => {
              const canAfford = userPrefs.points >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all group"
                >
                  <div>
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-black">
                      <img
                        src={reward.image}
                        alt={reward.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <span className="absolute top-3 right-3 bg-black/80 backdrop-blur border border-amber-500/40 text-amber-400 font-mono font-bold text-xs px-2.5 py-1 rounded-full">
                        {reward.pointsCost} PTS
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                      {reward.category.toUpperCase()} • REQUIRES {reward.tierRequired.toUpperCase()} TIER
                    </span>
                    <h4 className="font-extrabold text-base text-white uppercase mt-1">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {reward.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">
                      {canAfford ? 'Eligible to claim!' : `Need ${reward.pointsCost - userPrefs.points} pts`}
                    </span>

                    <button
                      onClick={() => redeemReward(reward)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? <Gift className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{canAfford ? 'REDEEM' : 'LOCKED'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
