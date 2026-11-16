import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface DisassemblyStage {
  frameRange: [number, number];
  stageNumber: string;
  label: string;
  component: string;
  description: string;
  specs: string;
  align: 'left' | 'right';
}

const STAGES: DisassemblyStage[] = [
  {
    frameRange: [0, 32],
    stageNumber: '01',
    label: 'AERO HOOD & FRONT APEX RELEASE',
    component: 'Carbon-Core Multi-Material Bonnet Assembly',
    description: 'The lightweight composite hood separates forward, unveiling the front eDrive electronic power distribution unit and rigid carbon strut towers.',
    specs: 'Cd 0.24 // MULTI-MATERIAL COMPOSITE',
    align: 'left',
  },
  {
    frameRange: [32, 68],
    stageNumber: '02',
    label: 'FRONT FASCIA & CRYSTAL LIGHTING',
    component: 'Iconic Glow Grille & Swarovski Crystal Matrix',
    description: 'The front bumper and illuminated kidney grille separate forward, exposing matrix laser modules and active aerodynamic cooling flaps.',
    specs: '650M HIGH-BEAM // SWAROVSKI QUARTZ OPTICS',
    align: 'right',
  },
  {
    frameRange: [68, 105],
    stageNumber: '03',
    label: 'EXECUTIVE CABIN & DOORS UNCOUPLING',
    component: 'Frameless Acoustic Glazing & Interaction Bar',
    description: 'Four frameless doors decouple outward to display the BMW Curved Display, 31.3" 8K Theater screen, and Merino lounge seating.',
    specs: '31.3" 8K OLED // 36-SPEAKER 4D AUDIO',
    align: 'left',
  },
  {
    frameRange: [105, 142],
    stageNumber: '04',
    label: 'ROOF CANOPY & CHASSIS STRUCTURE',
    component: 'Carbon Core Passenger Cell & Subframes',
    description: 'The panoramic Sky Lounge glass roof ascends vertically, exposing the ultra-rigid structural passenger safety cell.',
    specs: '45,000 NM/° TORSIONAL RIGIDITY // CLAR-WEV',
    align: 'right',
  },
  {
    frameRange: [142, 175],
    stageNumber: '05',
    label: '101.7 kWh HIGH-VOLTAGE BATTERY PACK',
    component: '5th Gen eDrive Structural Floor Matrix',
    description: 'The high-voltage floor-mounted battery pack lowers down into service isolation, showcasing integrated liquid thermal cooling circuits.',
    specs: '101.7 KWH NET // 195 KW FAST CHARGE',
    align: 'left',
  },
  {
    frameRange: [175, 188],
    stageNumber: '06',
    label: 'DUAL M eDRIVE SUSPENSION MATRIX',
    component: 'Twin Synchronous Motors & 4-Wheel Steering',
    description: 'Rear 489 hp motor and front 258 hp motor uncouple alongside adaptive 2-axle air suspension and active roll stabilization.',
    specs: '650 HP COMBINED // 1,100 NM PEAK TORQUE',
    align: 'right',
  },
];

interface DisassemblyProps {
  images: (HTMLImageElement | null)[];
  totalFrames: number;
  isLoaded: boolean;
}

export const Disassembly: React.FC<DisassemblyProps> = ({
  images,
  totalFrames,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const frameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const [visibleStageIdx, setVisibleStageIdx] = useState<number>(0);
  const [progressPct, setProgressPct] = useState(0);
  const [useVideoFallback, setUseVideoFallback] = useState(false);
  const lastDrawnFrame = useRef(-1);

  // Pre-load initial fallback image
  const fallbackImgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = '/images/hero_assembled.webp';
    img.onload = () => {
      fallbackImgRef.current = img;
      if (lastDrawnFrame.current === -1) {
        drawFrame(0, true);
      }
    };
  }, []);

  // Find nearest available frame
  const getSafeImage = useCallback(
    (targetIdx: number): HTMLImageElement | null => {
      if (images && images[targetIdx]) return images[targetIdx];
      // Search nearest loaded
      if (images) {
        for (let offset = 1; offset < totalFrames; offset++) {
          const l = targetIdx - offset;
          const r = targetIdx + offset;
          if (l >= 0 && images[l]) return images[l];
          if (r < totalFrames && images[r]) return images[r];
        }
      }
      return fallbackImgRef.current;
    },
    [images, totalFrames]
  );

  const drawFrame = useCallback(
    (index: number, force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = getSafeImage(index);
      if (!img) return;

      if (!force && lastDrawnFrame.current === index) return;
      lastDrawnFrame.current = index;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;

      // Aspect cover math (16:9 standard video)
      const imgAspect = 1920 / 1080;
      const canvasAspect = cw / ch;

      let drawW = cw;
      let drawH = ch;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawH = cw / imgAspect;
        offsetY = (ch - drawH) / 2;
      } else {
        drawW = ch * imgAspect;
        offsetX = (cw - drawW) / 2;
      }

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [getSafeImage]
  );

  // Resize canvas cleanly
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      if (w > 0 && h > 0) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        drawFrame(frameRef.current, true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Smooth frame interpolation loop (24-60fps fluid scrubbing)
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  const renderLoop = useCallback(() => {
    const target = targetFrameRef.current;
    const cur = currentFrameRef.current;
    const diff = target - cur;

    if (Math.abs(diff) > 0.04) {
      currentFrameRef.current += diff * 0.25;
      const f = Math.round(currentFrameRef.current);
      const clamped = Math.max(0, Math.min(totalFrames - 1, f));
      if (frameRef.current !== clamped) {
        frameRef.current = clamped;
        drawFrame(clamped);

        // Also sync backup video if needed
        if (videoRef.current && videoRef.current.duration) {
          const targetTime = (clamped / (totalFrames - 1)) * videoRef.current.duration;
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.1) {
            videoRef.current.currentTime = targetTime;
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame, totalFrames]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [renderLoop]);

  // Standard GSAP Pinning Architecture:
  // Container has balanced height (240vh) and GSAP pins the inner viewport with pinSpacing: true.
  // This eliminates all empty gaps between sections!
  useEffect(() => {
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!container || !pinTarget) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinTarget,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgressPct(Math.round(p * 100));
          const rawFrame = p * (totalFrames - 1);
          targetFrameRef.current = rawFrame;

          // Detect active stage
          for (let i = STAGES.length - 1; i >= 0; i--) {
            if (rawFrame >= STAGES[i].frameRange[0]) {
              setVisibleStageIdx(i);
              break;
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, [totalFrames]);

  // Milestone audio feedback
  const lastMilestone = useRef(-1);
  useEffect(() => {
    if (visibleStageIdx !== lastMilestone.current) {
      lastMilestone.current = visibleStageIdx;
      audioEngine.playTick();
    }
  }, [visibleStageIdx]);

  const stage = STAGES[visibleStageIdx];

  const stageProgress = useMemo(() => {
    if (!stage) return 0;
    const [start, end] = stage.frameRange;
    return Math.max(0, Math.min(1, (frameRef.current - start) / (end - start)));
  }, [stage]);

  return (
    <section
      id="disassembly"
      ref={containerRef}
      className="relative bg-[#050505] w-full"
      style={{ height: '240vh' }}
    >
      {/* Pinned Viewport Container (Pinned by GSAP with pinSpacing: true) */}
      <div
        ref={pinTargetRef}
        className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center"
      >
        {/* Primary Viewport: High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video Fallback Element (always available) */}
        <video
          ref={videoRef}
          src="/video/bmw_disassembly.mp4"
          playsInline
          muted
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
            useVideoFallback ? 'opacity-100 z-10' : 'opacity-0 -z-10'
          }`}
          onError={() => setUseVideoFallback(false)}
        />

        {/* Static Background Fallback Image (guarantees car is visible instantly) */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero_assembled.webp)',
            filter: 'contrast(1.08) brightness(1.1)',
          }}
        />

        {/* Cinematic Vignettes */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

        {/* Top Telemetry Header */}
        <div className="absolute top-20 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-[#1c69d4] animate-pulse" />
            <span className="font-mono-tech text-xs tracking-widest text-[#FFFFFF] uppercase font-medium">
              SCROLL-CONTROLLED DISASSEMBLY SEQUENCE
            </span>
          </div>

          <div className="font-mono-tech text-xs tracking-widest text-[#CCCCCC] uppercase flex items-center space-x-4">
            <span className="hidden sm:inline">PROGRESS: {progressPct}%</span>
            <span className="h-3 w-px bg-[#333333] hidden sm:inline" />
            <span className="text-[#38bdf8] font-bold">FRAME {String(frameRef.current).padStart(3, '0')} / {String(totalFrames - 1).padStart(3, '0')}</span>
          </div>
        </div>

        {/* Dynamic Stage Info — text floats directly on canvas, NO box */}
        {stage && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-20 max-w-xs sm:max-w-sm w-full transition-all duration-500 pointer-events-none ${
              stageProgress > 0.05 ? 'opacity-100 translate-y-[-50%]' : 'opacity-0 translate-y-[-44%]'
            }`}
            style={{
              left: stage.align === 'left' ? 'clamp(20px, 5vw, 64px)' : 'auto',
              right: stage.align === 'right' ? 'clamp(20px, 5vw, 64px)' : 'auto',
            }}
          >
            {/* Stage code — no background */}
            <div className="font-mono-tech text-[9px] tracking-widest text-[#38bdf8] uppercase mb-2"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              STAGE {stage.stageNumber} / 06 · TYPE G70
            </div>

            {/* Title — large, white, text directly on canvas */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase leading-tight tracking-wide mb-1"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,1)' }}>
              {stage.label}
            </h3>

            {/* Component label */}
            <div className="font-mono-tech text-[10px] text-[#38bdf8] uppercase tracking-wider mb-3 font-medium"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              {stage.component}
            </div>

            {/* Thin hairline divider — just 1px line, no box */}
            <div className="h-px w-12 bg-[#38bdf8]/60 mb-3" />

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.95), 0 0px 3px rgba(0,0,0,1)' }}>
              {stage.description}
            </p>

            {/* Specs — text only, underlined label */}
            <div className="mt-4 font-mono-tech text-[9px] uppercase"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              <span className="text-[#555]">TELEMETRY</span>
              <span className="mx-2 text-[#333]">//</span>
              <span className="text-white font-bold">{stage.specs}</span>
            </div>
          </div>
        )}

        {/* Bottom Timeline & Milestone Segments */}
        <div className="absolute bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col items-center space-y-3">
          <div className="w-full max-w-xl flex items-center space-x-1.5">
            {STAGES.map((s, idx) => (
              <div
                key={s.stageNumber}
                className="flex-1 flex flex-col space-y-1"
              >
                <div
                  className={`h-1 transition-all duration-300 ${
                    idx < visibleStageIdx
                      ? 'bg-[#1c69d4]'
                      : idx === visibleStageIdx
                      ? 'bg-[#38bdf8]'
                      : 'bg-[#222222]'
                  }`}
                />
                <div className="flex justify-between text-[8px] font-mono-tech text-[#888888] uppercase hidden sm:flex">
                  <span>{s.stageNumber}</span>
                  <span className={idx === visibleStageIdx ? 'text-[#38bdf8] font-bold' : ''}>
                    {idx === visibleStageIdx ? 'ACTIVE' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3 text-[10px] font-mono-tech tracking-widest text-[#A0A0A0] uppercase">
            <span>SCROLL DOWN TO ADVANCE DECONSTRUCTION</span>
            <span>•</span>
            <span className="text-[#38bdf8] font-semibold">
              {progressPct >= 95 ? 'EXPLODED COMPOSITION COMPLETE' : `${100 - progressPct}% REMAINING`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
