import { ICommunication, IPlainFailAction, IAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    user: string;
  };
  communication: {
    signUp: ICommunication;
  };
}

export type ISignUpPayload = { email: string, password: string };
export type ISignUpSuccessPayload = { email: string };

export type ISignUp = IAction<'SIGN_UP', ISignUpPayload>;
export type ISignUpSuccess = IAction<'SIGN_UP_SUCCESS', ISignUpSuccessPayload>;
export type ISignUpFail = IPlainFailAction<'SIGN_UP_FAIL'>;

export type IAction =
  | ISignUp
  | ISignUpSuccess
  | ISignUpFail;