import buildRouteTree from 'build-route-tree';

export const routes = buildRouteTree({
  authorization: {
    signUp: null,
    login: null,
    restore:  null,
  },
});