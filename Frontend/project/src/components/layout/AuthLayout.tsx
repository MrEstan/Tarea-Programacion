import React from 'react';
import { Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="py-6 px-4 mb-8">
        <div className="container mx-auto flex justify-center">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Health<span className="text-blue-600">Connect</span></h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {title && (
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{title}</h2>
          )}
          {children}
        </div>
      </main>
      
      <footer className="py-6 px-4">
        <div className="container mx-auto">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HealthConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;