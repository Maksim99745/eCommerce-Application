import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { assertIsNonNullable } from '@utils/commonUtils';
import { apiService } from '@core/api/api.service';
import { NO_IDX } from '@core/validation/user-registration/user-registration.const';
import { DefaultAddressesFormComponentProps } from '../components/DefaultAddressesForm.compnent';

export const useSubmitDefaultAddresses = () => {
  const { user, setUser } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<DefaultAddressesFormComponentProps['onSubmitDefaultAddresses']>(async (data) => {
    try {
      assertIsNonNullable(user, 'User data is not provided.');

      const { defaultShippingAddressIdx, defaultBillingAddressIdx } = data;

      // We can delete default address by sending undefined instead of id.
      const currentDefaultShippingAddressId =
        defaultShippingAddressIdx === NO_IDX ? undefined : user.addresses[defaultShippingAddressIdx].id;

      let updatedUser = await apiService.updateCustomer(user.version, {
        action: 'setDefaultShippingAddress',
        addressId: currentDefaultShippingAddressId,
      });

      const currentDefaultBillingAddressId =
        defaultBillingAddressIdx === NO_IDX ? undefined : updatedUser.addresses[defaultBillingAddressIdx].id;

      updatedUser = await apiService.updateCustomer(updatedUser.version, {
        action: 'setDefaultBillingAddress',
        addressId: currentDefaultBillingAddressId,
      });

      setUser(updatedUser);
      showMessage('Default addresses successfully updated');

      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
