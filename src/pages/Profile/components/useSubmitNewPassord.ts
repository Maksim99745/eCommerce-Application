import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { PasswordFormComponentProps } from './Password.component';

export const useSubmitNewPassword = () => {
  const { user } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<PasswordFormComponentProps['onSubmit']>(async (data) => {
    if (!user) {
      return { success: false, error: new Error('User data is not provided.') };
    }

    try {
      // const newPasswordRequestData: CustomerChangePassword = {
      //   id: user.id,
      //   version: user.version,
      //   currentPassword: data.password,
      //   newPassword: data.newPassword,
      // };
      // const updatedUser = await apiService.updatePassword(newPasswordRequestData);
      // const updatedUser = await apiService.updateCustomer(
      //   user.version,
      //   {
      //     action: 'setFirstName',
      //     firstName: data.firstName,
      //   },
      //   {
      //     action: "",
      //     lastName: data.lastName,
      //   },
      // );
      // setUser(updatedUser);
      showMessage(data.password);
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
