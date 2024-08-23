import { PASSWORD_RESET, NO_DATA } from './actions';
import intialState from '../../initialState';

export default function pwResetReducer(state = intialState, { type, payload }) {

    switch (type) {
        case PASSWORD_RESET:
            return {
                ...state,
                ...payload
            }
        case NO_DATA:
            return state // this is a placeholder for now. We need to determine whether or not this no data case is needed. It will evolve, based on user flow for password resetting.
        default:
            return state;
    }
}