import * as NS from '../../namespace';
import { initial } from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS': {
      const email = action.payload.email;
      return { ...state, user: email };
    }

    case 'LOGIN_SUCCESS': {
      const email = action.payload.email;
      return { ...state, user: email };
    }

    case 'LOGOUT_SUCCESS': {
      return { ...state, user: '' };
    }

    default:
      return state;
  }
}

export { dataReducer };