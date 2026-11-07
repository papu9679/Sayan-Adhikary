import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle } from 'lucide-react';

export default function Education() {
  const { isDaylight } = useTheme();
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education & <span className="braided-text">Credentials</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Academic background in computer science and engineering.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((item, idx) => (
            <div 
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-xl ${
                isDaylight
                  ? 'bg-white/95 border-slate-200 shadow-sm hover:border-slate-300'
                  : 'bg-[#111827] border-slate-800 shadow-md shadow-black/30 hover:border-slate-700'
              }`}
            >
              {/* Top Accent Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 shadow-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                  <Award className="w-3.5 h-3.5" />
                  <span>{item.score}</span>
                </div>
              </div>

              {/* Title & Institution */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
                {item.degree}
              </h3>
              <p className="text-base font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{item.institution}</span>
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6 font-normal">
                {item.description}
              </p>

              {/* Key Achievements */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 mb-3">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-100">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
