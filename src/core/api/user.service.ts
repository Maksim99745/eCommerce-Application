import { MyCustomerSignin } from '@commercetools/platform-sdk';
import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { tokenCache } from '@core/api/token-cache.service';
import { userLoadingSignal, userSignal } from '@core/signals/user.signal';

export class UserService {
  public static async login(customer: MyCustomerSignin): Promise<void> {
    userLoadingSignal.value = true;

    try {
      await apiService.login(customer);
      apiService.setBuilder(ClientType.password, { username: customer.email, password: customer.password });
      userSignal.value = await apiService.getCustomer();
    } catch (error) {
      userSignal.value = null;
      throw error;
    } finally {
      userLoadingSignal.value = false;
    }
  }

  public static logout(): void {
    tokenCache.clear();
    userSignal.value = null;
    apiService.setBuilder(ClientType.anonymous);
  }

  public static async register(customer: MyCustomerSignin): Promise<void> {
    userLoadingSignal.value = true;

    try {
      await apiService.register(customer);
      apiService.setBuilder(ClientType.password, { username: customer.email, password: customer.password });
      await apiService.login(customer);
      userSignal.value = await apiService.getCustomer();
    } catch (error) {
      userSignal.value = null;
      throw error;
    } finally {
      userLoadingSignal.value = false;
    }
  }
}
