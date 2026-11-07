import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { 
  Code2, 
  FileCode, 
  Palette, 
  Layers, 
  Globe, 
  Smartphone, 
  Server, 
  Network, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Zap, 
  Cloud, 
  GitBranch, 
  Box, 
  CheckCircle, 
  Sliders,
  Sparkles,
  Search,
  X
} from 'lucide-react';

const iconMap = {
  Code2,
  FileCode,
  Palette,
  Layers,
  Globe,
  Smartphone,
  Server,
  Network,
  ShieldCheck,
  Cpu,
  Database,
  Zap,
  Cloud,
  GitBranch,
  Box,
  CheckCircle,
  Sliders,
};

export default function Skills() {
  const { isDaylight } = useTheme();
  const { skills, skillCategories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkill, setActiveSkill] = useState(null);

  // Filter by category AND search query
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Skills & <span className="braided-text">Technologies</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Languages, frameworks, databases, and developer tools in my workflow.
          </p>
        </div>

        {/* Interactive Controls: Search + Categories */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          
          {/* Real-time search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies (e.g. React, MongoDB, Docker, API)..."
              className={`w-full pl-11 pr-10 py-3 rounded-2xl text-sm font-semibold border outline-none transition-colors ${
                isDaylight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-sm'
                  : 'bg-[#111827] border-slate-800 text-white placeholder-slate-400 focus:border-blue-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {skillCategories.map((cat) => {
              const count = cat.id === 'all' 
                ? skills.length 
                : skills.filter(s => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 border cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white border-transparent shadow-sm scale-105'
                      : isDaylight
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                        : 'bg-[#111827] hover:bg-slate-800 text-slate-100 border-slate-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    selectedCategory === cat.id
                      ? 'bg-white/25 text-white'
                      : isDaylight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Empty state for search */}
        {filteredSkills.length === 0 && (
          <div className={`text-center py-12 px-4 rounded-3xl border max-w-md mx-auto ${
            isDaylight ? 'bg-white border-slate-200' : 'bg-[#111827] border-slate-800'
          }`}>
            <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              No matching technologies found
            </p>
            <p className="text-xs text-slate-500">
              Try searching for something else or reset the filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill, idx) => {
            const Icon = iconMap[skill.icon] || Code2;
            const isCardActive = activeSkill === skill.name;
            return (
              <div
                key={idx}
                onClick={() => setActiveSkill(isCardActive ? null : skill.name)}
                className={`p-5 rounded-2xl border transition-all duration-150 cursor-pointer ${
                  isCardActive
                    ? 'ring-2 ring-blue-500 border-transparent shadow-lg scale-[1.02]'
                    : isDaylight
                      ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                      : 'bg-[#111827] border-slate-800 shadow-md shadow-black/30 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isDaylight
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-slate-800 text-blue-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {skill.level}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1">
                  {skill.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-bold">
                    {skill.tag}
                  </p>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Production Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
