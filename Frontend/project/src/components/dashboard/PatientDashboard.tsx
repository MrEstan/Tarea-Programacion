import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Patient } from '../../types/auth';
import { User, Heart, LogOut, Calendar, FileText, Activity } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const patient = user as Patient;

  // Mock data - in a real app, these would come from API calls
  const nextAppointment = {
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    doctor: 'Dr. John Smith',
    type: 'Regular Checkup'
  };

  const recentActivity = [
    { id: 1, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), description: 'Updated personal information' },
    { id: 2, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), description: 'Completed annual health questionnaire' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Heart className="mr-2" /> Patient Dashboard
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
                      {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="font-medium">{patient.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium">{patient.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{patient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{patient.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium text-green-600 flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        Active
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient Since</p>
                      <p className="font-medium">{patient.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="mr-2" /> Upcoming Appointment
                </h2>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <p className="text-blue-800 font-medium">{nextAppointment.type}</p>
                      <p className="text-blue-600">{nextAppointment.doctor}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <p className="text-blue-800 font-medium">
                        {nextAppointment.date.toLocaleDateString(undefined, { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-blue-600">
                        {nextAppointment.date.toLocaleTimeString(undefined, { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FileText className="mr-2" /> Medical Records
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Your medical records are secure and accessible only to you and your healthcare providers.
                </p>
                <Button variant="outline" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" /> View Medical History
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Activity className="mr-2" /> Recent Activity
                </h2>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex justify-between">
                          <p>{activity.description}</p>
                          <p className="text-sm text-gray-500">
                            {activity.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No recent activity.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;