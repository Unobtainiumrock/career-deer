import {
  // LOAD_USER_SUCCESS,
  // LOAD_USER_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_RESET,
  LOGIN_RESET
} from '../sharedActions/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  loginError: null,
  signUpError: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    // case LOAD_USER_SUCCESS:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     user: action.payload,
    //     loginError: null,
    //     signUpError: null
    //   };
    // case LOAD_USER_FAILURE:
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     user: null
    //   };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        signUpError: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signUpError: action.payload // action.payload is a string
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signUpError: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loginError: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload // action.payload is a string
      };
    case LOGIN_RESET:
      return {
        ...state,
        loginError: null
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loginError: null,
        signUpError: null
      };
    default:
      return state;
  }
};

export default authReducer;
