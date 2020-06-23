import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { autobind } from 'core-decorators';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { TextInputField, NumberInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';
import { IProfile } from 'shared/types/models';
import { actionCreators as notificationActionCreators } from 'services/notification';
// import {
//   fieldNames, validateName, validateNickname, validateBio,
// } from './constants';
//import { ProfileAvatar } from '../../components';
import { ISignUp, ISignUpPayload } from '../../../namespace';
import { actionCreators, selectors } from './../../../redux';

//import './SignUpCard.scss';

interface IOwnProps {
  //onSubmit(values: ISignUpPayload): void;
}

interface IStateProps {
  isUserSigningUp: boolean;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  signUp: actionCreators.signUp,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUserSigningUp: selectors.selectCommunication(state, 'signUp').isRequesting,
  };
}

const b = block('sign-up-card');
const { authorization: intl } = tKeys.features;

class SignUpCardComponent extends React.PureComponent<IProps> {
  public render() {
    const { isUserSigningUp, t } = this.props;

    return (
      <form  onSubmit={this.handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <div className={b('button')}>
          <Button variant="outlined" type="submit">{t(tKeys.features.authorization.buttonSignUp)}</Button>
        </div>
      </form>
    );
  }

  @autobind
  private handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    this.props.signUp({email: 'test@test.ru', password: 'YTRYTbvnvgv3244!!'});
  }
}

const connectedComponent = connect(mapState, mapDispatch)(SignUpCardComponent);
const SignUpCard = withTranslation()(connectedComponent);

export { SignUpCard, SignUpCardComponent, IProps as ISignUpProps }