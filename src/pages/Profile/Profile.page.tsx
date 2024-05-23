import { Stack, useEventCallback } from '@mui/material';
import useAuth from '@hooks/useAuth';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent, { PersonalFormComponentProps } from './components/PersonalData.component';

function ProfilePage() {
  const { user, isUserLoading } = useAuth();

  const handlePersonalFormData = useEventCallback<PersonalFormComponentProps['onSubmit']>(
    (data) => data,
    // console.log('handlePersonalFormData', data);
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
