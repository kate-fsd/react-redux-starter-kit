import React from "react";
import block from "bem-cn";
import { connect } from "react-redux";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { autobind } from "core-decorators";

import { withTranslation, ITranslationProps, tKeys } from "services/i18n";
import { IAppReduxState } from "shared/types/app";
import { Button } from "shared/view/elements";
import { routes } from "modules/routes";

import { ILoginPayload } from "../../../namespace";
import { actionCreators } from "../../../redux";
import { EmailTextField, PasswordTextField, ServicesButtons } from '../../components';

import "./LoginCard.scss";


type IState = {
  password: string;
  email: string;
};
type IStateProps = { user: string };
type IActionProps = typeof mapDispatch;
type IProps = IActionProps & ITranslationProps & IStateProps & RouteComponentProps;

const mapDispatch = {
  login: actionCreators.login,
  loginByService: actionCreators.loginByService,
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    user: state.authorization.data.user,
  };
}

const b = block("login-card");
const { authorization: intl } = tKeys.features;

class LoginCardComponent extends React.Component<IProps> {
  state: IState = {
    password: "",
    email: "",
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.user !== this.props.user && this.props.user !== "") {
      this.props.history.push('/');
    }
  }

  public render() {
    const { t } = this.props;

    return (
      <form className={b()} onSubmit={this.handleSubmit}>
        <div className={b("sign-up-routing")}>
          <Link
            to={routes.authorization.signUp.getRoutePath()}
            className={b("sign-up-link")}
          >
            {t(intl.signUp)}
          </Link>
        </div>

        <div className={b("services-buttons")}>
          <ServicesButtons loginByService={this.props.loginByService} />
        </div>

        <div className={b("or")}>{t(intl.or)}</div>

        <div className={b("text-field")}>
          <EmailTextField
            onEmailChanged={this.handleEmailChange}
            value={this.state.email}
          />
        </div>

        <div className={b("text-field")}>
          <PasswordTextField
            onPasswordChanged={this.handlePasswordChange}
          />
        </div>

        <div className={b("button")}>
          <Button type="submit" variant="outlined">
            {t(intl.buttonLogin)}
          </Button>
        </div>

        <div className={b("restore-routing")}>
          <Link
            to={routes.authorization.restore.getRoutePath()}
            className={b("restore-link")}
          >
            {t(intl.restore)}
          </Link>
        </div>
      </form>
    );
  }

  @autobind
  public handlePasswordChange(password: string): void {
    this.setState({ ...this.state, password });
  }

  @autobind
  public handleEmailChange(email: string): void {
    this.setState({ ...this.state, email });
  }

  @autobind
  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values: ILoginPayload = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(values);
  }
}

const connectedComponent = connect(mapState, mapDispatch)(LoginCardComponent);
const TransatedLoginCard = withTranslation()(connectedComponent);
const LoginCard = withRouter(TransatedLoginCard);

export { LoginCard, LoginCardComponent, IProps as ILoginProps };
