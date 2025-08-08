import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobListings from './pages/JobListings';
import ApplyJob from './pages/ApplyJob';
import AdminJobs from './pages/AdminJobs';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<JobListings />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/admin" element={<AdminJobs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
