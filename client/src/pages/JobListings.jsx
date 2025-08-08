import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobsSlice';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const JobListings = () => {
  const dispatch = useDispatch();
  const { filteredJobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="error-message max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Oops! Something went wrong</h3>
          <p>Error loading jobs: {error}</p>
          <button 
            onClick={() => dispatch(fetchJobs())} 
            className="btn-primary mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold heading-primary mb-6">Find Your Dream Job</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover amazing opportunities from top companies and take the next step in your career journey
        </p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Available Positions
        </h2>
        <p className="text-white/80 text-lg">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} waiting for you
        </p>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Jobs Found</h3>
            <p className="text-white/80 text-lg mb-6">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <button 
              onClick={() => dispatch(fetchJobs())} 
              className="btn-primary"
            >
              Refresh Jobs
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job, index) => (
            <div key={job._id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;