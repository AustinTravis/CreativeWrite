// src/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out.');
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">You have been logged out</h2>
      <p className="text-lg text-center text-gray-700">
        Thank you for taking the time to write with us. We hope you enjoyed the experience.
      </p>
      <p className="text-lg text-center text-gray-700 mt-4">
        <em>"The only limit to our realization of tomorrow is our doubts of today." – Franklin D. Roosevelt</em>
      </p>
    </div>
  );
};

export default Logout;
