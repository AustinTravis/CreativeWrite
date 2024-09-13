import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import WriteStory from './components/WriteStory';
import StoryLibrary from './components/StoryLibrary';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout'; // Ensure Logout is imported correctly
import Home from './components/Home'; // Import the new HomePage component
import ViewStory from './components/ViewStory';
import EditStory from './components/EditStory';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link></li>
            {user && <li><Link to="/write" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Write</Link></li>}
            {user && <li><Link to="/library" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Library</Link></li>}
            {!user && <li><Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link></li>}
            {!user && <li><Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Register</Link></li>}
            {user && <li><Link to="/logout" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Logout</Link></li>}
          </ul>
          {user && (
            <div className="text-white ml-auto">
              {user.email}
            </div>
          )}
        </nav>
        
        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={user ? <WriteStory /> : <Navigate to="/" />} />
          <Route path="/library" element={user ? <StoryLibrary /> : <Navigate to="/" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/view/:id" element={<ViewStory />} />
          <Route path="/edit/:id" element={<EditStory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
