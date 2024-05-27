import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { PasswordFormComponentProps } from './Password.component';

export const useSubmitNewPassword = () => {
  const { user } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<PasswordFormComponentProps['onSubmit']>(async (data) => {
    if (!user) {
      return { success: false, error: new Error('User data is not provided.') };
    }

    try {
      const updatedUser = await apiService.changePassword(user.version, data.password, data.newPassword);
      await apiService.login({ email: updatedUser.email, password: data.newPassword });
      // setUser(updatedUser);
      showMessage('Password successfully updated');
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
