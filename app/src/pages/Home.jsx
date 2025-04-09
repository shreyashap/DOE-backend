import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <img
        src="https://images.pexels.com/photos/30335244/pexels-photo-30335244/free-photo-of-vintage-industrial-factory-interior-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Industry"
        className="w-full max-w-md rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mt-6">Welcome to DOE Search</h1>
      <p className="text-gray-600 mt-2">Find design of experiments by tool diameter.</p>
      <button
        onClick={() => navigate('/search')}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
}
