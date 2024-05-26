import { Stack, useEventCallback } from '@mui/material';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { useShowMessage } from '@hooks/useShowMessage';
import { apiService } from '@core/api/api.service';
import useAuth from '@hooks/useAuth';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent, { PersonalFormComponentProps } from './components/PersonalData.component';

function ProfilePage() {
  const { user, isUserLoading, setUser } = useAuth();
  const showMessage = useShowMessage();

  const handlePersonalFormData = useEventCallback<PersonalFormComponentProps['onSubmit']>(async (data) => {
    if (!user) {
      return null;
    }

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
    );
    showMessage('Personal information successfully updated');
    return setUser(updatedUser);
  });

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
