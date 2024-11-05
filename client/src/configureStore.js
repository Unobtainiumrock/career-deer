import { configureStore as reduxConfigureStore, combineReducers } from '@reduxjs/toolkit';

// Reducers
import appReducer from './containers/App/reducer';
import pwResetReducer from './containers/ResetPW/reducer';
import pwUpdateReducer from './containers/UpdatePW/reducer';
import authReducer from './containers/sharedReducers/authReducer'
import chartReducer from './containers/Chart/reducer';
import addJobReducer from './containers/AddJob/reducer';
import { grabJobsReducer, jobBoardReducer } from './containers/Board/reducer';
import updateJobReducer from './containers/UpdateJob/reducer';
import viewJobsReducer from './containers/ViewJobs/reducer';
import burgerMenuReducer from './containers/BurgerMenu/reducer';
import searchReducer from './containers/Search/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  pwReset: pwResetReducer,
  pwUpdate: pwUpdateReducer,
  chartData: chartReducer,
  addJob: addJobReducer,
  viewJobs: viewJobsReducer,
  jobBoard: jobBoardReducer,
  boards: grabJobsReducer,
  updateJob: updateJobReducer,
  burgerMenu: burgerMenuReducer,
  searchData: searchReducer
})

export default function configureStore(initialState = {}) {
  const store = reduxConfigureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  return store;
}
