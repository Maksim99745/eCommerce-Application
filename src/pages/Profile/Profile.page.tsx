import { apiService } from '@core/api/api.service';
import { useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { PagePreloader } from '@components/PagePreloader/PagePreloader.component';
import useOnce from '@hooks/useOnce';
import { Stack } from '@mui/material';
import PersonalData from './components/PersonalData.component';

let data: Customer = await apiService.getCustomer();

function ProfilePage() {
  const [customerData, setCustomerData] = useState(data);

  const fetchCustomerData = async () => {
    data = await apiService.getCustomer();
    setCustomerData(data);
  };

  useOnce(fetchCustomerData);

  const { firstName, lastName, dateOfBirth } = customerData;

  return (
    <Stack>
      {data ? <PersonalData firstName={firstName} lastName={lastName} dateOfBirth={dateOfBirth} /> : <PagePreloader />}
    </Stack>
  );
}

export default ProfilePage;
