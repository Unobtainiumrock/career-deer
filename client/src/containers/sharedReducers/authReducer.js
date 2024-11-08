import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_RESET,
  LOGIN_RESET
} from '../sharedActions/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  loginError: null,
  signUpError: null,
  loading: false,
  loadUserError: null,
  logoutError: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        loadUserError: null
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: Boolean(action.payload),
        user: action.payload,
        loading: false,
        loadUserError: null
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        loadUserError: action.payload,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        signUpError: null
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        signUpError: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        signUpError: action.payload
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signUpError: null
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginError: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        loginError: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.payload
      };
    case LOGIN_RESET:
      return {
        ...state,
        loginError: null
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        logoutError: null
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        logoutError: null,
        loginError: null,
        signUpError: null
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        logoutError: action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
