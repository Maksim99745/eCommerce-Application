import { Customer, CustomerSignin, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { tokenCache } from '@core/api/token-cache.service';
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

export const AuthContext = createContext<{
  user: Customer | null;
  login: (customer: MyCustomerSignin) => Promise<void>;
  logout: () => void;
  register: (customer: MyCustomerDraft) => Promise<void>;
  isLoading: boolean;
}>({ user: null, login: async () => {}, logout: () => {}, register: async () => {}, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoadingUser] = useState<boolean>(true);

  const login = useCallback(async (customer: CustomerSignin): Promise<void> => {
    setIsLoadingUser(true);

    try {
      await apiService.login(customer);
      apiService.setBuilder(ClientType.password, { username: customer.email, password: customer.password });
      setUser(await apiService.getCustomer());
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    tokenCache.clear();
    apiService.setBuilder(ClientType.anonymous);
  }, []);

  const register = useCallback(
    async (customer: CustomerSignin): Promise<void> => {
      setIsLoadingUser(true);
      await apiService.register(customer);
      tokenCache.clear();
      await login(customer);
    },
    [login],
  );

  useSWR('customer', async () => {
    setIsLoadingUser(true);

    try {
      setUser(await apiService.getCustomer());
    } catch {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  });

  const authProviderValue = useMemo(
    () => ({ user, login, logout, register, isLoading }),
    [user, login, logout, register, isLoading],
  );

  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>;
}
