import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { ProductCatalog } from './components/ProductCatalog';
import { RecommendationEngine } from './components/RecommendationEngine';
import { LoyaltyRewards } from './components/LoyaltyRewards';
import { FlashSaleNotification } from './components/FlashSaleNotification';
import { ProductDetailModal } from './components/ProductDetailModal';
import { StoreLocator } from './components/StoreLocator';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

function MainApp() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-green-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar />

      {/* Video Action Header */}
      <HeroVideo />

      {/* Personalized Recommendation Engine & Quiz */}
      <RecommendationEngine />

      {/* Product Catalog & Detailed Flavors */}
      <ProductCatalog />

      {/* Monster Vault Loyalty Rewards Program */}
      <LoyaltyRewards />

      {/* Footer */}
      <Footer />

      {/* Modals, Drawers & Notifications */}
      <FlashSaleNotification />
      <ProductDetailModal />
      <StoreLocator />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
