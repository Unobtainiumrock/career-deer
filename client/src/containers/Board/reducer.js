import { produce } from 'immer';
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
  RESET_JOB_BOARD,
  MOVE_JOB_REVERT
} from './actions';

import initialState from '../../initialState';

const initialJobBoardState = initialState.jobBoard;

const jobBoardReducer = (state = initialJobBoardState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_JOBS_REQUEST:
      case MOVE_JOB_REQUEST:
      case DELETE_JOB_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case LOAD_JOBS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.jobs = { ...action.payload.jobs };
        draft.columns = { ...action.payload.columns };
        break;
      case MOVE_JOB_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.columns = { ...action.payload.columns };
        draft.jobs = { ...action.payload.jobs };
        break;
      case DELETE_JOB_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.columns = { ...action.payload.columns };
        draft.jobs = { ...action.payload.jobs };
        break;

      case LOAD_JOBS_FAILURE:
      case MOVE_JOB_FAILURE:
      case DELETE_JOB_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        break;

      case RESET_JOB_BOARD:
        draft.loading = false;
        draft.error = null;
        draft.columns = { ...initialState.jobBoard.columns };
        draft.jobs = {};
        break;

      case MOVE_JOB_REVERT:
        draft.columns = { ...action.payload.columns };
        draft.jobs = { ...action.payload.jobs };
        draft.error = action.payload.error || 'Failed to move job';
        draft.loading = false;
        break;

      default:
        break;
    }
  });

export default jobBoardReducer;
