'use client';

import { useEffect, useState } from 'react';

interface Profile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  email: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          fetch(`${API_URL}/api/profile/`),
          fetch(`${API_URL}/api/projects/`)
        ]);

        if (!profileRes.ok || !projectsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const profileData = await profileRes.json();
        const projectsData = await projectsRes.json();

        setProfile(profileData);
        setProjects(projectsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-xl text-slate-600 dark:text-slate-300">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="text-xl text-red-600 dark:text-red-400 mb-4">Error: {error}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Make sure the Django backend is running on {API_URL}
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
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
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
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-slate-600 dark:text-slate-400">
        <p>Built with React, Next.js, and Django</p>
      </footer>
    </div>
  );
}
