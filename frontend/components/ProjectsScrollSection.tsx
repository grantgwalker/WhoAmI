"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	link?: string;
}

interface ProjectsScrollSectionProps {
	projects: Project[];
}

export const ProjectsScrollSection = ({ projects }: ProjectsScrollSectionProps) => {
	const targetRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	return (
		<section ref={targetRef} className="h-[300vh] bg-gradient-to-br from-slate-200 to-slate-50 dark:from-slate-900 dark:to-slate-800 relative">
			{/* Sticky Container */}
			<div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
				<div className="max-w-6xl w-full px-8">
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16 text-center">
						Personal Projects
					</h2>

					<div className="grid md:grid-cols-2 gap-8">
						{projects.map((project, index) => {
							// Create staggered animations for each project card
							const itemProgress = useTransform(
								scrollYProgress,
								[index * 0.15, (index + 1) * 0.15],
								[0, 1]
							);

							const opacity = useTransform(itemProgress, [0, 0.4], [0, 1]);
							const scale = useTransform(itemProgress, [0, 0.6], [0.8, 1]);
							const y = useTransform(itemProgress, [0, 0.5], [30, 0]);

							return (
								<motion.div
									key={project.id}
									style={{ opacity, scale, y }}
									className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover-orange-glow highlight-shadow-lg"
								>
									<h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
										{project.title}
									</h3>
									<p className="text-slate-600 dark:text-slate-300 mb-4">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2 mb-4">
										{project.technologies.map(
											(tech, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md text-xs font-medium"
												>
													{tech}
												</span>
											)
										)}
									</div>
									{project.link && (
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center text-highlight hover:text-highlight-dark font-medium text-sm transition-colors"
										>
											View on GitHub →
										</a>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};