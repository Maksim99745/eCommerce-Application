import { Stack, useEventCallback } from '@mui/material';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { useShowMessage } from '@hooks/useShowMessage';
import { apiService } from '@core/api/api.service';
import useAuth from '@hooks/useAuth';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent, { PersonalFormComponentProps } from './components/PersonalData.component';

function ProfilePage() {
  const { user, isUserLoading, setUser } = useAuth();
  const showMessage = useShowMessage();

  const handlePersonalFormData = useEventCallback<PersonalFormComponentProps['onSubmit']>(async (data) => {
    if (!user) {
      return { success: false, error: new Error('User data is not provided.') };
    }

    try {
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
      showMessage('Personal information successfully updated');
      return { success: true };
    } catch (error) {
      const errorMessage = createAppErrorMessage(error);
      showMessage(errorMessage, 'error');
      return { success: false, error: new Error(errorMessage) };
    }
  });

  if (!user) {
    return null;
  }

  if (isUserLoading) {
    return <PagePreloader />;
  }

  return (
    <Stack>
      <PersonalFormComponent onSubmit={handlePersonalFormData} userData={user} isLoading={isUserLoading} />
      <Addresses userData={user} />
    </Stack>
  );
}

export default ProfilePage;
