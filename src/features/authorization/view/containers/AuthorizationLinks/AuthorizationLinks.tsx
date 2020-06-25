import React from "react";
import block from "bem-cn";
import { connect } from "react-redux";
import { Form, FormRenderProps } from "react-final-form";
import { Link } from 'react-router-dom';
import { autobind } from "core-decorators";

import { withTranslation, ITranslationProps, tKeys } from "services/i18n";
import { TextInputField } from "shared/view/form";
import { Button } from "shared/view/elements";
import { IAppReduxState } from "shared/types/app";

import { ISignUpPayload } from "../../../namespace";
import { actionCreators, selectors } from "./../../../redux";

//import './AuthorizationLinks.scss';

interface IOwnProps {
  //onSubmit(values: ISignUpPayload): void;
}

interface IStateProps {
  //user: any;
}

type IActionProps = typeof mapDispatch;
type IProps = IOwnProps & IStateProps & IActionProps & ITranslationProps;

const mapDispatch = {
};

function mapState(state: IAppReduxState): IStateProps {
  return {
    //user: state.authorization.data.user
  };
}

const b = block("authorization-links");
const { authorization: intl } = tKeys.features;

//const helper = (<div>Подсказка</div>);

class AuthorizationLinksComponent extends React.PureComponent<IProps> {
  public render() {
    const { t } = this.props;

    return (
      <div className={b()}>
        <div className={b("user")}>User: {"user"}</div>

        <div className={b("button")}>
          <Link to="/authorization/login">
            <Button type="submit" variant="contained">
              {t(intl.buttonLogin)}
            </Button>
          </Link>
        </div>

        <div className={b("button")}>
          <Link to="/authorization/login">
            <Button type="submit" href="/authorization/signUp" variant="contained">
              {t(intl.buttonSignUp)}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const connectedComponent = connect(mapState, mapDispatch)(AuthorizationLinksComponent);
const AuthorizationLinks = withTranslation()(connectedComponent);

export { AuthorizationLinks, AuthorizationLinksComponent, IProps as IAuthorizationLinksProps };
