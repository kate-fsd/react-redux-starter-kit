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