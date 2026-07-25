export type CategoryType = 'all' | 'original' | 'ultra' | 'juice' | 'rehab' | 'java' | 'hydro';

export interface NutritionFacts {
  calories: number;
  caffeine: number; // in mg
  sugars: number; // in g
  carbs: number; // in g
  sodium: number; // in mg
  taurine: boolean;
  bVitamins: string[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  flavorProfile: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  canColor: string; // Tailwind color or hex
  accentColor: string; // Neon accent hex code
  bgGradient: string;
  isZeroSugar: boolean;
  isFlashSale?: boolean;
  discountPercent?: number;
  tags: string[];
  image: string;
  nutrition: NutritionFacts;
  energyLevel: number; // 1 to 5 scale
  sweetnessLevel: number; // 1 to 5 scale
  citrusLevel: number; // 1 to 5 scale
  sizes: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  type: 'gas' | 'supermarket' | 'convenience' | 'gym';
  address: string;
  city: string;
  state: string;
  zip: string;
  distanceMiles: number;
  lat: number;
  lng: number;
  openNow: boolean;
  hours: string;
  stockedFlavors: string[]; // product IDs
  phone: string;
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'gear' | 'apparel' | 'vip' | 'discount';
  pointsCost: number;
  image: string;
  description: string;
  tierRequired: 'Rookie' | 'Adrenaline' | 'Ultimate';
  inStock: boolean;
}

export interface FlashSale {
  id: string;
  title: string;
  discountMessage: string;
  code: string;
  endTime: number; // timestamp
  applicableCategory?: CategoryType;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'flash_sale' | 'drop' | 'reward' | 'order';
  read: boolean;
  actionUrl?: string;
}

export interface UserPreferences {
  viewedProductIds: string[];
  favoriteCategories: CategoryType[];
  prefersZeroSugar: boolean;
  preferredActivity?: string;
  points: number;
  tier: 'Rookie' | 'Adrenaline' | 'Ultimate';
  vaultCodeHistory: string[];
  notificationsEnabled: boolean;
}
