import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Zap, 
  MapPin, 
  Sparkles, 
  ChevronDown,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  RotateCcw,
  Film,
  Radio,
  Layers,
  Sparkle,
  Sliders,
  Check,
  Eye,
  Info
} from 'lucide-react';

interface CommercialScene {
  part: number;
  timeRange: string;
  startSec: number;
  endSec: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  poster: string;
  accent: string;
  badge: string;
  sfxType: 'pop' | 'splash' | 'electricity' | 'claw';
}

const COMMERCIAL_SCENES: CommercialScene[] = [
  {
    part: 1,
    timeRange: '0:00 - 0:10',
    startSec: 0,
    endSec: 10,
    title: 'THE LEGEND AWAKENS',
    subtitle: 'Extreme macro of icy pull-tab opening with metallic click & cold vapor burst.',
    description: 'A premium Monster Energy can rests on a glossy black surface surrounded by cold fog and water droplets. Cold vapor bursts as the tab opens in ultra slow-motion 120 FPS.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pour-of-a-carbonated-drink-with-ice-42993-large.mp4',
    poster: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=1200',
    accent: '#00FF00',
    badge: 'PARTS 1/4 • CAN OPEN & MIST',
    sfxType: 'pop'
  },
  {
    part: 2,
    timeRange: '0:10 - 0:20',
    startSec: 10,
    endSec: 20,
    title: 'POWER UNLEASHED',
    subtitle: 'Golden energy pour into crystal ice glass with spiraling B-vitamins & taurine.',
    description: 'Rich carbonation rises with smooth foam. Premium ingredients (Guarana, Ginseng, B-vitamins, Electrolytes) spiral gracefully with glowing energy trails into ice cubes.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-a-glass-of-cold-soft-drink-with-ice-32940-large.mp4',
    poster: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1200',
    accent: '#FFB800',
    badge: 'PARTS 2/4 • INGREDIENT MATRIX',
    sfxType: 'splash'
  },
  {
    part: 3,
    timeRange: '0:20 - 0:30',
    startSec: 20,
    endSec: 30,
    title: 'TRANSFORMATION',
    subtitle: 'Electric blue & emerald lightning surges through veins as eyes emit a bright glow.',
    description: 'Lightning travels across arms, muscles tighten with power, eyes emit bright emerald glow. An abstract energy beast forms behind the athlete from liquid and light.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ice-cubes-falling-into-a-glass-with-water-43338-large.mp4',
    poster: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200',
    accent: '#38BDF8',
    badge: 'PARTS 3/4 • BEAST MODE TRANSFORMATION',
    sfxType: 'electricity'
  },
  {
    part: 4,
    timeRange: '0:30 - 0:40',
    startSec: 30,
    endSec: 40,
    title: 'THE FINAL REVEAL',
    subtitle: '3 razor-sharp claw scratches tear through screen with sparks & heroic can stance.',
    description: 'Screen tears open with 3 razor-sharp claw marks, shattered glass and emerald lightning bursts. The iconic Monster Energy can emerges heroically: UNLEASH THE BEAST®.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pour-of-a-carbonated-drink-with-ice-42993-large.mp4',
    poster: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=1200',
    accent: '#00FF00',
    badge: 'PARTS 4/4 • CLAW REVEAL',
    sfxType: 'claw'
  }
];

export const HeroVideo: React.FC = () => {
  const { setIsStoreLocatorOpen, setIsQuizOpen } = useApp();
  
  const [currentPart, setCurrentPart] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showScriptDrawer, setShowScriptDrawer] = useState<boolean>(false);
  const [orbit3D, setOrbit3D] = useState<boolean>(true);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const activeScene = COMMERCIAL_SCENES[currentPart - 1];

  // Web Audio SFX Synthesizer
  const playWebAudioSFX = (type: string) => {
    if (isMuted || !sfxEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'pop') {
        // Metallic pop + fizz hiss
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'electricity') {
        // High voltage electric arc
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'claw') {
        // Deep sub-bass rumble + slash impact
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch (err) {
      console.warn('Audio SFX play error', err);
    }
  };

  // Timer loop for 40-second commercial timeline playback
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          const next = prev + 0.2;
          if (next >= 40) {
            setCurrentPart(1);
            return 0;
          }
          // Auto update active scene based on timestamp
          if (next >= 0 && next < 10 && currentPart !== 1) setCurrentPart(1);
          if (next >= 10 && next < 20 && currentPart !== 2) setCurrentPart(2);
          if (next >= 20 && next < 30 && currentPart !== 3) setCurrentPart(3);
          if (next >= 30 && next <= 40 && currentPart !== 4) setCurrentPart(4);

          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentPart]);

  // Jump to specific scene chapter
  const jumpToScene = (partNum: number) => {
    const scene = COMMERCIAL_SCENES[partNum - 1];
    setCurrentPart(partNum);
    setCurrentTimeSec(scene.startSec);
    playWebAudioSFX(scene.sfxType);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Canvas visual effects renderer (fog, particles, lightning, claw marks)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        color: currentPart === 3 ? '#38BDF8' : '#00FF00',
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // PART 1: Cold Fog & Floating droplets
      if (currentPart === 1) {
        particles.forEach(p => {
          p.y -= 0.5;
          p.alpha = 0.3 + Math.sin(frameCount * 0.05 + p.x) * 0.2;
          if (p.y < 0) p.y = height;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 120, ${p.alpha * 0.4})`;
          ctx.fill();
        });
      }

      // PART 2: Spiraling Ingredients (Guarana, Ginseng, Taurine)
      else if (currentPart === 2) {
        const cx = width / 2;
        const cy = height / 2;
        for (let i = 0; i < 20; i++) {
          const angle = frameCount * 0.03 + (i * Math.PI) / 10;
          const radius = 60 + Math.sin(frameCount * 0.02 + i) * 40;
          const px = cx + Math.cos(angle) * radius * 2.5;
          const py = cy + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#FFB800' : '#00FF00';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#FFB800';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // PART 3: Electric Veins & Lightning Arcs
      else if (currentPart === 3) {
        if (frameCount % 6 < 3) {
          ctx.beginPath();
          ctx.moveTo(width * 0.2, height * 0.1);
          ctx.lineTo(width * 0.35, height * 0.4);
          ctx.lineTo(width * 0.3, height * 0.6);
          ctx.lineTo(width * 0.45, height * 0.9);
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#00FFFF';
          ctx.shadowBlur = 20;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(width * 0.8, height * 0.2);
          ctx.lineTo(width * 0.65, height * 0.5);
          ctx.lineTo(width * 0.7, height * 0.8);
          ctx.strokeStyle = '#00FF00';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // PART 4: Razor-Sharp Claw Scratches & Shattered Glass
      else if (currentPart === 4) {
        // Draw 3 claw marks tearing through
        ctx.strokeStyle = '#00FF00';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00FF00';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        const drawClaw = (offsetX: number) => {
          ctx.beginPath();
          ctx.moveTo(width * 0.35 + offsetX, height * 0.1);
          ctx.lineTo(width * 0.45 + offsetX, height * 0.5);
          ctx.lineTo(width * 0.55 + offsetX, height * 0.9);
          ctx.stroke();
        };

        drawClaw(-60);
        drawClaw(0);
        drawClaw(60);
        ctx.shadowBlur = 0;

        // Glass sparks flying
        particles.forEach(p => {
          p.x += p.vx * 2;
          p.y += p.vy * 2;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(p.x, p.y, 3, 3);
        });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentPart]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !isMuted;
    if (isMuted) playWebAudioSFX('pop');
  };

  return (
    <div className={`relative w-full bg-black overflow-hidden border-b border-zinc-800 ${isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[92vh] min-h-[620px]'}`}>
      
      {/* Background Video Stream */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          orbit3D ? 'scale-105 filter brightness-90 contrast-110' : 'scale-100'
        }`}
        src={activeScene.videoUrl}
        poster={activeScene.poster}
        autoPlay
        loop
        muted={isMuted}
        playsInline
      />

      {/* Dynamic Visual FX Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Cinematic Vignette & Lighting Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/50 to-black/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.12)_0%,transparent_75%)] pointer-events-none z-10" />

      {/* Top Banner Status Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-black/80 backdrop-blur border border-green-500/60 text-green-400 font-mono text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,0,0.4)]">
            <Radio className="w-3 h-3 text-green-400 animate-pulse" /> 
            4K UHD • 120 FPS COMMERCIAL
          </span>

          <span className="bg-black/80 backdrop-blur border border-amber-500/50 text-amber-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            RAY-TRACED CGI
          </span>

          <span className="bg-black/80 backdrop-blur border border-sky-500/50 text-sky-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Film className="w-3 h-3 text-sky-400" />
            HOLLYWOOD COMMERCIAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScriptDrawer(!showScriptDrawer)}
            className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <Info className="w-3.5 h-3.5 text-green-400" />
            <span>SCENE SCRIPT</span>
          </button>

          <button
            onClick={() => setOrbit3D(!orbit3D)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
              orbit3D 
                ? 'bg-green-500/20 text-green-400 border-green-500/80 shadow-[0_0_10px_rgba(0,255,0,0.3)]'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>360° ORBIT</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-zinc-700 transition-colors"
            title="Toggle IMAX Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Commercial Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-8">
        
        {/* Center Commercial Hero Section */}
        <div className="my-auto max-w-3xl space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-green-500/50 text-green-400 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span>{activeScene.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase italic leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {activeScene.title.split(' ')[0]} <br />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-lime-400 drop-shadow-[0_0_25px_rgba(0,255,0,0.7)]"
              style={{ textShadow: '0 0 35px rgba(0,255,0,0.5)' }}
            >
              {activeScene.title.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-200 font-medium max-w-2xl leading-relaxed drop-shadow-md">
            {activeScene.description}
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#catalog"
              className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black px-7 py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(0,255,0,0.6)] hover:shadow-[0_0_35px_rgba(0,255,0,0.9)] transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>UNLEASH NOW</span>
            </a>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-green-500/60 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all backdrop-blur"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>FLAVOR QUIZ</span>
            </button>

            <button
              onClick={() => setIsStoreLocatorOpen(true)}
              className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all backdrop-blur"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>LOCATE CAN</span>
            </button>
          </div>

        </div>

        {/* Bottom Interactive Commercial Controller & Timeline Scrubber */}
        <div className="bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-md rounded-2xl p-4 space-y-3 shadow-2xl">
          
          {/* Top Row: Scene Chapter Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COMMERCIAL_SCENES.map((sc) => {
              const isActive = currentPart === sc.part;
              return (
                <button
                  key={sc.part}
                  onClick={() => jumpToScene(sc.part)}
                  className={`p-2.5 rounded-xl text-left border transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-zinc-900 border-green-500 text-white shadow-[0_0_15px_rgba(0,255,0,0.25)]'
                      : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-green-400 uppercase">
                      PART {sc.part} • {sc.timeRange}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs font-black uppercase italic truncate text-white">
                    {sc.title}
                  </div>
                  {/* Subtle active border glow bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Timeline Scrubber Bar & Audio/Video Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            
            {/* Scrubber Progress Track */}
            <div className="w-full flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-green-400 w-10 text-right">
                {Math.floor(currentTimeSec)}s
              </span>

              <div className="relative flex-1 h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden cursor-pointer">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-green-500 via-emerald-400 to-lime-300 transition-all duration-200 shadow-[0_0_10px_rgba(0,255,0,0.8)]"
                  style={{ width: `${(currentTimeSec / 40) * 100}%` }}
                />
              </div>

              <span className="text-xs font-mono text-zinc-500 w-10">
                40s
              </span>
            </div>

            {/* Play, Pause & Web Audio SFX Controls */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={togglePlay}
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl border border-zinc-800 flex items-center gap-2 text-xs font-bold uppercase transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-green-400" /> : <Play className="w-4 h-4 text-green-400" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={toggleMute}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold transition-all ${
                  !isMuted 
                    ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_10px_rgba(0,255,0,0.3)]' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                {!isMuted ? <Volume2 className="w-4 h-4 text-green-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
                <span>{!isMuted ? 'AUDIO ON' : 'MUTED'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Script Drawer Modal */}
      {showScriptDrawer && (
        <div className="absolute top-16 right-4 sm:right-8 z-40 bg-zinc-950/95 border border-zinc-800 p-5 rounded-2xl max-w-md w-full text-xs space-y-3 backdrop-blur-xl shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="font-extrabold text-white uppercase italic flex items-center gap-2">
              <Film className="w-4 h-4 text-green-400" /> 
              COMMERCIAL SCENE BREAKDOWN
            </span>
            <button 
              onClick={() => setShowScriptDrawer(false)}
              className="text-zinc-400 hover:text-white font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {COMMERCIAL_SCENES.map((sc) => (
              <div 
                key={sc.part} 
                className={`p-3 rounded-xl border ${
                  currentPart === sc.part 
                    ? 'bg-green-500/10 border-green-500/50 text-white' 
                    : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400'
                }`}
              >
                <div className="flex justify-between font-mono font-bold text-[11px] text-green-400 mb-1">
                  <span>PART {sc.part}: {sc.title}</span>
                  <span>{sc.timeRange}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-300">
                  {sc.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>STYLE: HYPER-REALISTIC CGI 4K</span>
            <span>FPS: 120 MAX</span>
          </div>
        </div>
      )}

      {/* Down Scroll Anchor Indicator */}
      <a 
        href="#catalog"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 text-zinc-500 hover:text-green-400 transition-colors animate-bounce p-2"
        title="Scroll to Product Catalog"
      >
        <ChevronDown className="w-6 h-6" />
      </a>

    </div>
  );
};
