import { signUp, logIn, logOut, /*initialLoad*/ } from '../../utils/API';
import { appLoginUpdate } from '../App/actions';

// Action Types

// export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
// export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_RESET = 'SIGNUP_RESET';
export const LOGIN_RESET = 'LOGIN_RESET';

// Action Creators
// export const loadUserSuccess = (user) => ({
//   type: LOAD_USER_SUCCESS,
//   payload: user
// });

// export const loadUserFailure = () => ({
//   type: LOAD_USER_FAILURE
// });

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const resetSignUp = () => ({
  type: SIGNUP_RESET,
  payload: {},
});

export const resetLogin = () => ({
  type: LOGIN_RESET,
  payload: {}
})

// Thunks

/**
 * Thunk to load the authenticated user's data.
 */
// export const loadUser = () => async (dispatch) => {
//   try {
//     const res = await initialLoad();
//     if (res.data && res.data.email) {
//       dispatch(loadUserSuccess(res.data));
//     } else {
//       dispatch(loadUserFailure());
//     }
//   } catch (err) {
//     dispatch(loadUserFailure());
//   }
// };

/**
 * Thunk to handle regular sign-up.
 * @param {Object} userInfo - The user's sign-up information.
 */
export const signUpThunk = (userInfo) => async (dispatch) => {
  try {
    // Normalize email to lowercase
    const normalizedUserInfo = { ...userInfo, email: userInfo.email.toLowerCase() };

    // Make API call to sign up the user
    const res = await signUp(normalizedUserInfo);

    // Dispatch success action with user data
    dispatch(signupSuccess(res.data));

    // Update application state with the authenticated user
    dispatch(appLoginUpdate(res.data));

    // Optionally, load the user to ensure the state is up-to-date
    // dispatch(loadUser()); // This may need to be removed
  } catch (err) {
    console.error('signUpThunk failed with error:', err);
    const errorMsg = err.response && err.response.data && err.response.data.error
      ? err.response.data.error
      : 'Sign-up failed';
    dispatch(signupFailure(errorMsg));
  }
};

/**
 * Thunk to handle regular login.
 * @param {Object} credentials - The user's login credentials.
 */
export const loginThunk = (credentials) => async (dispatch) => {
  try {
    // Make API call to log in the user
    const res = await logIn(credentials);

    // Dispatch success action with user data
    dispatch(loginSuccess(res.data));

    // Update application state with the authenticated user
    dispatch(appLoginUpdate(res.data));

    // Optionally, load the user to ensure the state is up-to-date
    dispatch(loadUser());
  } catch (err) {
    console.error('loginThunk failed with error:', err);
    const errorMsg = err.response && err.response.data && err.response.data.error
      ? err.response.data.error
      : 'Login failed';
    dispatch(loginFailure(errorMsg));
  }
};

/**
 * Thunk to handle user logout.
 */
export const logoutThunk = () => async (dispatch) => {
  try {
    await logOut();
    dispatch(logoutSuccess());
    // Optionally, update application state to reflect logout
    dispatch(appLoginUpdate(null));
  } catch (err) {
    console.error('Logout failed:', err);
    // Handle logout failure if necessary
  }
};
