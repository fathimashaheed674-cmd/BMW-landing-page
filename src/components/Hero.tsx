import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ParticleField } from './ParticleField';

interface HeroProps {
  frameImage: string | null;
}

export const Hero: React.FC<HeroProps> = ({ frameImage }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        topBarRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' },
        '-=0.3'
      );

      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      );

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.4'
      );

      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[680px] flex items-end overflow-hidden bg-[#050505]"
    >
      {/* Studio Lighting Radial Spotlight for Controlled Automotive Highlights */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(30, 90, 180, 0.14) 0%, rgba(5, 5, 5, 0) 70%)',
        }}
      />

      {/* Main Car Visual — Prominent & Brightened with Studio Clarity */}
      {frameImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={frameImage}
            alt="BMW i7 M70 xDrive — Assembled Architecture"
            className="w-full h-full object-cover"
            style={{
              objectPosition: '50% 58%',
              filter: 'contrast(1.08) brightness(1.15)',
            }}
          />
          {/* Subtle Studio Floor and Top Edge Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none" style={{ height: '100%' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Subtle Three.js Particle Field for Atmospheric Depth */}
      <ParticleField className="z-[2]" />

      {/* Top Engineering Status Bar */}
      <div
        ref={topBarRef}
        className="absolute top-24 left-0 right-0 px-6 sm:px-12 z-10 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3 text-[10px] font-mono-tech tracking-widest text-[#A0A0A0] uppercase">
          <span className="text-[#38bdf8] font-bold">TYPE G70</span>
          <span className="w-6 h-px bg-[#333333]" />
          <span>CLAR-WEV PLATFORM</span>
          <span className="w-6 h-px bg-[#333333] hidden sm:inline" />
          <span className="text-[#F5F5F5] hidden sm:inline">DUAL 5th GEN eDRIVE</span>
        </div>
        <div className="text-[10px] font-mono-tech tracking-widest text-[#888888] uppercase hidden md:block">
          ENGINEERED IN DINGOLFING, GERMANY
        </div>
      </div>

      {/* Hero Headline & Information Area */}
      <div className="relative z-10 w-full px-6 sm:px-12 pb-14 sm:pb-20 max-w-7xl mx-auto">
        {/* Pre-label Badge */}
        <div className="mb-4 flex items-center space-x-3">
          <span className="h-0.5 w-10 bg-[#1c69d4]" />
          <span className="font-mono-tech text-xs tracking-widest2 text-[#38bdf8] uppercase font-semibold">
            THE PINNACLE OF M ELECTRIC LUXURY
          </span>
        </div>

        {/* Primary Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-bold text-5xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tight text-[#FFFFFF] leading-[0.92] uppercase"
        >
          THE FUTURE.
          <br />
          ENGINEERED.
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="mt-5 font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-wider text-[#E5E7EB] uppercase"
        >
          BMW i7 M70 xDrive
        </p>

        {/* Tagline & Key Verified Telemetry */}
        <div ref={tagRef} className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-[#222222] pt-6">
          <div className="border-l-2 border-[#1c69d4] pl-3">
            <div className="text-xs sm:text-sm font-mono-tech tracking-widest text-[#D1D5DB] uppercase font-medium">
              PURE ELECTRIC. PURE PRECISION.
            </div>
            <div className="text-[10px] font-mono-tech text-[#888888] uppercase mt-0.5">
              ALL-ELECTRIC HIGH-PERFORMANCE SEDAN
            </div>
          </div>

          <div className="flex items-center space-x-6 sm:space-x-10 text-xs font-mono-tech tracking-widest uppercase">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">650</span>
              <span className="ml-1 text-[#38bdf8] font-semibold">HP</span>
            </div>
            <span className="h-4 w-px bg-[#2a2a2a]" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">1,100</span>
              <span className="ml-1 text-[#38bdf8] font-semibold">NM</span>
            </div>
            <span className="h-4 w-px bg-[#2a2a2a]" />
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">3.7</span>
              <span className="ml-1 text-[#38bdf8] font-semibold">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 pointer-events-none"
      >
        <span className="font-mono-tech text-[9px] tracking-widest text-[#888888] uppercase">
          SCROLL TO EXPLORE DISASSEMBLY
        </span>
        <div className="h-7 w-4 border border-[#444444] rounded-full flex items-start justify-center pt-1">
          <div className="w-1 h-2 bg-[#38bdf8] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
