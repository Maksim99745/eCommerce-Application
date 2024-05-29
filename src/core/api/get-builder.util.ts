import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, UserAuthOptions } from '@commercetools/sdk-client-v2';
import { ClientType } from '@core/api/client-type.enum';
import {
  getAnonymousClient,
  getPasswordClient,
  getRefreshTokenClient,
  getTokenClient,
} from '@core/api/client-builders.util';

const { CTP_PROJECT_KEY: projectKey } = import.meta.env;

export const getRequestBuilder = (type: ClientType, user?: UserAuthOptions): ByProjectKeyRequestBuilder => {
  let client: Client;

  switch (type) {
    case ClientType.anonymous:
      client = getAnonymousClient();
      break;
    case ClientType.token:
      client = getTokenClient();
      break;
    case ClientType.refreshToken:
      client = getRefreshTokenClient();
      break;
    case ClientType.password:
      if (!user) {
        throw new Error('User is required for password client');
      }
      client = getPasswordClient(user);
      break;
    default:
      throw new Error('Client type not supported');
  }

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
