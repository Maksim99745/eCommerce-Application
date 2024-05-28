import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { ClientType } from '@core/api/client-type.enum';
import { PasswordFormComponentProps } from './Password.component';

export type NewPasswordRequestData = {
  version: number;
  currentPassword: string;
  newPassword: string;
};

export const useSubmitNewPassword = () => {
  const { user, setUser } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<PasswordFormComponentProps['onSubmit']>(async (data) => {
    if (!user) {
      return { success: false, error: new Error('User data is not provided.') };
    }

    const newPasswordData: NewPasswordRequestData = {
      version: user.version,
      currentPassword: data.password,
      newPassword: data.newPassword,
    };

    try {
      const updatedUser = await apiService.changePassword(newPasswordData);
      apiService.setBuilder(ClientType.password, { username: user.email, password: data.newPassword });
      setUser(updatedUser);
      showMessage('Password successfully updated');
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });
};
