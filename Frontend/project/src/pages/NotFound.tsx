import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Heart, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

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
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <AlertTriangle className="h-20 w-20 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button 
            onClick={() => navigate('/')}
            size="lg"
          >
            Go Home
          </Button>
        </div>
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

export default NotFound;