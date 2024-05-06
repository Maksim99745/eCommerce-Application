import { ClientBuilder, type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = import.meta.env.CTP_PROJECT_KEY as string;
const clientID = import.meta.env.CTP_CLIENT_ID as string;
const clientSecret = import.meta.env.CTP_CLIENT_SECRET as string;
const scopes = import.meta.env.CTP_SCOPES as string;
const authURL = import.meta.env.CTP_AUTH_URL as string;
const apiURL = import.meta.env.CTP_API_URL as string;

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
