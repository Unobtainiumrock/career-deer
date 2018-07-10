import { CHART_ALL, CHART_USER } from './actions';
import initialState from '../../initialState';

//For testing default output.
// const CHART_ALL = undefined;

export default function chartReducer(state = initialState, { type, payload }) {

  switch (type) {
    case CHART_ALL:
      return {
        ...state,
        ...payload
      }
    case CHART_USER:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}


