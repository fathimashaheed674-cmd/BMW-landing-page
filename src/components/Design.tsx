import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: 'exterior', code: 'EXT·01', index: '01',
    category: 'EXTERIOR ARCHITECTURE',
    title: 'PURPOSEFUL MONOLITHIC SILHOUETTE.',
    subtitle: 'Cd 0.24 · 5,391 mm Length · 3,215 mm Wheelbase',
    image: '/images/design/exterior_silhouette.webp',
    description: 'The BMW i7 M70 redefines executive luxury proportions with flush frameless door handles and clean monolithic surface treatment. Active air curtains and aerodynamic underbody shaping achieve Cd 0.24 despite its commanding 5,391 mm length.',
    stat: { value: 'Cd 0.24', label: 'DRAG COEFFICIENT' },
    tag: 'AERO OPTIMISED BODY',
  },
  {
    id: 'grille', code: 'EXT·02', index: '02',
    category: 'FRONT ARCHITECTURE',
    title: 'ILLUMINATED M KIDNEY GRILLE.',
    subtitle: 'Iconic Glow · M Mesh · Active Cooling Flaps',
    image: '/images/design/kidney_grille.webp',
    description: 'BMW Iconic Glow contour illumination on the largest kidney grille in BMW history. M-specific horizontal double louvers with electronically actuated lower air flaps for optimal thermal management.',
    stat: { value: '650 m', label: 'HIGH-BEAM RANGE' },
    tag: 'ICONIC GLOW LED',
  },
  {
    id: 'lighting', code: 'EXT·03', index: '03',
    category: 'OPTICAL ENGINEERING',
    title: 'SWAROVSKI CRYSTAL HEADLIGHTS.',
    subtitle: 'Genuine Crystal Quartz · Matrix LED · 650m Range',
    image: '/images/design/crystal_lighting.webp',
    description: 'Precision-faceted crystal elements crafted from genuine Swarovski quartz refracting ambient daylight into shimmering spectrums. Dynamic greeting animations cascade through the facets.',
    stat: { value: '650 m', label: 'ADAPTIVE BEAM REACH' },
    tag: 'ADAPTIVE MATRIX LED',
  },
  {
    id: 'wheels', code: 'CHAS·01', index: '04',
    category: 'RUNNING GEAR',
    title: '21″ M AERODYNAMIC WHEELS.',
    subtitle: '21″ Style 910 M · 6-Piston M Sport Brakes',
    image: '/images/design/exploded_wheels.webp',
    description: '21-inch M Aerodynamic 910 M style wheels with aerodynamic carbon inserts smooth high-velocity air vortexes around the wheel wells, paired with 6-piston M Sport compound brake callipers.',
    stat: { value: '21″', label: 'FORGED M ALLOY' },
    tag: 'M SPORT BRAKES',
  },
  {
    id: 'interior', code: 'INT·01', index: '05',
    category: 'LUXURY CABIN',
    title: 'THE EXECUTIVE EXPERIENCE.',
    subtitle: '31.3″ 8K OLED · B&W Diamond 4D · 1,965W',
    image: '/images/design/interior_cabin.webp',
    description: 'Rear Executive Lounge seating, Sky Lounge panoramic roof, and Merino leather throughout. The 31.3-inch 8K BMW Theater Screen transforms the rear cabin into a cinema on wheels.',
    stat: { value: '1,965 W', label: 'B&W SOUND OUTPUT' },
    tag: 'BWM THEATER SCREEN',
  },
  {
    id: 'materials', code: 'INT·02', index: '06',
    category: 'BESPOKE CRAFTSMANSHIP',
    title: 'EVERY SURFACE. INTENTIONAL.',
    subtitle: 'Cut Crystal Controls · Merino Leather · Carbon M',
    image: '/images/design/chassis_battery.webp',
    description: 'CraftedClarity crystal glass iDrive controller, gear selector, and volume roller. BMW Individual Merino leather with genuine cashmere wool inserts—the first time natural cashmere has appeared in a production luxury car.',
    stat: { value: '100%', label: 'GREEN ENERGY SOURCED' },
    tag: 'CRAFTEDCLARITY CRYSTAL',
  },
];

export const Design: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const active = PILLARS[activeIdx];

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    audioEngine.playSelect();

    // Animate image out then in
    if (imageRef.current && contentRef.current) {
      gsap.to([imageRef.current, contentRef.current], {
        opacity: 0, y: 12, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          setActiveIdx(idx);
          gsap.to([imageRef.current, contentRef.current], {
            opacity: 1, y: 0, duration: 0.4, ease: 'expo.out',
          });
        },
      });
    } else {
      setActiveIdx(idx);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="design" ref={sectionRef} className="bg-[#050505] border-t border-[#111]" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>

      {/* ── Section header ── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 sm:px-12 mb-14">
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-px w-10 bg-[#1c69d4]" />
          <span className="font-mono-tech text-[10px] tracking-widest2 text-[#38bdf8] uppercase">
            CRAFTSMANSHIP &amp; ARCHITECTURE
          </span>
        </div>
        <h2 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-white uppercase leading-[0.90] tracking-tight">
          EVERY DETAIL.<br />INTENTIONAL.
        </h2>
        <p className="mt-5 max-w-xl text-sm text-[#A0A0A0] leading-relaxed">
          From crystal-cut optics and illuminated kidney contours to the carbon-reinforced passenger cell—every element is an engineering statement.
        </p>
      </div>

      {/* ── Pillar selector — plain text tabs, NO boxes ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10">
        <div className="flex flex-wrap gap-x-8 gap-y-5 border-b border-[#141414] pb-6">
          {PILLARS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => audioEngine.playTick()}
              className={`group flex items-baseline space-x-2 text-xs font-mono-tech uppercase tracking-widest transition-colors duration-200 ${
                idx === activeIdx ? 'text-white' : 'text-[#444] hover:text-[#A0A0A0]'
              }`}
            >
              <span className={`text-[9px] font-bold mr-1 ${idx === activeIdx ? 'text-[#38bdf8]' : 'text-[#2a2a2a]'}`}>{p.index}</span>
              <span>{p.title.replace('.', '').split(' ').slice(0, 3).join(' ')}</span>
              {idx === activeIdx && <span className="ml-2 h-px w-6 bg-[#38bdf8] inline-block self-center" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main showcase: full-bleed image, text floats on black alongside ── */}
      <div className="relative">
        {/* Full bleed image — edge to edge */}
        <div ref={imageRef} className="relative overflow-hidden" style={{ height: 'clamp(340px, 55vw, 680px)' }}>
          <img
            src={active.image}
            alt={active.title}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ filter: 'contrast(1.1) brightness(1.12)' }}
          />

          {/* Left dark fade — leaves right 55% of image visible, text lives in left space */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent" />
          {/* Top fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />

          {/* Text overlay — floats in the left dark zone */}
          <div ref={contentRef} className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
              <div className="max-w-sm sm:max-w-md">
                {/* Code label */}
                <div className="font-mono-tech text-[9px] tracking-widest text-[#38bdf8] uppercase mb-3">
                  {active.code} · {active.category}
                </div>

                {/* Giant stat */}
                <div className="mb-4">
                  <div className="font-display text-6xl sm:text-7xl font-bold text-white leading-none">
                    {active.stat.value}
                  </div>
                  <div className="font-mono-tech text-[9px] tracking-widest text-[#38bdf8] uppercase mt-1">
                    {active.stat.label}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-tight mb-2">
                  {active.title}
                </h3>

                {/* Subtitle */}
                <div className="font-mono-tech text-xs text-[#888] uppercase tracking-wider mb-4">
                  {active.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-[#C0C0C0] leading-relaxed mb-5">
                  {active.description}
                </p>

                {/* Tag pill — text only, no box */}
                <div className="font-mono-tech text-[10px] text-[#38bdf8] uppercase tracking-widest">
                  → {active.tag}
                </div>
              </div>
            </div>
          </div>

          {/* Pillar index floating top-right */}
          <div className="absolute top-6 right-8 font-display text-[80px] sm:text-[120px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
            {active.index}
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip — 6 images in a row, text below each ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12">
        <div className="font-mono-tech text-[9px] tracking-widest text-[#333] uppercase mb-6">
          ALL DESIGN PILLARS — SCROLL TO EXPLORE
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {PILLARS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => audioEngine.playTick()}
              className="group text-left"
            >
              {/* Thumbnail image */}
              <div className="relative overflow-hidden mb-2" style={{ aspectRatio: '4/3' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    idx === activeIdx ? '' : 'opacity-50 group-hover:opacity-75'
                  }`}
                  style={{
                    filter: idx === activeIdx
                      ? 'contrast(1.1) brightness(1.1)'
                      : 'contrast(0.85) brightness(0.6)',
                  }}
                />
                {/* Active: thin blue underline */}
                {idx === activeIdx && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38bdf8]" />
                )}
                {/* Index tag top-left */}
                <div className={`absolute top-1.5 left-2 font-mono-tech text-[8px] tracking-widest uppercase font-bold ${idx === activeIdx ? 'text-[#38bdf8]' : 'text-[#555]'}`}>
                  {p.index}
                </div>
              </div>

              {/* Label below thumbnail — text on black, no box */}
              <div className={`font-mono-tech text-[8px] sm:text-[9px] tracking-widest uppercase leading-tight transition-colors duration-200 ${
                idx === activeIdx ? 'text-white' : 'text-[#444] group-hover:text-[#888]'
              }`}>
                {p.title.replace('.', '').split(' ').slice(0, 2).join(' ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Thin rule */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-20">
        <div className="h-px bg-[#111]" />
      </div>
    </section>
  );
};
