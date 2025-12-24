import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import type { User } from './types';

const App: React.FC = () => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? (JSON.parse(stored) as User) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My To‑Do List</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={token ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
