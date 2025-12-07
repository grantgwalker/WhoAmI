"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Experience {
	id: number;
	company: string;
	title: string;
	period: string;
	description: string;
	technologies: string[];
}

interface ExperienceScrollSectionProps {
	experience: Experience[];
}

export const ExperienceScrollSection = ({ experience }: ExperienceScrollSectionProps) => {
	const targetRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	return (
		<section ref={targetRef} className="h-[400vh] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative">
			{/* Sticky Container */}
			<div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
				<div className="max-w-6xl w-full px-8">
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16 text-center">
						Work Experience
					</h2>

					<div className="space-y-8">
						{experience.map((exp, index) => {
							// Create staggered animations for each experience item
							const itemProgress = useTransform(
								scrollYProgress,
								[index * 0.2, (index + 1) * 0.2],
								[0, 1]
							);

							const opacity = useTransform(itemProgress, [0, 0.3], [0, 1]);
							const y = useTransform(itemProgress, [0, 0.5], [50, 0]);

							return (
								<motion.div
									key={exp.id}
									style={{ opacity, y }}
									className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover-orange-glow highlight-shadow"
								>
									<div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
										<div>
											<h3 className="text-xl font-semibold text-slate-900 dark:text-white">
												{exp.title}
											</h3>
											<h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium">
												{exp.company}
											</h4>
										</div>
										<span className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0">
											{exp.period}
										</span>
									</div>
									<p className="text-slate-600 dark:text-slate-300 mb-4">
										{exp.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{exp.technologies.map(
											(tech, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-md text-xs font-medium"
												>
													{tech}
												</span>
											)
										)}
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};