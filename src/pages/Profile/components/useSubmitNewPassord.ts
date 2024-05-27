import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import useAuth from '@hooks/useAuth';
import { useShowMessage } from '@hooks/useShowMessage';
import { useEventCallback } from '@mui/material';
import { apiService } from '@core/api/api.service';
import { PersonalFormComponentProps } from './PersonalData.component';

export const useSubmitNewPassword = () => {
  const { user, setUser } = useAuth();
  const showMessage = useShowMessage();

  return useEventCallback<PersonalFormComponentProps['onSubmit']>(async (data) => {
    if (!user) {
      return { success: false, error: new Error('User data is not provided.') };
    }

    try {
      // const newPasswordRequestData = {
      //   id: user.id,
      //   version: user.version,
      //   currentPassword: data.password,
      //   newPassword: data.newPassword,
      // };
      // setUser(updatedUser);
      const updatedUser = await apiService.updateCustomer(
        user.version,
        {
          action: 'setFirstName',
          firstName: data.firstName,
        },
        {
          action: 'setLastName',
          lastName: data.lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: data.dateOfBirth,
        },
        { action: 'changeEmail', email: data.email },
      );
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
