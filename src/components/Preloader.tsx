import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  progress: number;
  totalFrames: number;
  loadedFrames: number;
  isReady: boolean;
  onEnter: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  progress,
  loadedFrames,
  totalFrames,
  onEnter,
}) => {
  const [dots, setDots] = useState('');
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#050505] p-8 md:p-14 transition-opacity duration-700 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-6">
        <div className="flex items-center space-x-3">
          {/* BMW Roundel Logo */}
          <div className="relative h-9 w-9">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle cx="50" cy="50" r="47" fill="#050505" stroke="#C0C0C0" strokeWidth="2" />
              <path d="M50 3 A47 47 0 0 1 97 50 L50 50 Z" fill="#0066B1" />
              <path d="M50 97 A47 47 0 0 1 3 50 L50 50 Z" fill="#0066B1" />
              <path d="M3 50 A47 47 0 0 1 50 3 L50 50 Z" fill="#F5F5F5" />
              <path d="M97 50 A47 47 0 0 1 50 97 L50 50 Z" fill="#F5F5F5" />
              <circle cx="50" cy="50" r="22" fill="#050505" stroke="#333333" strokeWidth="1" />
              <text x="50" y="54" textAnchor="middle" fill="#C0C0C0" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="0.1em">M</text>
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase">
              BMW i7 M70 xDrive
            </div>
            <div className="text-[10px] tracking-wider text-[#777777] uppercase font-mono-tech">
              DIGITAL EXPERIENCE ARCHITECTURE
            </div>
          </div>
        </div>

        <div className="font-mono-tech text-xs tracking-wider text-[#777777]">
          VER 2.4 // 485 kW // G70
        </div>
      </div>

      {/* Center Cinematic Display */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex items-center space-x-2 text-[11px] tracking-widest3 text-[#1c69d4] uppercase font-mono-tech">
          <span className="inline-block h-1.5 w-1.5 bg-[#1c69d4] animate-pulse"></span>
          <span>INITIALIZING ENGINEERING ASSETS{dots}</span>
        </div>

        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-[#F5F5F5] uppercase max-w-4xl">
          THE FUTURE.<br />ENGINEERED.
        </h1>

        {/* Technical progress counter */}
        <div className="mt-8 font-mono-tech text-6xl md:text-8xl font-light text-[#F5F5F5] tracking-tighter">
          {Math.floor(progress).toString().padStart(3, '0')}
          <span className="text-2xl md:text-3xl font-normal text-[#1c69d4] ml-1">%</span>
        </div>

        {/* Progress Bar with Thin Metallic Design */}
        <div className="mt-8 w-full max-w-md">
          <div className="h-[2px] w-full bg-[#1c1c1c] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1c69d4] via-[#C0C0C0] to-[#F5F5F5] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-widest text-[#666666] font-mono-tech uppercase">
            <span>SEQUENCE BUFFER: {loadedFrames} / {totalFrames} FRAMES</span>
            <span>STATUS: {progress >= 100 ? 'READY' : 'STREAMING'}</span>
          </div>
        </div>

        {progress >= 100 && (
          <button
            onClick={handleEnter}
            className="mt-8 border border-[#C0C0C0] bg-[#101010] px-8 py-3.5 text-xs font-semibold tracking-widest2 text-[#F5F5F5] uppercase transition-all duration-300 hover:border-[#1c69d4] hover:bg-[#1a1a1a] active:scale-95"
          >
            ENTER EXPERIENCE
          </button>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#222222] pt-6 text-[10px] tracking-widest text-[#555555] font-mono-tech uppercase gap-2">
        <div>BMW GROUP ARCHITECTURE &amp; DESIGN // MUNICH</div>
        <div>OPTIMIZED FOR 60FPS FRAME-ACCURATE SCRUBBING</div>
      </div>
    </div>
  );
};
