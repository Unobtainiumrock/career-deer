import { PASSWORD_RESET, NO_DATA } from './actions';
import intialState from '../../initialState';

export default function pwResetReducer(state = intialState, { type, payload }) {

    switch (type) {
        case PASSWORD_RESET:
            return {
                ...state,
                email: payload.email,
                pwReset: payload.pwReset
            };
        case NO_DATA:
            return {
                ...state,
                pwReset: null,
                error: payload.error
            };
        default:
            return state;
    }
}