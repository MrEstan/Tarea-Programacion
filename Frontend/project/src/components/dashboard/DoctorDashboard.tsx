import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Doctor, Patient } from '../../types/auth';
import { UserCog, Users, User, Heart, LogOut } from 'lucide-react';

// Mock data - in a real app, this would come from an API call
const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    country: 'USA',
    role: 'patient',
    doctorId: 'd1',
    createdAt: new Date()
  },
  {
    id: 'p2',
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob@example.com',
    country: 'Canada',
    role: 'patient',
    doctorId: 'd1',
    createdAt: new Date()
  },
  {
    id: 'p3',
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie@example.com',
    country: 'UK',
    role: 'patient',
    doctorId: 'd1',
    createdAt: new Date()
  }
];

const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const doctor = user as Doctor;
  
  // In a real app, you would fetch patients data from an API
  const patients = MOCK_PATIENTS;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <UserCog className="mr-2" /> Doctor Dashboard
        </h1>
        <Button variant="outline" onClick={logout} className="flex items-center">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="mr-2" /> Personal Information
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="font-medium">{doctor.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium">{doctor.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{doctor.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{doctor.country}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">License Number</p>
                      <p className="font-medium">{doctor.licenseNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Users className="mr-2" /> Your Patients <span className="ml-2 text-sm font-normal text-gray-500">({patients.length})</span>
              </h2>
            </CardHeader>
            <CardContent>
              {patients.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <div key={patient.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="text-lg font-medium text-gray-800">
                              {patient.firstName} {patient.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              <Heart className="inline h-4 w-4 mr-1 text-red-500" /> Patient
                            </p>
                          </div>
                          <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Email:</span> {patient.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Country:</span> {patient.country}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Since:</span> {patient.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No patients assigned to you yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;