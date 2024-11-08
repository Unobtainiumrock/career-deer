import { createJob } from '../../utils/API';

// Action Types
export const ADD_JOB_REQUEST = 'ADD_JOB_REQUEST';
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS';
export const ADD_JOB_FAILURE = 'ADD_JOB_FAILURE';
export const ADD_JOB_RESET = 'ADD_JOB_RESET';

// Action Creators
export const addJobRequest = () => ({
  type: ADD_JOB_REQUEST,
});

export const addJobSuccess = (job) => ({
  type: ADD_JOB_SUCCESS,
  payload: job,
});

export const addJobFailure = (error) => ({
  type: ADD_JOB_FAILURE,
  payload: error,
});

export const resetAddJob = () => ({
  type: ADD_JOB_RESET,
});

export const addJobThunk = (jobInfo) => async (dispatch) => {
    dispatch(addJobRequest());
    try {
      const res = await createJob(jobInfo);
      dispatch(addJobSuccess(res.data)); // Assuming res.data contains the created job
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Add job failed';
      dispatch(addJobFailure(errorMsg));
    }
  };
