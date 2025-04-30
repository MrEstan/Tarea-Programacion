import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import RegistrationForm from '../components/auth/RegistrationForm';

const Register: React.FC = () => {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
};

export default Register;