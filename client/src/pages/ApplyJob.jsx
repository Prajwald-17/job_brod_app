import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitApplication, fetchJobs } from '../store/jobsSlice';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeUrl: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeOption, setResumeOption] = useState('url'); // 'url' or 'upload'
  const [submitted, setSubmitted] = useState(false);

  const job = jobs.find(j => j._id === jobId);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please select a PDF file only.');
      e.target.value = '';
    }
  };

  const handleResumeOptionChange = (option) => {
    setResumeOption(option);
    if (option === 'url') {
      setResumeFile(null);
    } else {
      setFormData({ ...formData, resumeUrl: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate resume input
    if (resumeOption === 'url' && !formData.resumeUrl) {
      alert('Please provide a resume URL.');
      return;
    }
    if (resumeOption === 'upload' && !resumeFile) {
      alert('Please upload a resume file.');
      return;
    }

    try {
      let applicationData;
      
      if (resumeOption === 'upload') {
        // Create FormData for file upload
        const formDataWithFile = new FormData();
        formDataWithFile.append('name', formData.name);
        formDataWithFile.append('email', formData.email);
        formDataWithFile.append('resume', resumeFile);
        formDataWithFile.append('resumeType', 'file');
        applicationData = formDataWithFile;
      } else {
        // Send regular form data with URL
        applicationData = {
          ...formData,
          resumeType: 'url'
        };
      }
      
      await dispatch(submitApplication({ jobId, applicationData }));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Job Listings
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Application Submitted!</h2>
          <p className="text-green-700 mb-6">
            Thank you for applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>.
            We'll review your application and get back to you soon.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse More Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Job Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
          <div className="mb-4">
            <p className="text-xl text-blue-600 font-medium mb-2">{job.company}</p>
            <p className="text-gray-600 mb-4">📍 {job.location}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for this Position</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Resume *
              </label>
              
              {/* Resume Option Selector */}
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="resumeOption"
                    value="url"
                    checked={resumeOption === 'url'}
                    onChange={() => handleResumeOptionChange('url')}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Provide URL</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="resumeOption"
                    value="upload"
                    checked={resumeOption === 'upload'}
                    onChange={() => handleResumeOptionChange('upload')}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Upload PDF</span>
                </label>
              </div>

              {/* Resume URL Input */}
              {resumeOption === 'url' && (
                <div>
                  <input
                    type="url"
                    id="resumeUrl"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/your-resume.pdf"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Please provide a link to your resume (Google Drive, Dropbox, etc.)
                  </p>
                </div>
              )}

              {/* Resume File Upload */}
              {resumeOption === 'upload' && (
                <div>
                  <input
                    type="file"
                    id="resumeFile"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Please upload your resume as a PDF file (max 5MB)
                  </p>
                  {resumeFile && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;