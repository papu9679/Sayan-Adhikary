import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { Heart, ArrowUp, Sun, Moon } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';

export default function Footer({ onOpenAdmin }) {
  const { isDaylight, toggleTheme } = useTheme();
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDaylight 
        ? 'bg-slate-100/90 border-slate-200 text-slate-700' 
        : 'bg-[#05070e] border-slate-800 text-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          
          {/* Brand & summary */}
          <div className="md:col-span-5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-600">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-xs ${
                  isDaylight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                }`}>
                  SA
                </div>
              </div>
              <span className="font-black text-xl text-slate-900 dark:text-white">
                Sayan Adhikary
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto md:mx-0 font-medium">
              Full-Stack Software Engineer building responsive web applications with React, Express, and MongoDB.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
            <a href="#education" className="hover:text-blue-600 dark:hover:text-blue-400">Education</a>
            <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400">Skills</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400">Projects</a>
            <a href="#resume" className="hover:text-blue-600 dark:hover:text-blue-400">Resume</a>
            <a href="#feedback" className="hover:text-blue-600 dark:hover:text-blue-400">Feedback</a>
            <button 
              onClick={onOpenAdmin} 
              className="text-blue-600 dark:text-blue-400 hover:underline font-extrabold"
            >
              Admin Portal
            </button>
          </div>

          {/* Right actions: Socials + Back to Top */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl border transition-colors ${
                isDaylight 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-slate-800 text-blue-300 border-slate-700'
              }`}
              title={isDaylight ? "Switch to Night Mode" : "Switch to Daylight Mode"}
            >
              {isDaylight ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-blue-300" />}
            </button>

            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-2xl border transition-colors hover:scale-105 ${
                isDaylight 
                  ? 'bg-white text-slate-800 border-slate-300 shadow-sm' 
                  : 'bg-slate-800 text-slate-100 border-slate-700'
              }`}
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3 font-medium">
          <p>
            © {new Date().getFullYear()} Sayan Adhikary. Built with React, Tailwind CSS, Express & MongoDB.
          </p>
          <p className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <span>Built with care</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for the web</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
