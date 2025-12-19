import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import type { User } from './types';

/**
 * Top-level component that manages authentication state and routing.
 */
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
    <div className="container">
      <h1>My To‑Do List</h1>
      {user && (
        <div>
          <span>Hello, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={token ? <TaskList token={token} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
