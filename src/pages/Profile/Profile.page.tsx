import { Stack, useEventCallback } from '@mui/material';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { useShowMessage } from '@hooks/useShowMessage';
import { apiService } from '@core/api/api.service';
import useAuth from '@hooks/useAuth';
import { PersonalInformationForm } from '@models/forms.model';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent, { PersonalFormComponentProps } from './components/PersonalData.component';

function ProfilePage() {
  const { user, isUserLoading, setUser } = useAuth();
  const showMessage = useShowMessage();

  const handlePersonalFormData = useEventCallback<PersonalFormComponentProps['onSubmit']>(
    async (data: PersonalInformationForm): Promise<void> => {
      if (user) {
        try {
          const updatedUser = await apiService.updateCustomer(
            user?.version,
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
          await setUser(updatedUser);
          await showMessage('Personal information successfully updated');
        } catch (error) {
          if (error instanceof Error) {
            showMessage(error.message ?? 'An unexpected error occurred', 'error');
          }
        }
      }
    },
  );

  if (!user) {
    return null;
  }

  if (isUserLoading) {
    return <PagePreloader />;
  }

  return (
    <Stack>
      <PersonalFormComponent onSubmit={handlePersonalFormData} userData={user} />
      <Addresses userData={user} />
    </Stack>
  );
}

export default ProfilePage;
