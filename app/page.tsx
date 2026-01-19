import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white w-full">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">BMI Health Tracker</h1>
        <p className="text-xl text-gray-600">
          Monitor your health journey with precision. Track your BMI, visualize trends, and stay on top of your fitness goals.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link 
            href="/login" 
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Get Started
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
