import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, UserPreferences, NotificationItem, FlashSale, CategoryType, RewardItem } from '../types';
import { MONSTER_PRODUCTS } from '../data/products';
import { REWARD_ITEMS } from '../data/rewards';

interface AppContextType {
  products: Product[];
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, size: string, delta: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Preferences & User History & Recommendation
  userPrefs: UserPreferences;
  trackProductView: (productId: string) => void;
  toggleZeroSugarPreference: () => void;
  recommendedProducts: Product[];

  // Loyalty Rewards
  addPoints: (points: number, reason?: string) => void;
  redeemReward: (reward: RewardItem) => boolean;
  claimedRewards: RewardItem[];
  submitCanTabCode: (code: string) => { success: boolean; pointsEarned: number; message: string };

  // Push Notifications & Flash Sales
  notifications: NotificationItem[];
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  markNotificationAsRead: (id: string) => void;
  activeFlashSale: FlashSale | null;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  triggerSimulatedFlashSale: () => void;

  // Modals & Navigation
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isStoreLocatorOpen: boolean;
  setIsStoreLocatorOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MONSTER_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // User Preferences & History
  const [userPrefs, setUserPrefs] = useState<UserPreferences>({
    viewedProductIds: ['original-green', 'ultra-white'],
    favoriteCategories: ['original', 'ultra'],
    prefersZeroSugar: false,
    points: 450,
    tier: 'Rookie',
    vaultCodeHistory: [],
    notificationsEnabled: true,
  });

  const [claimedRewards, setClaimedRewards] = useState<RewardItem[]>([]);

  // Navigation / UI Modals
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Flash Sale State
  const [activeFlashSale, setActiveFlashSale] = useState<FlashSale | null>({
    id: 'flash-ultra-25',
    title: '⚡ ULTRA BEAST FLASH SALE',
    discountMessage: 'Get 25% OFF all Monster Ultra Zero Sugar cases + 2x Vault Points!',
    code: 'BEAST25',
    endTime: Date.now() + 1000 * 60 * 45, // 45 minutes from now
    applicableCategory: 'ultra',
  });

  // Notifications list
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: '🔥 Active Flash Sale Unlocked!',
      message: '25% OFF Ultra Zero Sugar series for the next 45 minutes! Use code BEAST25.',
      timestamp: 'Just now',
      type: 'flash_sale',
      read: false,
    },
    {
      id: 'notif-2',
      title: '🎁 Welcome Bonus Credited',
      message: 'You earned 450 Monster Vault points for signing up!',
      timestamp: '1 hour ago',
      type: 'reward',
      read: true,
    }
  ]);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Track user product viewing history
  const trackProductView = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setUserPrefs(prev => {
      const updatedViewed = [productId, ...prev.viewedProductIds.filter(id => id !== productId)].slice(0, 8);
      const updatedCategories = [product.category, ...prev.favoriteCategories.filter(c => c !== product.category)].slice(0, 4);
      return {
        ...prev,
        viewedProductIds: updatedViewed,
        favoriteCategories: updatedCategories as CategoryType[],
      };
    });
  };

  const toggleZeroSugarPreference = () => {
    setUserPrefs(prev => ({ ...prev, prefersZeroSugar: !prev.prefersZeroSugar }));
  };

  // Cart operations
  const addToCart = (product: Product, selectedSize = '16 oz Can', quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === selectedSize);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prev, { product, selectedSize, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, size: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      let multiplier = 1;
      if (item.selectedSize.includes('12-Pack')) multiplier = 10.5;
      if (item.selectedSize.includes('24-Pack') || item.selectedSize.includes('Vault')) multiplier = 19.5;
      if (item.selectedSize.includes('24 oz Mega')) multiplier = 1.4;

      let itemPrice = item.product.price * multiplier;
      // apply flash sale if matches category
      if (activeFlashSale && (activeFlashSale.applicableCategory === item.product.category || !activeFlashSale.applicableCategory)) {
        itemPrice = itemPrice * 0.75;
      }
      return sum + (itemPrice * item.quantity);
    }, 0);
  }, [cart, activeFlashSale]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Points & Loyalty
  const addPoints = (pts: number, reason = 'Purchase Bonus') => {
    setUserPrefs(prev => {
      const newPoints = prev.points + pts;
      let newTier = prev.tier;
      if (newPoints >= 2000) newTier = 'Ultimate';
      else if (newPoints >= 500) newTier = 'Adrenaline';

      return {
        ...prev,
        points: newPoints,
        tier: newTier,
      };
    });

    // Add notification
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        title: `+${pts} Monster Vault Points!`,
        message: `Earned ${pts} points for ${reason}.`,
        timestamp: 'Just now',
        type: 'reward',
        read: false,
      },
      ...prev
    ]);
  };

  const redeemReward = (reward: RewardItem): boolean => {
    if (userPrefs.points < reward.pointsCost) return false;

    setUserPrefs(prev => ({ ...prev, points: prev.points - reward.pointsCost }));
    setClaimedRewards(prev => [...prev, reward]);

    setNotifications(prev => [
      {
        id: 'notif-reward-' + Date.now(),
        title: '🎉 Reward Claimed!',
        message: `You successfully redeemed "${reward.title}". Check your email for claim details.`,
        timestamp: 'Just now',
        type: 'reward',
        read: false,
      },
      ...prev
    ]);
    return true;
  };

  const submitCanTabCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode || cleanCode.length < 5) {
      return { success: false, pointsEarned: 0, message: 'Invalid ring-pull code format. Must be at least 6 characters.' };
    }
    if (userPrefs.vaultCodeHistory.includes(cleanCode)) {
      return { success: false, pointsEarned: 0, message: 'This ring-pull tab code has already been redeemed.' };
    }

    const earned = Math.floor(Math.random() * 50) + 100; // 100 to 150 points
    setUserPrefs(prev => ({
      ...prev,
      points: prev.points + earned,
      vaultCodeHistory: [...prev.vaultCodeHistory, cleanCode]
    }));

    addPoints(earned, `Tab Code Redemption (${cleanCode})`);

    return { success: true, pointsEarned: earned, message: `Boom! Code accepted. ${earned} Monster Vault points added!` };
  };

  // Recommendation Engine Logic
  const recommendedProducts = useMemo(() => {
    // Score each product based on user preferences
    return [...products].sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (userPrefs.prefersZeroSugar) {
        if (a.isZeroSugar) scoreA += 10;
        if (b.isZeroSugar) scoreB += 10;
      }

      if (userPrefs.favoriteCategories.includes(a.category)) scoreA += 5;
      if (userPrefs.favoriteCategories.includes(b.category)) scoreB += 5;

      if (userPrefs.viewedProductIds.includes(a.id)) scoreA += 3;
      if (userPrefs.viewedProductIds.includes(b.id)) scoreB += 3;

      if (a.isFlashSale) scoreA += 4;
      if (b.isFlashSale) scoreB += 4;

      return scoreB - scoreA;
    });
  }, [products, userPrefs]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const triggerSimulatedFlashSale = () => {
    const categories: CategoryType[] = ['juice', 'ultra', 'original', 'java'];
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const newSale: FlashSale = {
      id: 'flash-' + Date.now(),
      title: `⚡ SURGE FLASH DROP: 30% OFF ${randomCat.toUpperCase()} SERIES`,
      discountMessage: `Limited inventory available! Save 30% on all ${randomCat} Monster drinks for 15 minutes!`,
      code: `SURGE${Math.floor(Math.random() * 90 + 10)}`,
      endTime: Date.now() + 1000 * 60 * 15,
      applicableCategory: randomCat,
    };
    setActiveFlashSale(newSale);

    setNotifications(prev => [
      {
        id: 'notif-flash-' + Date.now(),
        title: newSale.title,
        message: newSale.discountMessage,
        timestamp: 'Just now',
        type: 'flash_sale',
        read: false,
      },
      ...prev
    ]);
    setIsNotificationDrawerOpen(true);
  };

  return (
    <AppContext.Provider value={{
      products,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      selectedProduct,
      setSelectedProduct,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      userPrefs,
      trackProductView,
      toggleZeroSugarPreference,
      recommendedProducts,
      addPoints,
      redeemReward,
      claimedRewards,
      submitCanTabCode,
      notifications,
      notificationsEnabled,
      setNotificationsEnabled,
      markNotificationAsRead,
      activeFlashSale,
      isNotificationDrawerOpen,
      setIsNotificationDrawerOpen,
      triggerSimulatedFlashSale,
      isQuizOpen,
      setIsQuizOpen,
      isStoreLocatorOpen,
      setIsStoreLocatorOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
