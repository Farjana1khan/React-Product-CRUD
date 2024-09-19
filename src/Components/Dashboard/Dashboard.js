import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../Services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user info', error);
        navigate('/login'); // Redirect to login if fetching user info fails
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="px-32 py-24 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user.firstName} {user.lastName}</h1>
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-32 h-32 rounded-full mx-auto mt-6"
      />
      <nav className="mt-6">
        <a href="/products/add" className="text-xl border-gray-600 px-4 py-2 bg-slate-400 hover:bg-gray-600 text-white rounded-md">Add Product</a>
        <a href="/product-list" className="ml-4 text-xl border-gray-600 px-4 py-2 bg-slate-400 hover:bg-gray-600 text-white rounded-md">View Products</a>
        <a href="/report" className="ml-4 text-xl border-gray-600 px-4 py-2 bg-slate-400 hover:bg-gray-600 text-white rounded-md">Report</a>
      </nav>
    </div>
  );
};

export default Dashboard;
