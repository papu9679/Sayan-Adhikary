import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Code, 
  MessageSquare,
  FileText,
  Briefcase,
  GraduationCap,
  User,
  Send,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const { theme, toggleTheme, isDaylight } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Throttled high-performance scroll handler
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const scrolled = currentScroll > 20;
          if (scrolled !== lastScrolled) {
            lastScrolled = scrolled;
            setIsScrolled(scrolled);
          }

          // Calculate reading progress %
          const winHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (winHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentScroll / winHeight) * 100)));
          }

          // Active section spy
          const sections = ['about', 'education', 'skills', 'projects', 'resume', 'feedback', 'contact'];
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.getBoundingClientRect().top <= 200) {
              setActiveSection(sections[i]);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { name: 'Skills', href: '#skills', id: 'skills', icon: Code },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Briefcase },
    { name: 'Resume', href: '#resume', id: 'resume', icon: FileText },
    { name: 'Feedback', href: '#feedback', id: 'feedback', icon: MessageSquare },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Send },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled 
          ? isDaylight
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
            : 'bg-[#0b0f19]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-slate-800'
          : 'bg-transparent'
      }`}
    >
      {/* Top Reading Progress Bar */}
      <div 
        className="h-[2px] bg-blue-600 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-2xl p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-600 transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-bold text-lg transition-colors ${
                isDaylight ? 'bg-white text-slate-900' : 'bg-[#0f172a] text-white'
              }`}>
                <span className="braided-text font-black text-xl">SA</span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-extrabold tracking-tight text-lg transition-colors leading-tight ${
                isDaylight ? 'text-slate-900' : 'text-white'
              }`}>
                Sayan Adhikary
              </span>
              <span className={`text-xs font-semibold flex items-center gap-1.5 ${
                isDaylight ? 'text-blue-600' : 'text-blue-400'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Full-Stack Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Active Indicator */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? isDaylight
                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                        : 'bg-white/10 text-white shadow-sm border border-slate-700'
                      : isDaylight 
                        ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 border border-transparent' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: Daylight Switch & Admin */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Daylight Feature Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Daylight Mode"
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-transform duration-150 active:scale-95 border cursor-pointer ${
                isDaylight
                  ? 'bg-amber-100/90 text-amber-950 border-amber-300 hover:bg-amber-200'
                  : 'bg-slate-800 text-blue-300 border-slate-700 hover:bg-slate-700'
              }`}
              title={isDaylight ? "Switch to Night Mode" : "Switch to Daylight Mode"}
            >
              {isDaylight ? (
                <>
                  <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                  <span className="font-bold">Daylight</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-300" />
                  <span className="font-bold">Night</span>
                </>
              )}
            </button>

            {/* Admin Moderation Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-transform duration-150 active:scale-95 border cursor-pointer ${
                isDaylight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="Admin Feedback Moderation Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Admin</span>
            </button>

            {/* CTA Button */}
            <a
              href="#feedback"
              className="px-4 py-2 rounded-2xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
            >
              Feedback Wall
            </a>
          </div>

          {/* Mobile Menu & Daylight toggle for Phone / Tab */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Daylight Mode"
              className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                isDaylight 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-slate-800 text-blue-300 border-slate-700'
              }`}
            >
              {isDaylight ? <Sun className="w-5 h-5 text-amber-600" /> : <Moon className="w-5 h-5 text-blue-300" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                isDaylight 
                  ? 'bg-slate-100 text-slate-900 border-slate-300' 
                  : 'bg-white/10 text-white border-white/20'
              }`}
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-5 pt-4 pb-6 shadow-2xl ${
          isDaylight 
            ? 'bg-white border-slate-200 text-slate-900' 
            : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    isActive
                      ? isDaylight
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-white/10 text-white'
                      : isDaylight 
                        ? 'hover:bg-slate-100 text-slate-800' 
                        : 'hover:bg-white/5 text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {link.name}
                </a>
              );
            })}

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold border ${
                  isDaylight 
                    ? 'bg-slate-100 text-slate-800 border-slate-300' 
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Admin Feedback Portal
              </button>

              <a
                href="#feedback"
                onClick={handleLinkClick}
                className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-blue-600 shadow-sm"
              >
                Submit Feedback
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
