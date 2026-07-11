"use client";

import { useEffect, useRef, useState } from "react";

const ENVIRONMENTS = ["forest", "desert", "mountain"];
const FRAME_COUNTS: Record<string, number> = {
  forest: 298,
  desert: 241,
  mountain: 298
};

const WATERMARK_CONFIG: Record<string, { top: string, gapW: string, gapMaxW: string }> = {
  forest: { top: "top-[18vh]", gapW: "w-[35vw]", gapMaxW: "max-w-[600px]" },
  desert: { top: "top-[16vh]", gapW: "w-[42vw]", gapMaxW: "max-w-[700px]" },
  mountain: { top: "top-[28vh]", gapW: "w-[40vw]", gapMaxW: "max-w-[650px]" },
};

interface ScrollSequenceProps {
  dynamicFrames?: Record<string, string[]>;
}

let globalEnvIndex = 0; // Persists across React remounts (soft navigations), resets on F5

export default function ScrollSequence({ dynamicFrames }: ScrollSequenceProps) {
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentProgressFloatRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const forceDrawRef = useRef(false);
  const envIndexRef = useRef(globalEnvIndex);
  
  const scrollPositionsRef = useRef<number[]>([0, 0, 0]);
  const activeCanvasRef = useRef<'A' | 'B'>('A');
  
  const [ready, setReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  
  const [envIndex, setEnvIndex] = useState(globalEnvIndex);
  const [activeCanvas, setActiveCanvas] = useState<'A' | 'B'>('A');

  const imagesCacheRef = useRef<Record<string, HTMLImageElement[]>>({
    forest: [],
    desert: [],
    mountain: []
  });

  const stableDynamicFramesRef = useRef(dynamicFrames);

  const canvasEnvMap = useRef<{ A: string | null; B: string | null }>({ 
    A: ENVIRONMENTS[globalEnvIndex], 
    B: null 
  });

  const getFrameCount = (env: string) => dynamicFrames?.[env]?.length || FRAME_COUNTS[env];
  const getFramePath = (env: string, index: number) => {
    if (dynamicFrames?.[env]) return dynamicFrames[env][index];
    return `/sequence/${env}/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
  };

  // Reset scroll position to top on initial page load (F5 refresh fix)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Minimum display time for loading screen
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Environment cycle handler
  useEffect(() => {
    const handleCycle = () => {
      setEnvIndex(prev => {
        const nextIdx = (prev + 1) % ENVIRONMENTS.length;
        const nextEnv = ENVIRONMENTS[nextIdx];
        
        scrollPositionsRef.current[prev] = window.scrollY;
        const nextScroll = scrollPositionsRef.current[nextIdx];
        
        const container = containerRef.current;
        if (container) {
          const total = container.offsetHeight - window.innerHeight;
          const progress = total > 0 ? nextScroll / total : 0;
          currentProgressFloatRef.current = progress;
        }
        
        envIndexRef.current = nextIdx;
        globalEnvIndex = nextIdx; // Update global persistence
        
        window.scrollTo({ top: nextScroll, behavior: 'instant' });
        window.dispatchEvent(new Event('scroll'));
        
        setActiveCanvas(currCanvas => {
          const newActive = currCanvas === 'A' ? 'B' : 'A';
          activeCanvasRef.current = newActive;
          canvasEnvMap.current[newActive] = nextEnv;
          forceDrawRef.current = true;
          return newActive;
        });
        
        return nextIdx;
      });
    };
    window.addEventListener('cycle-environment', handleCycle);
    return () => window.removeEventListener('cycle-environment', handleCycle);
  }, []);

  // Preloading Engine
  // Load ALL environments perfectly on mount to absolutely eliminate all decoding lag and stutter.
  useEffect(() => {
    let cancelled = false;
    
    const loadEnv = (env: string, isInitial: boolean) => {
      const count = getFrameCount(env);
      let imgs = imagesCacheRef.current[env];
      if (imgs.length === count) return;
      
      if (imgs.length === 0) {
        imgs = new Array(count);
        imagesCacheRef.current[env] = imgs;
      }

      // Initial critical path frame
      if (isInitial && !imgs[0]) {
        const firstImg = new Image();
        firstImg.src = getFramePath(env, 0);
        firstImg.onload = () => {
          if (!cancelled) {
            imgs[0] = firstImg;
            if (firstImg.decode) firstImg.decode().catch(() => {});
            if (env === ENVIRONMENTS[globalEnvIndex]) setReady(true); 
          }
        };
      }

      // Background progressive cache loading for every frame
      for (let i = 0; i < count; i++) {
        if (!imgs[i]) {
          const img = new Image();
          img.src = getFramePath(env, i);
          img.onload = () => {
            if (!cancelled) {
              imgs[i] = img;
              // Decode aggressively on load to push decoding to worker threads, preventing main thread stutter
              if (img.decode) {
                img.decode().catch(() => {});
              }
            }
          };
        }
      }
    };

    // Aggressively preload all environments to ensure no stutter when switching
    ENVIRONMENTS.forEach((env, idx) => {
      loadEnv(env, idx === globalEnvIndex);
    });
    
    return () => {
      cancelled = true;
    };
  }, []); // Run absolutely only once on mount to prevent cache destruction race conditions

  // Decoupled requestAnimationFrame Render Loop
  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    // Forest and Desert remain at 0.5 (reference smoothness)
    // Mountain gets a targeted boost to 0.65 for increased responsiveness without sacrificing smoothness or causing jitter
    const LERP_FACTORS: Record<string, number> = { forest: 0.5, desert: 0.5, mountain: 0.65 };

    const drawToCanvas = (canvas: HTMLCanvasElement, env: string, progress: number) => {
      const count = getFrameCount(env);
      // Math.floor ensures zero floating-point rounding errors and perfectly maps 0-1 to integer indices
      const targetFrameIndex = Math.min(count - 1, Math.floor(progress * count));
      let img = imagesCacheRef.current[env]?.[targetFrameIndex];
      
      // If the strict target frame is missing (still loading), dynamically search the cache 
      // for the absolute closest fully loaded frame to completely eliminate drawing aborts/jumping
      if (!img || !img.complete) {
        let bestDist = Infinity;
        let bestImg: HTMLImageElement | undefined = undefined;
        for (let i = 0; i < count; i++) {
          const fallbackImg = imagesCacheRef.current[env]?.[i];
          if (fallbackImg && fallbackImg.complete) {
            const dist = Math.abs(i - targetFrameIndex);
            if (dist < bestDist) {
              bestDist = dist;
              bestImg = fallbackImg;
            }
          }
        }
        if (bestImg) {
          img = bestImg;
        }
      }
      
      if (!img || !img.complete) return;
      const ctx = canvas.getContext("2d", { alpha: false }); 
      if (!ctx) return;
      
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== canvas.clientWidth * dpr || canvas.height !== canvas.clientHeight * dpr) {
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.max(canvas.clientWidth / img.width, canvas.clientHeight / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.clientWidth - w) / 2;
      const y = (canvas.clientHeight - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    };

    const drawFrames = (progress: number) => {
      const active = activeCanvasRef.current;
      if (active === 'A' && canvasARef.current && canvasEnvMap.current.A) {
        drawToCanvas(canvasARef.current, canvasEnvMap.current.A, progress);
      } else if (active === 'B' && canvasBRef.current && canvasEnvMap.current.B) {
        drawToCanvas(canvasBRef.current, canvasEnvMap.current.B, progress);
      }
    };

    // Map scroll directly to a 0.0 - 1.0 progress float to completely unify the timeline math
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = container.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      
      // Target progress mapped perfectly 1:1 across all environments (no speed multipliers, no dead zones)
      targetProgressRef.current = total > 0 ? scrolled / total : 0;
    };

    // The core 60 FPS hardware-synced drawing loop
    const renderLoop = () => {
      const activeEnv = ENVIRONMENTS[envIndexRef.current];
      const lerpFactor = LERP_FACTORS[activeEnv] || 0.5;

      if (Math.abs(targetProgressRef.current - currentProgressFloatRef.current) > 0.0001 || forceDrawRef.current) {
        currentProgressFloatRef.current += (targetProgressRef.current - currentProgressFloatRef.current) * lerpFactor;
        
        forceDrawRef.current = false;
        drawFrames(currentProgressFloatRef.current);
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    const onResize = () => drawFrames(currentProgressFloatRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    
    onScroll();
    // Eagerly sync the float ref on mount to prevent a fast snap
    currentProgressFloatRef.current = targetProgressRef.current;
    drawFrames(currentProgressFloatRef.current);
    rafRef.current = requestAnimationFrame(renderLoop);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  const showLoading = !(ready && minTimeElapsed);

  return (
    <div ref={containerRef} className="h-[600vh] md:h-[1200vh] relative w-full">
      <div 
        className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center transition-opacity duration-300 ease-out ${showLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
          .animate-slide-right {
            animation: slideRight 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}} />
        <div className="flex flex-col items-center justify-center transform -translate-y-8 px-4">
          <h1 className="font-display text-lg md:text-2xl lg:text-[32px] text-white tracking-[0.25em] uppercase mb-10 text-center font-medium leading-loose">
            Visual Scroll<br className="md:hidden" /> Cinematic Experience
          </h1>
          <div className="w-48 md:w-72 h-[1px] bg-white/15 relative overflow-hidden mb-6 rounded-full">
            <div className="absolute top-0 left-0 h-full w-[40%] bg-white animate-slide-right rounded-full" />
          </div>
          <div className="text-[9px] md:text-[10px] lg:text-[12px] uppercase tracking-[0.3em] text-white/40 font-sans mb-3">
            Loading Assets...
          </div>
          <div className="text-[8px] md:text-[9px] lg:text-[11px] text-white/30 font-sans tracking-[0.1em] text-center max-w-[80%]">
            Best experienced on large screens for the full cinematic experience.
          </div>
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden -z-10 bg-transparent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={getFramePath(ENVIRONMENTS[0], 0)} 
          alt="Range Rover Cinematic" 
          className="w-full h-full block object-cover absolute inset-0 -z-30 brightness-[0.65] contrast-[1.2] saturate-[0.85]" 
        />
        
        <canvas
          ref={canvasARef}
          className={`w-full h-full block object-cover absolute inset-0 -z-20 brightness-[0.65] contrast-[1.2] saturate-[0.85] transition-opacity duration-[400ms] ease-in-out ${activeCanvas === 'A' ? 'opacity-100' : 'opacity-0'}`}
        />
        <canvas
          ref={canvasBRef}
          className={`w-full h-full block object-cover absolute inset-0 -z-20 brightness-[0.65] contrast-[1.2] saturate-[0.85] transition-opacity duration-[400ms] ease-in-out ${activeCanvas === 'B' ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <div className="absolute inset-0 -z-15 pointer-events-none mix-blend-multiply opacity-100 bg-[radial-gradient(ellipse_at_50%_55%,_transparent_15%,_rgba(5,10,15,0.95)_75%)]" />
        <div className="absolute inset-0 -z-15 pointer-events-none mix-blend-screen opacity-35 bg-[radial-gradient(ellipse_at_50%_10%,_rgba(255,240,220,0.5)_0%,_transparent_50%)]" />
        
        <div className={`absolute ${WATERMARK_CONFIG[ENVIRONMENTS[envIndex]].top} w-full flex justify-center z-10 pointer-events-none select-none px-4 transition-all duration-[400ms] ease-in-out`}>
          <h1 
            className="font-display font-extrabold text-[clamp(40px,7vw,130px)] leading-none text-white whitespace-nowrap tracking-normal antialiased flex items-center justify-center w-full drop-shadow-md"
          >
            <span>RANGE</span>
            <span className={`inline-block ${WATERMARK_CONFIG[ENVIRONMENTS[envIndex]].gapW} ${WATERMARK_CONFIG[ENVIRONMENTS[envIndex]].gapMaxW} transition-all duration-[400ms] ease-in-out`}></span>
            <span className="-translate-x-[1.5vw]">ROVER</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
