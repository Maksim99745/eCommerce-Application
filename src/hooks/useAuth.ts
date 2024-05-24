import { Customer, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { signal } from '@preact/signals-react';

export const userSignal = signal<Customer | null | undefined>(undefined);
const isUserLoadingSignal = signal<boolean>(false);

export const setUser = (newUser: Customer | null | undefined) => {
  userSignal.value = newUser;
};

export const setLoading = (isLoading: boolean) => {
  isUserLoadingSignal.value = isLoading;
};

const login = async (customer: MyCustomerSignin): Promise<void> => {
  setLoading(true);
  try {
    await apiService.login(customer);
    apiService.setBuilder(ClientType.password, { username: customer.email, password: customer.password });
    const user = await apiService.getCustomer();
    setUser(user);
  } catch (error) {
    setUser(null);
    throw error;
  } finally {
    setLoading(false);
  }
};

const logout = (): void => {
  setUser(null);
  apiService.setBuilder(ClientType.anonymous);
};

const register = async (draft: MyCustomerDraft): Promise<void> => {
  setLoading(true);
  const { email, password } = draft;
  try {
    await apiService.register(draft);
    apiService.setBuilder(ClientType.password, { username: email, password });
    await apiService.login({ email, password });
    const user = await apiService.getCustomer();
    setUser(user);
  } catch (error) {
    setUser(null);
    throw error;
  } finally {
    setLoading(false);
  }
};

const useAuth = () => ({
  user: userSignal.value,
  isUserLoading: isUserLoadingSignal.value,
  hasUser: !!userSignal.value && !isUserLoadingSignal.value,
  hasNoUser: !userSignal.value && !isUserLoadingSignal.value,
  setUser,
  setLoading,
  login,
  logout,
  register,
});

export default useAuth;
