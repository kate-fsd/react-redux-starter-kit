import { makeCommunicationActionCreators } from 'redux-make-communication';

import * as NS from '../../namespace';

export const {
  execute: signUp,
  completed: signUpSuccess,
  failed: signUpFail,
} = makeCommunicationActionCreators<NS.ISignUp, NS.ISignUpSuccess, NS.ISignUpFail>(
  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAIL',
);

export const {
  execute: login,
  completed: loginSuccess,
  failed: loginFail,
} = makeCommunicationActionCreators<NS.ILogin, NS.ILoginSuccess, NS.ILoginFail>(
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
);

export const {
  execute: restore,
  completed: restoreSuccess,
  failed: restoreFail,
} = makeCommunicationActionCreators<NS.IRestore, NS.IRestoreSuccess, NS.IRestoreFail>(
  'RESTORE',
  'RESTORE_SUCCESS',
  'RESTORE_FAIL',
);

export const {
  execute: logout,
  completed: logoutSuccess,
  failed: logoutFail,
} = makeCommunicationActionCreators<NS.ILogout, NS.ILogoutSuccess, NS.ILogoutFail>(
  'LOGOUT',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAIL',
);


export const {
  execute: loginByService
} = makeCommunicationActionCreators<NS.ILoginByService, NS.ILoginSuccess, NS.ILoginFail>(
  'LOGIN_BY_SERVICE',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
);