import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { assertIsNonNullable } from '@utils/commonUtils';
import { UserAddressesFormProps } from '@pages/Profile/components/ProfileAddressesForm';
import { apiService } from '@core/api/api.service';

export const useSubmitAddresses = () => {
  const { user, setUser } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<UserAddressesFormProps['onSubmit']>(async (action, address) => {
    try {
      assertIsNonNullable(user, 'User data is not provided.');
      if (action === 'remove') {
        const updatedUser = await apiService.updateCustomer(user.version, {
          action: 'removeAddress',
          addressId: address.addressUID,
        });
        setUser(updatedUser);
        showMessage('Addresses successfully deleted');
      } else if (action === 'add') {
        let updatedUser = await apiService.updateCustomer(user.version, {
          action: 'addAddress',
          address,
        });
        if (address.isShipping) {
          updatedUser = await apiService.updateCustomer(user.version, {
            action: 'addShippingAddressId',
            addressId: address.addressUID,
          });
        }
        if (address.isBilling) {
          updatedUser = await apiService.updateCustomer(user.version, {
            action: 'addBillingAddressId',
            addressId: address.addressUID,
          });
        }
        setUser(updatedUser);
        showMessage('Addresses successfully added');
      } else if (action === 'update') {
        // eslint-disable-next-line no-param-reassign
        address.id = address.addressUID;
        const updatedUser = await apiService.updateCustomer(user.version, {
          action: 'changeAddress',
          addressId: address.addressUID,
          address,
        });
        // TODO: special method for checking if this field chandeg
        // if (!address.isBilling) {
        //   updatedUser = await apiService.updateCustomer(user.version, {
        //     action: 'removeBillingAddressId',
        //     addressId: address.id,
        //   });
        // }
        // if (!address.isShipping) {
        //   updatedUser = await apiService.updateCustomer(user.version, {
        //     action: 'removeShippingAddressId',
        //     addressId: address.id,
        //   });
        // }
        showMessage('Addresses successfully updated');
        setUser(updatedUser);
      }
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
