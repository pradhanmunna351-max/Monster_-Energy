import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Sparkles, 
  Zap, 
  ShoppingBag, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Star,
  RefreshCw,
  ThumbsUp
} from 'lucide-react';

export const RecommendationEngine: React.FC = () => {
  const { 
    recommendedProducts, 
    userPrefs, 
    setSelectedProduct, 
    addToCart, 
    isQuizOpen, 
    setIsQuizOpen,
    products
  } = useApp();

  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(1);
  const [mission, setMission] = useState<string>('gaming');
  const [sugar, setSugar] = useState<string>('zero');
  const [flavor, setFlavor] = useState<string>('citrus');
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  const handleQuizSubmit = () => {
    // Filter matches
    let matches = products.filter(p => {
      if (sugar === 'zero') return p.isZeroSugar;
      if (sugar === 'juice') return p.category === 'juice';
      if (sugar === 'coffee') return p.category === 'java';
      return true;
    });

    if (matches.length === 0) matches = products;
    setMatchedProducts(matches.slice(0, 3));
    setQuizStep(4); // Results step
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setMatchedProducts([]);
  };

  return (
    <>
      {/* Dynamic Recommendation Banner / Carousel */}
      <section className="py-12 bg-zinc-900/60 border-y border-zinc-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                <Sparkles className="w-3.5 h-3.5" /> PERSONALIZED ENGINE
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase italic mt-1">
                RECOMMENDED FOR <span className="text-green-400">YOUR BEAST</span>
              </h3>
            </div>

            <button
              onClick={() => {
                resetQuiz();
                setIsQuizOpen(true);
              }}
              className="bg-zinc-800 hover:bg-zinc-700 text-green-400 border border-green-500/40 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RE-TAKE FLAVOR QUIZ</span>
            </button>
          </div>

          {/* Recommendation Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.slice(0, 4).map((prod, idx) => {
              const matchPercent = 98 - (idx * 3);
              return (
                <div
                  key={prod.id}
                  className="bg-zinc-950/90 border border-zinc-800/90 hover:border-green-500/60 rounded-2xl p-4 flex flex-col justify-between transition-all group relative overflow-hidden shadow-lg"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full border border-green-500/30 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {matchPercent}% MATCH
                    </span>
                    <span className="text-zinc-400">${prod.price.toFixed(2)}</span>
                  </div>

                  <div 
                    onClick={() => setSelectedProduct(prod)}
                    className="cursor-pointer h-36 flex items-center justify-center my-2 group-hover:scale-105 transition-transform"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="h-full object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="mt-2">
                    <h4 
                      onClick={() => setSelectedProduct(prod)}
                      className="font-black text-sm uppercase italic text-white group-hover:text-green-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                      {prod.flavorProfile}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white py-1.5 rounded-xl text-xs font-bold transition-colors text-center"
                    >
                      DETAILS
                    </button>
                    <button
                      onClick={() => addToCart(prod)}
                      className="bg-green-500 hover:bg-green-400 text-black px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Flavor Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative bg-zinc-950 border border-green-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(0,255,0,0.2)]">
            
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-4 right-4 p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-full border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Quiz Progress Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> BEAST FLAVOR SOMMELIER
              </div>
              <h3 className="text-2xl font-black uppercase italic">FIND YOUR BEAST MATCH</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Answer 3 quick questions to discover your ideal Monster Energy drink pairing.
              </p>

              {/* Progress Bar */}
              <div className="flex gap-2 max-w-xs mx-auto mt-4">
                {[1, 2, 3].map(step => (
                  <div
                    key={step}
                    className={`h-1.5 flex-1 rounded-full ${
                      step <= quizStep ? 'bg-green-400' : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Mission */}
            {quizStep === 1 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-center text-zinc-300">
                  STEP 1: What is your primary energy mission today?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'gaming', title: 'Late Night Gaming / Streaming', desc: 'Focus & quick reflex boost' },
                    { id: 'gym', title: 'Heavy Gym Session', desc: 'Pre-workout endurance & sweat' },
                    { id: 'work', title: 'All-Day Work / Study Grind', desc: 'Sustained cognitive energy' },
                    { id: 'roadtrip', title: 'Road Trip / Night Drive', desc: 'Stay sharp on long miles' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setMission(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        mission === item.id
                          ? 'bg-green-500/20 border-green-400 text-white shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-extrabold text-sm uppercase text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setQuizStep(2)}
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-6"
                >
                  <span>NEXT QUESTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Sugar Preference */}
            {quizStep === 2 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-center text-zinc-300">
                  STEP 2: What's your sugar & taste preference?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'zero', title: 'Zero Sugar / Zero Calories', desc: 'Ultra light & crisp finish' },
                    { id: 'juice', title: 'Real Tropical Fruit Juice', desc: 'Juice Monster nectar blend' },
                    { id: 'classic', title: 'Classic Original Monster', desc: 'Full strength sweetness' },
                    { id: 'coffee', title: 'Brewed Coffee + Cream', desc: 'Java Monster roast energy' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSugar(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        sugar === item.id
                          ? 'bg-green-500/20 border-green-400 text-white shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-extrabold text-sm uppercase text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setQuizStep(1)}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-3.5 rounded-xl text-xs uppercase"
                  >
                    BACK
                  </button>
                  <button
                    onClick={() => setQuizStep(3)}
                    className="flex-[2] bg-green-500 hover:bg-green-400 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>NEXT QUESTION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Flavor Profile */}
            {quizStep === 3 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-center text-zinc-300">
                  STEP 3: Pick your favorite flavor profile!
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'citrus', title: 'Crisp Citrus & Lime', desc: 'Zesty sharp refreshment' },
                    { id: 'tropical', title: 'Passionfruit & Mango', desc: 'Exotic island splash' },
                    { id: 'peach', title: 'Juicy Summer Peach', desc: 'Sweet smooth peachy vibes' },
                    { id: 'vanilla', title: 'Creamy Vanilla / Coffee', desc: 'Rich espresso finish' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setFlavor(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        flavor === item.id
                          ? 'bg-green-500/20 border-green-400 text-white shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-extrabold text-sm uppercase text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setQuizStep(2)}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-3.5 rounded-xl text-xs uppercase"
                  >
                    BACK
                  </button>
                  <button
                    onClick={handleQuizSubmit}
                    className="flex-[2] bg-gradient-to-r from-green-500 to-emerald-400 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>UNLEASH MATCHES</span>
                  </button>
                </div>
              </div>
            )}

            {/* Results Step */}
            {quizStep === 4 && (
              <div className="space-y-4">
                <div className="text-center bg-green-500/10 border border-green-500/30 p-4 rounded-2xl mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-1" />
                  <h4 className="font-black text-lg text-white uppercase italic">YOUR BEAST MATCHES ARE READY!</h4>
                  <p className="text-xs text-green-300 mt-1">
                    Based on your mission and taste preferences, here are your top Monster Energy picks:
                  </p>
                </div>

                <div className="space-y-3">
                  {matchedProducts.map(prod => (
                    <div
                      key={prod.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-green-500/50 transition-colors"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <div className="text-xs font-mono text-green-400 font-bold">{prod.subtitle}</div>
                        <div className="font-extrabold text-sm text-white uppercase">{prod.name}</div>
                        <div className="text-[11px] text-zinc-400">{prod.flavorProfile}</div>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(prod);
                          setIsQuizOpen(false);
                        }}
                        className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl text-xs font-extrabold uppercase shrink-0"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={resetQuiz}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-3 rounded-xl text-xs uppercase mt-4"
                >
                  START OVER
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
