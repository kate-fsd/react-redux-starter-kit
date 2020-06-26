import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';

import { ISignUpPayload } from '../../../namespace';
import { actionCreators, selectors } from './../../../redux';
import './SignUpCard.scss';

interface IOwnProps {
  //onSubmit(values: ISignUpPayload): void;
}

interface IStateProps {
  isUserSigningUp: boolean;
  user: string;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  signUp: actionCreators.signUp,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUserSigningUp: selectors.selectCommunication(state, 'signUp').isRequesting,
    user: state.authorization.data.user,
  };
}

const b = block('sign-up-card');
const { authorization: intl } = tKeys.features;

//const helper = (<div>Подсказка</div>);

class SignUpCardComponent extends React.PureComponent<IProps> {
  public render() {
    return (
      <Form
        onSubmit={this.handleFormSubmit}
        render={this.renderForm}
        subscription={{}}
      />
    );
  }

  @autobind
  private handleFormSubmit(values: ISignUpPayload) {
    this.props.signUp(values);
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { t, user } = this.props;
    return (
      <form className={b()} onSubmit={handleSubmit}>
        {'state=' + user}

        <Link to='/authorization/login'>
          {t(intl.login)}
        </Link>

        <div className={b('text-input-field', 'email')}>
          <TextInputField
            id='email'
            name='email'
            required={true}
            type='email'
            label={t(intl.email)}
            t={t}
          />
        </div>

        <div className={b('text-input-field', 'email')}>
          <TextInputField
            id='password'
            name='password'
            required={true}
            type='password'
            label={t(intl.password)}
            helperText='Подсказка'
            t={t}
          />
        </div>

        <div className={b('button')}>
          <Button 
            variant="outlined" 
            type="submit"
          >
            {t(intl.buttonSignUp)}
          </Button>
        </div>
      </form>
    )
  }
}

const connectedComponent = connect(mapState, mapDispatch)(SignUpCardComponent);
const SignUpCard = withTranslation()(connectedComponent);

export { SignUpCard, SignUpCardComponent, IProps as ISignUpProps }
