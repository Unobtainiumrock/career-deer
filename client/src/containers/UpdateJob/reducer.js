// import { UPDATEJOB_FAILED, UPDATEJOB_SUCCESS, UPDATEJOB_CLEAR, UPDATEJOB_SELECT } from './actions';
// import initialState from '../../initialState';

// // There's only a case for failed signup here, because a sucessful signup dispatches
// // an action of a type LOGIN_SUCCESS. The loginReducer will pick up on this dispatched
// // LOGIN_SUCCESS, and log them in. Basically the signUpReducer is only responsible for
// // listening to dispatched errors for unsuccessful logins.
// export default function updateJobReducer(state = initialState, { type, payload }) {
//   switch(type) {
//     case UPDATEJOB_FAILED:
//       return {
//         ...state,
//         ...payload,
//         status: false
//       }
//     case UPDATEJOB_SUCCESS:
//       return {
//         ...state,
//         status: true,
//         job: null,
//         error: false
//       }
//     case UPDATEJOB_CLEAR:
//       return {
//         ...state,
//         status: false,
//         job: null,
//         error: false
//       }
//     case UPDATEJOB_SELECT:
//       return {
//         ...state,
//         ...payload
//       }
//     default:
//       return state
//   }
// };

import {
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
  UPDATE_JOB_RESET,
  UPDATE_JOB_SELECT,
} from './actions';

const initialState = {
  job: null,
  status: false,
  error: null,
  loading: false,
};

export default function updateJobReducer(state = initialState, action) {
  switch (action.type) {
    // Update Job Cases
    case UPDATE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        status: true,
        loading: false,
        error: null,
      };
    case UPDATE_JOB_FAILURE:
      return {
        ...state,
        status: false,
        loading: false,
        error: action.payload,
      };

    // Delete Job Cases
    case DELETE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        status: true,
        loading: false,
        error: null,
      };
    case DELETE_JOB_FAILURE:
      return {
        ...state,
        status: false,
        loading: false,
        error: action.payload,
      };
      
    // Reset and Select Cases
    case UPDATE_JOB_SELECT:
      return {
        ...state,
        job: action.payload,
      };
    case UPDATE_JOB_RESET:
      return initialState;

    default:
      return state;
  }
}
