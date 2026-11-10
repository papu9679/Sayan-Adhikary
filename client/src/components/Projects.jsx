import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  ArrowUpRight,
  Info,
  X,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { Github } from './SocialIcons';

export default function Projects() {
  const { isDaylight } = useTheme();
  const { projects } = portfolioData;
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'fullstack', label: 'Full-Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend UI', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'backend', label: 'Backend & APIs', count: projects.filter(p => p.category === 'backend').length },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Selected <span className="braided-text">Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Web applications, APIs, and developer tools I've built with live demos and code.
          </p>
        </div>

        {/* Interactive Project Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 border cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white border-transparent shadow-sm scale-105'
                  : isDaylight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-[#111827] hover:bg-slate-800 text-slate-100 border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeCategory === cat.id
                  ? 'bg-white/25 text-white'
                  : isDaylight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-300'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-3xl border overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group ${
                isDaylight
                  ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                  : 'bg-[#111827] border-slate-800 shadow-md shadow-black/30 hover:border-slate-700'
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Tech overlay chip */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-black/80 text-white backdrop-blur-sm border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-xl text-[11px] font-extrabold bg-blue-600 text-white">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {project.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 mb-6">
                  {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions: GitHub, Live Demo, Details */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border cursor-pointer ${
                        isDaylight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                      aria-label="View source on GitHub"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>

                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 py-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div 
            className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl max-h-[90vh] overflow-y-auto ${
              isDaylight
                ? 'bg-white text-slate-900 border-slate-200'
                : 'bg-[#111827] text-white border-slate-800 shadow-black'
            }`}
          >
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <span>Project Overview</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
              {activeProjectModal.title}
            </h3>

            <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-6 font-normal">
              {activeProjectModal.description}
            </p>

            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Technical Highlights
            </h4>
            <div className="space-y-3 mb-6">
              {activeProjectModal.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {activeProjectModal.technologies.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
              <a
                href={activeProjectModal.liveUrl}
                target={activeProjectModal.liveUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
