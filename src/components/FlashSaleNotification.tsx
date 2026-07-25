import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  X, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ChevronRight,
  Gift,
  ShoppingBag
} from 'lucide-react';

export const FlashSaleNotification: React.FC = () => {
  const { 
    notifications, 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    markNotificationAsRead,
    activeFlashSale,
    notificationsEnabled,
    setNotificationsEnabled,
    setIsCartOpen
  } = useApp();

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 45, seconds: 0 });

  useEffect(() => {
    if (!activeFlashSale) return;

    const interval = setInterval(() => {
      const remainingMs = Math.max(0, activeFlashSale.endTime - Date.now());
      const totalSeconds = Math.floor(remainingMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setTimeLeft({ minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeFlashSale]);

  return (
    <>
      {/* Slide-out Notification Drawer */}
      {isNotificationDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full p-6 text-white flex flex-col justify-between shadow-2xl overflow-y-auto">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-green-400" />
                  <h3 className="font-black text-lg uppercase italic text-white">
                    FLASH SALE & DROP ALERTS
                  </h3>
                </div>

                <button
                  onClick={() => setIsNotificationDrawerOpen(false)}
                  className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-full border border-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notification Push Preference Toggle */}
              <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-center justify-between mb-6">
                <div>
                  <span className="font-bold text-xs text-white block">Push Notifications</span>
                  <span className="text-[10px] text-zinc-400">Receive flash sale drops & promo codes</span>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors ${
                    notificationsEnabled ? 'bg-green-500' : 'bg-zinc-800'
                  }`}
                >
                  <div className={`w-4 h-4 bg-black rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Notification Items List */}
              <div className="space-y-3">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationAsRead(notif.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      notif.read 
                        ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' 
                        : 'bg-zinc-900 border-green-500/50 text-white shadow-[0_0_15px_rgba(0,255,0,0.1)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-extrabold text-sm uppercase">{notif.title}</span>
                      <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs mt-1 text-zinc-300 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800 mt-6">
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-3 rounded-xl text-xs uppercase"
              >
                CLOSE ALERTS
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
