import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react'

export default function Details() {
  const { serialNumber } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/doe/${serialNumber}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [serialNumber]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">DOE Details</h2>
      <div className="bg-white shadow p-4 rounded">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-2">
            <span className="font-semibold">{key}:</span> {value}
          </div>
        ))}
      </div>
    </div>
  );
}
