import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@core/api/hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { assertIsNonNullable } from '@utils/commonUtils';
import { UserAddressesFormProps } from '@pages/Profile/components/ProfileAddressesForm';
import { apiService } from '@core/api/api.service';

export const useSubmitAddAddress = () => {
  const { user, setUser } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<UserAddressesFormProps['onSubmitAdd']>(async (address) => {
    try {
      assertIsNonNullable(user, 'User data is not provided.');

      let updatedUser = await apiService.updateCustomer(user.version, {
        action: 'addAddress',
        address,
      });

      const index = updatedUser.addresses.length - 1;
      // Right id is provided by commerce tools, so when we just created address we use it's index in order to access right address in array.
      if (address.isShipping) {
        updatedUser = await apiService.updateCustomer(updatedUser.version, {
          action: 'addShippingAddressId',
          addressId: updatedUser.addresses[index].id,
        });
      }
      if (address.isBilling) {
        updatedUser = await apiService.updateCustomer(updatedUser.version, {
          action: 'addBillingAddressId',
          addressId: updatedUser.addresses[index].id,
        });
      }
      setUser(updatedUser);
      showMessage('Addresses successfully added');

      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
