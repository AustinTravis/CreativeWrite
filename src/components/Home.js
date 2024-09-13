import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Welcome to CreativeWrite!</h1>
      <p className="text-lg mb-6 text-center text-gray-700">
        CreativeWrite is your personal space to express yourself and unleash your creativity.
        Whether you’re an experienced writer or just starting, our app provides the tools you need
        to craft your stories and explore new ideas.
      </p>
      <p className="text-lg mb-6 text-center text-gray-700">
        Ready to get started? Sign in or create a new account to begin your writing journey.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
