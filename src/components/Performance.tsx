import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 650, suffix: ' HP', label: 'COMBINED OUTPUT', sub: '485 kW Dual BMW eDrive Motors', code: 'PWR-01' },
  { value: 1100, suffix: ' NM', label: 'PEAK M TORQUE', sub: 'Instant Launch Control Burst', code: 'TRQ-02' },
  { value: 3.7, suffix: ' S', label: '0–100 KM/H', sub: 'M Sport Boost Function Active', code: 'ACC-03' },
  { value: 250, suffix: ' KM/H', label: 'TOP SPEED', sub: 'Electronically Limited', code: 'VEL-04' },
];

const SECONDARY_STATS = [
  { label: 'BATTERY CAPACITY', value: '101.7 kWh', note: 'USABLE NET' },
  { label: 'WLTP RANGE', value: '560 km', note: 'COMBINED CYCLE' },
  { label: 'DC FAST CHARGE', value: '195 kW', note: 'PEAK CHARGE RATE' },
  { label: 'RANGE ADDED', value: '+170 km', note: 'IN 10 MIN DC' },
  { label: 'REAR MOTOR', value: '360 kW / 489 hp', note: 'MOST POWERFUL BMW' },
  { label: 'FRONT MOTOR', value: '190 kW / 258 hp', note: 'SYNCHRONOUS ESM' },
];

const DRIVE_MODES = [
  {
    id: 'boost', name: 'M SPORT BOOST',
    power: '650 HP (485 kW)', torque: '1,100 Nm', accel: '0–100 in 3.7s',
    description: 'Pull the left steering wheel paddle to unleash maximum torque and Hans Zimmer-composed M acoustic launch sound for 10 intense seconds.',
  },
  {
    id: 'personal', name: 'PERSONAL',
    power: '544 HP (400 kW)', torque: '745 Nm', accel: '0–100 in 4.5s',
    description: 'Balanced grand touring profile optimizing 2-axle air suspension absorption with bespoke ambient illumination atmospheres.',
  },
  {
    id: 'range', name: 'MAX RANGE',
    power: 'Optimized Profile', torque: 'Adaptive', accel: 'Efficient surge',
    description: 'Intelligent thermal pre-conditioning and speed capping increases remaining electric range by up to 25%.',
  },
];

interface CounterProps { target: number; suffix: string; trigger: boolean; decimals?: number; }

const Counter: React.FC<CounterProps> = ({ target, suffix, trigger, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const duration = 2000;
    const startTime = performance.now();
    const update = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [trigger, target, decimals]);
  return <span>{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}</span>;
};

interface PerformanceProps { frameImage?: string | null; }

export const Performance: React.FC<PerformanceProps> = ({ frameImage }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersActive, setCountersActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState(DRIVE_MODES[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top 75%',
            onEnter: () => setCountersActive(true),
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="performance" ref={sectionRef} className="bg-[#050505] py-20 md:py-32 border-t border-[#111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Headline — text on black */}
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-px w-10 bg-[#1c69d4]" />
            <span className="font-mono-tech text-[10px] tracking-widest2 text-[#38bdf8] uppercase">M PERFORMANCE PROPULSION</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white uppercase leading-[0.90] tracking-tight">
            POWER MEETS<br />PRECISION.
          </h2>
          <p className="mt-5 max-w-md text-sm text-[#C0C0C0] leading-relaxed">
            The most powerful all-electric BMW M model ever built. Dual synchronous motors deploy instantaneous 1,100 Nm torque through M-calibrated xDrive all-wheel drive.
          </p>
        </div>

        {/* Full-bleed vehicle image — no container box */}
        <div className="relative -mx-6 sm:-mx-12 mb-20">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img
              src={frameImage || '/images/hero_assembled.webp'}
              alt="BMW i7 M70 xDrive Performance"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 62%', filter: 'contrast(1.1) brightness(1.2)' }}
            />
            {/* Left & Right side fade to black — cinematic widescreen blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

            {/* Floating performance text directly in image */}
            <div className="absolute bottom-6 left-6 sm:left-12 z-10">
              <div className="font-mono-tech text-[10px] tracking-widest text-[#38bdf8] uppercase mb-1">
                DUAL 5TH GEN eDRIVE // 485 kW
              </div>
              <div className="font-display font-bold text-2xl sm:text-4xl text-white uppercase tracking-wide">
                1,100 NM INSTANTANEOUS TORQUE
              </div>
            </div>

            <div className="absolute top-6 right-6 sm:right-12 z-10 font-mono-tech text-xs tracking-widest text-[#38bdf8] uppercase">
              ///M SPORT BOOST
            </div>
          </div>
        </div>

        {/* 4 Oversized stat numbers — text directly on black */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 mb-24">
          {STATS.map((stat) => (
            <div key={stat.code}>
              <div className="text-[9px] font-mono-tech text-[#38bdf8] tracking-widest uppercase mb-2">{stat.code}</div>
              <div className="font-display font-bold text-5xl sm:text-6xl xl:text-7xl text-white leading-none tracking-tighter">
                <Counter target={stat.value} suffix={stat.suffix} trigger={countersActive} decimals={stat.value % 1 !== 0 ? 1 : 0} />
              </div>
              <div className="mt-3 text-xs font-bold tracking-widest text-[#E5E7EB] uppercase">{stat.label}</div>
              <div className="mt-1 text-[11px] text-[#777] font-mono-tech">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Thin rule */}
        <div className="h-px bg-[#141414] mb-20" />

        {/* Drive mode selector — text tabs on black */}
        <div className="mb-16">
          <div className="text-[10px] font-mono-tech tracking-widest text-[#555] uppercase mb-8">
            DYNAMIC DRIVE SYSTEM PROFILES
          </div>
          <div className="flex space-x-10 mb-10">
            {DRIVE_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => { setSelectedMode(mode); mode.id === 'boost' ? audioEngine.playBoost() : audioEngine.playSelect(); }}
                className={`font-mono-tech text-xs tracking-widest uppercase pb-1 transition-colors duration-200 ${
                  selectedMode.id === mode.id
                    ? 'text-white border-b border-[#38bdf8]'
                    : 'text-[#555] hover:text-[#A0A0A0]'
                }`}
              >
                {mode.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">{selectedMode.power}</div>
              <div className="font-mono-tech text-sm text-[#38bdf8] uppercase tracking-wider mb-1">{selectedMode.torque} PEAK — {selectedMode.accel}</div>
              <p className="mt-4 text-sm text-[#C0C0C0] leading-relaxed max-w-sm">{selectedMode.description}</p>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              {/* Minimal animated power bar */}
              <div>
                <div className="flex justify-between text-[10px] font-mono-tech text-[#555] uppercase mb-2">
                  <span>POWER OUTPUT</span>
                  <span className="text-[#38bdf8]">{selectedMode.power}</span>
                </div>
                <div className="h-px w-full bg-[#1a1a1a] relative">
                  <div
                    className="h-px bg-[#1c69d4] transition-all duration-700"
                    style={{ width: selectedMode.id === 'boost' ? '100%' : selectedMode.id === 'personal' ? '78%' : '55%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono-tech text-[#555] uppercase mb-2">
                  <span>TORQUE DELIVERY</span>
                  <span className="text-[#38bdf8]">{selectedMode.torque}</span>
                </div>
                <div className="h-px w-full bg-[#1a1a1a] relative">
                  <div
                    className="h-px bg-[#38bdf8] transition-all duration-700"
                    style={{ width: selectedMode.id === 'boost' ? '100%' : selectedMode.id === 'personal' ? '68%' : '40%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono-tech text-[#555] uppercase mb-2">
                  <span>ACCELERATION</span>
                  <span className="text-[#38bdf8]">{selectedMode.accel}</span>
                </div>
                <div className="h-px w-full bg-[#1a1a1a] relative">
                  <div
                    className="h-px bg-[#C0C0C0] transition-all duration-700"
                    style={{ width: selectedMode.id === 'boost' ? '95%' : selectedMode.id === 'personal' ? '72%' : '50%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thin rule */}
        <div className="h-px bg-[#141414] mb-16" />

        {/* Secondary specs — inline text grid, no containers */}
        <div>
          <div className="text-[10px] font-mono-tech tracking-widest text-[#555] uppercase mb-10">
            WLTP BATTERY & CHARGING ARCHITECTURE
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10">
            {SECONDARY_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[8px] font-mono-tech tracking-wider text-[#555] uppercase mb-2">{s.note}</div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white mb-1">{s.value}</div>
                <div className="text-[9px] font-mono-tech tracking-widest text-[#38bdf8] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal footnote */}
        <div className="mt-20 pt-8 border-t border-[#111] text-[9px] font-mono-tech text-[#333] leading-relaxed">
          Official data per WLTP measurement procedure. Power consumption: 23.8–20.8 kWh/100 km. CO₂ emissions: 0 g/km. Range up to 560 km. Battery warranty 8 years or 160,000 km.
        </div>

      </div>
    </section>
  );
};
