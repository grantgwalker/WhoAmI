"use client";

import {
	useEffect,
	useState,
} from "react";
import { HeroScrollSection } from "@/components/HeroScrollSection";
import { ExperienceScrollSection } from "@/components/ExperienceScrollSection";
import { ProjectsScrollSection } from "@/components/ProjectsScrollSection";

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
			{/* Hero Scroll Section */}
			<HeroScrollSection profile={profile} />

			{/* Experience Scroll Section */}
			<ExperienceScrollSection experience={experience} />

			{/* Projects Scroll Section */}
			<ProjectsScrollSection projects={projects} />

			<main className="container mx-auto px-4 py-12 max-w-6xl">

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
