import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
          <p className="text-blue-600 font-medium mb-1">{job.company}</p>
          <p className="text-gray-600 mb-3">📍 {job.location}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">
        {job.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted recently
        </span>
        <Link
          to={`/apply/${job._id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobCard;