import { ReactNode, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { RegistrationForm, RegistrationFormProps } from './components/RegistrationForm';

function RegistrationPage(): ReactNode {
  const handleFormSubmit = useCallback<RegistrationFormProps['onSubmit']>(async (data) => {
    console.log(data);
    return Promise.resolve('Ok');
  }, []);
  return (
    <Stack>
      <RegistrationForm onSubmit={handleFormSubmit} />
      <Typography marginTop={2}>
        Already have an account? <Link to="/login">Login in</Link>
      </Typography>
    </Stack>
  );
}

export default RegistrationPage;
