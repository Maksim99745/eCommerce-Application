import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { assertIsNonNullable } from '@utils/commonUtils';
import { UserAddressesFormProps } from '@pages/Profile/components/ProfileAddressesForm';

export const useSubmitAddresses = () => {
  const { user } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<UserAddressesFormProps['onSubmit']>(async (_addresses) => {
    try {
      assertIsNonNullable(user, 'User data is not provided.');
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
