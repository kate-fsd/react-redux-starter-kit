import React from "react";
import block from "bem-cn";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withTranslation, ITranslationProps, tKeys } from "services/i18n";
import { Button } from "shared/view/elements";
import { IAppReduxState } from "shared/types/app";

import "./AuthorizationNav.scss";
import { autobind } from "core-decorators";

interface IStateProps {
  user: string;
}

type IProps = IStateProps & ITranslationProps;

function mapState(state: IAppReduxState): IStateProps {
  // !!!!!!!!!!!
  const user = state.authorization ? state.authorization.data.user : "";

  return {
    user,
  };
}

const b = block("authorization-nav");
const { authorization: intl } = tKeys.features;

class AuthorizationNavComponent extends React.PureComponent<IProps> {
  public render() {
    const isUserAuthorizated: boolean = !!this.props.user;

    return isUserAuthorizated
      ? this.renderAuthorizated()
      : this.renderNotAuthorizated();
  }

  @autobind
  private renderAuthorizated() {
    const { t, user } = this.props;

    return (
      <div className={b()}>
        <div className={b("user")}>User: {user}</div>

        <div className={b("button")}>
          <Link to="/authorization/signUp" className={b("roating-link")}>
            <Button type="button" variant="contained" size="small">
              {t(intl.buttonSignUp)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  @autobind
  private renderNotAuthorizated() {
    const { t } = this.props;

    return (
      <div className={b()}>
        <div className={b("button")}>
          <Link to="/authorization/login" className={b("roating-link")}>
            <Button type="button" variant="contained" size="small">
              {t(intl.buttonLogin)}
            </Button>
          </Link>
        </div>

        <div className={b("button")}>
          <Link to="/authorization/signUp" className={b("roating-link")}>
            <Button type="button" variant="contained" size="small">
              {t(intl.buttonSignUp)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const connectedComponent = connect(mapState)(AuthorizationNavComponent);
const AuthorizationNav = withTranslation()(connectedComponent);

export {
  AuthorizationNav,
  AuthorizationNavComponent,
  IProps as IAuthorizationNavProps,
};
