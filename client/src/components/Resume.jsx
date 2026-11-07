import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import {
	FileText,
	Download,
	Briefcase,
	Calendar,
	MapPin,
	CheckCircle2,
	Sparkles,
} from 'lucide-react';

export default function Resume() {
	const { isDaylight } = useTheme();
	const { resume, personal, education } = portfolioData;
	const [downloadSuccess, setDownloadSuccess] = useState(false);

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href =
			'https://drive.google.com/file/d/13ZEpaqeLeo0m6n77hG4vNX85pcSeChy9/view?usp=sharing';
		link.download = 'Sayan_Adhikary_Resume.pdf';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<section id="resume" className="py-20 md:py-28 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
						<FileText className="w-3.5 h-3.5" />
						<span>Curriculum Vitae</span>
					</div>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
						Professional <span className="braided-text">Resume</span>
					</h2>
					<p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-200">
						Overview of my experience, education, and technical background.
					</p>
				</div>

				{/* Resume Card */}
				<div
					className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-xl ${
						isDaylight
							? 'bg-white/95 border-slate-200 shadow-slate-200/50'
							: 'bg-[#111827] border-slate-800 shadow-2xl shadow-black/40'
					}`}
				>
					{/* Header Action Bar */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 dark:border-white/10 gap-4">
						<div>
							<h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
								{personal.name}
							</h3>
							<p className="text-blue-600 dark:text-blue-400 font-bold mt-1 text-base">
								{personal.title}
							</p>
							<p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1.5 flex items-center gap-1.5 flex-wrap">
								<MapPin className="w-4 h-4 text-amber-500 shrink-0" />
								<span>{personal.location}</span>
								<span className="mx-1">•</span>
								<span className="text-slate-800 dark:text-slate-200">
									{personal.email}
								</span>
							</p>
						</div>

						<div className="flex items-center gap-3">
							<button
								onClick={handleDownload}
								className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
							>
								<Download className="w-4 h-4" />
								<span>Download Resume</span>
							</button>
						</div>
					</div>

					{downloadSuccess && (
						<div className="mb-6 p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
							<span>Resume document downloaded successfully!</span>
						</div>
					)}

					{/* Experience Timeline */}
					<div className="space-y-8">
						<h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-2">
							<Briefcase className="w-4 h-4 text-blue-500 dark:text-blue-400" />
							<span>Work & Project Experience</span>
						</h4>

						{resume.experience.map((exp, idx) => (
							<div
								key={idx}
								className={`p-6 rounded-2xl border transition-all ${
									isDaylight
										? 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
										: 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
								}`}
							>
								<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
									<h5 className="text-lg font-bold text-slate-900 dark:text-white">
										{exp.role}
									</h5>
									<div className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
										<Calendar className="w-3.5 h-3.5" />
										<span>{exp.period}</span>
									</div>
								</div>

								<div className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
									<span>{exp.company}</span>
									<span>•</span>
									<span className="text-slate-500 dark:text-slate-400 font-medium">
										{exp.location}
									</span>
								</div>

								<ul className="space-y-2.5">
									{exp.achievements.map((ach, aIdx) => (
										<li
											key={aIdx}
											className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100"
										>
											<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
											<span>{ach}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
