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
  user: {email: string}
}

function getSaga(deps: IDependencies) {
  const signUpType: NS.ISignUp['type'] = 'SIGN_UP';
  const LoginType: NS.ILogin['type'] = 'LOGIN';

  return function* saga(): SagaIterator {
    yield all([
      takeLatest(signUpType, executeSignUp, deps),
      takeLatest(LoginType, executeLogin, deps)
    ]);
  };
}

function* executeSignUp({ authorizationApi }: IDependencies, { payload }: NS.ISignUp) {
  try {
    const { email, password } = payload;
    const signUpResult: ISignUpResult = yield call(authorizationApi.signUp, email, password);

    yield put(actionCreators.signUpSuccess({ email: signUpResult.user.email }));

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

    yield put(actionCreators.loginSuccess({ email: loginResult.user.email }));

  } catch (error) {
    const errorMsg = getErrorMsg(error);

    yield put(actionCreators.loginFail(errorMsg));
    yield put(notificationActionCreators.setNotification({ kind: 'error', text: errorMsg }));
  }
}

export { getSaga };