import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
            Who Am I
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
