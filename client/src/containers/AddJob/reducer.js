import {
    ADD_JOB_REQUEST,
    ADD_JOB_SUCCESS,
    ADD_JOB_FAILURE,
    ADD_JOB_RESET,
  } from './actions';
  
  const initialState = {
    status: false,
    error: null,
    loading: false,
  };
  
  const addJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_JOB_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          status: false,
        };
      case ADD_JOB_SUCCESS:
        return {
          ...state,
          loading: false,
          status: true,
          error: null,
        };
      case ADD_JOB_FAILURE:
        return {
          ...state,
          loading: false,
          status: false,
          error: action.payload,
        };
      case ADD_JOB_RESET:
        return {
          ...state,
          loading: false,
          status: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default addJobReducer;
