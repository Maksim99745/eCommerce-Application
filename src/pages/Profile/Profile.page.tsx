import { Stack } from '@mui/material';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import useAuth from '@hooks/useAuth';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent from './components/PersonalData.component';
import { useSubmitPersonalFormData } from './components/useSubmitPersonalFormData';

function ProfilePage() {
  const { user, isUserLoading } = useAuth();

  const handlePersonalSubmit = useSubmitPersonalFormData();

  if (!user) {
    return null;
  }

  if (isUserLoading) {
    return <PagePreloader />;
  }

  return (
    <Stack>
      <PersonalFormComponent onSubmit={handlePersonalSubmit} userData={user} isLoading={isUserLoading} />
      <Addresses userData={user} />
      {/* <ProfileAddressesForm
        userData={user}
        onSubmit={async (addresses) => {
          console.log('~~~~ addresses-form-data: ', addresses);
          return { success: true };
        }}
      /> */}
    </Stack>
  );
}

export default ProfilePage;
