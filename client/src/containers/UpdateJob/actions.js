import { deleteJobById, updateJobById } from '../../utils/API';
import { convertDate } from '../../utils/dateConverter';

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';

export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

export const UPDATE_JOB_RESET = 'UPDATE_JOB_RESET';
export const UPDATE_JOB_SELECT = 'UPDATE_JOB_SELECT';

export const updateJobRequest = () => ({
  type: UPDATE_JOB_REQUEST,
});

export const updateJobSuccess = () => ({
  type: UPDATE_JOB_SUCCESS,
});

export const updateJobFailure = (error) => ({
  type: UPDATE_JOB_FAILURE,
  payload: error,
});

// Delete Job Actions
export const deleteJobRequest = () => ({
  type: DELETE_JOB_REQUEST,
});

export const deleteJobSuccess = () => ({
  type: DELETE_JOB_SUCCESS,
});

export const deleteJobFailure = (error) => ({
  type: DELETE_JOB_FAILURE,
  payload: error,
});

// Reset and Select Actions
export const resetUpdateJob = () => ({
  type: UPDATE_JOB_RESET,
});

export const selectUpdateJob = (job) => {
  job.post_date = convertDate(job.post_date);
  return {
    type: UPDATE_JOB_SELECT,
    payload: job,
  };
};

// Using Redux thunk middleware https://github.com/reduxjs/redux-thunk
// our action creator returns a function instead of an action. This function can
// be asynchronous to either delay the dispatch of an action, or dispatch only if certain
// conditions are met. In our case, we are having different actions dispatched depending on
// what part of the async process something is happening. This can be useful for transitional
// rendering, such as having a spinning loading wheel while awaiting some data to be received from
// a DB query etc.
export const updateJobThunk = (jobInfo) => async (dispatch) => {
  dispatch(updateJobRequest());
  try {
    await updateJobById(jobInfo._id, jobInfo);
    dispatch(updateJobSuccess());
  } catch (err) {
    console.error('Update job failed with error:', err);
    const errorMsg = err.response?.data?.error || err.message || 'Update job failed';
    dispatch(updateJobFailure(errorMsg));
  }
};

// Delete Job Thunk
export const deleteJobThunk = (jobId) => async (dispatch) => {
  dispatch(deleteJobRequest());
  try {
    await deleteJobById(jobId);
    dispatch(deleteJobSuccess());
  } catch (err) {
    console.error('Delete job failed with error:', err);
    const errorMsg = err.response?.data?.error || err.message || 'Delete job failed';
    dispatch(deleteJobFailure(errorMsg));
  }
};

// export function selectUpdateJob(job) {
//   job.post_date = convertDate(job.post_date)
//   return {
//     type: UPDATEJOB_SELECT,
//     payload: {
//       job: job
//     }
//   }
// }

// export function resetUpdateJob() {
//   return dispatch => dispatch(clearUpdateJob());
// }

// export function successUpdateJob() {
//   return {
//     type: UPDATEJOB_SUCCESS,
//     payload: {
//       job: null,
//       error: null,
//       status: true
//     }
//   };
// };

// export function failedUpdateJob(err) {
//   return {
//     type: UPDATEJOB_FAILED,
//     payload: {
//       error: err
//     } 
//   };
// };

// export function clearUpdateJob() {
//   return {
//     type: UPDATEJOB_CLEAR,
//     payload: {}
//   }
// }
