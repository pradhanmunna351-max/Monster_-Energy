import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { STORE_LOCATIONS } from '../data/stores';
import { StoreLocation } from '../types';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Phone, 
  CheckCircle2, 
  X, 
  Filter, 
  Zap,
  Building2,
  Fuel,
  Dumbbell,
  ShoppingBag
} from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const { isStoreLocatorOpen, setIsStoreLocatorOpen, products } = useApp();
  const [zipQuery, setZipQuery] = useState<string>('90026');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(STORE_LOCATIONS[0]);

  const filteredStores = useMemo(() => {
    return STORE_LOCATIONS.filter(store => {
      if (selectedType !== 'all' && store.type !== selectedType) return false;
      if (zipQuery.trim()) {
        const q = zipQuery.toLowerCase();
        const matchZip = store.zip.includes(q);
        const matchCity = store.city.toLowerCase().includes(q);
        const matchName = store.name.toLowerCase().includes(q);
        if (!matchZip && !matchCity && !matchName) return false;
      }
      return true;
    });
  }, [zipQuery, selectedType]);

  if (!isStoreLocatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 text-white shadow-2xl my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase italic text-white">
                BEAST <span className="text-green-400">STORE LOCATOR</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Find cold Monster Energy cans at nearby gas stations, supermarkets & gyms.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStoreLocatorOpen(false)}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Enter Zip Code or City (e.g. 90026 or Los Angeles)..."
              value={zipQuery}
              onChange={(e) => setZipQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'gas', label: 'GAS' },
              { id: 'supermarket', label: 'MARKET' },
              { id: 'gym', label: 'GYM' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-2 rounded-xl text-[11px] font-extrabold uppercase transition-all whitespace-nowrap border ${
                  selectedType === type.id
                    ? 'bg-green-500 text-black border-green-400'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Map Visualizer + Store List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
          
          {/* Store List Column */}
          <div className="lg:col-span-5 space-y-3 overflow-y-auto pr-1 max-h-[420px]">
            {filteredStores.length === 0 ? (
              <div className="bg-zinc-900/50 p-6 rounded-2xl text-center text-zinc-400 text-xs">
                No store locations found nearby for "{zipQuery}". Try 90026 or clear search.
              </div>
            ) : (
              filteredStores.map(store => {
                const isSelected = selectedStore?.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-zinc-900 border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.2)]'
                        : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-white uppercase">{store.name}</span>
                          <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                            {store.distanceMiles} MI
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">{store.address}, {store.city}, {store.state} {store.zip}</p>
                      </div>

                      <div className="p-2 bg-black/40 rounded-lg text-zinc-400">
                        {store.type === 'gas' && <Fuel className="w-4 h-4 text-amber-400" />}
                        {store.type === 'supermarket' && <ShoppingBag className="w-4 h-4 text-emerald-400" />}
                        {store.type === 'gym' && <Dumbbell className="w-4 h-4 text-purple-400" />}
                        {store.type === 'convenience' && <Building2 className="w-4 h-4 text-sky-400" />}
                      </div>
                    </div>

                    {/* Stocked Flavors Pill */}
                    <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
                      <span className="text-[10px] text-zinc-500 font-mono self-center mr-1">IN STOCK:</span>
                      {store.stockedFlavors.slice(0, 3).map(fId => {
                        const p = products.find(prod => prod.id === fId);
                        return (
                          <span key={fId} className="text-[10px] font-bold bg-black text-zinc-300 px-2 py-0.5 rounded border border-zinc-800">
                            {p?.name.replace('Monster Energy', '').replace('Monster', '') || fId}
                          </span>
                        );
                      })}
                      {store.stockedFlavors.length > 3 && (
                        <span className="text-[10px] text-zinc-500 font-mono self-center">
                          +{store.stockedFlavors.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Map Simulation & Details Display */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
            
            {/* Custom Interactive Dark Map Canvas Representation */}
            <div className="absolute inset-0 bg-zinc-950 opacity-90 p-4 overflow-hidden pointer-events-none">
              {/* Map grid lines */}
              <div className="w-full h-full border border-zinc-800/40 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] relative rounded-xl">
                {/* Simulated roads */}
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-zinc-800/60 transform -rotate-6" />
                <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-zinc-800/60 transform rotate-12" />
                
                {/* Pins */}
                {filteredStores.map((st, i) => (
                  <div
                    key={st.id}
                    className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-transform ${
                      selectedStore?.id === st.id ? 'scale-125 z-20' : 'scale-90 opacity-70'
                    }`}
                    style={{
                      left: `${20 + (i * 15) % 70}%`,
                      top: `${25 + (i * 22) % 60}%`,
                    }}
                  >
                    <div className={`p-2 rounded-full border shadow-lg ${
                      selectedStore?.id === st.id ? 'bg-green-500 border-white text-black' : 'bg-zinc-900 border-green-500 text-green-400'
                    }`}>
                      <MapPin className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-[9px] font-extrabold bg-black/90 text-white px-1.5 py-0.5 rounded border border-zinc-800 mt-1 whitespace-nowrap">
                      {st.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Information Overlay Panel */}
            {selectedStore && (
              <div className="relative z-10 bg-black/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 mt-auto shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-green-400 font-bold uppercase">
                      SELECTED LOCATION ({selectedStore.distanceMiles} MILES AWAY)
                    </span>
                    <h4 className="text-xl font-black text-white uppercase italic mt-0.5">
                      {selectedStore.name}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-1">
                      {selectedStore.address}, {selectedStore.city}, {selectedStore.state} {selectedStore.zip}
                    </p>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.address + ' ' + selectedStore.city)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,0,0.3)] shrink-0"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-black" />
                    <span>DIRECTIONS</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-zinc-800 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>{selectedStore.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>{selectedStore.phone}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <span className="text-[10px] text-zinc-400 font-mono block mb-1">
                    CONFIRMED IN-STOCK FLAVORS AT THIS COOLER:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStore.stockedFlavors.map(fId => {
                      const p = products.find(prod => prod.id === fId);
                      return (
                        <span key={fId} className="text-xs font-bold bg-zinc-900 text-green-400 px-2.5 py-1 rounded-lg border border-green-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                          {p?.name || fId}
                        </span>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
