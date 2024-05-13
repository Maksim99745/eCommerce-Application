import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class TokenCacheService implements TokenCache {
  public get(): TokenStore {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  public set(cache: TokenStore) {
    localStorage.setItem('token', JSON.stringify(cache));
  }

  public clear() {
    localStorage.removeItem('token');
  }
}

export const tokenCache = new TokenCacheService();
