import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { assertIsNonNullable } from '@utils/commonUtils';
import { UserAddressesFormProps } from '@pages/Profile/components/ProfileAddressesForm';
import { apiService } from '@core/api/api.service';

export const useSubmitUpdateAddress = () => {
  const { user, setUser } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<UserAddressesFormProps['onSubmitUpdate']>(async (address) => {
    try {
      assertIsNonNullable(user, 'User data is not provided.');
      let updatedUser = await apiService.updateCustomer(user.version, {
        action: 'changeAddress',
        addressId: address.addressUID,
        address,
      });
      if (address.isShipping) {
        updatedUser = await apiService.updateCustomer(updatedUser.version, {
          action: 'addShippingAddressId',
          addressId: address.addressUID,
        });
      } else if (updatedUser.shippingAddressIds?.includes(address.addressUID)) {
        updatedUser = await apiService.updateCustomer(updatedUser.version, {
          action: 'removeShippingAddressId',
          addressId: address.addressUID,
        });
      }
      if (address.isBilling) {
        updatedUser = await apiService.updateCustomer(updatedUser.version, {
          action: 'addBillingAddressId',
          addressId: address.addressUID,
        });
      } else if (updatedUser.billingAddressIds?.includes(address.addressUID)) {
        updatedUser = await apiService.updateCustomer(updatedUser.version, {
          action: 'removeBillingAddressId',
          addressId: address.addressUID,
        });
      }
      showMessage('Addresses successfully updated');
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
