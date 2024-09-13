import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">You have been logged out</h1>
        <p className="text-lg mb-4 text-gray-700">
          Thanks for taking the time to write with us!
        </p>
        <p className="text-gray-600 mb-6">
          "The art of writing is the art of discovering what you believe." - Gustave Flaubert
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default LogoutSuccess;
