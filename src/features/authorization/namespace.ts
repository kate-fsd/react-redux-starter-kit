import { ICommunication, IPlainFailAction, IAction, IPlainAction } from 'shared/types/redux';
import { ILoginServices } from 'services/authorization/namespace'
export interface IReduxState {
  data: {
    user: string;
  };
  communication: {
    signUp: ICommunication;
    login: ICommunication;
    restore: ICommunication;
    logout: ICommunication;
    loginByService: ICommunication;
  };
}

export type ISignUpPayload = { email: string, password: string };
export type ISignUpSuccessPayload = { user: string };

export type ISignUp = IAction<'SIGN_UP', ISignUpPayload>;
export type ISignUpSuccess = IAction<'SIGN_UP_SUCCESS', ISignUpSuccessPayload>;
export type ISignUpFail = IPlainFailAction<'SIGN_UP_FAIL'>;


export type ILoginPayload = { email: string, password: string };
export type ILoginSuccessPayload = { user: string };

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


export type ILoginByServicePayload = { service: ILoginServices }

export type ILoginByService = IAction<'LOGIN_BY_SERVICE', ILoginByServicePayload>;


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
  | ILoginByService
  | ILogout
  | ILogoutSuccess
  | ILogoutFail