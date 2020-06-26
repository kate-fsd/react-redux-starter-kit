import React from "react";
import block from "bem-cn";
import { connect } from "react-redux";
import { Form, FormRenderProps } from "react-final-form";
import { Link } from "react-router-dom";
import { autobind } from "core-decorators";

import { withTranslation, ITranslationProps, tKeys } from "services/i18n";
import { TextInputField } from "shared/view/form";
import { Button } from "shared/view/elements";

import { routes } from "modules/routes";
import { ILoginPayload } from "../../../namespace";
import { actionCreators } from "../../../redux";
import "./LoginCard.scss";


type IActionProps = typeof mapDispatch;
type IProps = IActionProps & ITranslationProps;

const mapDispatch = {
  login: actionCreators.login,
};

const b = block("login-card");
const { authorization: intl } = tKeys.features;


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
        <div className={b("sign-up")}>
          <Link
            to={routes.authorization.signUp.getRoutePath()}
            className={b("sign-up-link")}
          >
            {t(intl.signUp)}
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
          <TextInputField
            id="password"
            name="password"
            required={true}
            type="password"
            label={t(intl.password)}
            t={t}
          />
        </div>

        <div className={b("button")}>
          <Button variant="outlined" type="submit" >
            {t(intl.buttonLogin)}
          </Button>
        </div>

        <div className={b("restore")}>
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
}

const connectedComponent = connect(undefined, mapDispatch)(LoginCardComponent);
const LoginCard = withTranslation()(connectedComponent);

export { LoginCard, LoginCardComponent, IProps as ILoginProps };
