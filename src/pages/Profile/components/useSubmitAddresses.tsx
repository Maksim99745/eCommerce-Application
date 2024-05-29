import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { UserAddressesFormProps } from './ProfileAddressesForm';

export type AddressesRequestData = {
  version: number;
  currentPassword: string;
  newPassword: string;
};

export const useSubmitAddresses = () => {
  const { user } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<UserAddressesFormProps['onSubmit']>(async (_addresses) => {
    if (!user) {
      return { success: false, error: new Error('User data is not provided.') };
    }
    try {
      // console.log('~~~~ addresses-form-data: ', addresses);
      showMessage('Addresses successfully updated');
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
