import { ClientBuilder, type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const {
  CTP_PROJECT_KEY: projectKey,
  CTP_CLIENT_ID: clientID,
  CTP_CLIENT_SECRET: clientSecret,
  CTP_SCOPES: scopes,
  CTP_AUTH_URL: authURL,
  CTP_API_URL: apiURL,
} = import.meta.env;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey,
  credentials: {
    clientId: clientID,
    clientSecret,
  },
  scopes: scopes.split(','),
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withHttpMiddleware({ host: apiURL, fetch })
  .withClientCredentialsFlow(authMiddlewareOptions)
  .build();

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

export default apiRoot;
