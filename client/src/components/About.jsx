import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { 
  UserCheck, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  Globe 
} from 'lucide-react';

export default function About() {
  const { isDaylight } = useTheme();
  const { personal } = portfolioData;

  const corePillars = [
    {
      title: "Full-Stack Web Development",
      desc: "Building complete web applications using React, Node.js, Express, and MongoDB with structured data models.",
      icon: Cpu,
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      title: "Modern UI & Clean Styling",
      desc: "Designing responsive interfaces with Tailwind CSS, clean layouts, and thoughtful light/dark themes.",
      icon: Sparkles,
      gradient: "from-blue-500 to-sky-500"
    },
    {
      title: "Responsive Across Devices",
      desc: "Ensuring consistent usability across phones, tablets, and desktop browsers without layout shifts.",
      icon: Layers,
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      title: "API Design & Security",
      desc: "Developing RESTful endpoints with input validation, JWT authentication, and protected admin routes.",
      icon: ShieldCheck,
      gradient: "from-slate-800 to-blue-900"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Background & Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About <span className="braided-text">Sayan Adhikary</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Full-stack developer building practical web tools and dependable backend services.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Narrative text */}
          <div className="lg:col-span-6 space-y-5 text-base sm:text-lg leading-relaxed text-left">
            {personal.fullBio.map((paragraph, idx) => (
              <p 
                key={idx}
                className={`p-6 rounded-2xl border transition-all text-slate-800 dark:text-slate-100 ${
                  isDaylight
                    ? 'bg-white/95 border-slate-200 shadow-sm'
                    : 'bg-[#111827] border-slate-800 shadow-md shadow-black/40'
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700">
                <Globe className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Compass className="w-4 h-4 text-emerald-500" />
                <span>Always Learning New Stacks</span>
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 group ${
                    isDaylight
                      ? 'bg-white/95 border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                      : 'bg-[#111827] border-slate-800 shadow-md shadow-black/30 hover:border-blue-500/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-linear-to-tr ${pillar.gradient} mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-normal font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
