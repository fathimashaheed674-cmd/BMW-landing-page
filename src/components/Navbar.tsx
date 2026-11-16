import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onNavigate: (id: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const state = audioEngine.toggle();
    setAudioEnabled(state);
  };

  const navItems = [
    { label: 'DISASSEMBLY', id: 'disassembly' },
    { label: 'ENGINEERING', id: 'engineering' },
    { label: 'PERFORMANCE', id: 'performance' },
    { label: 'DESIGN', id: 'design' },
    { label: 'EXPLORE', id: 'closing' },
  ];

  const handleNavClick = (id: string) => {
    audioEngine.playTick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#050505] border-b border-[#1f1f1f]'
          : 'bg-[#050505]/95 border-b border-[#161616]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center space-x-3.5 cursor-pointer group select-none"
        >
          {/* Authentic BMW Roundel SVG */}
          <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle cx="50" cy="50" r="48" fill="#050505" stroke="#C0C0C0" strokeWidth="2" />
              <path d="M50 2 A48 48 0 0 1 98 50 L50 50 Z" fill="#0066B1" />
              <path d="M50 98 A48 48 0 0 1 2 50 L50 50 Z" fill="#0066B1" />
              <path d="M2 50 A48 48 0 0 1 50 2 L50 50 Z" fill="#F5F5F5" />
              <path d="M98 50 A48 48 0 0 1 50 98 L50 50 Z" fill="#F5F5F5" />
              <circle cx="50" cy="50" r="23" fill="#050505" stroke="#2a2a2a" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#666666" strokeWidth="0.75" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-sm tracking-widest text-[#F5F5F5] uppercase">
                BMW i7
              </span>
              <span className="bg-[#101010] border border-[#2a2a2a] px-1.5 py-0.5 text-[10px] font-mono-tech font-semibold tracking-wider text-[#1c69d4]">
                M70
              </span>
              <span className="text-[10px] tracking-wider text-[#888888] font-mono-tech hidden sm:inline">
                xDrive
              </span>
            </div>
            <span className="text-[9px] tracking-widest text-[#666666] font-mono-tech uppercase">
              PURE ELECTRIC PRECISION
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group relative py-2 text-xs font-semibold tracking-widest2 text-[#AAAAAA] uppercase transition-colors duration-200 hover:text-[#F5F5F5]"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1c69d4] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right Utility & CTA */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Subtle Acoustic Feedback Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center space-x-2 border px-3 py-1.5 text-[10px] font-mono-tech uppercase tracking-wider transition-all duration-200 ${
              audioEnabled
                ? 'border-[#1c69d4] bg-[#0c1a2d] text-[#38bdf8]'
                : 'border-[#222222] bg-[#0a0a0a] text-[#777777] hover:border-[#444444] hover:text-[#C0C0C0]'
            }`}
            title="Toggle IconicSounds Electric engine audio"
          >
            {audioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{audioEnabled ? 'ACOUSTICS ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Configure CTA */}
          <button
            onClick={() => handleNavClick('closing')}
            className="border border-[#C0C0C0] bg-[#101010] px-5 py-2 text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase transition-all duration-300 hover:bg-[#F5F5F5] hover:text-[#050505] active:scale-95"
          >
            CONFIGURE
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={handleAudioToggle}
            className="border border-[#222222] p-2 text-[#888888]"
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border border-[#222222] p-2 text-[#F5F5F5]"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#222222] bg-[#050505] px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 text-sm font-semibold tracking-widest text-[#C0C0C0] hover:text-white uppercase font-mono-tech"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-[#1f1f1f]">
            <button
              onClick={() => handleNavClick('closing')}
              className="w-full border border-[#C0C0C0] py-3 text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase bg-[#111111]"
            >
              CONFIGURE YOUR i7 M70
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
