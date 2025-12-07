"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Profile {
	name: string;
	title: string;
	bio: string;
	skills: string[];
	email: string;
}

interface HeroScrollSectionProps {
	profile: Profile | null;
}

export const HeroScrollSection = ({ profile }: HeroScrollSectionProps) => {
	const targetRef = useRef(null);

	// Track the scroll progress of this specific container (0 to 1)
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"], // Animation starts when top enters, ends when bottom leaves
	});

	// Map scroll progress (0 -> 1) to animation values
	const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
	const scale = useTransform(scrollYProgress, [0.3, 0.8], [0.8, 1]);
	const x = useTransform(scrollYProgress, [0.1, 1], ["0%", "-50%"]); // Example: slide text

	return (
		// The Container: Needs extra height (e.g., 300vh) to allow scrolling "time"
		<section ref={targetRef} className="h-[300vh] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

			{/* Sticky Content: This stays fixed while the parent scrolls */}
			<div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

				{/* Animated Element 1: Profile card scaling up */}
				{profile && (
					<motion.div
						style={{ scale, opacity }}
						className="absolute w-full max-w-4xl z-10 p-8"
					>
						<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 highlight-border-left hover-orange-glow">
							<h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
								{profile.name}
							</h1>
							<h2 className="text-2xl text-blue-600 dark:text-blue-400 mb-6">
								{profile.title}
							</h2>
							<p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
								{profile.bio}
							</p>

							<div className="mb-6">
								<h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
									Skills
								</h3>
								<div className="flex flex-wrap gap-3">
									{profile.skills.map(
										(skill, index) => (
											<span
												key={index}
												className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
											>
												{skill}
											</span>
										)
									)}
								</div>
							</div>

							<div>
								<a
									href={`mailto:${profile.email}`}
									className="inline-flex items-center px-6 py-3 bg-highlight hover:bg-highlight-dark text-white font-medium rounded-lg transition-colors highlight-shadow"
								>
									Contact Me
								</a>
							</div>
						</div>
					</motion.div>
				)}

				{/* Animated Element 2: Background Text sliding */}
				<motion.p
					style={{ x }}
					className="text-[200px] font-bold whitespace-nowrap opacity-20 absolute text-slate-300 dark:text-slate-600"
				>
					EXPERIENCE • DESIGN • CODE
				</motion.p>

			</div>
		</section>
	);
};