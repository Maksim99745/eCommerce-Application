import { Customer, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { tokenCache } from '@core/api/token-cache.service';
import { signal } from '@preact/signals-react';

const userSignal = signal<Customer | null>(null);
const isUserLoadingSignal = signal<boolean>(false);

const setUser = (newUser: Customer | null) => {
  userSignal.value = newUser;
};

const setLoading = (isLoading: boolean) => {
  isUserLoadingSignal.value = isLoading;
};

const login = async (customer: MyCustomerSignin): Promise<{ success: boolean; error?: unknown }> => {
  setLoading(true);
  try {
    await apiService.login(customer);
    apiService.setBuilder(ClientType.password, { username: customer.email, password: customer.password });
    const user = await apiService.getCustomer();
    setUser(user);
    return { success: true };
  } catch (error) {
    setUser(null);
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};

const logout = (): void => {
  tokenCache.clear();
  setUser(null);
  apiService.setBuilder(ClientType.anonymous);
};

const register = async (draft: MyCustomerDraft): Promise<{ success: boolean; error?: unknown }> => {
  setLoading(true);
  const { email, password } = draft;
  try {
    await apiService.register(draft);
    apiService.setBuilder(ClientType.password, { username: email, password });
    await apiService.login({ email, password });
    setUser(await apiService.getCustomer());
    return { success: true };
  } catch (error) {
    setUser(null);
    return { success: false, error };
  } finally {
    setLoading(false);
  }
};

const useAuth = () => ({
  user: userSignal.value,
  isUserLoading: isUserLoadingSignal.value,
  hasUser: !!userSignal.value && !isUserLoadingSignal.value,
  setUser,
  setLoading,
  login,
  logout,
  register,
});

export default useAuth;
