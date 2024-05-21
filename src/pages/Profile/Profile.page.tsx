import { apiService } from '@core/api/api.service';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { Stack } from '@mui/material';
import { useRequest } from '@core/api/use-request.hook';
import PersonalData from './components/PersonalData.component';

function ProfilePage() {
  const { data, isLoading } = useRequest('customer', () => apiService.getCustomer());

  if (isLoading) {
    return <PagePreloader />;
  }

  if (!data) {
    return null;
  }

  const { firstName, lastName, dateOfBirth } = data;

  return (
    <Stack>
      <PersonalData firstName={firstName} lastName={lastName} dateOfBirth={dateOfBirth} />
    </Stack>
  );
}

export default ProfilePage;
