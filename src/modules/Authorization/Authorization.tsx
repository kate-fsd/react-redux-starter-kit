import React from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "modules/routes";
import { IModule } from "shared/types/app";

import { SignUpLayout, LoginLayout, RestoreLayout } from "./view/components";

const Authorization: IModule = {
  getRoutes() {
    return (
      <Route
        key={routes.authorization.getElementKey()}
        path={routes.authorization.getRoutePath()}
      >
        <Switch>
          <Route
            key={routes.authorization.signUp.getElementKey()}
            path={routes.authorization.signUp.getRoutePath()}
            component={SignUpLayout}
          />

          <Route
            key={routes.authorization.login.getElementKey()}
            path={routes.authorization.login.getRoutePath()}
            component={LoginLayout}
          />

          <Route
            key={routes.authorization.restore.getElementKey()}
            path={routes.authorization.restore.getRoutePath()}
            component={RestoreLayout}
          />
        </Switch>
      </Route>
    );
  },
};

export { Authorization };
