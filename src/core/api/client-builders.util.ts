import { Client, ClientBuilder, UserAuthOptions } from '@commercetools/sdk-client-v2';
import {
  authMiddlewareOptions,
  clientId,
  clientSecret,
  existingTokenMiddlewareOptions,
  httpMiddlewareOptions,
} from '@core/api/client-options.const';
import { tokenCache } from '@core/api/token-cache.service';

const getClient = (builder: ClientBuilder): Client => builder.withHttpMiddleware(httpMiddlewareOptions).build();

export const getAnonymousClient = (): Client => {
  tokenCache.clear();
  const builder = new ClientBuilder().withAnonymousSessionFlow(authMiddlewareOptions);

  return getClient(builder);
};

export const getTokenClient = (): Client => {
  const authorization = `Bearer ${tokenCache.get().token}`;
  const builder = new ClientBuilder().withExistingTokenFlow(authorization, existingTokenMiddlewareOptions);

  return getClient(builder);
};

export const getRefreshTokenClient = (): Client => {
  const { refreshToken } = tokenCache.get();

  if (!refreshToken) {
    return getAnonymousClient();
  }

  tokenCache.clear();
  const builder = new ClientBuilder().withRefreshTokenFlow({ ...authMiddlewareOptions, refreshToken });

  return getClient(builder);
};

export const getPasswordClient = (user: UserAuthOptions): Client => {
  const credentials = { clientId, clientSecret, user };
  tokenCache.clear();
  const builder = new ClientBuilder().withPasswordFlow({ ...authMiddlewareOptions, credentials });

  return getClient(builder);
};
