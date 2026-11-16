import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Disassembly } from './components/Disassembly';
import { Engineering } from './components/Engineering';
import { Performance } from './components/Performance';
import { Design } from './components/Design';
import { Closing } from './components/Closing';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 188;

const KEY_FRAMES: { [key: number]: string } = {
  0: '/images/hero_assembled.webp',
  48: '/images/fascia_separation.webp',
  88: '/images/design/interior_cabin.webp',
  136: '/images/design/chassis_battery.webp',
  187: '/images/exploded_engineering.webp',
};

function getFramePath(index: number): string {
  return `/frames/frame_${String(index).padStart(3, '0')}.webp`;
}

export default function App() {
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [preloaderExited, setPreloaderExited] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // === Preload all frames progressively without thrashing state ===
  useEffect(() => {
    const loaded = new Array<HTMLImageElement | null>(TOTAL_FRAMES).fill(null);
    let done = 0;

    // Load key frames first (frame 0, 48, 88, 136, 187) for instantaneous visual feedback
    const priorityFrames = [0, 187, 48, 88, 136, 32, 52, 172];
    priorityFrames.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx);
      img.onload = () => {
        loaded[idx] = img;
        done++;
        setLoadedCount(done);
      };
    });

    // Batch load all remaining frames
    const BATCH_SIZE = 12;
    const loadBatch = (startIndex: number) => {
      const end = Math.min(startIndex + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = startIndex; i < end; i++) {
        if (loaded[i]) continue; // already loaded in priority batch
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          loaded[i] = img;
          done++;
          setLoadedCount(done);
          if (done >= TOTAL_FRAMES) {
            setImages([...loaded]);
            setIsFullyLoaded(true);
          }
        };
        img.onerror = () => {
          done++;
          setLoadedCount(done);
          if (done >= TOTAL_FRAMES) {
            setImages([...loaded]);
            setIsFullyLoaded(true);
          }
        };
      }
      if (end < TOTAL_FRAMES) {
        setTimeout(() => loadBatch(end), 30);
      } else {
        setImages([...loaded]);
      }
    };

    setTimeout(() => loadBatch(0), 50);
  }, []);

  // === Setup Lenis Smooth Scrolling and synchronize with ScrollTrigger ===
  useEffect(() => {
    if (!preloaderExited) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once DOM layout is settled to remove false gap offsets
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [preloaderExited]);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.5, offset: -20 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);


  const preloaderProgress = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <>
      {/* Preloader */}
      {!preloaderExited && (
        <Preloader
          progress={preloaderProgress}
          loadedFrames={loadedCount}
          totalFrames={TOTAL_FRAMES}
          isReady={preloaderExited}
          onEnter={() => setPreloaderExited(true)}
        />
      )}

      {/* Main Experience Container */}
      <div
        className="transition-opacity duration-700 bg-[#050505]"
        style={{
          opacity: preloaderExited ? 1 : 0,
          pointerEvents: preloaderExited ? 'auto' : 'none',
        }}
      >
        <Navbar onNavigate={handleNavigate} />

        <main className="bg-[#050505]">
          {/* Section 1: Hero */}
          <Hero frameImage={KEY_FRAMES[0]} />

          {/* Section 2: Disassembly Canvas & Video Engine */}
          <Disassembly
            images={images}
            totalFrames={TOTAL_FRAMES}
            isLoaded={isFullyLoaded}
          />

          {/* Section 3: Engineering Exploded View */}
          <Engineering image={KEY_FRAMES[187]} />

          {/* Section 4: Performance */}
          <Performance frameImage={KEY_FRAMES[0]} />

          {/* Section 5: Design & Craftsmanship */}
          <Design />

          {/* Section 6: Final Closing CTA */}
          <Closing frameImage={KEY_FRAMES[0]} />
        </main>
      </div>
    </>
  );
}
