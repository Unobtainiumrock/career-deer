import axios from 'axios';

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/', // Base URL for all API requests
  withCredentials: true, // Send cookies with requests
});

// Auth Endpoints
export const initialLoad = () => apiClient.get('/auth/load');
export const signUp = (data) => apiClient.post('/auth/signup', data);
export const logIn = (data) => apiClient.post('/auth/login', data);
export const logOut = () => apiClient.get('/auth/logout');
export const resetPW = (email) => apiClient.post('/auth/resetpw', email);
export const updatePW = (data) => apiClient.post('/auth/updatepw', data);

// Jobs Endpoints
export const createJob = (data) => apiClient.post('/jobs/saved', data);
export const findAllJobsForUser = () => apiClient.get('/jobs/saved');
export const getJobById = (id) => apiClient.get(`/jobs/saved/${id}`);
export const deleteJobById = (id) => apiClient.delete(`/jobs/saved/${id}`);
export const updateJobById = (id, data) => apiClient.put(`/jobs/saved/${id}`, data);

// Chart Endpoints
export const aggregateJobDataForCharts = () => apiClient.get('/jobs/chart/all');
export const getJobDataUser = () => apiClient.get('/jobs/chart/user');
export const getUserPercentile = (saved, applied, phone, onSite, offer) =>
  apiClient.get(`/jobs/chart/user/percentile/?saved=${saved}&applied=${applied}&phone=${phone}&onSite=${onSite}&offer=${offer}`);

// Search Endpoints
export const getSearchResults = (keywords, location) =>
  apiClient.get(`/jobs/search/?keywords=${keywords}&location=${location}`);
