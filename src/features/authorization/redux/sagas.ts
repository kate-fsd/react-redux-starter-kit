import { put, call, all, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';
import { actionCreators as notificationActionCreators } from 'services/notification';

import * as NS from '../namespace';
import * as actionCreators from './actionCreators';

interface ISignUpResult {
  user: {email: string}
}

interface ILoginResult {
  user: {email: string, displayName: string}
}

function getSaga(deps: IDependencies) {
  const signUpType: NS.ISignUp['type'] = 'SIGN_UP';
  const LoginType: NS.ILogin['type'] = 'LOGIN';
  const RestoreType: NS.IRestore['type'] = 'RESTORE';
  const LogoutType: NS.ILogout['type'] = 'LOGOUT';
  const LoginByGoogleType: NS.ILoginByGoogle['type'] = 'LOGIN_BY_GOOGLE';

  return function* saga(): SagaIterator {
    yield all([
      takeLatest(signUpType, executeSignUp, deps),
      takeLatest(LoginType, executeLogin, deps),
      takeLatest(RestoreType, executeRestore, deps),
      takeLatest(LogoutType, executeLogout, deps),
      takeLatest(LoginByGoogleType, executeLoginByGoogle, deps)
    ]);
  };
}

function* executeSignUp({ authorizationApi }: IDependencies, { payload }: NS.ISignUp) {
  try {
    const { email, password } = payload;
    const signUpResult: ISignUpResult = yield call(authorizationApi.signUp, email, password);

    yield put(actionCreators.signUpSuccess({ user: signUpResult.user.email }));
    yield put(notificationActionCreators.setNotification({ kind: 'info', text: 'You successfully signed up!' }));

  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.signUpFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

function* executeLogin({ authorizationApi }: IDependencies, { payload }: NS.ILogin) {
  try {
    const { email, password } = payload;
    const loginResult: ILoginResult = yield call(authorizationApi.signIn, email, password);

    yield put(actionCreators.loginSuccess({ user: loginResult.user.email }));
    yield put(notificationActionCreators.setNotification({ kind: 'info', text: 'You successfully logged in!' }));

  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.loginFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

function* executeRestore({ authorizationApi }: IDependencies, { payload }: NS.IRestore) {
  try {
    const { email } = payload;

    yield call(authorizationApi.resetPassword, email);
    yield put(notificationActionCreators.setNotification({ kind: 'info', text: 'New password was sent to your mail' }));

  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.restoreFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

function* executeLogout({ authorizationApi }: IDependencies) {
  try {
    yield call(authorizationApi.signOut);
    yield put(actionCreators.logoutSuccess());
    yield put(notificationActionCreators.setNotification({ kind: 'info', text: 'You successfully logged out!' }));

  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.logoutFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

function* executeLoginByGoogle({ authorizationApi }: IDependencies) {
  try {
    const loginResult: ILoginResult = yield call(authorizationApi.signInByGoogle);

    yield put(actionCreators.loginSuccess({ user: loginResult.user.displayName }));
    yield put(notificationActionCreators.setNotification({ kind: 'info', text: 'You successfully logged in!' }));

  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.loginFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

export { getSaga };