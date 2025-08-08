import React, { useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      console.log('Testing API URL:', apiUrl);
      
      // First test the debug endpoint
      console.log('Testing debug endpoint...');
      const debugResponse = await axios.get(`${apiUrl}/debug`);
      console.log('Debug response:', debugResponse.data);
      
      // Then test the jobs endpoint
      console.log('Testing jobs endpoint...');
      const response = await axios.get(`${apiUrl}/jobs`);
      setResult(`✅ Success! Found ${response.data.length} jobs. Debug: ${JSON.stringify(debugResponse.data.origin)}`);
    } catch (error) {
      console.error('API Test Error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      setResult(`❌ Error: ${error.message} (${error.code || 'Unknown'})`);
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
          <div className="text-sm text-gray-600 mt-2">
            <p><strong>API URL:</strong> {(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')}</p>
            <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
            <p><strong>All Env Vars:</strong> {JSON.stringify(import.meta.env, null, 2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;