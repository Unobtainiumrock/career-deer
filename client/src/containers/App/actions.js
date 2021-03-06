import { logOut } from '../../utils/API';

export const APP_LOGIN = 'APP_LOGIN_UPDATE';
export const APP_LOGOUT = 'APP_LOGOUT';

export function appLoginUpdate(loginData) {
  return {
    type: APP_LOGIN,
    payload: {
      user: loginData
    }
  }
}

// Doesn't appear to currently be in use?
export function appLogoutUpdate() {
  logOut();
  return {
    type: APP_LOGOUT,
    payload: {}
  }
}
