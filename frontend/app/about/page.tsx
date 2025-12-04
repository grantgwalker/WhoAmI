import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About This Project
          </h1>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-300">
            <p className="text-lg leading-relaxed">
              This is a personal website built with modern web technologies to showcase
              professional profiles, skills, and projects.
            </p>
            
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                Frontend Stack
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>React</strong> - A JavaScript library for building user interfaces</li>
                <li><strong>Next.js</strong> - A React framework with server-side rendering and routing</li>
                <li><strong>TypeScript</strong> - Type-safe JavaScript development</li>
                <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for styling</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                Backend Stack
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Python</strong> - High-level programming language</li>
                <li><strong>Django</strong> - Web framework for building robust APIs</li>
                <li><strong>Django REST Framework</strong> - Toolkit for building Web APIs</li>
                <li><strong>CORS Headers</strong> - Cross-Origin Resource Sharing support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                Features
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Responsive design that works on all devices</li>
                <li>Dark mode support</li>
                <li>RESTful API architecture</li>
                <li>Modern UI with smooth animations</li>
                <li>Type-safe frontend development</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
