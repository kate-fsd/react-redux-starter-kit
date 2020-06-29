import React from "react";
import block from "bem-cn";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { autobind } from "core-decorators";

import { withTranslation, ITranslationProps, tKeys } from "services/i18n";
import { Button } from "shared/view/elements";

import { PasswordTextField } from "../../components/PasswordTextField/PasswordTextField";
import { PATTERNS } from "../../../constants";
import { ISignUpPayload } from "../../../namespace";
import { actionCreators } from "./../../../redux";
import "./SignUpCard.scss";
import { EmailTextField } from "../../components/EmailTextField/EmailTextField";
import { Checkbox } from '../../components';

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
  email: string;
  isEmailValid: boolean;
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
    },
    email: "",
    isEmailValid: false,
  };

  public render() {
    const { t } = this.props;
    const {
      passwordVerification,
      isSubmitFailed,
      isPasswordValid,
      isEmailValid,
    } = this.state;

    return (
      <form className={b()} onSubmit={this.handleSubmit}>
        <div className={b("login")}>
          <Link to="/authorization/login" className={b("login-link")}>
            {t(intl.login)}
          </Link>
        </div>

        <h2 className={b("title")}>{t(intl.signUp)}</h2>

        {/* <Socials></Socials> */}

        <div className={b("or")}>{t(intl.or)}</div>

        {/* <Button variant="outlined" onClick={AuthorizationApi.googleSignIn}>
            test
        </Button> */}

        {/* <div className={b("text-field")}>
          <TextInputField
            id="email"
            name="email"
            required={true}
            type="email"
            label={t(intl.email)}
            t={t}
          />
        </div> */}

        <div className={b("text-field")}>
          <EmailTextField
            onEmailChanged={this.handleEmailChange}
            isError={isSubmitFailed && !isEmailValid}
            error={t(intl.emailWarning)}
            value={this.state.email}
          />
        </div>

        <div className={b("text-field")}>
          <PasswordTextField
            hasHelpers={true}
            onPasswordChanged={this.handlePasswordChange}
            verification={passwordVerification}
            isError={isSubmitFailed && !isPasswordValid}
          />
        </div>

        <div className={b("button")}>
          <Button
            variant="contained"
            type="submit"
            onClick={this.handleButtonClick}
            className={b("test")}
          >
            {t(intl.buttonSignUp)}
          </Button>
        </div>

        <div className={b("terms-of-use-text")}>{t(intl.termsOfUseText)}</div>

        <div className={b("terms-of-use-link-wrap")}>
          (
          <a
            href="/term-of-use"
            className={b("terms-of-use-link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(intl.termsOfUse)}
          </a>
          )
        </div>

        <div className={b("mailing-checkbox")}>
          <Checkbox
           text={t(intl.mailing)}
           />
        </div>
      </form>
    );
  }

  @autobind
  public handlePasswordChange(password: string): void {
    this.setState({ ...this.state, password }, this.validatePassword);
  }

  @autobind
  public handleEmailChange(email: string): void {
    this.setState({ ...this.state, email }, this.validateEmail);
  }

  @autobind
  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const values: ISignUpPayload = {
      email: this.state.email,
      password: this.state.password,
    };
    if (!this.state.isSubmitFailed) {
      this.props.signUp(values);
      this.resetError();
    }
  }

  @autobind
  private handleButtonClick(): void {
    this.validatePassword();
    this.validateEmail();
    if (!this.state.isPasswordValid || !this.state.isEmailValid) {
      this.setState({ ...this.state, isSubmitFailed: true });
    }
  }

  @autobind
  private resetError(): void {
    this.setState({ ...this.state, isSubmitFailed: false });
  }

  @autobind
  private validatePassword(): void {
    const { LOWCASE_LETTER, UPPERCAES_LETTER, DIGIT, EIGHT_SIGNS } = PATTERNS;

    const password: string = this.state.password;
    const hasLowcaseLetter: boolean = LOWCASE_LETTER.test(password);
    const hasUppercaseLetter: boolean = UPPERCAES_LETTER.test(password);
    const hasDigit: boolean = DIGIT.test(password);
    const hasEightSigns: boolean = EIGHT_SIGNS.test(password);

    const isPasswordValid: boolean =
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
  private validateEmail(): void {
    const email = this.state.email;
    const isEmailValid: boolean = PATTERNS.EMAIL_SIGN.test(email);

    this.setState({
      ...this.state,
      isEmailValid,
    });
  }
}

const connectedComponent = connect(undefined, mapDispatch)(SignUpCardComponent);
const SignUpCard = withTranslation()(connectedComponent);

export { SignUpCard, SignUpCardComponent, IProps as ISignUpProps };
