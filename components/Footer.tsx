import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-3">
        
        {/* Credentials Section */}
        <div className="flex flex-col items-center space-y-1 font-mono text-sm text-gray-600 bg-gray-50 px-6 py-3 rounded-lg border border-gray-100 shadow-sm">
          <div>Username : paphada</div>
          <div>Password : 1234567a</div>
        </div>

        {/* Presented By Section */}
        <div className="flex flex-col items-center pt-2">
          <span className="text-xs text-gray-400 mb-1">presented by</span>
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              67162110153-8 ปภาดา สมภาค
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-300 pt-4">
          © {new Date().getFullYear()} BMI Health Tracker. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
