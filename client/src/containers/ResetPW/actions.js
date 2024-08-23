import { resetPW } from '../../utils/API';

export const PASSWORD_RESET = 'PASSWORD_RESET';
export const NO_DATA = 'NO_DATA'; // Determine if this is even useful/meaningful. Chart out the typical user-flow for password resetting.

export function postResetPassword() {
    return async (dispatch, getState) => {
        try {
            console.log("entered pwReset")

            const response = await resetPW({ email });
            
            dispatch(resetConfirmed(response.data));
        } catch(err){
            dispatch(noData(err))
        }
    }
}

function resetConfirmed(){
    console.log('entered resetConfirmed function');
    return {
        type: PASSWORD_RESET,
        payload: {
            email: 'test@careerdeer.com',
            pwReset: true
        }
    }
}

function noData(err){
    console.log("error - no data")
    return {
        type: NO_DATA,
        payload: {
            pwReset : null,
            error: err
        }
    }
}