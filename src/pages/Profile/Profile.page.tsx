import { Stack } from '@mui/material';
import useAuth from '@hooks/useAuth';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import PersonalData from './components/PersonalData.component';

function ProfilePage() {
  const { user, isUserLoading } = useAuth();

  if (!user) {
    return null;
  }

  if (isUserLoading) {
    return <PagePreloader />;
  }

  const { firstName = '', lastName = '', dateOfBirth = '' } = user;

  return (
    <Stack>
      <PersonalData firstName={firstName} lastName={lastName} dateOfBirth={dateOfBirth} />
    </Stack>
  );
}

export default ProfilePage;
