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

type IActionProps = typeof mapDispatch;
type IProps = IActionProps & ITranslationProps;

const mapDispatch = {
  signUp: actionCreators.signUp,
};

const b = block("sign-up-card");
const { authorization: intl } = tKeys.features;

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
    const { t } = this.props;
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
          <TextInputField
            id="password"
            name="password"
            required={true}
            type="password"
            label={t(intl.password)}
            helperText="Подсказка"
            t={t}
          />
        </div>

        <div className={b("button")}>
          <Button variant="outlined" type="submit">
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
