import React from 'react';
import { Heart } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Health<span className="text-blue-600">Connect</span></h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow py-4">
        {children}
      </main>
      
      <footer className="bg-white py-4 px-4 border-t border-gray-200">
        <div className="container mx-auto">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HealthConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;