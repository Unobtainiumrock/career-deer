// configureStore.js

import { configureStore as reduxConfigureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// Reducers
import appReducer from './containers/App/reducer';
import loginReducer from './containers/Login/reducer';
import pwResetReducer from './containers/ResetPW/reducer';
import { signUpReducer, googleAuthReducer } from './containers/SignUp/reducer';
import chartReducer from './containers/Chart/reducer';
import addJobReducer from './containers/AddJob/reducer';
import { grabJobsReducer } from './containers/Board/reducer';
import updateJobReducer from './containers/UpdateJob/reducer';
import viewJobsReducer from './containers/ViewJobs/reducer';
import burgerMenuReducer from './containers/BurgerMenu/reducer';
import searchReducer from './containers/Search/reducer';
// import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  app: appReducer,
  // form: formReducer,
  loggedIn: loginReducer,
  signedUp: signUpReducer,
  pwReset: pwResetReducer,
  googleAuth: googleAuthReducer,
  chartData: chartReducer,
  addJob: addJobReducer,
  viewJobs: viewJobsReducer,
  boards: grabJobsReducer,
  updateJob: updateJobReducer,
  burgerMenu: burgerMenuReducer,
  searchData: searchReducer,
});

export default function configureStore(initialState = {}) {
  const store = reduxConfigureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  return store;
}
