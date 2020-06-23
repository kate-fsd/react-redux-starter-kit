import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { autobind } from 'core-decorators';

import { withTranslation, ITranslationProps, tKeys } from 'services/i18n';
import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';

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

const helper = (<div>Подсказка</div>);

class SignUpCardComponent extends React.PureComponent<IProps> {
  public render() {
    const { isUserSigningUp, t } = this.props;

    return (
      <Form
        onSubmit={this.handleFormSubmit}
        render={this.renderForm}
        subscription={{}}
      />
      // <form className={b()} onSubmit={this.handleSubmit}>
      //   <div className={b('email')}>
      //     <TextInputField
      //       name='test'
      //       required={true}
      //       type='email'
      //       label='Email'
      //       //helperText={helper}
      //       t={t}
      //     />
      //   </div>
      //   <label>
      //     Password
      //     <input name="password" type="password" placeholder="Password" />
      //   </label>
      //   <div className={b('button')}>
      //     <Button 
      //       variant="outlined" 
      //       type="submit">
      //       {t(tKeys.features.authorization.buttonSignUp)}
      //     </Button>
      //   </div>
      // </form>
    );
  }

  // @autobind
  // private handleSubmit(event: React.SyntheticEvent) {
  //   //event.preventDefault();
  //   this.props.signUp({email: 'test@test.ru', password: 'YTRYTbvnvgv3244!!'});
  // }

  @autobind
  private handleFormSubmit(values: ISignUpPayload) {
    console.log(values);
    //event.preventDefault();
    //this.props.signUp(values);
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { t } = this.props;
    return (
      <form className={b()} onSubmit={handleSubmit}>
        <div className={b('text-input-field', 'email')}>
          <TextInputField
            name='email'
            required={true}
            type='email'
            label='Email'
            t={t}
          />
        </div>

        <div className={b('text-input-field', 'email')}>
          <TextInputField
            name='password'
            required={true}
            type='password'
            label='Password'
            //helperText={helper}
            t={t}
          />
        </div>

        <div className={b('button')}>
          <Button 
            variant="outlined" 
            type="submit"
          >
            {t(tKeys.features.authorization.buttonSignUp)}
          </Button>
        </div>
      </form>
    )
  }
}

const connectedComponent = connect(mapState, mapDispatch)(SignUpCardComponent);
const SignUpCard = withTranslation()(connectedComponent);

export { SignUpCard, SignUpCardComponent, IProps as ISignUpProps }