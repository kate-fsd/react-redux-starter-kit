import React from "react";
import block from "bem-cn";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { autobind } from "core-decorators";
import { default as AccountCircleRoundedIcon } from "@material-ui/icons/AccountCircleRounded";

import {
  LanguageSelector,
  withTranslation,
  ITranslationProps,
  tKeys,
} from "services/i18n";
import { memoizeByProps } from "shared/helpers";
import { withAsyncFeatures } from "core";
import * as features from "features";
import { AuthorizationNav } from "features/authorization/view/containers";

import { routes } from "../../routes";
import {
  LayoutHeaderMenu,
  IHeaderMenuItem,
} from "./LayoutHeaderMenu/LayoutHeaderMenu";
import "./Layout.scss";
import { ClickAwayListener } from "@material-ui/core";

interface IOwnProps {
  title: string;
}

interface IState {
  isAuthNavOpen: boolean;
}

interface IFeatureProps {
  profileFeatureEntry: features.profile.Entry;
}

type IProps = IOwnProps &
  IFeatureProps &
  RouteComponentProps &
  ITranslationProps;

const b = block("layout");
const { header, footer } = tKeys.shared;

class LayoutComponent extends React.Component<IProps, IState> {
  public state: IState = {
    isAuthNavOpen: false,
  };

  public render() {
    const {
      children,
      title,
      profileFeatureEntry: { containers },
      location,
      t,
    } = this.props;
    const { ProfilePreview } = containers;
    const authNavClass: string = this.state.isAuthNavOpen
      ? b("authorization-nav", { open: true })
      : b("authorization-nav");

    return (
      <div className={b()}>
        <header className={b("header")}>
          <div className={b("header-content")}>
            <div className={b("left-menu")}>
              <LayoutHeaderMenu
                menuItems={this.getMenuItems()}
                activeItemPath={location.pathname}
              />
            </div>
            <div className={b("right-menu")}>
              <div
                className={b("authorization-icon")}
                onClick={this.handleAuthIconClick}
                onTouchEnd={this.handleAuthIconTouch}
              >
                <AccountCircleRoundedIcon />
              </div>

              <ClickAwayListener
                onClickAway={this.handleAuthNavClickAway}
                mouseEvent="onClick"
                touchEvent="onTouchEnd"
              >
                <div className={authNavClass}>
                  <AuthorizationNav />
                </div>
              </ClickAwayListener>

              <ProfilePreview onEditClick={this.handleEditProfileClick} />
              <div className={b("language-selector")}>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </header>
        <div className={b("content")}>
          <h1 className={b("title")}>{title}</h1>
          {children}
        </div>
        <footer className={b("footer")}>
          <div className={b("footer-content")}>
            <a
              className={b("company-link")}
              href="https://fullstack-development.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(footer.fsd)}
            </a>
          </div>
        </footer>
      </div>
    );
  }

  @memoizeByProps((props: IProps) => [props.t])
  private getMenuItems(): IHeaderMenuItem[] {
    const { t } = this.props;
    return [
      {
        path: routes.search.users.getRoutePath(),
        title: t(header.users),
      },
      {
        path: routes.search.repositories.getRoutePath(),
        title: t(header.repositories),
      },
    ];
  }

  @autobind
  private handleEditProfileClick() {
    const { history } = this.props;
    history.push(routes.profile.getRoutePath());
  }

  @autobind
  private handleAuthIconClick(e: React.MouseEvent<HTMLDivElement>) {
    this.toggleAuthNav(e);
  }

  @autobind
  private handleAuthIconTouch(e: React.TouchEvent<HTMLDivElement>) {
    this.toggleAuthNav(e);
  }

  @autobind
  private handleAuthNavClickAway() {
    this.setState({ isAuthNavOpen: false });
  }

  private toggleAuthNav(e: React.SyntheticEvent) {
    e.preventDefault();
    this.setState((prevState: IState) => ({
      isAuthNavOpen: !prevState.isAuthNavOpen,
    }));
  }
}

const wrappedComponent = withTranslation()(withRouter(LayoutComponent));
const Layout = withAsyncFeatures({
  profileFeatureEntry: features.profile.loadEntry,
})(wrappedComponent);

export { Layout, LayoutComponent, IProps as ILayoutProps };
