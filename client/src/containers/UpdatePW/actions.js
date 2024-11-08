import { updatePW } from '../../utils/API';

export const PASSWORD_UPDATE_REQUEST = 'PASSWORD_UPDATE_REQUEST';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';

export const passwordUpdateRequest = () => ({
    type: PASSWORD_UPDATE_REQUEST,
});

export const passwordUpdateSuccess = () => ({
    type: PASSWORD_UPDATE_SUCCESS,
});

export const passwordUpdateFailure = (error) => ({
    type: PASSWORD_UPDATE_FAILURE,
    payload: error,
});

export const updatePassword = (userInfo) => async (dispatch) => {
    dispatch(passwordUpdateRequest());
    try {
        await updatePW(userInfo);
        dispatch(passwordUpdateSuccess());
    } catch (err) {
        console.error('updatePassword failed with error:', err);

        let errorMsg = 'Password update failed';
        if (err.response && err.response.data) {
            errorMsg = err.response.data.error || err.response.data.message || errorMsg;
        } else if (err.message) {
            errorMsg = err.message;
        }
        dispatch(passwordUpdateFailure(errorMsg));
    }
};

// export function updatePassword(userInfo) {
//     return async (dispatch, getState) => {
//         try {
//             await(updatePW(userInfo));
//             dispatch(resetConfirmed('ok'));
//         } catch(err){
//             dispatch(noData(err))
//         }
//     }
// }

// function resetConfirmed(){
//     return {
//         type: PASSWORD_UPDATE,
//         payload: {
//             status: true,
//             error: null
//         }
//     }
// }

// function noData(err){
//     console.log("error - no data")
//     return {
//         type: 'NO_DATA',
//         payload: {
//             status : null,
//             error: err
//         }
//     }
// }
