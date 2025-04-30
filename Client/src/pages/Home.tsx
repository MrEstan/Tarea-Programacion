import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Heart, UserRound, UserCog, CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Health<span className="text-blue-600">Connect</span></h1>
          </div>
          <div className="space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  The Future of Healthcare Connection
                </h1>
                <p className="text-xl text-blue-100">
                  Seamlessly connect doctors and patients for better healthcare management and coordination.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => navigate('/register')}
                    size="lg"
                    className="bg-white  text-black "
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md">
                  <div className="flex justify-center mb-6">
                    <Heart className="h-16 w-16 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                      <p className="text-lg">Secure patient-doctor communication</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                      <p className="text-lg">Easy access to medical records</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                      <p className="text-lg">Streamlined appointment management</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                      <p className="text-lg">Private and secure data handling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Designed for Both Patients and Doctors</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <UserRound className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">For Patients</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>View and manage personal medical information</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Track upcoming appointments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Access medical history and records</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Secure messaging with healthcare providers</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-8 rounded-lg border border-green-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <UserCog className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">For Doctors</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete overview of assigned patients</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Manage patient medical records</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Schedule and track appointments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Secure communication with patients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of doctors and patients who are already experiencing the benefits of our connected healthcare platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/register')}
              >
                Create an Account
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">Health<span className="text-blue-400">Connect</span></h3>
              </div>
              <p className="text-gray-400">
                Connecting healthcare professionals and patients for better outcomes.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} HealthConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;