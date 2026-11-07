import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { 
  Mail, 
  Send, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';

export default function Contact() {
  const { isDaylight } = useTheme();
  const { personal } = portfolioData;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLinks = [
    { name: 'GitHub', url: personal.github, icon: Github, color: 'hover:text-violet-500 dark:hover:text-violet-400' },
    { name: 'LinkedIn', url: personal.linkedin, icon: Linkedin, color: 'hover:text-blue-500 dark:hover:text-blue-400' },
    { name: 'Twitter / X', url: personal.twitter, icon: Twitter, color: 'hover:text-cyan-500 dark:hover:text-cyan-400' },
    { name: 'Email Directly', url: `mailto:${personal.email}`, icon: Mail, color: 'hover:text-pink-500 dark:hover:text-pink-400' },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Get In <span className="braided-text">Touch</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
            Have a project in mind, an opportunity to discuss, or just want to talk tech? Drop a message!
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDaylight
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-[#111827] border-slate-800 shadow-xl shadow-black/40'
            }`}>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
                Direct Contact
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 mb-6 leading-relaxed font-normal">
                I am actively considering full-time engineering roles, high-impact contract projects, and open-source collaborations.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-3 overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase font-bold">Email Address</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block text-sm">
                        {personal.email}
                      </span>
                    </div>
                  </a>

                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 uppercase font-bold">Location</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {personal.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Icons Bar */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Online Profiles
                </h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-150 hover:scale-110 shadow-sm cursor-pointer ${
                          isDaylight
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                        } ${s.color}`}
                        title={s.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all shadow-xl ${
              isDaylight
                ? 'bg-white border-slate-200 shadow-slate-200/50'
                : 'bg-[#111827] border-slate-800 shadow-xl shadow-black/40'
            }`}>
              
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 font-medium">
                Fill in the form below and I'll get back to you within 24 hours.
              </p>

              {sent && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Thank you! Your inquiry has been sent directly to Sayan's inbox.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl text-sm border font-medium outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDaylight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                          : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm border font-medium outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDaylight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                          : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full px-4 py-3 rounded-xl text-sm border font-medium outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDaylight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hello Sayan, I would love to connect about..."
                    className={`w-full px-4 py-3 rounded-xl text-sm border font-medium outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      isDaylight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-slate-900 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-900 focus:border-blue-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
