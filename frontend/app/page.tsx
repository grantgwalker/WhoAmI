"use client";

import {
	useEffect,
	useState,
} from "react";

interface Profile {
	name: string;
	title: string;
	bio: string;
	skills: string[];
	email: string;
}

interface Experience {
	id: number;
	company: string;
	title: string;
	period: string;
	description: string;
	technologies: string[];
}

interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	link?: string;
}

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	"http://127.0.0.1:8000";

export default function Home() {
	const [profile, setProfile] =
		useState<Profile | null>(null);
	const [experience, setExperience] =
		useState<Experience[]>([]);
	const [projects, setProjects] =
		useState<Project[]>([]);
	const [loading, setLoading] =
		useState(true);
	const [error, setError] = useState<
		string | null
	>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log(
					"Fetching from API_URL:",
					API_URL
				);
				const [
					profileRes,
					experienceRes,
					projectsRes,
				] = await Promise.all([
					fetch(
						`${API_URL}/api/profile/`
					),
					fetch(
						`${API_URL}/api/experience/`
					),
					fetch(
						`${API_URL}/api/projects/`
					),
				]);

				console.log(
					"Profile response status:",
					profileRes.status
				);
				console.log(
					"Experience response status:",
					experienceRes.status
				);
				console.log(
					"Projects response status:",
					projectsRes.status
				);

				if (
					!profileRes.ok ||
					!experienceRes.ok ||
					!projectsRes.ok
				) {
					throw new Error(
						"Failed to fetch data"
					);
				}

				const profileData =
					await profileRes.json();
				const experienceData =
					await experienceRes.json();
				const projectsData =
					await projectsRes.json();

				setProfile(profileData);
				setExperience(experienceData);
				setProjects(projectsData);
			} catch (err) {
				console.error(
					"Fetch error:",
					err
				);
				setError(
					err instanceof Error
						? err.message
						: "An error occurred"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
				<div className="text-xl text-slate-600 dark:text-slate-300">
					Loading...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
				<div className="text-center">
					<div className="text-xl text-red-600 dark:text-red-400 mb-4">
						Error: {error}
					</div>
					<div className="text-sm text-slate-600 dark:text-slate-400">
						Make sure the Django backend
						is running on {API_URL}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			<main className="container mx-auto px-4 py-12 max-w-6xl">
				{/* Profile Section */}
				{profile && (
					<section className="mb-16">
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
					</section>
				)}

				{/* Experience Section */}
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
						Work Experience
					</h2>
					<div className="space-y-6">
						{experience.map((exp) => (
							<div
								key={exp.id}
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
							</div>
						))}
					</div>
				</section>

				{/* Projects Section */}
				<section>
					<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
						Personal Projects
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{projects.map((project) => (
							<div
								key={project.id}
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
							</div>
						))}
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="mt-16 py-8 text-center text-slate-600 dark:text-slate-400">
				<p>
					Built with React, Next.js, and
					Django
				</p>
			</footer>
		</div>
	);
}
