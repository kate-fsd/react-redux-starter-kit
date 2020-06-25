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