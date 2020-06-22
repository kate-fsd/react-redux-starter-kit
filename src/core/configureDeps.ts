import { IDependencies } from 'shared/types/app';
import { Api } from 'services/api/Api';
import { AuthorizationApi } from 'services/authorization/Autorization';

export function configureDeps(): IDependencies {
  const api = new Api();
  const authorizationApi = new AuthorizationApi();

  return { api, authorizationApi };
}
