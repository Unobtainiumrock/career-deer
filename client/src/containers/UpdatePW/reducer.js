import {
    PASSWORD_UPDATE_REQUEST,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAILURE,
  } from './actions';
  
  const initialState = {
    status: false,
    error: null,
    loading: false,
  };
  
  export default function pwUpdateReducer(state = initialState, action) {
    switch (action.type) {
      case PASSWORD_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case PASSWORD_UPDATE_SUCCESS:
        return {
          ...state,
          status: true,
          loading: false,
          error: null,
        };
      case PASSWORD_UPDATE_FAILURE:
        return {
          ...state,
          status: false,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  