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

import { routes } from 'modules/routes';
import { ILoginPayload } from '../../../namespace';
import { actionCreators, selectors } from '../../../redux';

//import './LoginCard.scss';

interface IOwnProps {
  //onSubmit(values: ILoginPayload): void;
}

interface IStateProps {
  //isUserSigningUp: boolean;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
  login: actionCreators.login,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    isUserSigningUp: selectors.selectCommunication(state, 'login').isRequesting,
  };
}

const b = block('sign-up-card');
const { authorization: intl } = tKeys.features;

//const helper = (<div>Подсказка</div>);

class LoginCardComponent extends React.PureComponent<IProps> {
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
  private handleFormSubmit(values: ILoginPayload) {
    this.props.login(values);
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { t } = this.props;
    return (
      <form className={b()} onSubmit={handleSubmit}>

        <div className={b('link', 'signUp')}>
          <Link to={routes.authorization.signUp.getRoutePath()}>
            {t(intl.signUp)}
          </Link>
        </div>

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
            t={t}
          />
        </div>

        <div className={b('button')}>
          <Button 
            variant="outlined" 
            type="submit"
          >
            {t(intl.buttonLogin)}
          </Button>
        </div>

        <div className={b('link', 'restore')}>
          <Link to={routes.authorization.restore.getRoutePath()}>
            {t(intl.restorePassword)}
          </Link>
        </div>

      </form>
    )
  }
}

const connectedComponent = connect(mapState, mapDispatch)(LoginCardComponent);
const LoginCard = withTranslation()(connectedComponent);

export { LoginCard, LoginCardComponent, IProps as ILoginProps }
