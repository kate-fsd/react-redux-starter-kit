import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    user: string;
  };
  communication: {
    signUp: ICommunication;
    login: ICommunication;
    restore: ICommunication;
    logout: ICommunication;
    loginByGoogle: ICommunication;
  };
}

export type ISignUpPayload = { email: string, password: string };
export type ISignUpSuccessPayload = { email: string };

export type ISignUp = IAction<'SIGN_UP', ISignUpPayload>;
export type ISignUpSuccess = IAction<'SIGN_UP_SUCCESS', ISignUpSuccessPayload>;
export type ISignUpFail = IPlainFailAction<'SIGN_UP_FAIL'>;


export type ILoginPayload = { email: string, password: string };
export type ILoginSuccessPayload = { email: string };

export type ILogin = IAction<'LOGIN', ILoginPayload>;
export type ILoginSuccess = IAction<'LOGIN_SUCCESS', ILoginSuccessPayload>;
export type ILoginFail = IPlainFailAction<'LOGIN_FAIL'>;


export type IRestorePayload = { email: string };

export type IRestore = IAction<'RESTORE', IRestorePayload>;
export type IRestoreSuccess = IPlainAction<'RESTORE_SUCCESS'>;
export type IRestoreFail = IPlainFailAction<'RESTORE_FAIL'>;

export type ILogout = IPlainAction<'LOGOUT'>;
export type ILogoutSuccess = IPlainAction<'LOGOUT_SUCCESS'>;
export type ILogoutFail = IPlainFailAction<'LOGOUT_FAIL'>;


export type ILoginByGoogle = IPlainAction<'LOGIN_BY_GOOGLE'>;


export type IAction =
  | ISignUp
  | ISignUpSuccess
  | ISignUpFail
  | ILogin
  | ILoginSuccess
  | ILoginFail
  | IRestore
  | IRestoreSuccess
  | IRestoreFail
  | ILoginByGoogle
  | ILogout
  | ILogoutSuccess
  | ILogoutFail