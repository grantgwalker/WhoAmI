"use client";


import { HeroScrollSection } from "@/components/HeroScrollSection";
import { ExperienceScrollSection } from "@/components/ExperienceScrollSection";
import { ProjectsScrollSection } from "@/components/ProjectsScrollSection";
import { profile } from "@/app/data/profile";
import { experience } from "@/app/data/experience";
import { projects } from "@/app/data/projects";


export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Hero Scroll Section */}
			<HeroScrollSection />

			{/* Experience Scroll Section */}
			<ExperienceScrollSection />

			{/* Projects Scroll Section */}
			<ProjectsScrollSection />

			<main className="container mx-auto px-4 py-12 max-w-6xl">
			</main>

			{/* Footer */}
			<footer className="mt-16 py-8 text-center text-slate-600 dark:text-slate-400">
				<p>
					Built with React, Next.js, and TypeScript
				</p>
				<p> Hosted on AWS using S3 and Cloudfront via AWS CDK</p>
			</footer>
		</div>
	);
}
