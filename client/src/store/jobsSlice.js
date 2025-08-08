import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching jobs from:', `${API_URL}/jobs`);
      const response = await axios.get(`${API_URL}/jobs`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const submitApplication = createAsyncThunk(
  'jobs/submitApplication',
  async ({ jobId, applicationData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/apply/${jobId}`, applicationData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
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
        state.error = action.payload || action.error.message;
      })
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSearchTerm, setLocationFilter, clearFilters } = jobsSlice.actions;
export default jobsSlice.reducer;