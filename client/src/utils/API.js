
const axios = require('axios');

export function signUp(data) {
  return axios.post('/api/auth/signup', data);
};


export function logIn(data) {
  return axios.post('/api/auth/login', data);
};

export function logOut() {
  return axios.get('/api/auth/logout');
}

export function resetPW(email){
  return axios.post('/api/auth/resetpw', email);
}

// ======================================================

// TESTING OAuth Logins
export function googleSignUp(data) {
  return axios.post('/auth/google', data);
};

// Not sure this is in use..
// export function googleSignIn() {
//   return axios.get('/auth/google');
// };

// ======================================================
// Jobs
export function createJob(data) {
  return axios.post('/api/jobs/saved', data);
};

export function getAllJobs() {
  return axios.get('/api/jobs/saved');
};

export function getJobById(id) {
  return axios.get(`/api/jobs/saved/${id}`);
};

export function deleteJobById(id) {
  return axios.delete(`/api/jobs/saved/${id}`);
};

export function updateJobById(id, data) {
  console.log('I RUN SECOND!');
  return axios.put(`/api/jobs/saved/${id}`, data);
};

// ======================================================
// Chart
export function getJobDataAll(){
  return axios.get('/api/jobs/chart/all');
};

export function getJobDataUser(){
  return axios.get('/api/jobs/chart/user');
};

export function getUserPercentile(saved, applied, phone, onSite, offer){
  return axios.get(`/api/jobs/chart/user/percentile/?saved=${saved}&applied=${applied}&phone=${phone}&onSite=${onSite}&offer=${offer}`);
};

// ======================================================
// Search
export function getSearchResults(keywords, location){
  return axios.get(`/api/jobs/search/?keywords=${keywords}&location=${location}`);
};

