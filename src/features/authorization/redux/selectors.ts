import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';

import * as NS from '../namespace';

function selectFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.authorization;
}

export function selectCommunication(
  state: IAppReduxState, name: keyof NS.IReduxState['communication'],
): ICommunication {
  return selectFeatureState(state).communication[name];
}