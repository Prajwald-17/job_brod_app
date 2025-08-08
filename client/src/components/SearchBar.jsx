import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setLocationFilter, clearFilters } from '../store/jobsSlice';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(setSearchTerm(keyword));
    }
    if (location) {
      dispatch(setLocationFilter(location));
    }
  };

  const handleClear = () => {
    setKeyword('');
    setLocation('');
    dispatch(clearFilters());
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8 border border-white/20">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by keyword, company, or job title..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="form-input w-full pl-10 pr-4 py-3 text-lg"
          />
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Location (e.g., San Francisco, Remote)..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input w-full pl-10 pr-4 py-3 text-lg"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary px-6 py-3 text-lg font-semibold"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;