import { useState } from 'react';
import axios from 'axios';
import DoeCard from '../components/DoeCard';
import React from 'react'

export default function Search() {
  const [diameter, setDiameter] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/doe?diameter=${diameter}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsImlhdCI6MTc0NDI2MzI1MCwiZXhwIjoxNzQ0MzQ5NjUwfQ.Fw2UfSA_LmuBiW5UNfOYY5K6SmXQmCOqje0Ab44Z5c8",
          },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Search DOE by Tool Diameter</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          placeholder="Enter tool diameter"
          className="border border-gray-300 rounded px-4 py-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4">
        {results.map((item) => (
          <DoeCard key={item.DOE_Serial_Number} data={item} />
        ))}
      </div>
    </div>
  );
}
