import {
  AuthMiddlewareOptions,
  ExistingTokenMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { tokenCache } from '@core/api/token-cache.service';

export const {
  CTP_PROJECT_KEY: projectKey,
  CTP_CLIENT_ID: clientId,
  CTP_CLIENT_SECRET: clientSecret,
  CTP_SCOPES: scopes,
  CTP_AUTH_URL: authURL,
  CTP_API_URL: apiURL,
} = import.meta.env;

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: scopes.split(' '),
  tokenCache,
  fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = { host: apiURL, fetch };

export const existingTokenMiddlewareOptions: ExistingTokenMiddlewareOptions = { force: true };
