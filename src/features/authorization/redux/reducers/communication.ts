import { makeCommunicationReducer } from 'redux-make-communication';
import { combineReducers } from 'redux';

import * as NS from '../../namespace';
import { initial } from '../initial';

// tslint:disable:max-line-length
export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  signUp: makeCommunicationReducer<
  NS.ISignUp,
  NS.ISignUpSuccess,
  NS.ISignUpFail
  >(
    'SIGN_UP',
    'SIGN_UP_SUCCESS',
    'SIGN_UP_FAIL',
    initial.communication.signUp,
  ),
  login: makeCommunicationReducer<
  NS.ILogin,
  NS.ILoginSuccess,
  NS.ILoginFail
  >(
    'LOGIN',
    'LOGIN_SUCCESS',
    'LOGIN_FAIL',
    initial.communication.login,
  ),
  restore: makeCommunicationReducer<
  NS.IRestore,
  NS.IRestoreSuccess,
  NS.IRestoreFail
  >(
    'RESTORE',
    'RESTORE_SUCCESS',
    'RESTORE_FAIL',
    initial.communication.restore,
  ),
  logout: makeCommunicationReducer<
  NS.ILogout,
  NS.ILogoutSuccess,
  NS.ILogoutFail
  >(
    'LOGOUT',
    'LOGOUT_SUCCESS',
    'LOGOUT_FAIL',
    initial.communication.logout,
  ),
  loginByService: makeCommunicationReducer<
  NS.ILoginByService,
  NS.ILoginSuccess,
  NS.ILoginFail
  >(
    'LOGIN_BY_SERVICE',
    'LOGIN_SUCCESS',
    'LOGIN_FAIL',
    initial.communication.loginByService,
  ),
});
