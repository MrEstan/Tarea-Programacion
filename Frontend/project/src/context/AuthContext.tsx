import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, LoginCredentials, RegistrationData } from '../types/auth';

// Mock data for demonstration purposes
const MOCK_DOCTORS = [
  {
    id: 'd1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@clinic.com',
    country: 'USA',
    role: 'doctor' as const,
    licenseNumber: 'MD12345',
    patients: ['p1', 'p2'],
    createdAt: new Date()
  },
];

const MOCK_PATIENTS = [
  {
    id: 'p1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    country: 'USA',
    role: 'patient' as const,
    doctorId: 'd1',
    createdAt: new Date()
  },
  {
    id: 'p2',
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob@example.com',
    country: 'Canada',
    role: 'patient' as const,
    doctorId: 'd1',
    createdAt: new Date()
  },
];

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('clinic_user');
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      // In a real app, this would be an API call
      const { email, password } = credentials;
      
      // Simulating API validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Check if user exists in mock data
      const doctor = MOCK_DOCTORS.find(d => d.email === email);
      const patient = MOCK_PATIENTS.find(p => p.email === email);
      const user = doctor || patient;
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // In a real app, we would verify the password here
      // For demo purposes, we're skipping password verification
      
      // Store user data in localStorage
      localStorage.setItem('clinic_user', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'An unknown error occurred' });
      }
    }
  };

  // Register function
  const register = async (data: RegistrationData) => {
    try {
      // In a real app, this would be an API call
      const { email, role } = data;
      
      // Check if email already exists
      const userExists = [...MOCK_DOCTORS, ...MOCK_PATIENTS].some(u => u.email === email);
      if (userExists) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: `${role[0]}${Date.now()}`, // Simple ID generation
        ...data,
        patients: role === 'doctor' ? [] : undefined,
        doctorId: role === 'patient' ? undefined : undefined,
        createdAt: new Date(),
      };
      
      // In a real app, we would store the user in a database
      // For demo purposes, we're just storing in localStorage
      localStorage.setItem('clinic_user', JSON.stringify(newUser));
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
      } else {
        dispatch({ type: 'REGISTER_FAILURE', payload: 'An unknown error occurred' });
      }
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('clinic_user');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};