import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { PasswordFormComponentProps } from './Password.component';

export type NewPasswordRequestData = {
  version: number;
  currentPassword: string;
  newPassword: string;
};

export const useSubmitNewPasswordFormData = () => {
  const { user, login } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<PasswordFormComponentProps['onSubmit']>(async (data) => {
    try {
      if (!user) {
        throw new Error('User data is not provided.');
      }
      await apiService.changePassword({
        version: user.version,
        currentPassword: data.password,
        newPassword: data.newPassword,
      });
      login({ email: user.email, password: data.newPassword });
      showMessage('Password successfully updated');
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
