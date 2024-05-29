import { Stack } from '@mui/material';
import useAuth from '@hooks/useAuth';
import PersonalFormComponent from './components/PersonalData.component';
import { useSubmitPersonalFormData } from './hooks/useSubmitPersonalFormData';
import PasswordFormComponent from './components/Password.component';
import { useSubmitNewPasswordFormData } from './hooks/useSubmitNewPassword';
import { ProfileAddressesForm } from './components/ProfileAddressesForm';
import { useSubmitAddresses } from './hooks/useSubmitAddresses';

function ProfilePage() {
  const { user, isUserLoading } = useAuth();

  const handlePersonalSubmit = useSubmitPersonalFormData();
  const handlePasswordSubmit = useSubmitNewPasswordFormData();
  const handleAddressesSubmit = useSubmitAddresses();

  if (!user) {
    return null;
  }

  return (
    <Stack>
      <PersonalFormComponent onSubmit={handlePersonalSubmit} userData={user} isLoading={isUserLoading} />
      <PasswordFormComponent onSubmit={handlePasswordSubmit} isLoading={isUserLoading} />
      {/* <Addresses userData={user} /> */}
      <ProfileAddressesForm userData={user} isLoading={isUserLoading} onSubmit={handleAddressesSubmit} />
    </Stack>
  );
}

export default ProfilePage;
