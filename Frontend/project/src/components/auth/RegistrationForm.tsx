import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { RegistrationData } from '../../types/auth';
import { UserRound, UserCog } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [roleSelected, setRoleSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    role: 'patient', // Default role
    licenseNumber: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<RegistrationData & { confirmPassword: string }>>({});

  const validateForm = (): boolean => {
    const errors: Partial<RegistrationData & { confirmPassword: string }> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    
    if (formData.role === 'doctor' && !formData.licenseNumber) {
      errors.licenseNumber = 'Medical license number is required for doctors';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRoleSelect = (role: 'doctor' | 'patient') => {
    setFormData(prev => ({ ...prev, role }));
    setRoleSelected(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (error) clearError();
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      // Error handling is done in the context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
      </CardHeader>
      
      <CardContent>
        {!roleSelected ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-4">
              Please select your role to continue:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex flex-col items-center justify-center p-6 hover:bg-blue-50 transition-all"
                onClick={() => handleRoleSelect('patient')}
              >
                <UserRound className="h-12 w-12 text-blue-600 mb-2" />
                <span className="text-lg font-medium">I'm a Patient</span>
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="flex flex-col items-center justify-center p-6 hover:bg-green-50 transition-all"
                onClick={() => handleRoleSelect('doctor')}
              >
                <UserCog className="h-12 w-12 text-green-600 mb-2" />
                <span className="text-lg font-medium">I'm a Doctor</span>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                error={formErrors.firstName}
                required
              />
              
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Smith"
                value={formData.lastName}
                onChange={handleChange}
                error={formErrors.lastName}
                required
              />
            </div>
            
            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />
            
            <Input
              label="Country"
              type="text"
              name="country"
              id="country"
              placeholder="USA"
              value={formData.country}
              onChange={handleChange}
              error={formErrors.country}
              required
            />
            
            {formData.role === 'doctor' && (
              <Input
                label="Medical License Number"
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                placeholder="MD12345"
                value={formData.licenseNumber}
                onChange={handleChange}
                error={formErrors.licenseNumber}
                required
              />
            )}
            
            {error && (
              <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
                {error}
              </div>
            )}
            
            <div className="flex space-x-4 mt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setRoleSelected(false)}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      
      <CardFooter className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;