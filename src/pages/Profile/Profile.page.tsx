import { Stack } from '@mui/material';
import useAuth from '@hooks/useAuth';
import PersonalFormComponent from './components/PersonalData.component';
import { useSubmitPersonalFormData } from './hooks/useSubmitPersonalFormData';
import PasswordFormComponent from './components/Password.component';
import { useSubmitNewPasswordFormData } from './hooks/useSubmitNewPassword';
import { ProfileAddressesForm } from './components/ProfileAddressesForm';
import { useSubmitRemoveAddress } from './hooks/useSubmitRemoveAddress';
import { useSubmitAddAddress } from './hooks/useSubmitAddAddress';
import { useSubmitUpdateAddress } from './hooks/useSubmitUpdateAddress';

function ProfilePage() {
  const { user, isUserLoading } = useAuth();

  const handlePersonalSubmit = useSubmitPersonalFormData();
  const handlePasswordSubmit = useSubmitNewPasswordFormData();
  const handleAddressesAddSubmit = useSubmitAddAddress();
  const handleRemoveSubmit = useSubmitRemoveAddress();
  const handleUpdateSubmit = useSubmitUpdateAddress();

  if (!user) {
    return null;
  }

  return (
    <Stack>
      <PersonalFormComponent onSubmit={handlePersonalSubmit} userData={user} isLoading={isUserLoading} />
      <PasswordFormComponent onSubmit={handlePasswordSubmit} isLoading={isUserLoading} />
      <ProfileAddressesForm
        userData={user}
        isLoading={isUserLoading}
        onSubmitAdd={handleAddressesAddSubmit}
        onSubmitRemove={handleRemoveSubmit}
        onSubmitUpdate={handleUpdateSubmit}
      />
    </Stack>
  );
}

export default ProfilePage;
