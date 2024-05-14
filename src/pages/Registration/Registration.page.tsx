import { ReactNode, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';
import { Link } from 'react-router-dom';

const pageStyles = {
  registrationPage: { display: 'flex', margin: '0 auto' },
  submitButton: { width: '45%' },
};

function RegistrationPage(): ReactNode {
  const handleFormSubmit = useCallback<RegistrationFormProps['onSubmit']>(async (data) => {
    console.log(data);
    return Promise.resolve('Ok');
  }, []);
  return (
    <Stack sx={pageStyles.registrationPage}>
      <RegistrationForm onSubmit={handleFormSubmit} />
      <Typography marginTop={2}>
        Already have an account? <Link to={'/login'}>Login in</Link>
      </Typography>
    </Stack>
  );
}

export default RegistrationPage;
