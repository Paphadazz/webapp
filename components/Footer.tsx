import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-sm font-medium">BMI Health Tracker</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm">Health Monitoring System</span>
        </div>
        
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm">
          <span className="text-sm text-gray-500">Created by</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            67162110153-8 ปภาดา สมภาค
          </span>
        </div>
        
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
