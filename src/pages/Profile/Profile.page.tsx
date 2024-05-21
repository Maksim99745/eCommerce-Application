import { apiService } from '@core/api/api.service';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import { Stack } from '@mui/material';
import { useRequest } from '@core/api/use-request.hook';
import { useShowMessage } from '@hooks/useShowMessage';
import PersonalData from './components/PersonalData.component';

function ProfilePage() {
  const { data, isLoading } = useRequest('https://auth.europe-west1.gcp.commercetools.com/', () =>
    apiService.getCustomer(),
  );
  const showMessage = useShowMessage();

  if (isLoading) {
    return <PagePreloader />;
  }

  if (!data) {
    showMessage('User personal information not found', 'error');
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
