import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routes } from 'modules/routes';
import { IModule } from 'shared/types/app';

import { SignUpLayout } from './view/components';

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
        </Switch>
      </Route>
    );
  },
};

export { Authorization };