import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const response = await login(credentials);

      // Store the token in local storage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      if (error.response) {
        // Display error message from the server, if available
        setError(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        // error message
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 mt-24 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
