import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from '../utils/audio';
import type { Hotspot } from '../types';

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS: Hotspot[] = [
  {
    id: 'body', name: 'BODY', code: 'STR-01', category: 'Vehicle Architecture',
    x: 62.9, y: 21.0,
    title: 'STRUCTURAL CARBON CORE ARCHITECTURE',
    subtitle: 'Multi-Material Safety Cell & Torsional Rigidity',
    description: 'Engineered around BMW Carbon Core technology, fusing carbon fiber-reinforced plastic (CFRP) with high-strength steels and aluminum. Extreme torsional rigidity of 45,000 Nm/deg while insulating the ultra-luxury passenger cabin from high-frequency road vibrations.',
    specs: [
      { label: 'MATERIAL MIX', value: 'CFRP / Multi-Material Steel' },
      { label: 'TORSIONAL RIGIDITY', value: '45,000 Nm/°' },
      { label: 'WEIGHT DISTRIBUTION', value: '50.0 : 50.0 Axis' },
      { label: 'PLATFORM CODE', value: 'CLAR-WEV Architecture' },
    ],
    highlightColor: '#C0C0C0',
  },
  {
    id: 'lighting', name: 'LIGHTING', code: 'OPT-02', category: 'Optical System',
    x: 75.5, y: 34.0,
    title: 'SIGNATURE SWAROVSKI CRYSTAL LIGHTING',
    subtitle: 'BMW Crystal Headlights & Adaptive Matrix LED',
    description: 'Precision-faceted crystal elements crafted from genuine Swarovski quartz back-lit by 22 individual LEDs create distinct welcome and farewell lighting choreographies. Adaptive Matrix LED high beams reach up to 650 metres.',
    specs: [
      { label: 'OPTICAL CRYSTAL', value: 'Faceted Swarovski Quartz' },
      { label: 'HIGH-BEAM TECH', value: 'Adaptive Matrix LED' },
      { label: 'ILLUMINATION RANGE', value: 'Up to 650 metres' },
      { label: 'CONTOUR GLOW', value: 'BMW Iconic Glow LED' },
    ],
    highlightColor: '#38bdf8',
  },
  {
    id: 'interior', name: 'INTERIOR', code: 'INT-03', category: 'Cabin Craftsmanship',
    x: 45.9, y: 43.0,
    title: 'EXECUTIVE THEATER LOUNGE',
    subtitle: 'BMW Curved Display & 31.3" 8K Theater Architecture',
    description: 'Ceiling-mounted 31.3-inch 8K BMW Theater Screen with Amazon Fire TV. Upholstered in BMW Individual Merino leather with real cashmere wool inserts—the first in a production luxury vehicle.',
    specs: [
      { label: 'THEATER SCREEN', value: '31.3" 8K Ultra-Wide OLED' },
      { label: 'SOUND SYSTEM', value: 'B&W 36-Speaker Diamond 4D' },
      { label: 'TOTAL OUTPUT', value: '1,965 Watts' },
      { label: 'AMBIENT LIGHT', value: 'Faceted Interaction Bar' },
    ],
    highlightColor: '#e0a96d',
  },
  {
    id: 'drivetrain', name: 'DRIVETRAIN', code: 'DRV-04', category: 'Propulsion Technology',
    x: 32.0, y: 65.0,
    title: 'DUAL M eDRIVE ELECTRIC PROPULSION',
    subtitle: 'Synchronous Dual Motors & 1,100 Nm Launch Torque',
    description: 'Rear-mounted motor generates 489 hp (360 kW)—the most powerful BMW motor ever built—paired with a 258 hp (190 kW) front motor, achieving a combined 650 hp (485 kW). Electrically excited synchronous machines eliminate rare-earth permanent magnets.',
    specs: [
      { label: 'SYSTEM OUTPUT', value: '650 hp (485 kW)' },
      { label: 'PEAK M TORQUE', value: '1,100 Nm (M Boost)' },
      { label: 'MOTOR TYPE', value: 'Dual Synchronous (ESM)' },
      { label: 'ACCELERATION', value: '0–100 km/h in 3.7s' },
    ],
    highlightColor: '#1c69d4',
  },
  {
    id: 'chassis', name: 'CHASSIS', code: 'CHS-05', category: 'Chassis Dynamics',
    x: 48.0, y: 58.0,
    title: 'PRECISION STRUCTURAL CHASSIS PLATFORM',
    subtitle: 'Adaptive 2-Axle Air Suspension & Executive Drive Pro',
    description: 'Electronically controlled active roll stabilization with 48V electric motors counteracts body roll at high speed. Integral Active Steering provides up to 3.5° of rear-axle steering for city agility and motorway stability.',
    specs: [
      { label: 'SUSPENSION', value: 'Adaptive 2-Axle Air' },
      { label: 'ROLL STABILIZATION', value: 'Executive Drive Pro 48V' },
      { label: 'REAR AXLE STEER', value: '3.5° Integral Active' },
      { label: 'BRAKES', value: 'M Sport 6-Piston Calipers' },
    ],
    highlightColor: '#a3a3a3',
  },
  {
    id: 'battery', name: 'BATTERY', code: 'BAT-06', category: 'High-Voltage Storage',
    x: 50.3, y: 85.0,
    title: 'STRUCTURAL HIGH-VOLTAGE BATTERY PACK',
    subtitle: '101.7 kWh Usable Structural Floor Matrix',
    description: 'Ultra-slim 84 mm lithium-ion modules bolted directly to the chassis floor pan act as a structural stiffening member. Delivers up to 560 km WLTP range with 195 kW DC ultra-fast charging.',
    specs: [
      { label: 'USABLE CAPACITY', value: '101.7 kWh (105.7 Gross)' },
      { label: 'WLTP RANGE', value: 'Up to 560 km' },
      { label: 'MAX DC CHARGE', value: '195 kW Fast Charging' },
      { label: '10–80% RECHARGE', value: '34 minutes' },
    ],
    highlightColor: '#00d2ff',
  },
];

interface EngineeringProps {
  image: string | null;
}

export const Engineering: React.FC<EngineeringProps> = ({ image }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[3]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleHotspotClick = (h: Hotspot) => {
    audioEngine.playSelect();
    setSelectedHotspot(h);
  };

  return (
    <section id="engineering" ref={sectionRef} className="bg-[#050505] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Section Label + Headline — floating on pure black */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-px w-10 bg-[#1c69d4]" />
            <span className="font-mono-tech text-[10px] tracking-widest2 text-[#38bdf8] uppercase">
              IMMERSIVE VEHICLE ARCHITECTURE
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white uppercase leading-[0.92] tracking-tight">
            EXPLODED VIEW.<br />ENGINEERED SOUL.
          </h2>
          <p className="mt-5 max-w-lg text-sm text-[#C0C0C0] leading-relaxed">
            Select any hotspot to inspect structural architecture, propulsion, and executive cabin engineering.
          </p>
        </div>

        {/* Component Selector — text tabs, no borders */}
        <div ref={contentRef} className="mb-10 flex flex-wrap gap-6">
          {HOTSPOTS.map((h) => (
            <button
              key={h.id}
              onClick={() => handleHotspotClick(h)}
              onMouseEnter={() => audioEngine.playTick()}
              className={`flex items-center space-x-2 text-xs font-mono-tech uppercase tracking-widest transition-colors duration-200 pb-1 ${
                selectedHotspot.id === h.id
                  ? 'text-white border-b border-[#38bdf8]'
                  : 'text-[#555555] hover:text-[#A0A0A0]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: h.highlightColor }} />
              <span>{h.name}</span>
            </button>
          ))}
        </div>

        {/* Dominant Exploded View — image edge-to-edge, no box */}
        <div className="relative w-full aspect-video bg-[#050505] mb-6">
          <img
            src={image || '/images/exploded_engineering.webp'}
            alt="BMW i7 M70 xDrive — Exploded Engineering Composition"
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.08) brightness(1.1)' }}
          />

          {/* Blueprint grid */}
          <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-15" />

          {/* Hotspot Markers */}
          {HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot)}
                onMouseEnter={() => audioEngine.playTick()}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                aria-label={hotspot.name}
              >
                <span
                  className={`absolute -inset-3 rounded-full transition-opacity duration-300 ${isSelected ? 'animate-radar opacity-80' : 'opacity-0 group-hover:opacity-40'}`}
                  style={{ border: `1px solid ${hotspot.highlightColor}` }}
                />
                <div
                  className={`relative flex items-center justify-center transition-transform duration-200 ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}
                  style={{ width: 32, height: 32 }}
                >
                  <div
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: isSelected ? hotspot.highlightColor : '#555', borderWidth: isSelected ? '1.5px' : '1px', backgroundColor: '#05050590' }}
                  />
                  <div className="rounded-full" style={{ width: isSelected ? 8 : 5, height: isSelected ? 8 : 5, backgroundColor: isSelected ? hotspot.highlightColor : '#888' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-px bg-[#444]" />
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-px bg-[#444]" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 h-2 w-px bg-[#444]" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-2 w-px bg-[#444]" />
                </div>
                {/* Floating name label */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap pointer-events-none transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <span className="font-mono-tech text-[9px] tracking-widest uppercase text-white">{hotspot.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Info — text on pure black, no box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: headline + description */}
          <div>
            <div className="text-[10px] font-mono-tech tracking-widest text-[#38bdf8] uppercase mb-2">
              {selectedHotspot.code} // {selectedHotspot.category}
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
              {selectedHotspot.title}
            </h3>
            <div className="mt-1 text-sm font-mono-tech text-[#777777] uppercase tracking-wider">
              {selectedHotspot.subtitle}
            </div>
            <div className="mt-5 h-px w-16 bg-[#222]" />
            <p className="mt-5 text-sm text-[#C0C0C0] leading-relaxed max-w-md">
              {selectedHotspot.description}
            </p>
          </div>

          {/* Right: specs as inline text rows, no cards */}
          <div>
            <div className="text-[10px] font-mono-tech tracking-widest text-[#555] uppercase mb-6">
              ENGINEERING BENCHMARKS
            </div>
            <div className="space-y-5">
              {selectedHotspot.specs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between border-b border-[#141414] pb-4">
                  <span className="text-[10px] font-mono-tech tracking-widest text-[#666] uppercase">
                    {spec.label}
                  </span>
                  <span className="font-display font-bold text-xl text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thin separator */}
        <div className="mt-20 h-px bg-[#141414]" />
      </div>
    </section>
  );
};
