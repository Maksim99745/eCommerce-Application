import { ReactNode, useCallback } from 'react';
import { Box } from '@mui/material';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

const pageStyles = {
  registrationPage: { display: 'flex', margin: '0 auto' },
};

function RegistrationPage(): ReactNode {
  const handleFormSubmit = useCallback<RegistrationFormProps['onSubmit']>(async (data) => {
    console.log(data);
    return Promise.resolve('Ok');
  }, []);

  return (
    <Box sx={pageStyles.registrationPage}>
      <RegistrationForm onSubmit={handleFormSubmit} />
    </Box>
  );
}

export default RegistrationPage;
