import {
  LOAD_JOBS_REQUEST,
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAILURE,
  MOVE_JOB_REQUEST,
  MOVE_JOB_SUCCESS,
  MOVE_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  RESET_JOB_BOARD
} from './actions';

import initialState from '../../initialState';

const initialJobBoardState = {
  loading: false,
  error: null,
  boards: initialState.jobBoard.boards // Initial boards state
};

const jobBoardReducer = (state = initialJobBoardState, action) => {
  switch (action.type) {
    case LOAD_JOBS_REQUEST:
    case MOVE_JOB_REQUEST:
    case DELETE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        boards: {
          ...state.boards,
          ...action.payload
        }
      };
    case MOVE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        boards: {
          ...state.boards,
          ...action.payload
        }
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        boards: {
          ...state.boards,
          ...action.payload
        }
      };

    case LOAD_JOBS_FAILURE:
    case MOVE_JOB_FAILURE:
    case DELETE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case RESET_JOB_BOARD:
      return {
        ...state,
        loading: false,
        error: null,
        boards: initialState.jobBoard.boards // Reset to initial boards state
      };

    default:
      return state;
  }
};

export default jobBoardReducer;
