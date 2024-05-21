import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { tokenCache } from '@core/api/token-cache.service';
import useAuth from '@hooks/useAuth';
import useOnce from '@hooks/useOnce';

const useInitAuth = () => {
  const { setUser, setLoading } = useAuth();

  const loadCustomer = async () => {
    setLoading(true);

    apiService
      .getCustomer()
      .then((user) => setUser(user))
      .catch((error) => {
        if (error?.body?.error !== 'invalid_token') {
          setUser(null);
          return;
        }

        if (apiService.clientType !== ClientType.refreshToken && tokenCache.get()?.refreshToken) {
          apiService.setBuilder(ClientType.refreshToken);
          loadCustomer();
          return;
        }

        apiService.setBuilder(ClientType.anonymous);
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  useOnce(loadCustomer);
};

export default useInitAuth;
