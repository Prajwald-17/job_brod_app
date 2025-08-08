import React, { useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Testing API URL:', apiUrl);
      
      const response = await axios.get(`${apiUrl}/jobs`);
      setResult(`✅ Success! Found ${response.data.length} jobs`);
    } catch (error) {
      console.error('API Test Error:', error);
      setResult(`❌ Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">API Connection Test</h3>
      <button 
        onClick={testApi}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {result && (
        <div className="mt-2 p-2 bg-white rounded">
          <p>{result}</p>
          <p className="text-sm text-gray-600">
            API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiTest;