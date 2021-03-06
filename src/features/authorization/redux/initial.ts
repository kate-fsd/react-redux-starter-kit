import { initialCommunicationField } from 'shared/constants';

import { IReduxState } from '../namespace';

const initial: IReduxState = {
  data: {
    user: ''
  },
  communication: {
    signUp: initialCommunicationField,
    login: initialCommunicationField,
    restore: initialCommunicationField,
    logout: initialCommunicationField,
    loginByService: initialCommunicationField,
  }
};

export { initial };