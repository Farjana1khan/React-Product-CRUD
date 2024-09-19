import React from 'react'
import { Link } from 'react-router-dom'


function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-xl text-gray-700">Name: Farjana</p>
      <p className="text-xl text-gray-700 mb-6">Email: farjana@gmail.com</p>
      <div className="mt-6">
        <Link 
          to="/login" 
          className="text-xl border border-gray-600 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
        >
          Login
        </Link>
      </div>
    </div>
  </div>
  
  )
}

export default HomePage