import { Stack, useEventCallback } from '@mui/material';
import useAuth from '@hooks/useAuth';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { useShowMessage } from '@hooks/useShowMessage';
import { apiService } from '@core/api/api.service';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent, { PersonalFormComponentProps } from './components/PersonalData.component';

function ProfilePage() {
  const { user, isUserLoading, setUser } = useAuth();
  const showMessage = useShowMessage();

  const handlePersonalFormData = useEventCallback<PersonalFormComponentProps['onSubmit']>(
    async (data) => {
      // TODO: find another action
      const updatedUser = await apiService.updateCustomer({ action: 'setFirstName', firstName: data.firstName });
      showMessage('Personal information successfully updated');
      await setUser(updatedUser);
    },
    // const updatedUser = apiServise.updateUser(data) and look at site about actions or relogi
    // take new user from updated user and passe in setUser
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
