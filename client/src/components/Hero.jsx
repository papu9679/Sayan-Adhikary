import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import {
	ArrowRight,
	Download,
	Sparkles,
	Terminal,
	MessageSquareHeart,
	CheckCircle2,
	Copy,
	Check,
	Clock,
	MapPin,
} from 'lucide-react';

export default function Hero() {
	const { isDaylight } = useTheme();
	const { personal } = portfolioData;

	const [roleIndex, setRoleIndex] = useState(0);
	const [copiedEmail, setCopiedEmail] = useState(false);
	const [localTime, setLocalTime] = useState('');

	// Clock for Kolkata, India (IST)
	useEffect(() => {
		const updateTime = () => {
			try {
				const timeStr = new Date().toLocaleTimeString('en-US', {
					timeZone: 'Asia/Kolkata',
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				});
				setLocalTime(timeStr);
			} catch {
				setLocalTime('IST');
			}
		};
		updateTime();
		const timer = setInterval(updateTime, 30000);
		return () => clearInterval(timer);
	}, []);

	// Cycle role titles
	useEffect(() => {
		const interval = setInterval(() => {
			setRoleIndex((prev) => (prev + 1) % personal.roles.length);
		}, 3200);
		return () => clearInterval(interval);
	}, [personal.roles.length]);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(personal.email);
		setCopiedEmail(true);
		setTimeout(() => setCopiedEmail(false), 2200);
	};

	return (
		<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
			{/* Subtle ambient light */}
			<div
				className="absolute top-10 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none opacity-40 dark:opacity-20"
				style={{
					background:
						'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)',
					transform: 'translateZ(0)',
				}}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
					{/* Left Column: Text & CTAs */}
					<div className="lg:col-span-7 text-center lg:text-left">
						{/* Interactive Status Pill with Local Time */}
						<div
							className={`inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-full mb-6 text-xs sm:text-sm font-semibold transition-all shadow-sm border ${
								isDaylight
									? 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
									: 'bg-[#111827] border-slate-800 text-slate-100 shadow-black/40'
							}`}
						>
							<span className="relative flex h-2.5 w-2.5">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
							</span>
							<span className="font-bold text-blue-600 dark:text-blue-400">
								{isDaylight ? '☀️ Daylight Mode' : '🌙 Night Mode'}
							</span>
							<span className="text-slate-400 dark:text-slate-500">•</span>
							<span className="text-slate-700 dark:text-slate-200">
								{personal.status}
							</span>
							{localTime && (
								<>
									<span className="text-slate-400 dark:text-slate-500">•</span>
									<span className="text-slate-600 dark:text-slate-300 flex items-center gap-1 font-mono text-[11px]">
										<Clock className="w-3 h-3 text-blue-500 dark:text-blue-400" />
										<span>{localTime} IST</span>
									</span>
								</>
							)}
						</div>

						{/* Main Greeting & Name */}
						<h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.12] mb-5 text-slate-900 dark:text-white">
							Hi, I'm{' '}
							<span className="braided-text block sm:inline mt-1 sm:mt-0">
								{personal.name}
							</span>
						</h1>

						{/* Interactive Role Switcher */}
						<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 mb-6 text-lg sm:text-2xl font-extrabold">
							<span className="text-slate-700 dark:text-slate-200">
								I build as a
							</span>
							<span
								key={roleIndex}
								className="braided-text-cyan cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() =>
									setRoleIndex((prev) => (prev + 1) % personal.roles.length)
								}
								title="Click to cycle next specialization"
							>
								{personal.roles[roleIndex]}
							</span>
						</div>

						{/* Short Introduction */}
						<p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
							{personal.shortBio}
						</p>

						{/* Actions / CTA Buttons */}
						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-12">
							<a
								href="#projects"
								className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
							>
								<span>View Projects</span>
								<ArrowRight className="w-4 h-4" />
							</a>

							<a
								href="#feedback"
								className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all border ${
									isDaylight
										? 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm'
										: 'bg-slate-800/80 hover:bg-slate-800 text-white border-slate-700 shadow-md shadow-black/40'
								}`}
							>
								<MessageSquareHeart className="w-4 h-4 text-blue-500" />
								<span>Leave Feedback</span>
							</a>

							{/* Interactive Copy Email Button */}
							<button
								onClick={handleCopyEmail}
								className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
									copiedEmail
										? 'bg-emerald-600 text-white border-emerald-500'
										: isDaylight
											? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
											: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
								}`}
								title="Copy email to clipboard"
							>
								{copiedEmail ? (
									<>
										<Check className="w-4 h-4" />
										<span>Copied!</span>
									</>
								) : (
									<>
										<Copy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
										<span>Copy Email</span>
									</>
								)}
							</button>

							<a
								href="#resume"
								className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all border ${
									isDaylight
										? 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm'
										: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
								}`}
							>
								<Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								<span>Resume</span>
							</a>
						</div>

						{/* Quick Stats Grid with Interactive Hover */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
							{personal.stats.map((stat, idx) => (
								<div
									key={idx}
									className={`p-4 rounded-2xl border text-center transition-all duration-200 hover:-translate-y-1 cursor-default ${
										isDaylight
											? 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
											: 'bg-slate-900/90 border-slate-800 shadow-md shadow-black/40 hover:border-slate-700'
									}`}
								>
									<div className="text-2xl sm:text-3xl font-black braided-text">
										{stat.value}
									</div>
									<div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Column: Interactive Code & Visual Card */}
					<div className="lg:col-span-5 relative flex justify-center">
						{/* Outer Card with Refined Border */}
						<div className="relative w-full max-w-md rounded-3xl p-1 bg-gradient-to-tr from-slate-200 via-blue-500/20 to-slate-200 dark:from-slate-800 dark:via-blue-500/20 dark:to-slate-800 shadow-xl shadow-slate-900/5">
							<div
								className={`w-full rounded-[23px] p-6 transition-colors duration-200 ${
									isDaylight ? 'bg-white' : 'bg-[#0f172a]'
								}`}
							>
								{/* Window Header */}
								<div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
									<div className="flex items-center gap-2">
										<span className="w-3 h-3 rounded-full bg-rose-500"></span>
										<span className="w-3 h-3 rounded-full bg-amber-400"></span>
										<span className="w-3 h-3 rounded-full bg-emerald-500"></span>
									</div>
									<div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono font-semibold">
										<Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
										<span>engineer.config.ts</span>
									</div>
									<Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								</div>

								{/* Code Representation with High Contrast Syntax */}
								<div className="space-y-2.5 font-mono text-xs sm:text-sm text-left leading-relaxed">
									<p className="text-slate-600 dark:text-slate-400">
										<span className="text-pink-600 dark:text-pink-400 font-bold">
											const
										</span>{' '}
										developer = {'{'}
									</p>

									<p className="pl-4 text-slate-800 dark:text-slate-100 font-medium">
										name:{' '}
										<span className="text-amber-700 dark:text-amber-300 font-bold">
											"{personal.name}"
										</span>
										,
									</p>

									<p className="pl-4 text-slate-800 dark:text-slate-100 font-medium">
										stack: [
										<span className="text-cyan-700 dark:text-cyan-300 font-semibold">
											"React"
										</span>
										,{' '}
										<span className="text-indigo-700 dark:text-indigo-300 font-semibold">
											"Express"
										</span>
										,{' '}
										<span className="text-emerald-700 dark:text-emerald-300 font-semibold">
											"MongoDB"
										</span>
										,{' '}
										<span className="text-pink-700 dark:text-pink-300 font-semibold">
											"Tailwind"
										</span>
										],
									</p>

									<p className="pl-4 text-slate-800 dark:text-slate-100 font-medium">
										devices:{' '}
										<span className="text-purple-700 dark:text-purple-300 font-semibold">
											["Phone", "Tablet", "Computer"]
										</span>
										,
									</p>

									<p className="pl-4 text-slate-800 dark:text-slate-100 font-medium">
										focus:{' '}
										<span className="text-emerald-600 dark:text-emerald-400 font-bold">
											"clean_architecture"
										</span>
										,
									</p>

									<p className="pl-4 text-slate-800 dark:text-slate-100 font-medium">
										themeAmbiance:{' '}
										<span className="text-amber-600 dark:text-amber-400 font-bold">
											{isDaylight ? '"daylight"' : '"night"'}
										</span>
										,
									</p>

									<p className="pl-4 text-slate-800 dark:text-slate-100 font-medium">
										learning:{' '}
										<span className="text-amber-700 dark:text-amber-300 font-bold">
											"AI tooling & distributed systems"
										</span>
									</p>

									<p className="text-slate-600 dark:text-slate-400">{'}'};</p>
								</div>

								{/* Feature Pills */}
								<div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2">
									<span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
										⚡ Vite + React
									</span>
									<span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
										🎨 Tailwind CSS
									</span>
									<span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
										☀️ Daylight Mode
									</span>
									<span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
										🛡️ Moderated Feedback
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
