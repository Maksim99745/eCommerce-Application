import { Customer, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { loadCart } from '@hooks/useCart';
import { signal } from '@preact/signals-react';

export const userSignal = signal<Customer | null | undefined>(undefined);
const isUserLoadingSignal = signal<boolean>(false);

export const setUserLoading = (isLoading: boolean) => {
  isUserLoadingSignal.value = isLoading;
};

export const setUser = (newUser: Customer | null | undefined) => {
  userSignal.value = newUser;
  setUserLoading(false);
  loadCart();
};

const login = async (customer: MyCustomerSignin): Promise<void> => {
  setUserLoading(true);
  try {
    apiService.setBuilder(ClientType.password, { username: customer.email, password: customer.password });
    await apiService.login(customer);
    const user = await apiService.getCustomer();
    setUser(user);
  } catch (error) {
    setUser(null);
    throw error;
  }
};

const logout = (): void => {
  apiService.setBuilder(ClientType.anonymous);
  setUser(null);
};

const register = async (draft: MyCustomerDraft): Promise<void> => {
  setUserLoading(true);
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
  }
};

const useAuth = () => ({
  user: userSignal.value,
  isUserLoading: isUserLoadingSignal.value,
  hasUser: !!userSignal.value && !isUserLoadingSignal.value,
  hasNoUser: !userSignal.value && !isUserLoadingSignal.value,
  setUser,
  setUserLoading,
  login,
  logout,
  register,
});

export default useAuth;
