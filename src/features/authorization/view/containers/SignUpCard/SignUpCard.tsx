import React from "react";
import block from "bem-cn";
import { connect } from "react-redux";
import { Form, FormRenderProps } from "react-final-form";
import { Link } from "react-router-dom";
import { autobind } from "core-decorators";

import { withTranslation, ITranslationProps, tKeys } from "services/i18n";
import { TextInputField } from "shared/view/form";
import { Button } from "shared/view/elements";

import { ISignUpPayload } from "../../../namespace";
import { actionCreators } from "./../../../redux";
import "./SignUpCard.scss";
import { PasswordTextField } from "../../components/PasswordTextField/PasswordTextField";
import { PATTERNS } from "features/authorization/constants";

type IState = {
  isSubmitFailed: boolean;
  password: string;
  isPasswordValid: boolean;
  passwordVerification: {
    hasLowcaseLetter: boolean;
    hasUppercaseLetter: boolean;
    hasDigit: boolean;
    hasEightSigns: boolean;
  };
};
type IActionProps = typeof mapDispatch;
type IProps = IState & IActionProps & ITranslationProps;

const mapDispatch = {
  signUp: actionCreators.signUp,
};

const b = block("sign-up-card");
const { authorization: intl } = tKeys.features;

class SignUpCardComponent extends React.Component<IProps> {
  state: IState = {
    isSubmitFailed: false,
    password: "",
    isPasswordValid: false,
    passwordVerification: {
      hasLowcaseLetter: false,
      hasUppercaseLetter: false,
      hasDigit: false,
      hasEightSigns: false,
    }
  };

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
  public handlePasswordChange(password: string): void {
    this.setState({ ...this.state, password: password }, this.validatePassword);
  }

  @autobind
  public handleEmailChange(email: string): void {
    this.setState({ ...this.state, email });
  }

  @autobind
  private handleFormSubmit(values: ISignUpPayload) {
    if (!this.state.isSubmitFailed) {
      this.props.signUp(values);
      this.resetError();
    }
  }

  @autobind
  private handleButtonClick() {
    this.validatePassword();
    if (!this.state.isPasswordValid) {
      this.setState({...this.state, isSubmitFailed: true});
    }
  }

  @autobind
  private resetError() {
    this.setState({...this.state, isSubmitFailed: false});
  }

  @autobind
  private validatePassword() {
    const {
      LOWCASE_LETTER,
      UPPERCAES_LETTER,
      DIGIT,
      EIGHT_SIGNS,
    } = PATTERNS;

    const password = this.state.password;
    const hasLowcaseLetter = LOWCASE_LETTER.test(password);
    const hasUppercaseLetter = UPPERCAES_LETTER.test(password);
    const hasDigit = DIGIT.test(password);
    const hasEightSigns = EIGHT_SIGNS.test(password);

    const isPasswordValid =
      hasLowcaseLetter && hasUppercaseLetter && hasDigit && hasEightSigns;

    this.setState({
      ...this.state,
      passwordVerification: {
        hasLowcaseLetter,
        hasUppercaseLetter,
        hasDigit,
        hasEightSigns,
      },
      isPasswordValid,
    });
  }

  @autobind
  private renderForm({ handleSubmit }: FormRenderProps) {
    const { t } = this.props;
    const { passwordVerification } = this.state;
    return (
      <form className={b()} onSubmit={handleSubmit}>
        <div className={b("login")}>
          <Link to="/authorization/login" className={b("login-link")}>
            {t(intl.login)}
          </Link>
        </div>

        <div className={b("text-field")}>
          <TextInputField
            id="email"
            name="email"
            required={true}
            type="email"
            label={t(intl.email)}
            t={t}
          />
        </div>

        <div className={b("text-field")}>
          <PasswordTextField
            test="test"
            hasHelpers={true}
            onPasswordChanged={this.handlePasswordChange}
            verification={passwordVerification}
            isError={this.state.isSubmitFailed}
          />
        </div>

        <div className={b("button")}>
          <Button variant="outlined" type="submit" onClick={this.handleButtonClick}>
            {t(intl.buttonSignUp)}
          </Button>
        </div>
      </form>
    );
  }
}

const connectedComponent = connect(undefined, mapDispatch)(SignUpCardComponent);
const SignUpCard = withTranslation()(connectedComponent);

export { SignUpCard, SignUpCardComponent, IProps as ISignUpProps };
