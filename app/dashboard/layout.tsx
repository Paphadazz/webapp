import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import { getSession } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session: any = await getSession();

  return (
    <div className="flex flex-col w-full">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BMI Tracker
              </Link>
              <div className="ml-10 flex space-x-1">
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Overview
                </Link>
                <Link href="/dashboard/reports" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Reports
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">Signed in as</span>
                <span className="text-sm font-medium text-gray-700">{session?.name}</span>
              </div>
              <form action={logout}>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 w-full flex-grow">
        {children}
      </main>
    </div>
  );
}
