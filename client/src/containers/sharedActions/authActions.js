import { signUp, logIn, logOut, initialLoad } from '../../utils/API';
// import { appLoginUpdate } from '../App/actions';

// Action Types
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


export const SIGNUP_RESET = 'SIGNUP_RESET';
export const LOGIN_RESET = 'LOGIN_RESET';

// Action Creators
export const loadUserRequest = () => ({
  type: LOAD_USER_REQUEST
});

export const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  payload: user
});

export const loadUserFailure = (error) => ({
  type: LOAD_USER_FAILURE,
  payload: error
});

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});


// These might not be needed..
export const resetSignUp = () => ({
  type: SIGNUP_RESET
});

export const resetLogin = () => ({
  type: LOGIN_RESET
});

// Thunks

/**
 * Thunk to load the authenticated user's data.
 */
export const loadUser = () => async (dispatch) => {
  dispatch(loadUserRequest());
  try {
    const res = await initialLoad();
    if (res.data && res.status === 200) {
      dispatch(loadUserSuccess(res.data));
    } else {
      throw new Error('No authenticated user');
    }
  } catch (err) {
    console.error('Load user failed with error:', err);
    const errorMsg = err.response?.data?.error || err.message || 'Load user failed';
    dispatch(loadUserFailure(errorMsg));
  }
};

/**
 * Thunk to handle regular sign-up.
 * @param {Object} userInfo - The user's sign-up information.
 */
export const signUpThunk = (userInfo) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    // Normalize email to lowercase
    const normalizedUserInfo = { ...userInfo, email: userInfo.email.toLowerCase() };
    const res = await signUp(normalizedUserInfo);

    dispatch(signupSuccess(res.data));
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error('signUpThunk failed with error:', err);
    const errorMsg = err.response?.data?.error || err.message || 'Sign-up failed';
    dispatch(signupFailure(errorMsg));
  }
};

/**
 * Thunk to handle regular login.
 * @param {Object} credentials - The user's login credentials.
 */
export const loginThunk = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await logIn(credentials);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error('loginThunk failed with error:', err);
    const errorMsg = err.response?.data?.error || err.message || 'Login failed';
    dispatch(loginFailure(errorMsg));
  }
};

/**
 * Thunk to handle user logout.
 */
export const logoutThunk = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    await logOut();
    dispatch(logoutSuccess());
  } catch (err) {
    console.error('logoutThunk failed with error:', err);
    const errorMsg = err.response?.data?.error || err.message || 'Logout failed';
    dispatch(logoutFailure(errorMsg));
  }
};
