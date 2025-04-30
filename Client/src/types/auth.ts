export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role: 'doctor' | 'patient';
  licenseNumber?: string;
  createdAt: Date;
}

export interface Doctor extends User {
  role: 'doctor';
  licenseNumber: string;
  patients: string[]; // Array of patient IDs
}

export interface Patient extends User {
  role: 'patient';
  doctorId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  role: 'doctor' | 'patient';
  licenseNumber?: string;
}