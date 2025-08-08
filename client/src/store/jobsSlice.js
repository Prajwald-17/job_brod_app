import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  }
);

export const submitApplication = createAsyncThunk(
  'jobs/submitApplication',
  async ({ jobId, applicationData }) => {
    const response = await axios.post(`${API_URL}/apply/${jobId}`, applicationData);
    return response.data;
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    filteredJobs: [],
    loading: false,
    error: null,
    searchTerm: '',
    locationFilter: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredJobs = state.jobs.filter(job =>
        job.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        job.company.toLowerCase().includes(action.payload.toLowerCase()) ||
        job.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setLocationFilter: (state, action) => {
      state.locationFilter = action.payload;
      state.filteredJobs = state.jobs.filter(job =>
        job.location.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.locationFilter = '';
      state.filteredJobs = state.jobs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setLocationFilter, clearFilters } = jobsSlice.actions;
export default jobsSlice.reducer;