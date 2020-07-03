import * as NS from '../../namespace';
import { initial } from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.IAction): NS.IReduxState['data'] {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS': {
      const user: string = action.payload.user;
      return { ...state, user: user };
    }

    case 'LOGIN_SUCCESS': {
      const user: string = action.payload.user;
      return { ...state, user: user };
    }

    case 'LOGOUT_SUCCESS': {
      return { ...state, user: '' };
    }

    default:
      return state;
  }
}

export { dataReducer };