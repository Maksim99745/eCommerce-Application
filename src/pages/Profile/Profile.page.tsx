import { Stack } from '@mui/material';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import useAuth from '@hooks/useAuth';
import { Addresses } from './components/Addresses.component';
import PersonalFormComponent from './components/PersonalData.component';
import { useSubmitPersonalFormData } from './components/useSubmitPersonalFormData';
import PasswordFormComponent from './components/Password.component';
import { useSubmitNewPasswordFormData } from './components/useSubmitNewPassword';
import { ProfileAddressesForm } from './components/ProfileAddressesForm';
import { useSubmitAddresses } from './components/useSubmitAddresses';

function ProfilePage() {
  const { user, isUserLoading } = useAuth();

  const handlePersonalSubmit = useSubmitPersonalFormData();
  const handlePasswordSubmit = useSubmitNewPasswordFormData();
  const handleAddressesSubmit = useSubmitAddresses();

  if (!user) {
    return null;
  }

  if (isUserLoading) {
    return <PagePreloader />;
  }

  return (
    <Stack>
      <PersonalFormComponent onSubmit={handlePersonalSubmit} userData={user} isLoading={isUserLoading} />
      <PasswordFormComponent onSubmit={handlePasswordSubmit} isLoading={isUserLoading} />
      <Addresses userData={user} />
      <ProfileAddressesForm userData={user} onSubmit={handleAddressesSubmit} />
    </Stack>
  );
}

export default ProfilePage;
