import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { audioEngine } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface ClosingProps {
  frameImage: string | null;
}

export const Closing: React.FC<ClosingProps> = ({ frameImage }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });

      tl.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }
      );
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' },
        '-=0.5'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="closing"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#050505] border-t border-[#111]"
    >
      {/* Subtle blue radial spotlight under the car */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 55%, rgba(28,105,212,0.12) 0%, transparent 70%)' }}
      />

      {/* Full-bleed vehicle visual */}
      {frameImage && (
        <div className="absolute inset-0">
          <img
            src={frameImage}
            alt="BMW i7 M70 xDrive"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 52%', filter: 'contrast(1.08) brightness(1.15)' }}
          />
          {/* Bottom letterbox — text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
        </div>
      )}

      {/* Text floats directly on the image — no container box whatsoever */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-20 sm:pb-28 pt-32">

        <div ref={textRef} className="opacity-0">
          <div className="flex items-center space-x-3 mb-5">
            <span className="h-0.5 w-10 bg-[#1c69d4]" />
            <span className="font-mono-tech text-[10px] tracking-widest2 text-[#38bdf8] uppercase">
              BMW i7 M70 xDrive
            </span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl xl:text-[8rem] font-bold text-white uppercase leading-[0.90] tracking-tight">
            THE ART OF<br />ENGINEERING.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#D1D5DB] font-light max-w-lg leading-relaxed">
            The most powerful, technologically advanced luxury sedan BMW has ever created.
          </p>
        </div>

        {/* CTA — text buttons, no box frames */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-6 opacity-0">
          <button
            className="text-sm font-bold tracking-widest text-[#050505] uppercase bg-white px-10 py-4 transition-all duration-300 hover:bg-transparent hover:text-white active:scale-95"
            onClick={() => audioEngine.playSelect()}
          >
            EXPLORE BMW
          </button>
          <button
            className="text-sm font-bold tracking-widest text-white uppercase border-b border-[#555] pb-1 transition-all duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8]"
            onClick={() => audioEngine.playTick()}
          >
            CONFIGURE SPECIFICATION →
          </button>
        </div>

        {/* Key stats — floating text on the image */}
        <div className="mt-16 pt-6 border-t border-[#2a2a2a] flex flex-wrap gap-10">
          {[
            { label: 'SERIES', value: 'BMW i7 M70 xDrive', extra: 'AVAILABLE GLOBALLY' },
            { label: 'PROPULSION', value: '5th Gen Dual eDrive', extra: '485 kW / 650 HP' },
            { label: 'PRODUCTION', value: 'Dingolfing, Germany', extra: 'CLAR-WEV PLATFORM' },
            { label: 'PERFORMANCE', value: '0–100 in 3.7s', extra: '1,100 NM PEAK TORQUE' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[9px] font-mono-tech tracking-widest text-[#777] uppercase">{item.label}</div>
              <div className="text-sm font-display font-bold text-white mt-0.5">{item.value}</div>
              <div className="text-[9px] font-mono-tech tracking-wider text-[#38bdf8] uppercase mt-0.5">{item.extra}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer — minimal text, no box */}
      <footer className="relative z-10 bg-[#050505] border-t border-[#111]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* BMW Roundel + name */}
            <div className="flex items-center space-x-4">
              <div className="relative h-9 w-9 opacity-90 shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle cx="50" cy="50" r="47" fill="#050505" stroke="#C0C0C0" strokeWidth="2" />
                  <path d="M50 3 A47 47 0 0 1 97 50 L50 50 Z" fill="#0066B1" />
                  <path d="M50 97 A47 47 0 0 1 3 50 L50 50 Z" fill="#0066B1" />
                  <path d="M3 50 A47 47 0 0 1 50 3 L50 50 Z" fill="#F5F5F5" />
                  <path d="M97 50 A47 47 0 0 1 50 97 L50 50 Z" fill="#F5F5F5" />
                  <circle cx="50" cy="50" r="22" fill="#050505" stroke="#333" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-mono-tech tracking-widest text-[#E5E7EB] uppercase font-bold">Bayerische Motoren Werke AG</div>
                <div className="text-[10px] font-mono-tech tracking-widest text-[#555] uppercase">BMW M GmbH · Munich, Germany</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-[10px] font-mono-tech tracking-widest text-[#555] uppercase">
              {['Privacy Policy', 'Legal Notice', 'Cookie Settings', 'WLTP Data', 'Contact'].map((l) => (
                <span key={l} className="cursor-pointer hover:text-[#C0C0C0] transition-colors">{l}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[9px] font-mono-tech text-[#333] leading-relaxed">
            <p className="max-w-3xl">
              © {new Date().getFullYear()} Bayerische Motoren Werke AG. All rights reserved.
              Official WLTP consumption: 23.8–20.8 kWh/100 km. CO₂: 0 g/km.
            </p>
            <div className="text-[#38bdf8] uppercase font-semibold whitespace-nowrap">BUILD 2.4</div>
          </div>
        </div>
      </footer>
    </section>
  );
};
