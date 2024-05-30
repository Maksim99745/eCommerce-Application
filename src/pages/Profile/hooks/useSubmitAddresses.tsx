import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { assertIsNonNullable } from '@utils/commonUtils';
import { UserAddressesFormProps } from '@pages/Profile/components/ProfileAddressesForm';
import { apiService } from '@core/api/api.service';

export const useSubmitAddresses = () => {
  const { user } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<UserAddressesFormProps['onSubmit']>(async (action, address) => {
    try {
      assertIsNonNullable(user, 'User data is not provided.');
      if (action === 'remove') {
        await apiService.updateCustomer(user.version, { action: 'removeAddress', addressId: address.addressUID });
        showMessage('Addresses successfully deleted');
      }
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
