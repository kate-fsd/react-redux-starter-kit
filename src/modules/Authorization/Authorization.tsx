import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'modules/routes';
import { IModule } from 'shared/types/app';

import { SignUpLayout, LoginLayout } from './view/components';

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
        </Switch>
      </Route>
    );
  },
};

export { Authorization };